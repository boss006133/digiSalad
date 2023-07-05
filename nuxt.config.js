const env = require('dotenv').config()
const isLocalhost = process.env.NODE_ENV === 'development'
export default {
  ssr: true,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DigiSalad',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=5',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/wel8ibk.css' },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css 
  css: ['@/assets/css/global'],
  styleResources: {
    scss: [
      '~/assets/css/variables.scss',
      '~/assets/css/methods.scss',
      '~/assets/css/mixins/index.scss',
    ],
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/inject/index' },
    { src: '~/plugins/nuxt-server-init.server' },
    { src: '~/plugins/inject/popup' },
    { src: '~/plugins/third-party/youtubeApi.client' },
    { src: '~/plugins/third-party/locomotiveScroll.client' }, // https://github.com/locomotivemtl/locomotive-scroll
    { src: '~/plugins/obStatic', mode: 'client' },
    { src: '~/plugins/mixin/mixin' },
    { src: '~/plugins/mixin/common/mixin_transition' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-esbuild',
    // https://go.nuxtjs.dev/typescript
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true, //在不同的程序中启用 TypeScript 的类型检查
        ignoreNotFoundWarnings: true,
      },
    ],
    '@nuxtjs/device',
    '@nuxtjs/composition-api/module',
    [
      '@pinia/nuxt',
      {
        disableVuex: true,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios', //https://go.nuxtjs.dev/axios
    '@nuxtjs/google-fonts', //https://google-fonts.nuxtjs.org/
    'nuxt-user-agent', //https://www.npmjs.com/package/nuxt-user-agent
  ],
  device: {
    refreshOnResize: true,
  },
  googleFonts: {
    families: {
      // Cardo: {
      //   wght: [400],
      // },
      // 'Noto+Sans+TC': {
      //   wght: [100, 300, 400, 500],
      // },
      // Poppins: {
      //   // weights
      //   wght: [200, 300, 400, 500, 600],
      //   // italic
      //   ital: [200],
      // },
    },
    display: 'swap',
    prefetch: true,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    cssSourceMap: true,
    // extractCSS: {
    //   ignoreOrder: true,
    // },
    splitChunks: {
      chunks: 'all',
      pages: true,
      vendor: true,
      commons: true,
      runtime: true,
      layouts: true,
      maxSize: 244000,
      cacheGroups: {
        vendor: {
          name: 'node_vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          maxSize: 244000,
        },
      },
    },
    optimization: {
      runtimeChunk: true,
      minimize: !isLocalhost,
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        // name: false,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    //parallel: true,
    plugins: [],
    loaders: {
      vue: {
        prettify: false,
      },
      scss: {
        additionalData: `$uaMobile:'${env.parsed.UA_MOBILE}';$uaPc:'${env.parsed.UA_PC}';`,
      },
    },
    extend(config, { isDev, loaders, isClient }) {
      if (!isDev) {
        config.performance = {
          maxEntrypointSize: 50000000,
          maxAssetSize: 30000000,
          assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js')
          },
        }
      }
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      })
    },
    transpile: ['pathe/dist/index.cjs', 'gsap'],
    'html.minify': {
      collapseBooleanAttributes: true,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      trimCustomFragments: true,
      useShortDoctype: true,
      minifyURLs: true,
      removeComments: true,
      removeEmptyElements: true,
    },
  },
  env: {
    ...env.parsed,
  },
}
