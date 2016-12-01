// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
let baseUrl = 'http://www.sherlochao.com:9091/photosharing/';

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/memberapi/*': {
      //   target: baseUrl,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/memberapi/register': baseUrl + 'memberapi/register',
      //     '^/memberapi/updatePassword': baseUrl + 'memberapi/updatePassword',
      //     '^/memberapi/updateMember': baseUrl + 'memberapi/updateMember',
      //     '^/memberapi/findPassWord': baseUrl + 'memberapi/findPassWord'
      //   }
      // },
      // '/loginapi/*': {
      //   target: baseUrl,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/loginapi/login': baseUrl + 'loginapi/login',
      //     '^/loginapi/loginout': baseUrl + 'loginapi/loginout',
      //   }
      // },
      // '/sharedapi/*': {
      //   target: baseUrl,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/sharedapi/publishShared': baseUrl + 'sharedapi/publishShared',
      //     '^/sharedapi/sharedHide': baseUrl + 'sharedapi/sharedHide',
      //     '^/sharedapi/viewShared': baseUrl + 'sharedapi/viewShared',
      //     '^/sharedapi/viewCollect': baseUrl + 'sharedapi/viewCollect',
      //     '^/sharedapi/viewOwnShared': baseUrl + 'sharedapi/viewOwnShared',
      //     '^/sharedapi/searchShared': baseUrl + 'sharedapi/searchShared',
      //     '^/sharedapi/listOneMinuteShared': baseUrl + 'sharedapi/listOneMinuteShared'
      //   }
      // },
      // '/thumbsupapi/*': {
      //   target: baseUrl,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/thumbsupapi/thumbsUp': baseUrl + 'thumbsupapi/thumbsUp',
      //     '^/thumbsupapi/listThumbs': baseUrl + 'thumbsupapi/listThumbs'
      //   }
      // },
      // '/administratirapi/*': {
      //   target: baseUrl,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/administratirapi/authorityMember': baseUrl + 'administratirapi/authorityMember'
      //   }
      // },
      // '/favoritesapi/*': {
      //   target: baseUrl,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/favoritesapi/collect': baseUrl + 'favoritesapi/collect'
      //   }
      // },
      // '/commentapi/*': {
      //   target: baseUrl,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/commentapi/comment': baseUrl + 'commentapi/comment'
      //   }
      // },
      // '/thumbsupapi/listThumbs': {
      //   target: baseUrl + 'thumbsupapi/listThumbs',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/thumbsupapi/listThumbs': ''
      //   }
      // },
      // '/memberapi/register': {
      //   target: 'http://www.sherlochao.com:9091/photosharing/memberapi/register',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/memberapi/register': ''
      //   }
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
