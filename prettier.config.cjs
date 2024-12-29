/** @type {import("prettier").Config} */
module.exports = {
  importOrder: [
    "^react$",
    "^react/(.*)$",
    "^next$",
    "^next/(.*)$",
    "^@highschool/(.*)$",
    "^@tabler/icons-react$",
    "^@/.*$",
    "^~/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true, // Add a newline between import groups
  importOrderSortSpecifiers: true, // Sort specifiers within the same import
  importOrderParserPlugins: ["typescript", "jsx", "importAssertions"], // Support for various syntax
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};
