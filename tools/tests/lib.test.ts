import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { getGitDiffWeeklyFiles, grepEmoji } from "../libs/lib.ts";

Deno.test("getGitDiffWeeklyFiles should return an array of weekly files", async () => {
  // deno-lint-ignore require-await
  const gitExecutor = async () =>
    "productivity-weekly-20230730.md\nfile1.md\nproductivity-weekly-20230723.md\nfile2.md\n";

  const expected = [
    "productivity-weekly-20230730.md",
    "productivity-weekly-20230723.md",
  ];
  const actual = await getGitDiffWeeklyFiles(gitExecutor);

  assertEquals(actual, expected);
});

Deno.test("grepEmoji should return an array of files containing the given emoji", async () => {
  // deno-lint-ignore require-await
  const grepExecutor = async (emoji: string) => {
    if (emoji === "🚀") {
      return "articles/file1.md\narticles/file2.md\n";
    } else if (emoji === "🌟") {
      return "articles/file3.md\n";
    } else {
      throw new Error(`Unexpected emoji: ${emoji}`);
    }
  };

  const expected = ["articles/file1.md", "articles/file2.md"];
  const actual = await grepEmoji("🚀", grepExecutor);

  assertEquals(actual, expected);
});
