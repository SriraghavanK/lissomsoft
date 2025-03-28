const webpack = require("webpack")

module.exports = function override(config) {
  // Add fallbacks for node modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    events: require.resolve("events/"),
    process: require.resolve("process/browser"),
    util: require.resolve("util/"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer/"),
    path: require.resolve("path-browserify"),
    fs: false,
    crypto: require.resolve("crypto-browserify"),
  }

  // Add plugins
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  )

  return config
}

