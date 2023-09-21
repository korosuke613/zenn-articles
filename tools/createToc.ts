// deno run --allow-read ./tools/createToc.ts ./articles/productivity-weekly-20230726.md
import { marked } from "npm:marked";
import matter from "npm:gray-matter";
import { TocBuilder } from "./Toc.ts";

const main = async () => {
  if (Deno.args[0] === undefined) {
    throw new Error("引数にマークダウンのパスを指定してください");
  }

  // 引数でマークダウンのパスを受け取る
  const markdown = await Deno.readTextFile(Deno.args[0]);
  const content = matter(markdown).content;

  const lexer = new marked.Lexer();

  // マークダウンをパースする
  const tokens = lexer.lex(content);

  const tocBuilder = new TocBuilder();
  tocBuilder.registerHeadings(tokens);
  tocBuilder.registerLists(tokens);
  const toc = tocBuilder.build();

  console.log(`
1. 出てきた文字列をコピーする
2. Slack のキャンバスを新規作成する。
3. 作成したキャンバスに Command + Shift + p で貼り付ける
4. 貼った文字列を選択し、チェックボックスに変換する
`);

  console.log(toc);
};

// import された際は main() を実行しない
if (import.meta.main) {
  await main();
}
