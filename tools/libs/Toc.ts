import { Token, Tokens } from "npm:marked";
import { Category, isCategory } from "./Category.ts";

export type Toc = {
  [key in Category]: string[];
};

/**
 * マークダウンドキュメントの目次（TOC）を作成するためのクラスです。
 * マークダウンドキュメントから見出しとリストを登録して、目次を作成します。
 * `build` メソッドを使用して、作成された目次を文字列として取得できます。
 */
export class TocBuilder {
  toc: Toc = {
    "news 📺": [],
    "know-how 🎓": [],
    "tool 🔨": [],
    other: [],
  };

  /**
   * マークダウンドキュメントから見出しを登録します。
   * 見出しの深さが1の場合は、主要カテゴリとして扱い、その他の場合は "other" として扱います。
   * 見出しの深さが2の場合は、現在のカテゴリに見出しを追加します。
   * @param tokens マークダウンドキュメントのトークンリスト
   */
  registerHeadings(tokens: Token[]) {
    const headings: Tokens.Heading[] = tokens.filter((token) =>
      token.type === "heading" && token.depth !== undefined &&
      token.text !== undefined
    ) as Tokens.Heading[];

    let nowCategory: Category = "other";

    headings.forEach((heading) => {
      if (heading.depth === 1) {
        // 主要カテゴリじゃないものは other に入れる
        if (!isCategory(heading.text)) {
          nowCategory = "other";
          return;
        }
        nowCategory = heading.text as Category;
        this.toc[nowCategory] = [];
      }
      if (heading.depth === 2) {
        this.toc[nowCategory].push(heading.text);
      }
    });
  }

  /**
   * マークダウンドキュメントからリストを登録します。
   * カテゴリに対応するリストが見つかった場合、そのリストから見出しを抽出して目次に登録します。
   * @param tokens マークダウンドキュメントのトークンリスト
   */
  registerLists(tokens: Token[]) {
    const lists: Tokens.List[] = tokens.filter((token) =>
      token.type === "list" &&
      token.items !== undefined &&
      token.ordered !== undefined &&
      token.start !== undefined &&
      token.raw !== undefined &&
      token.loose !== undefined
    ) as Tokens.List[];

    if (lists.length === 0) return;

    const readMoreList = lists.filter((list) => isCategory(list.raw))[0].raw;
    const readMoreTitleRegExp = new RegExp(/^\s\s-\s\[(.*)\]/);
    const readMoreArray = readMoreList.split("\n");

    const getCategoryFromString = (str: string): Category => {
      const result = Category.filter((category) => str.includes(category));
      if (result.length > 0) {
        return result[0];
      }
      return "other";
    };

    let nowCategory: Category = "other";
    readMoreArray.forEach((item) => {
      if (isCategory(item)) {
        const category = getCategoryFromString(item);
        nowCategory = category;
        return;
      }

      const normalizedItem = item.match(readMoreTitleRegExp);
      if (normalizedItem === null) {
        return;
      }

      this.toc[nowCategory].push(normalizedItem[1]);
    });
  }

  /**
   * マークダウンドキュメントの目次（TOC）を文字列として取得します。
   * 目次は、主要カテゴリとそのカテゴリに属する見出しのリストから構成されます。
   * @returns マークダウンドキュメントの目次（TOC）の文字列
   */
  build() {
    const tocList = Object.entries(this.toc).map(([category, headings]) => {
      const categoryList = headings.map((heading) => {
        return `    - ${heading}`;
      });
      return [`- ${category}`, ...categoryList].join("\n");
    }).join("\n");

    return tocList;
  }
}
