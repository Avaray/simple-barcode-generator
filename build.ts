import * as esbuild from "esbuild";
import { denoPlugins } from "@luca/esbuild-deno-loader";

// Shared settings
const sharedConfig = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  sourcemap: true,
  target: "es2020",
  plugins: [...denoPlugins()],
};

try {
  // Build ESM version
  await esbuild.build({
    ...sharedConfig,
    format: "esm",
    outfile: "./dist/index.mjs",
    minify: true,
  });

  // Build CommonJS version
  await esbuild.build({
    ...sharedConfig,
    format: "cjs",
    outfile: "./dist/index.cjs",
    minify: true,
  });

  // Build browser version (IIFE)
  await esbuild.build({
    ...sharedConfig,
    format: "iife",
    globalName: "BarcodeGenerator",
    outfile: "./dist/index.browser.js",
    minify: true,
  });

  console.log("Bundle generation complete!");
} catch (error) {
  console.error("Build failed:", error);
  Deno.exit(1);
} finally {
  esbuild.stop();
}
