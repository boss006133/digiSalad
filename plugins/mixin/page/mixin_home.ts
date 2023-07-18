import Vue, { PropOptions } from 'vue'
import { gsap } from 'gsap'
import Flicking, { EVENTS, DIRECTION } from '@egjs/flicking'
import { Arrow } from '@egjs/flicking-plugins'
import { NextOutlined, PrevOutlined } from '@/components/icons-ds'
const animationDuration = 1000
const flickingProjectsOptions = {
  align: 'prev',
  circular: true,
  disableInput: false,
  duration: 800,
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
      flickingProjectsCurrent: 0,
      flickingProjectsDirection: '',
      bannerAnimeDone: false,
      LOCO_FADEUP: 'locoFadeUp',
      projectsObject: null,
    }
  },
  head() {
    return {}
  },
  computed: {
    //偵測是否可以載入 youtube video
    canLoadYtVideo() {
      const self = this as any
      // return self.isYtApiDone && self.bannerAnimeDone
      return self.isYtApiDone
    },
  },
  watch: {
    $route(to, from) {
      const self = this as any
    },
    isloadingAnimationDone() {
      const self = this as any
      //banner 進場動畫
      const tl_banner = self.banner_AnimeStart()
      tl_banner.play()
      tl_banner.then(() => {
        self.bannerAnimeDone = true
      })
    },
    ScreenResizeState() {
      const self = this as any
      //reset banner video size
      self.setVideoWidth()
    },
    afterScreenResizeState() {
      const self = this as any
      //reset banner video size
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
    self.$nextTick(() => {
      self.setProjectsObject()
    })
    self.initProjectsFlicking()
    self.initLocoScrollAnime()
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
          host: 'https://www.youtube.com',
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
          break
        default:
          break
      }
    },
    //calculate banner video size
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
          //self.flickingProjects.on(EVENTS.READY, self.onReady_Flicking)
          self.flickingProjects.on(
            EVENTS.WILL_CHANGE,
            self.onWillChanged_Flicking
          )
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
    onWillChanged_Flicking(e) {
      const self = this as any
      const direction = e.direction
      const currentIndex = e.index
      self.flickingProjectsDirection = direction
      const tl_end = self.onChanged_Project_AnimeEnd()
      tl_end.play()
      tl_end.then(() => {
        self.flickingProjectsCurrent = currentIndex
        self.setProjectsObject()
        self.$nextTick(() => {
          const tl_start = self.onChanged_Project_AnimeStart()
          tl_start.play()
        })
      })
    },
    setProjectsObject() {
      const self = this as any
      self.projectsObject = self.projects[self.flickingProjectsCurrent]
    },
    //project切換-動畫start
    onChanged_Project_AnimeStart() {
      const self = this as any
      const ElemBg = self.$refs.galleryComp.querySelector('.project-bg')
      const ElemT1 = self.$refs.galleryComp.querySelector('.t1Box')
      const ElemName = self.$refs.galleryComp.querySelector('.nameBox')
      const ElemNameUnderLine = ElemName.querySelector('.ds-anime-title .text')
      const ElemNameDot = ElemName.querySelector('.ds-anime-title .dot')
      const ElemDes = self.$refs.galleryComp.querySelector('.desBox')
      const ElemBtn = self.$refs.galleryComp.querySelector('.btnBox .ds-button')
      const ease = 'power2.inOut'
      const d = self.flickingProjectsDirection === DIRECTION.NEXT ? 1 : -1
      const x_dis = 15 * d
      const tl_start = gsap.timeline({ paused: true })
      tl_start
        .set([ElemNameDot], {
          opacity: 0,
          x: '-200%',
        })
        .set([ElemNameUnderLine], {
          backgroundSize: '0 6px',
        })
        .set([ElemBg], {
          opacity: 0,
        })
        .set([ElemT1, ElemName, ElemDes, ElemBtn], {
          opacity: 0,
          x: `${x_dis}%`,
        })
      tl_start
        .to(
          [ElemBg],
          {
            opacity: 1,
            duration: 1,
            ease,
          },
          0
        )
        .to(
          [ElemName, ElemT1, ElemDes, ElemBtn],
          {
            opacity: 1,
            x: '0%',
            ease,
            stagger: {
              ease: 'power1.in',
              each: 0.1,
            },
          },
          0
        )
        .to(
          [ElemNameUnderLine],
          {
            backgroundSize: '100% 6px',
            duration: 1,
            ease: 'power3.inOut',
          },
          0
        )
        .to(
          [ElemNameDot],
          {
            opacity: 1,
            x: '0',
            duration: 0.4,
            ease,
          },
          0.5
        )

      return tl_start
    },
    //project切換-動畫end
    onChanged_Project_AnimeEnd() {
      const self = this as any
      const ElemBg = self.$refs.galleryComp.querySelector('.project-bg')
      const ElemT1 = self.$refs.galleryComp.querySelector('.t1Box')
      const ElemName = self.$refs.galleryComp.querySelector('.nameBox')
      const ElemDes = self.$refs.galleryComp.querySelector('.desBox')
      const ElemBtn = self.$refs.galleryComp.querySelector('.btnBox .ds-button')
      const duration = 0.25
      const d = self.flickingProjectsDirection === DIRECTION.NEXT ? -1 : 1
      const x_dis = 15 * d
      const ease = 'power2.inOut'
      const tl_start = gsap.timeline({ paused: true })
      tl_start
        .to(
          [ElemBg],
          {
            opacity: 0,
            duration,
            ease,
          },
          0
        )
        .to(
          [ElemT1, ElemName, ElemDes, ElemBtn],
          {
            opacity: 0,
            x: `${x_dis}%`,
            duration,
            ease,
          },
          0
        )

      return tl_start
    },
    //banner進場-動畫start
    banner_AnimeStart() {
      const self = this as any
      const ElemBanner = self.$refs.banner
      const bannerRect = ElemBanner.getBoundingClientRect()
      const ElemLogo = ElemBanner.querySelector('.logo')
      const ElemP1 = ElemBanner.querySelector('.p-1')
      const ElemP2 = ElemBanner.querySelector('.p-2')
      const ElemP3 = ElemBanner.querySelector('.p-3')
      const ElemP3UnderLine = ElemP3.querySelector('.ds-anime-title .text')
      const ElemP3Dot = ElemP3.querySelector('.ds-anime-title .dot')
      const ElemAgency = ElemBanner.querySelector('.agency')
      const ElemTasteUsNow = ElemBanner.querySelector('.tasteUsNow')
      const ElemLineScroll = ElemBanner.querySelector('.line-scroll')
      const ElemBgCover = ElemBanner.querySelector('.bg-cover__container')
      const bg_animeDis = bannerRect.height * 0.15
      const p_animeDis = bannerRect.height * 0.1
      const ease = 'power2.inOut'
      const tl_start = gsap.timeline({ paused: true })
      tl_start
        .set([ElemAgency, ElemTasteUsNow, ElemLineScroll], {
          opacity: 0,
        })
        .set([ElemTasteUsNow, ElemLineScroll], {
          y: '20%',
        })
        .set([ElemBgCover], {
          y: bg_animeDis,
        })
        .set([ElemLogo, ElemP1, ElemP2, ElemP3], {
          opacity: 0,
          y: p_animeDis,
          z: '-30px',
          rotateX: '-42deg',
        })
        .set([ElemP3Dot], {
          opacity: 0,
          x: '-200%',
        })
        .set([ElemP3UnderLine], {
          backgroundSize: '0 8px',
        })
      tl_start
        .to(
          [ElemBgCover],
          {
            y: '0',
            duration: 1.5,
            ease,
          },
          0
        )
        .to(
          [ElemLogo, ElemP1, ElemP2, ElemP3],
          {
            y: '0',
            z: '0',
            rotateX: '0deg',
            opacity: 1,
            duration: 1.5,
            ease,
            stagger: {
              ease: 'power1.in',
              each: 0.1,
            },
          },
          0.2
        )
        .to(
          [ElemP3UnderLine],
          {
            backgroundSize: '100% 8px',
            duration: 1.5,
            ease: 'power3.inOut',
          },
          0.7
        )
        .to(
          [ElemP3Dot],
          {
            opacity: 1,
            x: '0',
            duration: 0.8,
            ease,
          },
          1.2
        )
        .to(
          [ElemAgency, ElemTasteUsNow, ElemLineScroll],
          {
            opacity: 1,
            y: '0',
            duration: 1.5,
            ease,
          },
          1.4
        )

      return tl_start
    },
    initLocoScrollAnime() {
      const self = this as any
      const tl_banner = self.banner_AnimeScroll()
      //tl_banner.seek(5)
      window.LocomotiveScroll.on('scroll', (args) => {
        // Get all current elements : args.currentElements
        const banner = 'banner'
        const speed = args.speed
        if (typeof args.currentElements[banner] === 'object') {
          const progress = args.currentElements[banner].progress
          // console.warn('progress', progress)
          // ouput log example: 0.34
          // gsap example : myGsapAnimation.progress(progress);
          tl_banner.progress(progress)
        }
      })
    },
    banner_AnimeScroll() {
      const self = this as any
      const ElemBanner = self.$refs.banner
      const bannerRect = ElemBanner.getBoundingClientRect()
      const ElemLogo = ElemBanner.querySelector('.logo')
      const ElemP1 = ElemBanner.querySelector('.p-1')
      const ElemP2 = ElemBanner.querySelector('.p-2')
      const ElemP3 = ElemBanner.querySelector('.p-3')
      const ElemP3UnderLine = ElemP3.querySelector('.ds-anime-title .text')
      const ElemP3Dot = ElemP3.querySelector('.ds-anime-title .dot')
      const ElemBgCover = ElemBanner.querySelector('.bg-cover__container')
      const ElemBgChildItems = ElemBanner.querySelectorAll(
        '.bg-cover__container > *'
      )
      const p_animeDis = bannerRect.height * 0.4
      const p_animeDisD = bannerRect.height * 0.2
      const ease = 'power2.out'
      const tl_start = gsap.timeline({ paused: true })
      tl_start
        .to(
          [ElemLogo],
          {
            y: '100%',
            opacity: 0,
            duration: 1,
            ease: 'none',
          },
          0
        )
        .to(
          [ElemP1, ElemP2, ElemP3],
          {
            opacity: 0,
            y: (index, target, targets) => {
              //function-based value
              return `${index * p_animeDisD + p_animeDis}px`
            },
            duration: 1.5,
            ease: 'none',
          },
          0
        )
        .to(
          [ElemP3UnderLine],
          {
            backgroundSize: '0% 8px',
            duration: 1.5,
            ease: 'none',
          },
          0
        )
        .to(
          [ElemP3Dot],
          {
            opacity: 1,
            x: '-200%',
            duration: 0.8,
            ease: 'none',
          },
          0
        )
        .to(
          [ElemBgCover],
          {
            borderBottomLeftRadius: '50px',
            borderBottomRightRadius: '50px',
            transformOrigin: '50% 100%',
            y: '-100px',
            scale: 0.9,
            duration: 1.5,
            ease: 'power1.out',
          },
          0.5
        )
        .to(
          [ElemBgChildItems],
          {
            y: '50%',
            duration: 1.5,
            ease: 'none',
          },
          0.5
        )

      return tl_start
    },
    scrollToTaste() {
      const self = this as any
      const target = document.querySelector('section.aboutDigiSalad')
      window.LocomotiveScroll.scrollTo(target)
    },
  },
})
