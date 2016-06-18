module.exports = {
  context: __dirname,
  entry: "./lib/snake-view.js",
  output: {
    path: "./lib",
    publicPath: "/lib/",
    filename: "snake-on-jquery.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
