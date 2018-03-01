const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const Visualizer = require("webpack-visualizer-plugin");
const glob = require("glob");
const CompressionPlugin = require("compression-webpack-plugin");

const getEntries = (root, src) => {
  let obj = {};
    
    for (var i = 0; i < src.length; ++i) {
      const parsedPath = path.parse(src[i])
      const name = parsedPath.name;
      obj[path.join(parsedPath.dir.split(root)[1], name)] = src[i];
    }
    
    return obj;
}

module.exports = env => {
  const options = Object.assign({}, env);
  const root = 'src';
  const paths = glob.sync(`./${root}/**/!(*.spec|*.test|*.d)*.+(ts|tsx)`);
  const testPaths = glob.sync(`./${root}/**/!(*.d)*.+(spec|test)*.+(ts|tsx)`);

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
      // new CompressionPlugin({
      //   asset: "[path].gz[query]",
      //   algorithm: "gzip",
      //   test: /\.js$|\.css$/,
      //   threshold: 10240,
      //   minRatio: 0.8
      // }),
      // new Visualizer({
      //   filename: "./dist/stats.html"
      // })
    ]
  };

  const umdProdConfig = Object.assign({}, base, {
    entry: getEntries(root, paths),
    output: {
      filename: "./dist/bundles/[name].umd.js",
      libraryTarget: "umd"
    }
  });

  const bundleProdConfig = Object.assign({}, base, {
    entry: getEntries(root, paths),
    output: {
      filename: "./dist/es2015/[name].js"
    }
  });

  const umdConfig = Object.assign({}, base, {
    entry: './src/index.tsx',
    output: {
      filename: "./dist/bundles/index.umd.js",
      libraryTarget: "umd"
    }
  });

  const bundleConfig = Object.assign({}, base, {
    entry: './src/index.tsx',
    output: {
      filename: "./dist/es2015/index.js"
    }
  });

  const testConfig = Object.assign({}, base, {
    entry: getEntries(root, testPaths),
    output: {
        filename: './dist/tests/[name].js'
    }
});

  if (!options.production) {
    return [umdConfig, bundleConfig, testConfig];
  } else {
    return [umdProdConfig, bundleProdConfig, testConfig];
  }
};
