module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/component',
        'network': '@/network',
        'views': '@/views'
      },
    },
  },

  lintOnSave: false,



}
