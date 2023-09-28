/**
 * カテゴリの一覧を表す配列です。
 * `news 📺`、`know-how 🎓`、`tool 🔨`、`other`のいずれかを要素に持ちます。
 */
export const Category = ["news 📺", "know-how 🎓", "tool 🔨", "other"] as const;
export type Category = typeof Category[number];

/**
 * `Category`に定義されたカテゴリのいずれかが、指定された文字列に含まれているかどうかをチェックします。
 * @param str チェックする文字列。
 * @returns 文字列がカテゴリのいずれかを含む場合は`true`、それ以外の場合は`false`を返します。
 */
export const isCategory = (str: string) => {
  if (str.includes("other")) return false;
  return Category.some((category) => str.includes(category));
};
