module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  pwa: {
    name: 'MyWeather.fr',
    short_name: 'MyWeather',
    start_url: '/',
    display: 'standalone',
    themeColor: '#184287',
    msTileColor: '#222222',

    manifestOptions: {
      name: 'MyWeather.fr',
      short_name: 'MyWeather',
      start_url: '/',
      display: 'standalone',
      themeColor: '#184287',
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png?v=2',
      favicon16: 'img/icons/favicon-16x16.png?v=2',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png',
    }
  }
}
