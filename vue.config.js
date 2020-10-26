module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/component',
        'network': '@/network',
        'views': '@/views',
        'plugins':'@/plugins'
      },
    },
  },

  lintOnSave: false,



}
