const _gitExecutor = async () => {
  const cmd = new Deno.Command("git", {
    args: ["diff", "--name-only", "main"],
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stdout, stderr } = await cmd.output();
  if (code !== 0) {
    const errorString = new TextDecoder().decode(stderr);
    throw new Error(`git: ${code}, ${errorString}`);
  }

  return new TextDecoder().decode(stdout);
};

export const getGitDiffWeeklyFiles = async (
  gitExecutor: () => Promise<string> = _gitExecutor,
) => {
  const output = await gitExecutor();
  const gitDiffFiles = output.split("\n").filter((f) => f !== "");
  const diffWeekly = gitDiffFiles.filter((a) =>
    a.endsWith(".md") && a.includes("productivity-weekly")
  );
  return diffWeekly;
};

const _grepExecutor = async (emoji: string) => {
  const cmd = new Deno.Command("grep", {
    args: ["-r", "-n", "-w", "./articles", "-e", emoji],
  });
  const { code, stdout, stderr } = await cmd.output();

  switch (code) {
    case 0:
      break;
    case 1:
      throw new Error(`grep: no matches found: ${emoji}`);
    default: {
      const errorString = new TextDecoder().decode(stderr);
      throw new Error(`grep: ${code}, ${errorString}`);
    }
  }

  return new TextDecoder().decode(stdout);
};

export const grepEmoji = async (
  emoji: string,
  grepExecutor: (emoji: string) => Promise<string> = _grepExecutor,
) => {
  const output = await grepExecutor(emoji);
  const files = output.split("\n").filter((f) => f !== "");
  return files;
};
