import babel from "@rollup/plugin-babel";
import sucrase from "@rollup/plugin-sucrase";
/**
 * @type {import("rollup").RollupOptions}
 */
export default [
  {
    input: "./src/server.js",
    plugins: [
      sucrase({
        production: true,
        transforms: ["typescript", "jsx"],
        jsxPragma: "h",
        jsxFragmentPragma: "h",
      }),
    ],
    output: {
      format: "es",
      file: "dist/server/index.js",
    },
  },
];
