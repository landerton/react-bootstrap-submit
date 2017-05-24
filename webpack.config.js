var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
    new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: [
              'transform-object-rest-spread',
              'babel-plugin-add-module-exports',
              'babel-plugin-transform-class-properties'
            ]
          },
        }],
      }
    ],
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
    {
      'react-bootstrap': {
        root: 'ReactBootstrap',
        commonjs2: 'react-bootstrap',
        commonjs: 'react-bootstrap',
        amd: 'react-bootstrap',
      },
    },
    {
      'classnames': {
        root: 'classNames',
        commonjs2: 'classnames',
        commonjs: 'classnames',
        amd: 'classnames',
      },
    },
  ],
};
