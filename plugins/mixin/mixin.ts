import Vue, { PropOptions } from 'vue'
import { media } from '@/constants/common'
import { mapState, mapActions } from 'pinia'
import { action as actionIndex } from '@/constants/store/index'
import useGlobalStore from '~/store/index'
import { CLASSNAME_HAS_SCROLL_SMOOTH } from '@/constants/type/component'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

if (!Vue.__global_mixin) {
  Vue.__global_mixin = true
  Vue.mixin({
    data() {
      return {
        body_finished_class: 'finished',
        body_loadingfinished_class: 'loading-finished',
      }
    },
    computed: {
      ...mapState(useGlobalStore, [
        'pageLoading',
        'pageTransitionAfterEnter',
        'isLoadingDone',
        'isloadingAnimationDone',
        'isLocomotiveScrollDone',
        'isIndexpage',
        'screenWidth',
        'mediaQuery',
        'deviceBrowser',
        'isPageFocus', // 偵測是否正在瀏覽網頁
      ]),
      ...mapState(useGlobalStore, {
        isPageLoadFinishedAfter: (state: any) =>
          state.isLoadingDone && state.pagesLoadFinished,
        screenScrollState: (state: any) => state.screenScroll, // 偵測螢幕滾輪事件
        screenScrollDownState: (state: any) => state.screenScrollDown, // 偵測螢幕滾輪向下事件
        screenScrollUpState: (state: any) => state.screenScrollUp, // 偵測螢幕滾輪向上事件
        screenScrollTouchDownState: (state: any) => state.screenScrollTouchDown, // 偵測螢幕滾輪觸底
        screenWidthState: (state: any) => state.screenWidth, // 偵測螢幕寬
        ScreenResizeState: (state: any) => state.ScreenResize, // 偵測螢幕寬
        afterScreenResizeState: (state: any) => state.afterScreenResize, // 偵測螢幕寬
      }),
      //has-scroll-smooth
      hasScrollSmooth() {
        const self = this as any
        return document.documentElement.classList.contains(
          CLASSNAME_HAS_SCROLL_SMOOTH
        )
      },
      //動態偵測目前處於何種media寬之下
      isMedia() {
        const self = this as any
        const isMb = self.$isMobile()
        let r = (current_width, lower_width) => {
          return self.screenWidthState && self.screenWidthState <= current_width
        }
        let data = {}
        for (const key in media) {
          if (Object.hasOwnProperty.call(media, key)) {
            const item = media[key]
            const aryKey = Object.keys(media)
            const current = aryKey.indexOf(key)
            const next = aryKey[current + 1]
            const lower_width = next ? media[next].width : 0
            data[item.name] = isMb || r(item.width, lower_width)
          }
        }
        return data
      },
    },
    watch: {},
    methods: {
      ...mapActions(useGlobalStore, [
        `${actionIndex.SET_PAGESLOADFINISHED}`,
        `${actionIndex.SET_PAGE_TRANSITION_AFTER_ENTER}`,
      ]),
      //注入css style :root --vh
      setVH() {
        const self = this as any
        const vh = window.innerHeight * 0.01
        self.$setHtmlCssVar({
          '--vh': `${vh}px`,
        })
      },
      // 等待所有圖片載入 urlList:array
      loadImage(urlList: any) {
        return new Promise((resolve, reject) => {
          const imageCount = urlList.length
          if (imageCount <= 0) resolve(true)

          let imagesLoadedSuccess = 0
          let imagesLoadedFail = 0
          for (let i = 0; i < imageCount; i++) {
            const image = new Image() as any
            image.onload = (elem: HTMLImageElement) => {
              imagesLoadedSuccess++
              if (imagesLoadedFail + imagesLoadedSuccess == imageCount) {
                resolve(true)
              }
            }
            image.onerror = (elem: HTMLImageElement) => {
              imagesLoadedFail++
              if (imagesLoadedFail + imagesLoadedSuccess == imageCount) {
                resolve(true)
              }
            }
            image.src = urlList[i]
          }
        })
      },
    },
    mounted() {},
  })
}
