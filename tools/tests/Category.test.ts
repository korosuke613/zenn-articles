import { isCategory } from "../libs/Category.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("isCategory", async (t) => {
  await t.step("should return true when the string includes a category", () => {
    assertEquals(isCategory("This is a news 📺 article"), true);
    assertEquals(isCategory("This is a know-how 🎓 article"), true);
    assertEquals(isCategory("This is a tool 🔨 article"), true);
  });

  await t.step(
    "should return false when the string does not include a category",
    () => {
      assertEquals(isCategory("This is not a category"), false);
      assertEquals(isCategory("This is a new article"), false);
      assertEquals(isCategory("This is a tool article"), false);
    },
  );

  await t.step("should return false when the string includes 'other'", () => {
    assertEquals(isCategory("This is a other article"), false);
  });
});
