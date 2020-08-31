const mix = require("laravel-mix");

mix.copy("static/index.html", "renderer/index.html");
mix.copy("public/electron.js", "build/electron.js");

mix
  // This is required for hot reloading
  .setPublicPath("./renderer")
  .webpackConfig({
    module: {
      rules: [
        // ⬇️ Add this:
        {
          test: /\.worker\.js$/,
          use: { loader: "worker-loader" },
        },
      ],
    },
    // ...
    output: {
      // ...
      globalObject: "this", // ⬅️ And this
    },
    target: "node",
  })
  // This will copy files from static folder
  // directly into dist folder
  // .copy("src/start.js", "renderer/electron.js")
  // This will process our entry point (app.js)
  // into the dist/js folder
  .react("src/index.js", "renderer/js")
  .setResourceRoot(".");
