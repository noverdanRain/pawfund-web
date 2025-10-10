/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],

  // Indentation settings
  tabWidth: 2, // Ubah menjadi 4 spasi per indent (default: 2)
  useTabs: true, // false = gunakan spasi, true = gunakan tab

  // Other formatting options
  semi: true, // Tambahkan semicolon di akhir statement
  trailingComma: "all", // Tambahkan trailing comma
  singleQuote: false, // Gunakan double quotes
  printWidth: 100, // Maksimal panjang baris sebelum line break
  endOfLine: "lf", // Line ending (lf untuk Linux/Mac, crlf untuk Windows)
  bracketSpacing: true, // Spasi dalam object brackets: { foo: bar }
  arrowParens: "always", // Selalu gunakan parentheses di arrow function
};

export default config;
