module.exports = {
  context: __dirname,
  entry: "./lib/snake_view.js",
  output: {
    path: "./lib",
    publicPath: "/lib/",
    filename: "snake_on_jquery.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
