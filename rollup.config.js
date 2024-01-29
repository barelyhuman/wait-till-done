import sucrase from "@rollup/plugin-sucrase";
import postcss from "rollup-plugin-postcss";

/**
 * @type {import("rollup").RollupOptions}
 */
export default [
  {
    input: "./src/server.js",
    plugins: [
      postcss({
        config: {
          path: "./postcss.config.cjs",
        },
        extensions: [".css"],
        extract: "public/assets/styles.css",
      }),
      sucrase({
        production: true,
        transforms: ["typescript", "jsx"],
        jsxPragma: "h",
        jsxFragmentPragma: "h",
      }),
    ],
    output: {
      banner: "import h from 'vhtml'",
      format: "es",
      file: "dist/server/index.js",
    },
  },
];
