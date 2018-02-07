const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const Visualizer = require("webpack-visualizer-plugin");
const glob = require("glob");

module.exports = env => {
  const options = Object.assign({}, env);
  const paths = glob.sync("./src/components/**/!(*.spec|*.test)*.+(ts|tsx)");

  const entries = () => {
    let obj = {};
    
    for (var i = 0; i < paths.length; ++i) {
      const name = path.parse(paths[i]).name;
      obj[name] = paths[i];
    }
  
    return obj;
  };

  const base = {
    watch: !options.production,
    stats: "normal",
    devtool: "source-map",
    resolve: {
      // Add '.ts' and '.tsx' as a resolvable extension.
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
      loaders: [
        // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
        {
          test: /\.tsx?$/,
          use: [{ 
            loader: "ts-loader" 
          }]
        },
        {
          test: /\.scss$/,
          use: [
            "to-string-loader",
            {
              loader: "css-loader",
              options: { sourceMap: !options.production }
            },
            {
              loader: "postcss-loader",
              options: { sourceMap: !options.production }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(["dist"], {
        root: process.cwd()
      }),
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ecma: 8,
          compress: options.production ? true : false
        }
      }),
      new Visualizer({
        filename: "./dist/stats.html"
      })
    ]
  };

  const umdConfig = Object.assign({}, base, {
    entry: entries,
    output: {
      filename: "./dist/bundles/[name].umd.js",
      libraryTarget: "umd"
    }
  });

  const bundleConfig = Object.assign({}, base, {
    entry: entries,
    output: {
      filename: "./dist/es2015/[name].js"
    }
  });

  return [umdConfig, bundleConfig];
};
