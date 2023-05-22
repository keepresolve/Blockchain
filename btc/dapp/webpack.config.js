
const path = require('path');

module.exports = {
  entry: './buffer.js',
  output: {
    path: path.resolve(__dirname,"./"),
    filename: 'buffer-bowers.js',
    library:"Buffer",
    libraryTarget: 'umd' // 将库打包为 AMD 模块

  },
  resolve: {
    extensions: ['.js'],
    fallback: {
        "stream": require.resolve("stream-browserify"),
        "crypto": require.resolve("crypto-browserify")
    }
},
};