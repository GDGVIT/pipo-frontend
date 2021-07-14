module.exports = {
  pwa: {
    name: 'PiPo',
    themeColor: '#090B31',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#090B31',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './firebase-messaging-sw.js'
    }
  }
}
