const webpack = require('webpack');
const path = require('path');

const proxy_host = '103.248.13.91';

let env = process.env.NODE_ENV;

console.log(env);
let outputFile;
let scriptPath;

if (env === 'production') {
  outputFile = 'bundle.[name].min.js';
  scriptPath = 'https://cdn.bootcss.com';
} else {
  outputFile = 'bundle.[name].js';
  scriptPath = '/dev';
}

const HtmlwebpackPlugin = require('html-webpack-plugin');
let plugins = [
  new HtmlwebpackPlugin({
    title: 'This is test',
    filename: 'index.html', // this file will be generated.
    template: path.resolve(__dirname, 'src/index.ejs'),
    inject: 'body',
    vars: {
      "script_path": scriptPath,
    }
  }),

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),

  // 忽略 moment 的本地化内容
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
];

if (env === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ parallel: true })
  );

  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  plugins.push(
    new BundleAnalyzerPlugin()
  );
} else if (env === 'development') {

}

module.exports = {
  resolve: {
    extensions: ['.js', 'jsx', '.css'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  context: path.resolve(__dirname, 'src'),

  entry: {
    main: './index.js'
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: outputFile,
    publicPath: '/',
  },

  plugins: plugins,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'env', 'stage-2'],
              plugins: [
                ["import", { libraryName: "antd", style: true }]
              ]
            }
          }
        ],
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            }
          }
        ]
      },

      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },

      // {
      //   test: /\.(jpg|png|svg)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 5000
      //       }
      //     }
      //   ]
      // },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },

      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[hash].[ext]'
            }
          }
        ]

      }
    ]
  },

  devServer: {
    contentBase: [path.join(__dirname, "build")],
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    public: '127.0.0.1:9000',
    allowedHosts: ['0.0.0.0'],
    historyApiFallback: true,
    proxy: {
      '/os-identity': {
        target: 'http://' + proxy_host + ':5000',
        pathRewrite: {
          '/os-identity': ''
        }
      },
      '/os-compute': {
        target: 'http://' + proxy_host + ':8774',
        pathRewrite: {
          '/os-compute': ''
        }
      },
      '/os-image': {
        target: 'http://' + proxy_host + ':9292',
        pathRewrite: {
          '/os-image': ''
        }
      },
      '/os-volume': {
        target: 'http://' + proxy_host + ':8776',
        pathRewrite: {
          '/os-volume': ''
        }
      },
      '/os-network': {
        target: 'http://' + proxy_host + ':9696',
        pathRewrite: {
          '/os-network': ''
        }
      },
      '/os-monitor': {
        target: 'http://' + proxy_host + ':8086',
        pathRewrite: {
          '/os-monitor': ''
        },
        auth: 'collectd_read:collectd_read'
      }
    }
  },

  externals : {
    'lodash': '_',
    'moment': 'moment',
    'echarts': 'echarts',
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
  },

  devtool: 'source-map'
};