// deno run --allow-read --allow-run=git,grep ./tools/checkDuplicateEmoji.ts
import matter from "npm:gray-matter";
import { getGitDiffWeeklyFiles, grepEmoji } from "./libs/lib.ts";

const main = async () => {
  const articles = await getGitDiffWeeklyFiles();

  if (articles.length === 0) {
    console.log(`Skip, there are no target files.`);
    Deno.exit(0);
  }

  // 複数の記事を同時に書かない前提
  const text = await Deno.readTextFile(articles[0]);
  const content = matter(text);
  const emoji = content.data.emoji as string;

  if (emoji === "") {
    throw new Error(`Emoji is empty.`);
  }

  const emojiFiles = await grepEmoji(emoji);

  if (emojiFiles.length > 1) {
    throw new Error(`Find duplicate emoji files, \n${emojiFiles}`);
  }

  console.log(`Ok, duplicate emoji files is nothing.`);
};

// import された際は main() を実行しない
if (import.meta.main) {
  await main();
}
