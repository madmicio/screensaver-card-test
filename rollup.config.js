import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/screensaver-card.ts",
  output: {
    file: "dist/screensaver-card.js",
    format: "es",
    sourcemap: false, // Disabilita il supporto ai source maps
  },
  
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    terser(),
  ],
};
