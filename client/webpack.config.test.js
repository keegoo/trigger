var nodeExternals = require('webpack-node-externals')
var path = require('path')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        query: {
          plugins: ['transform-class-properties'],
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    alias: {
      srcDir: path.resolve(__dirname, 'src/')
    }
  }
}