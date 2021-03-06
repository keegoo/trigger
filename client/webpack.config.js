var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  module: {
    loaders: [
      {
        loader: "babel-loader",
        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "src"),
        ],
        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,
        // Options to configure babel with
        query: {
          presets: ['es2015', 'react'],
        }
      }
    ]
  },
  output: {
    filename: './../public/bundle.js'
  },
  entry: [
    './src/App.jsx'
  ],
  externals: {
    'Config': JSON.stringify({host: "http://127.0.0.1:3000"})
  }
};
