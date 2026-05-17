import esbuild from "esbuild";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const assetsDir = path.join(distDir, "assets");

const buildOptions = {
  entryPoints: [path.join(rootDir, "src", "main.jsx")],
  bundle: true,
  outdir: assetsDir,
  entryNames: "app",
  assetNames: "[name]-[hash]",
  format: "esm",
  jsx: "automatic",
  sourcemap: false,
  loader: {
    ".png": "file"
  },
  logLevel: "info"
};

async function writeHtml() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AniVerse</title>
  <link rel="stylesheet" href="/assets/app.css">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/assets/app.js"></script>
</body>
</html>
`;

  await fs.writeFile(path.join(distDir, "index.html"), html);
}

export async function buildApp({ watch = false } = {}) {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(assetsDir, { recursive: true });
  await writeHtml();

  if (!watch) {
    await esbuild.build(buildOptions);
    return null;
  }

  const context = await esbuild.context({
    ...buildOptions,
    plugins: [
      {
        name: "rewrite-html-after-rebuild",
        setup(build) {
          build.onEnd(async () => {
            await writeHtml();
            console.log("[debug] React app rebuilt.");
          });
        }
      }
    ]
  });

  await context.watch();
  return context;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const watch = process.argv.includes("--watch");
  await buildApp({ watch });
}
