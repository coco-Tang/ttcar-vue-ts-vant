/*
 * @Author: coco-Tang
 * @Date: 2019-08-29 20:06:40
 * @LastEditors: coco-Tang
 * @LastEditTime: 2019-09-11 13:47:52
 * @Description: vue配置项
 */
module.exports = {
  publicPath: "/",
  outputDir: "ttcar-dist",
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