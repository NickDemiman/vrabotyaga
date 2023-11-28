const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  watch: true,
  output: {
    path: path.join(__dirname, 'public/build'),
    publicPath: '/build/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      { 
        test: /\.hbs$/,
        include: [
          path.resolve(__dirname, 'src')
        ], 
        loader: 'handlebars-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.ts', '.hbs', '.js', ''],
    modules: [ '/node_modules' ]
  },
  devtool: 'source-map',
};