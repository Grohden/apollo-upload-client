const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

void buildAll();

async function buildAll() {
  return Promise.all([
    build("esm", {
      entryPoints: ["./index.mjs"],
      platform: "neutral",
      outExtension: { ".js": ".mjs" },
    }),
  ]);
}

async function build(name, options) {
  const path = `${name}.js`;
  console.log(`Building ${name}`);

  if (process.argv.includes("--watch")) {
    let ctx = await esbuild.context({
      outfile: `./dist/${path}`,
      bundle: true,
      logLevel: "info",
      sourcemap: true,
      plugins: [nodeExternalsPlugin()],
      ...options,
      minify: false,
    });
    await ctx.watch();
  } else {
    return esbuild.build({
      outfile: `./dist/${path}`,
      bundle: true,
      plugins: [nodeExternalsPlugin()],
      ...options,
    });
  }
}
