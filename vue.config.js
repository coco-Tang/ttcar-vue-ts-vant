/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 20:06:40
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-12-11 13:51:02
 * @Description: vue配置项
 */
module.exports = {
  publicPath: "/",
  outputDir: "ttcar-dist",
  devServer: {
    proxy: {
      '/ttcar': {
        target: 'http://ttcar.gyytly.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/ttcar': ''
        }
      },
      '/car': {
        target: 'http://ttcar.gyytly.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/car': ''
        }
      },
      '/order': {
        target: 'http://ttcar.gyytly.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/order': ''
        }
      }
    }
  }
}