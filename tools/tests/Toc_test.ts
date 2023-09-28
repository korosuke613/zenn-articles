// BEGIN: 9f5d5d7d6d4d
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { TocBuilder } from "../libs/Toc.ts";
import { Token } from "npm:marked";

Deno.test("TocBuilder", async (t) => {
  await t.step("registerHeadings should register headings", () => {
    const tocBuilder = new TocBuilder();
    const tokens: Token[] = [
      { type: "heading", depth: 1, text: "news 📺" },
      { type: "heading", depth: 2, text: "news1" },
      { type: "heading", depth: 2, text: "news2" },
      { type: "heading", depth: 1, text: "know-how 🎓" },
      { type: "heading", depth: 2, text: "know-how1" },
      { type: "heading", depth: 2, text: "know-how2" },
      { type: "heading", depth: 1, text: "tool 🔨" },
      { type: "heading", depth: 2, text: "tool1" },
      { type: "heading", depth: 2, text: "tool2" },
      { type: "heading", depth: 1, text: "other" },
      { type: "heading", depth: 2, text: "other1" },
      { type: "heading", depth: 2, text: "other2" },
    ] as Token[];
    tocBuilder.registerHeadings(tokens);
    assertEquals(tocBuilder.toc, {
      "news 📺": ["news1", "news2"],
      "know-how 🎓": ["know-how1", "know-how2"],
      "tool 🔨": ["tool1", "tool2"],
      other: ["other1", "other2"],
    });
  });

  await t.step("registerLists should register lists", () => {
    const tocBuilder = new TocBuilder();
    const tokens: Token[] = [
      {
        type: "list",
        raw: `
news 📺
  - [news1](#news1)
    - この行は無視する
      - この行も無視する
  - [news2](#news2)
know-how 🎓
  - [know-how1](#know-how1)
  - [know-how2](#know-how2)
tool 🔨
  - [tool1](#tool1)
  - [tool2](#tool2)
`,
        items: [],
        ordered: false,
        start: "",
        loose: false,
      },
    ] as Token[];

    tocBuilder.registerLists(tokens);

    assertEquals(tocBuilder.toc, {
      "news 📺": ["news1", "news2"],
      "know-how 🎓": ["know-how1", "know-how2"],
      "tool 🔨": ["tool1", "tool2"],
      other: [],
    });
  });

  await t.step("build should build TOC", () => {
    const tocBuilder = new TocBuilder();
    tocBuilder.toc = {
      "news 📺": ["news1", "news2"],
      "know-how 🎓": ["know-how1", "know-how2"],
      "tool 🔨": ["tool1", "tool2"],
      other: ["other1", "other2"],
    };
    const expected = `- news 📺
    - news1
    - news2
- know-how 🎓
    - know-how1
    - know-how2
- tool 🔨
    - tool1
    - tool2
- other
    - other1
    - other2`;
    assertEquals(tocBuilder.build(), expected);
  });
});
