import Vue, { PropOptions } from 'vue'
import Flicking, { EVENTS } from '@egjs/flicking'
import { Arrow } from '@egjs/flicking-plugins'
import { NextOutlined, PrevOutlined } from '@/components/icons-ds'
const animationDuration = 1000
const flickingProjectsOptions = {
  align: 'prev',
  circular: true,
  disableInput: false,
  duration: 350,
  //easing: easing.easeInOutCubic,
  interruptable: true,
  moveType: ['strict', { count: 1 }],
  preventClickOnDrag: true,
} as any
export default Vue.extend({
  components: {
    NextOutlined,
    PrevOutlined,
  },
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
      ingradients: [
        {
          iconClass: 'i-ux-design',
          icon: 'icon-ux-design',
          name: 'UX Design',
          des: '',
          btnText: 'VIEW MORE',
        },
        {
          iconClass: 'i-ui-design',
          icon: 'icon-ui-design',
          name: 'UI Design',
          des: '',
          btnText: 'VIEW MORE',
        },
        {
          iconClass: 'i-web-dev',
          icon: 'icon-web-dev',
          name: 'website\r\ndevelopment',
          des: '',
          btnText: 'VIEW MORE',
        },
        {
          iconClass: 'i-mobileApp-dev',
          icon: 'icon-mobileApp-dev',
          name: 'mobile app\r\ndevelopment',
          des: '',
          btnText: 'VIEW MORE',
        },
        {
          iconClass: 'i-ecommerce',
          icon: 'icon-ecommerce',
          name: 'ecommerce',
          des: '',
          btnText: 'VIEW MORE',
        },
        {
          iconClass: 'i-customer-loyalty',
          icon: 'icon-customer-loyalty',
          name: 'customer loyalty',
          des: '',
          btnText: 'VIEW MORE',
        },
        {
          iconClass: 'i-digital-transformation',
          icon: 'icon-digital-transformation',
          name: 'digital\r\ntransformation',
          des: '',
          btnText: 'VIEW MORE',
        },
        {
          iconClass: 'i-degital-marketing',
          icon: 'icon-degital-marketing',
          name: 'digital\r\nmarketing',
          des: '',
          btnText: 'VIEW MORE',
        },
        {
          iconClass: 'i-branding',
          icon: 'icon-branding',
          name: 'BRANDING',
          des: '',
          btnText: 'BRANDING',
        },
      ],
      projects: [
        {
          bannerSrc: '/image/project-1.png',
          t1: 'HIGHLIGHTED SHOWCASE',
          name: 'LP CLUB MOBILE APP',
          des: '',
        },
        {
          bannerSrc: '/image/project-2.jpeg',
          t1: 'HIGHLIGHTED SHOWCASE',
          name: 'HOUSE OF BEAUTY',
          des: '',
        },
        {
          bannerSrc: '/image/project-3.jpg',
          t1: 'HIGHLIGHTED SHOWCASE',
          name: 'NEODERM - GRATUS APP & WEBSITE',
          des: '',
        },
        {
          bannerSrc: '/image/project-4.jpeg',
          t1: 'HIGHLIGHTED SHOWCASE',
          name: 'AEON NETMEMBER APP',
          des: '',
        },
      ],
      flickingProjects: null,
      flickingProjects_Arrow: null,
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
    self.initProjectsFlicking()
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
    //(banner)輪播套件-初始化
    initProjectsFlicking() {
      const self = this as any
      self.$nextTick(() => {
        setTimeout(() => {
          const el = document.querySelector(`#flicking-projects`) as HTMLElement
          if (!el) return
          self.flickingProjects = new Flicking(el, {
            ...flickingProjectsOptions,
          })
          //self.flickingKol.on(EVENTS.READY, self.onReady_Flicking)
          self.flickingProjectsPlugins().forEach((plugin) => {
            self.flickingProjects.addPlugins(plugin)
          })
        }, 1)
      })
    },
    flickingProjectsPlugins() {
      const self = this as any
      self.flickingProjects_Arrow = new Arrow({
        parentEl: document.querySelector(
          `#projects-slideContainer`
        ) as HTMLElement,
      })
      const plugins = [self.flickingProjects_Arrow]
      return plugins
    },
  },
})
