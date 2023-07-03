// 匯入 defineStore 的方法
import { defineStore } from 'pinia'
import { mediaQuery } from '@/constants/common'
import { CLASSNAME_DATA_FETCHING } from '@/constants/type/component'
import { action as actionIndex } from '@/constants/store/index'
import useGlobalStore from '~/store/index'
const state = () => ({
  isIndexpage: true, //是否為首頁
  metaInfo: null,
  isLoadingDone: null,
  screenWidth: null, // 偵測螢幕寬
  screenScroll: 0, // 偵測螢幕滾輪事件
  screenScrollDown: 0, // 偵測螢幕滾輪向下事件
  screenScrollUp: 0, // 偵測螢幕滾輪向上事件
  ScreenResize: 0, // 偵測視窗Resizing
  afterScreenResize: 0, // 偵測視窗afterResize
  screenScrollTouchDown: false, // 偵測螢幕滾輪是否觸底
  pagesLoadFinished: false, // 每次 router切換前為false ,router切換完成後觸發true
  pageTransitionAfterEnter: true,
  isloadingAnimationDone: false, // 開場動畫結束
  isLocomotiveScrollDone: false, // 第三方smooth scroll載入完成
  isYtApiDone: false, // youtube api 載入完成
  deviceBrowser: null,
  isPageFocus: true,
  pageLoading: false,
  baseUrl: null,
  mediaQuery,
  htmlCssVar: {},
})
const getters = {
  getStateS: (state) => state,
  htmlCssVarInline: (state) => {
    let cssInline = ''
    for (const key in state.htmlCssVar) {
      if (Object.prototype.hasOwnProperty.call(state.htmlCssVar, key)) {
        const value = state.htmlCssVar[key]
        cssInline += `${key}:${value};`
      }
    }
    const css = `html{${cssInline}}`
    return css
  },
}

const actions = {
  async nuxtServerInit({
    app,
    $pinia,
    params,
    req,
    redirect,
    error,
    query,
    $axios,
  }) {
    const self = this as any
  },

  [actionIndex.SET_PAGELOADDONE]() {
    // 第一次載入網站 for 開場動畫
    const self = this as any
    self.isLoadingDone = true
  },
  [actionIndex.SET_LOADINGANIMATIONDONE](value) {
    const self = this as any
    self.isloadingAnimationDone = value
  },
  [actionIndex.SET_LOCOMOTIVESCROLLDONE](value) {
    const self = this as any
    self.isLocomotiveScrollDone = value
  },
  [actionIndex.SET_PAGESLOADFINISHED](value) {
    const self = this as any
    self.pagesLoadFinished = value
  },
  [actionIndex.SET_PAGE_TRANSITION_AFTER_ENTER](value) {
    const self = this as any
    self.pageTransitionAfterEnter = value
  },
  [actionIndex.SET_INDEXPAGE](value) {
    const self = this as any
    self.isIndexpage = value
  },
  [actionIndex.SET_SCREENWIDTH](value) {
    const self = this as any
    self.screenWidth = value
  },
  [actionIndex.SET_SCREENSCROLL](value) {
    const self = this as any
    self.screenScroll = value
  },
  [actionIndex.SET_SCREENSCROLLDOWN](value) {
    const self = this as any
    self.screenScrollDown = value
  },
  [actionIndex.SET_SCREENSCROLLUP](value) {
    const self = this as any
    self.screenScrollUp = value
  },
  [actionIndex.SET_SCREENTOUCHDOWN](value) {
    const self = this as any
    self.screenScrollTouchDown = value
  },
  [actionIndex.SET_SCREENRESIZE]() {
    const self = this as any
    self.ScreenResize++
  },
  [actionIndex.SET_AFTERSCREENRESIZE]() {
    const self = this as any
    self.afterScreenResize++
  },
  [actionIndex.SET_PAGEFOCUS](value) {
    const self = this as any
    self.isPageFocus = value
  },
  [actionIndex.SET_PAGELOADING](value) {
    const self = this as any
    self.pageLoading = value
    if (typeof window !== 'undefined') {
      const className = CLASSNAME_DATA_FETCHING
      if (value) document.body.classList.add(className)
      else document.body.classList.remove(className)
    }
  },
  [actionIndex.SET_MEDIA](value) {
    const self = this as any
    for (const key in self.mediaQuery) {
      const obj = self.mediaQuery[key]
      obj.direction = value <= obj.width ? 'down' : 'up'
    }
  },
  [actionIndex.SET_MEDIATEMP](value) {
    const self = this as any
    for (const key in self.mediaQuery) {
      const obj = self.mediaQuery[key]
      if (value.firstLoad) obj.isChange = true
      else
        obj.isChange =
          obj.tempDirection !== '' && obj.tempDirection !== obj.direction
      obj.tempDirection = value.w <= obj.width ? 'down' : 'up'
    }
  },
  [actionIndex.SET_YTAPI_DONE](value) {
    const self = this as any
    self.isYtApiDone = value
  },
  [actionIndex.SET_HTMLCSSVAR](value) {
    const self = this as any
    self.htmlCssVar = { ...self.htmlCssVar, ...value }
  },
}
export default defineStore('globalStore', {
  // 對應 data
  state,
  // 對應 computed (物件形式)
  getters,
  // 對應 methods (物件形式)
  actions,
})
