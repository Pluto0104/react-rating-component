var webpack = require('webpack');
var PACKAGE = require('./package.json');
var banner = PACKAGE.name + ' - ' + PACKAGE.version + ' | ' +
  '(c) 2015, ' + new Date().getFullYear() + '  ' + PACKAGE.author + ' | ' +
  PACKAGE.license + ' | ' +
  PACKAGE.homepage;

module.exports = {
  entry: {
    // NOTE: In case we need another entry that depends on another entry point.
    // Error: a dependency to an entry point is not allowed
    // https://github.com/webpack/webpack/issues/300
    // You can workaround it by putting the entry into a array.
    //index: './src/index.jsx',
    //'react-rating': ['./src/react-rating.jsx']
    'react-rating': './src/react-rating.jsx'
  },
  output: {
    // Output the bundled file.
    path: './lib',
    // Use the name specified in the entry key as name for the bundle file.
    filename: '[name].js',
    // Export as a Universal Module Definition library.
    library: 'ReactRating',
    libraryTarget: 'umd',
    // The modified bundle is served from memory at the relative path
    // specified in publicPath.
    // I use the same as the output path to use the same index.html either
    // served by webpack-dev-server or as a static file loaded in the browser.
    publicPath: '/lib'
  },
  module: {
    loaders: [
      {
        // Test for js or jsx files.
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  externals: {
    // Don't bundle the 'react' npm package with the component.
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  resolve: {
    // Include empty string '' to resolve files by their explicit extension
    // (e.g. require('./somefile.ext')).
    // Include '.js', '.jsx' to resolve files by these implicit extensions
    // (e.g. require('underscore')).
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
};
