module.exports = {
  importOrder: ["^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
};
