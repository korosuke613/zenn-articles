import { DiagnosticResult } from "./ReviewDogJsonLine.ts";
import { log, LogRecord, OpenAI } from "../deps.ts";

export type ReviewResult = {
  review: {
    error_line: string;
    revised_line: string;
    reason: string;
  }[];
};

export type AiReviewerOptions = {
  max_tokens: number;
  model: string;
  logFilePath?: string;
  logging: boolean;
  reviewNum: number;
};

export type OpenAIPricingData = {
  // 単位: ドル/トークン
  input: number;
  output: number;
};

export class AiReviewer {
  private readonly openai: OpenAI;
  private static readonly SYSTEM_PROMPT = `
あなたは日本語技術記事を校正するアシスタントです。
与えられたマークダウン形式の文章で、誤字・脱字、文法誤り、論理的・技術的な誤りのある行を抜き出し、修正した行を出力してください。
その際、確実に修正すべき誤りのみを出力してください。
また、以下のルールに従って修正を行ってください。
- 句読点の追加や削除はしない
- 英単語のキャピタライゼーションはしない
- 半角・全角の違いは修正しない
- 見出しの誤字脱字は修正しない
- 伸ばし棒の有無は修正しない
- スペースの有無は修正しない
- リストのインデントは修正しない
- セルフホストランナーは修正しない
- 箇条書きの場合、文の終わりに句読点は不要
- 文体の統一は指摘しないで良い
- 読点の修正はしない

出力は、$review_num$個以下とし、より優先的に修正すべきものを出力してください。
`;
  private static readonly pricing: Record<string, OpenAIPricingData> = {
    // ref: https://openai.com/api/pricing/
    "gpt-4o": {
      input: 2.5 / (1 * 1000000),
      output: 10 / (1 * 1000000),
    },
    "o1-mini": {
      input: 3 / (1 * 1000000),
      output: 12 / (1 * 1000000),
    },
    "o1-preview": {
      input: 15 / (1 * 1000000),
      output: 60 / (1 * 1000000),
    },
    "o1": {
      input: 15 / (1 * 1000000),
      output: 60 / (1 * 1000000),
    },
  };
  static readonly defaultOptions: AiReviewerOptions = {
    max_tokens: 1024,
    // o1-mini か o1-preview が使いたいが、system role が使えない、structured outputs が使えないなどまだ制限があるため、gpt-4o を使用
    // ref: https://community.openai.com/t/o1-models-do-not-support-system-role-in-chat-completion/953880/12
    // ref: https://platform.openai.com/docs/guides/structured-outputs#supported-models
    model: "gpt-4o",
    logging: true,
    reviewNum: 5,
  };
  options: AiReviewerOptions;
  lastUsage?: ReturnType<typeof this.getPricing>;

  constructor(openai: OpenAI, options?: Partial<AiReviewerOptions>) {
    this.openai = openai;
    this.options = { ...AiReviewer.defaultOptions, ...options };
    const formatter = (record: LogRecord) =>
      `[${record.datetime.toISOString()} ${record.levelName}] ${record.msg}`;

    const logSetting: log.LogConfig = {
      handlers: {
        console: new log.ConsoleHandler("DEBUG", {
          formatter,
        }),
      },
      loggers: {
        default: {
          level: AiReviewer.getLogLevel(Deno.env.get("LOG_LEVEL")),
          handlers: ["console"],
        },
      },
    };

    if (
      this.options.logFilePath !== undefined && logSetting.handlers &&
      logSetting.loggers
    ) {
      logSetting.handlers["file"] = new log.FileHandler("DEBUG", {
        filename: this.options.logFilePath,
        formatter,
        mode: "w",
      });
      logSetting.loggers.default.handlers = ["console", "file"];
    }

    log.setup(logSetting);

    if (this.options.logging && this.options.logFilePath !== undefined) {
      log.debug(`Log file path is ${this.options.logFilePath}`);
    }
  }

  static getLogLevel = (level?: string) => {
    return log.getLevelName((() => {
      switch (level?.toUpperCase()) {
        case "DEBUG":
          return log.LogLevels.DEBUG;
        case "INFO":
          return log.LogLevels.INFO;
        case "WARN":
          return log.LogLevels.WARN;
        case "ERROR":
          return log.LogLevels.ERROR;
        case "CRITICAL":
          return log.LogLevels.CRITICAL;
        default:
          return log.LogLevels.INFO;
      }
    })());
  };

  static validateReviewResult = (arg: unknown): arg is ReviewResult => {
    // ReviewResult が特定のキーを持っており、型が正しいことを保証する

    // arg が review を持っている
    if (
      typeof arg !== "object" ||
      arg === null ||
      !("review" in arg) ||
      !Array.isArray(arg.review)
    ) {
      throw new Error(`Invalid OpenAI response.\n\n${JSON.stringify(arg)}`);
    }

    // review が正しい型である
    if (
      !Array.isArray(arg.review) ||
      !arg.review.every((comment) =>
        typeof comment.error_line === "string" &&
        typeof comment.revised_line === "string"
      )
    ) {
      throw new Error(`Invalid OpenAI response.\n\n${JSON.stringify(arg)}`);
    }

    return true;
  };

