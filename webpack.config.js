const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PadWithNullsPlugin = require('./loaders/pad-with-null');
const dev = process.env.DEV_MODE == 'true';
const output = process.env.OUTPUT_PATH;

if (dev) {
  console.log('Dev build');
} else {
  console.log('Prod build');
}

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
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 5,
          mangle: false,
          compress: {
            passes: 3,
            toplevel: true,
            global_defs: {
              DEBUG: true
            }
          },
          output: {
            beautify: true
          },
        }
      }),
      new PadWithNullsPlugin({
        len: 100 * 1024
      })
    ] : [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 5,
          mangle: {
            properties: false
          },
          compress: {
            passes: 3,
            toplevel: true,
            pure_funcs: [
              'OSReport'
            ],
            global_defs: {
              DEBUG: false
            }
          },
          // output: {
          //   beautify: true
          // },
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
