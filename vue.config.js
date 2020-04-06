const path = require('path')
// const pxtorem = require('postcss-pxtorem')

const port = process.env.port || process.env.npm_config_port || 8080
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // pages: {
  //   index: {
  //     entry: 'src/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //     title: entryName
  //   }
  // }, 
  publicPath: IS_PRODUCTION ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !!IS_PRODUCTION,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // requireModuleExtension: false,
    // loaderOptions: {
    //   postcss: {
    //     plugins: [
    //       pxtorem({
    //         rootValue: 37.5,
    //         propList: ['*']
    //       })
    //     ]
    //   },
    //   sass: {
    //     prependData: `
    //     @import "@/assets/css/tools/index.scss";
    //     ` // 全局引入
    //   }
    // }
  }
}