  createReviewInput = (markdown: string) => {
    const input: OpenAI.ChatCompletionCreateParamsNonStreaming = {
      model: this.options.model,
      messages: [
        {
          "role": "system",
          "content": AiReviewer.SYSTEM_PROMPT.replace(
            "$review_num$",
            this.options.reviewNum.toString(),
          ),
        },
        {
          "role": "user",
          "content": markdown,
        },
      ],
      temperature: 1,
      max_completion_tokens: this.options.max_tokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "reviews",
          strict: true,
          schema: {
            type: "object",
            properties: {
              review: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    error_line: { type: "string" },
                    revised_line: { type: "string" },
                    reason: { type: "string" },
                  },
                  required: ["error_line", "revised_line", "reason"],
                  additionalProperties: false,
                },
              },
            },
            required: ["review"],
            additionalProperties: false,
          },
        },
      },
    };

    return input;
  };

  static normalizeResponse = (response: string) => {
    // OpenAI のレスポンスにコードブロックの記法が含まれることがあるため、削除する
    return response.replaceAll("```json", "").replaceAll("```", "");
  };

  getPricing = (usage?: OpenAI.CompletionUsage) => {
    if (usage === undefined) {
      if (this.options.logging) log.warn("No usage data from OpenAI.");
      return undefined;
    }

    const input = usage.prompt_tokens *
      AiReviewer.pricing[this.options.model].input;
    const output = usage.completion_tokens *
      AiReviewer.pricing[this.options.model].output;

    return {
      model: this.options.model,
      tokens: usage,
      pricing: {
        input: `${input.toFixed(3)} USD`,
        output: `${output.toFixed(3)} USD`,
        total: `${(input + output).toFixed(3)} USD`,
      },
    };
  };

  normalizeDiff = (diff: string) => {
    // remove the first 5 lines
    const removedHeader = diff.split("\n").slice(5);

    // extract lines starting with '+'
    const filteredAddedLines = removedHeader.filter((line) =>
      line.startsWith("+")
    );

    // remove the first character '+'
    const removedPlus = filteredAddedLines.map((line) => line.slice(1)).join(
      "\n",
    );

    // 空行のみを削除
    const lines = removedPlus.split("\n").filter((line) => line !== "");
    const contentWithoutSpaceLines = `${lines.join("\n")}\n`;

    log.debug(`Extracted contents\n${contentWithoutSpaceLines}`);

    return contentWithoutSpaceLines;
  };

  review = async (markdown: string): Promise<ReviewResult> => {
    if (this.options.logging) log.info("Reviewing markdown...");

    const input = this.createReviewInput(markdown);
    log.debug(`OpenAI request\n${JSON.stringify(input, null, 2)}`);

    const response = await this.openai.chat.completions.create(
      input,
    );

    const choice = response.choices[0].message.content;

    if (choice === null) {
      throw new Error("No response from OpenAI.");
    }

    if (this.options.logging) {
      log.info(
        `OpenAI response\n${choice}`,
      );
    }

    const usage = this.getPricing(response.usage);
    if (usage) {
      if (this.options.logging) {
        log.info(
          `OpenAI usage\n${
            JSON.stringify(this.getPricing(response.usage), null, 2)
          }`,
        );
      }
      this.lastUsage = usage;
    }

    const normalizedResponse = AiReviewer.normalizeResponse(choice);

    let result: ReviewResult;
    try {
      result = JSON.parse(normalizedResponse);
    } catch (e: unknown) {
      if (e instanceof SyntaxError) {
        throw new Error(
          `Invalid JSON response from OpenAI.\n\n${normalizedResponse}`,
        );
      }
      throw e;
    }

    // 対象文（error_line）と修正文（revised_line）が同じ場合は修正が行われていないため、除外する
    result.review = result.review.filter((comment) => {
      if (comment.error_line !== comment.revised_line) return true;
      if (this.options.logging) {
        log.warn(
          `Removed unchanged comment: ${comment.error_line} -> ${comment.revised_line}`,
        );
      }
    });

    AiReviewer.validateReviewResult(result);

    return result;
  };

  static reviewApply = (markdown: string, reviewResult: ReviewResult) => {
    let replacedMarkdown = markdown;
    for (const comment of reviewResult.review) {
      replacedMarkdown = replacedMarkdown.replace(
        comment.error_line,
        comment.revised_line,
      );
    }
    return replacedMarkdown;
  };

  convertReviewDogJson = (
    markdown: string,
    path: string,
    reviewResult: ReviewResult,
  ): string => {
    const diagnosticResult: DiagnosticResult = {
      diagnostics: [],
    };
    for (const comment of reviewResult.review) {
      const errorLine = comment.error_line;
      const revisedLine = comment.revised_line;
      const lines = markdown.split("\n");
      const line = lines.findIndex((l) => l.includes(errorLine)) + 1; // 1行目から始まるため +1
      if (line === 0) {
        if (this.options.logging) {
          log.warn(`line not found: ${errorLine}`);
        }
        continue;
      }

      const replacedLine = lines[line - 1].replace(
        errorLine,
        revisedLine,
      );

      const range = {
        start: { line },
        end: { line },
      };
      diagnosticResult.diagnostics.push({
        message:
          `${comment.reason}\n※AI による自動修正提案です。修正を受け入れるかどうかはご自身で判断ください。`,
        location: {
          path,
          range,
        },
        suggestions: [
          {
            range,
            text: replacedLine,
          },
        ],
      });
    }

    const result = JSON.stringify(diagnosticResult, null, 2);
    log.debug(
      `ReviewDog Json\n${result}`,
    );

    if (this.options.logging) log.info("Converted to ReviewDog Json");
    return result;
  };
}
