/*
 * @Author: your name
 * @Date: 2020-12-07 10:50:10
 * @LastEditTime: 2021-08-10 13:49:46
 * @LastEditors: zaqvil
 * @Description: In User Settings Edit
 * @FilePath: \cli\vuecli-template\vue.config.js
 */
const path = require('path')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)$/i

const Dev = process.env.NODE_ENV !== 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: Dev ? '/' : './',
  chainWebpack: (config) => {
    config.entry('main').add('babel-polyfill')
    // 设置别名
    config.resolve.alias.set('@$', resolve('src'))
  },
  configureWebpack: (config) => {
    const plugins = []
    if (!Dev) {
      plugins.push(
        // 使用 compression-webpak-plugin 生成gzip
        new CompressionWebpackPlugin()
        // 配置项
        // new CompressionWebpackPlugin({
        //   filename: '[path].gz[query]', // 结果资源名称
        //   algorithm: 'gzip',
        //   test: productionGzipExtensions, // 处理匹配此正则的资源
        //   threshold: 10240, // 只有字节大于这个值的资源才会处理
        //   minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        // })
      )
    }

    config.plugins = [...config.plugins, ...plugins]
  },
  devServer: {
    hot: true,
    open: true, // 本地运行自动打开
    proxy: { // 使用反向代理
      '/api': {
        target: 'http://192.168.0.1:80',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
