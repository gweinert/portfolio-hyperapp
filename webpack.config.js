var path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const plugins = [
  new ExtractTextPlugin({
    filename: './bundle.css',
    allChunks: true,
  }),
];
console.log("ENV", process.env.NODE_ENV)
// if (process.env.NODE_ENV === 'production') plugins.push(new BabiliPlugin());

module.exports = {
  
  entry: [
    "./index.js",
    "./styles/styles.css",
    "whatwg-fetch"
  ],
  
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, './'),
  },
  
  module: {
    // loaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: "babel-loader"
    //   },
    //   {
    //     test: /\.css$/,
    //     use: ExtractTextPlugin.extract({
    //       use: 'css-loader?importLoaders=1',
    //     }),
    //   }
    // ]
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
          ],
          plugins: [],
        },
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, './'),
        ],
      }, 
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?importLoaders=1',
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      }
    ],
  },
  
  plugins: plugins,
  
  devtool: "cheap-eval-source-map",

  devServer: {
    contentBase: path.join(__dirname, ""),
    compress: true,
    port: 8080,
    historyApiFallback: true
  }
}