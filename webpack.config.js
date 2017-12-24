const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PadWithNullsPlugin = require('./loaders/pad-with-null');
const dev = !!process.env.DEV_MODE;
const output = process.env.OUTPUT_PATH;

const config = {
  entry: './src/main.ts',
  output: {
    filename: 'mod.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      ...(dev ? [

      ] : [])
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    ...(dev ? [
      new PadWithNullsPlugin({
        len: 100 * 1024
      })
    ] : [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 5,
          mangle: {
            properties: true
          },
          compress: true
        }
      })
    ])
  ]
};

if (output) {
  module.exports = [config, {
    ...config,
    output: {
      filename: 'mod.js',
      path: path.resolve(__dirname, output)
    },
  }]
} else {
  module.exports = config;
}
