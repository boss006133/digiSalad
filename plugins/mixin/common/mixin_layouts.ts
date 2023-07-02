import { mapState, mapActions } from 'pinia'
import useGlobalStore from '~/store/index'
import { action as actionIndex } from '@/constants/store/index'
import {
  Header,
  Nav,
  LocomotiveScroll,
  LandingLoader,
} from '@/components/global'
export default {
  components: {
    Header,
    PopupNav: Nav,
    LocomotiveScroll,
    LandingLoader,
  },
  data() {
    return {
      uaMobile: process.env.UA_MOBILE,
      uaPc: process.env.UA_PC,
      showCrumbs: false,
    }
  },
  head() {
    return {}
  },
  computed: {
    ...mapState(useGlobalStore, ['htmlCssVarInline']),
  },
  watch: {
    isPageLoadFinishedAfter(newValue) {
      const self = this as any
      if (newValue) {
      }
    },
    afterScreenResizeState() {
      const self = this as any
    },
    isLocomotiveScrollDone(newValue, oldValue) {
      const self = this as any
      if (newValue) {
        self.$nextTick(() => {
          // 監聽滾輪
          window.LocomotiveScroll &&
            window.LocomotiveScroll.on('scroll', (instance) => {
              const isDown = instance.direction === 'down'
              let scrollY = instance.scroll.y
              self[actionIndex.SET_SCREENSCROLL](scrollY)

              if (isDown) {
                self[actionIndex.SET_SCREENSCROLLDOWN](scrollY)
              } else {
                self[actionIndex.SET_SCREENSCROLLUP](scrollY)
              }
              const bodyHeight = window.LocomotiveScroll.scroll.el.clientHeight
              const limitY = !self.hasScrollSmooth
                ? bodyHeight - window.innerHeight
                : instance.limit.y

              if (scrollY + 50 >= limitY) {
                self[actionIndex.SET_SCREENTOUCHDOWN](true)
              } else {
                self[actionIndex.SET_SCREENTOUCHDOWN](false)
              }
            })
        })
      }
    },
    pageTransitionAfterEnter: {
      handler(newValue) {
        const self = this as any
      },
      immediate: true,
    },
    $route(to, from) {
      const self = this as any
    },
  },
  created() {
    const self = this as any

    if (process.client) {
    }
  },
  beforeMount() {
    const self = this as any
    //為全站最外框產生第三方套件smooth scrollbar
    self.createLocomotiveScroll()
  },
  mounted() {
    const self = this as any

    //為全站最外框產生第三方套件smooth scrollbar
    //self.createLocomotiveScroll()

    let resizeTimer
    const g_w = window.OB_STATIC.GetWindowWidth()
    let windowWidth = window.OB_STATIC.GetWindowWidth()
    let windowHeight = window.OB_STATIC.GetWindowHeight()
    // 監聽media query寬度分界切換事件
    self[actionIndex.SET_MEDIATEMP]({ w: g_w, firstLoad: true })
    self[actionIndex.SET_SCREENWIDTH](g_w)
    self.setVH()

    window.addEventListener('resize', function () {
      const s = window.OB_STATIC.GetWindowWidth()
      clearTimeout(resizeTimer)
      self.setVH()
      if (
        window.OB_STATIC.GetWindowWidth() !== windowWidth ||
        window.OB_STATIC.GetWindowHeight() !== windowHeight
      ) {
        windowWidth = window.OB_STATIC.GetWindowWidth()
        // 監聽視窗width
        self[actionIndex.SET_SCREENWIDTH](s)
        // 監聽視窗resize
        self[actionIndex.SET_SCREENRESIZE]()

        // 監聽media query寬度分界切換事件
        self[actionIndex.SET_MEDIA](s)
        resizeTimer = setTimeout(() => {
          const w = window.OB_STATIC.GetWindowWidth()
          // 監聽media query寬度分界切換事件
          self[actionIndex.SET_MEDIATEMP]({ w, firstLoad: false })
          // 監聽視窗after resize
          self[actionIndex.SET_AFTERSCREENRESIZE]()
        }, 300)
      }
    })

    // 監聽是否正在瀏覽網頁
    window.onpagehide = window.onblur = () => {
      self.setPageFocus(false)
    }
    window.onpageshow = window.onfocus = () => {
      self.setPageFocus(true)
    }
  },
  methods: {
    ...mapActions(useGlobalStore, [
      `${actionIndex.SET_SCREENTOUCHDOWN}`,
      `${actionIndex.SET_SCREENSCROLLUP}`,
      `${actionIndex.SET_SCREENSCROLLDOWN}`,
      `${actionIndex.SET_SCREENSCROLL}`,
      `${actionIndex.SET_AFTERSCREENRESIZE}`,
      `${actionIndex.SET_LOCOMOTIVESCROLLDONE}`,
      `${actionIndex.SET_PAGEFOCUS}`,
      `${actionIndex.SET_MEDIA}`,
      `${actionIndex.SET_MEDIATEMP}`,
      `${actionIndex.SET_SCREENWIDTH}`,
      `${actionIndex.SET_SCREENRESIZE}`,
    ]),
    createLocomotiveScroll() {
      const self = this as any
      const el = document.querySelector('[data-scroll-container]') as Element
      new ResizeObserver(() => self.$LocomotiveScrollUpdate()).observe(el)
      window.LocomotiveScroll = new self.$LocomotiveScroll({
        el,
        smooth: true,
        getDirection: true,
        getSpeed: true,
        // lerp: 0.1,
        // touchMultiplier: 5,
        // tablet: { smooth: true },
        // smartphone: { smooth: true },
        //resetNativeScroll: false,
        //reloadOnContextChange: true,
      })
      self[actionIndex.SET_LOCOMOTIVESCROLLDONE](true)
    },
    setHtmlUaClassNmae() {
      const self = this as any
      if (self.$isPc()) {
        document.documentElement.classList.add(self.uaPc)
        document.documentElement.classList.remove(self.uaMobile)
      } else {
        document.documentElement.classList.add(self.uaMobile)
        document.documentElement.classList.remove(self.uaPc)
      }
    },
  },
}
