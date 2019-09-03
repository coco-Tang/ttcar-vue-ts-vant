/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 20:06:40
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-08-29 20:20:56
 * @Description: vue配置项
 */
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  devServer: {
    proxy: {
      '/ttcar': {
        target: 'http://49.235.13.64:9032',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/ttcar': ''
        }
      },
    }
  }
}