import Vue, { PropOptions } from 'vue'
import { IframeHTMLAttributes } from 'vue/types/jsx'
export default Vue.extend({
  components: {},
  asyncData({ app, store, params, query, route }) {
    return {}
  },
  data() {
    return {
      bannerEmbedId: '8_4JRK4QkqU',
      aboutEmbedId: 'IeIRJ9jZ5Ro',
      bannerVideoId: 'digiSalad_brand_yt',
      aboutVideoId: 'digiSalad_about_yt',
      bannerYtPlayer: null,
      aboutYtPlayer: null,
      aboutYtPlaying: false,
    }
  },
  head() {
    return {}
  },
  computed: {
    //偵測是否可以載入 youtube video
    canLoadYtVideo() {
      const self = this as any
      return self.isYtApiDone
    },
  },
  watch: {
    $route(to, from) {
      const self = this as any
    },
    ScreenResizeState() {
      const self = this as any
      self.setVideoWidth()
    },
    afterScreenResizeState() {
      const self = this as any
      self.setVideoWidth()
    },
    canLoadYtVideo: {
      handler(newValue) {
        const self = this as any
        if (newValue) {
          setTimeout(() => {
            self.createBannerYtPlay()
            self.createAboutYtPlay()
          }, 100)
        }
      },

      immediate: true,
    },
  },
  created() {
    const self = this as any
  },
  mounted() {
    const self = this as any
  },
  methods: {
    //create youtube video api
    createBannerYtPlay() {
      const self = this as any
      if (!window.YT) return
      self.$nextTick(() => {
        self.bannerYtPlayer = new window.YT.Player(`${self.bannerVideoId}`, {
          height: '720',
          width: '1280',
          videoId: self.bannerEmbedId,
          host: 'https://www.youtube-nocookie.com',
          playerVars: {
            widgetid: 1,
            autoplay: 1,
            branding: 0,
            controls: 0,
            enablejsapi: 1,
            loop: 1,
            mute: 1,
            playlist: self.bannerEmbedId,
            rel: 0,
            showinfo: 0,
            modestbranding: 0,
          },
          events: {
            onReady: self.onBannerYTPlayerReady,
            //   onStateChange: self.onYTPlayerStateChange,
          },
        })
      })
    },
    //youtube player ready
    onBannerYTPlayerReady(event) {
      const self = this as any
      self.setVideoWidth()

      //banner animation start
      self.bannerAnimation()
    },
    //create youtube video api
    createAboutYtPlay() {
      const self = this as any
      if (!window.YT) return
      self.$nextTick(() => {
        self.aboutYtPlayer = new window.YT.Player(`${self.aboutVideoId}`, {
          height: '720',
          width: '1280',
          videoId: self.aboutEmbedId,
          host: 'https://www.youtube-nocookie.com',
          playerVars: {
            widgetid: 1,
            autoplay: 0,
            branding: 0,
            controls: 1,
            enablejsapi: 1,
            loop: 1,
            mute: 0,
            playlist: self.aboutEmbedId,
            rel: 0,
            showinfo: 0,
            modestbranding: 0,
          },
          events: {
            //onReady: self.onYTPlayerReady,
            onStateChange: self.onAboutYTPlayerStateChange,
          },
        })
      })
    },
    playAboutVideo() {
      const self = this as any
      //撥放
      self.aboutYtPlayer.playVideo()
    },
    onAboutYTPlayerStateChange(event) {
      const self = this as any
      /**
       * -1:尚未開始
       * 0:已結束
       * 1:播放中
       * 2:已暫停
       * 3:緩衝處理中
       * 5:提示的影片
       */
      switch (event.data) {
        case 1: //播放中
          self.aboutYtPlaying = true
          break
        case 2: //已暫停
          self.aboutYtPlaying = false
          console.warn(222)
          break
        default:
          break
      }
    },
    //計算banner影片size
    setVideoWidth() {
      const self = this
      try {
        const v = document.querySelector(
          `#${self.bannerVideoId}`
        ) as HTMLElement
        const v_w = 1280 //影片原始-寬
        const v_h = 720 //影片原始-高
        const enlarge_rate = 1 //放大比例
        const cHeightRate = v_h / v_w
        const w_w = window.OB_STATIC.GetWindowWidth()
        const w_h = window.OB_STATIC.GetWindowHeight()
        if (w_h / w_w < cHeightRate) {
          const h = (w_w / v_w) * v_h
          v['width'] = `${w_w * enlarge_rate}`
          v['height'] = `${h * enlarge_rate}`
        } else {
          const w = (w_h / v_h) * v_w
          v['width'] = `${w * enlarge_rate}`
          v['height'] = `${w_h * enlarge_rate}`
        }
      } catch (error) {}
    },
    bannerAnimation() {
      const self = this as any
      setTimeout(() => {
        const v = document.querySelector(
          `section.banner .video-wrap`
        ) as HTMLElement
        v.classList.add('loaded')
      }, 100)
    },
  },
})
