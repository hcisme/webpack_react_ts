// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-[chunkhash:5].js',
    publicPath: '/'
  },
  devServer: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      title: 'Webpack React App'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/']
      },
      { test: /\.(js)|(jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.less$/i,
        use: [
          stylesHandler,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [
          stylesHandler,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'static/[name]-[hash:5].[ext]',
              esModule: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  stats: {
    modules: false,
    assets: false
  }
};

module.exports = (env) => {
  if (isProduction) {
    config.mode = 'production';
    config.optimization = {
      splitChunks: {
        //分包配置
        chunks: 'all',
        cacheGroups: {
          styles: {
            minSize: 0,
            test: /\.css$/,
            minChunks: 2
          }
        }
      }
    };
    config.plugins.push(new CleanWebpackPlugin());
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name]-[hash:5].css',
        chunkFilename: 'css/common.[hash:5].css' // 针对公共样式的文件名
      })
    );
  } else {
    config.mode = 'development';
  }
  return config;
};
