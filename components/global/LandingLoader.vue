<template>
  <div id="landingLoader" class="loader pace" v-if="serverPending">
    <div class="loading-bar-animation">
      <span class="loading-bar-line">
        <span class="line"></span>
      </span>
    </div>
    <div class="loader__bg"></div>
    <div class="loader__bg2"></div>
    <!-- <div class="loader__rim">
      <span class="rim rim-1"></span>
      <span class="rim rim-2"></span>
      <span class="stuff stuff-5"></span>
    </div> -->
  </div>
</template>

<script lang="ts">
import { gsap } from 'gsap'
import * as st from '~/constants/storeType'
import { mapState, mapActions } from 'pinia'
import useGlobalStore from '@/store/index'
import { action as actionIndex } from '@/constants/store/index'
export default {
  name: 'LandingLoader',
  data() {
    return {
      serverPending: true,
      bodyCoverFadeOute_duration: 1200,
      bodyCoverFadeOute_delay: 400,
      page_load_animation_delay: 0,
      loadingtext: 0,
      loadingtextEnd: false,
    }
  },
  computed: {},
  watch: {
    isLoadingDone(newValue, oldValue) {
      const self = this as any
      document.body.style.overflow = ''
      window.scrollTo(0, 0)

      // 觸發loading結束動畫
      setTimeout(() => {
        window._body.classList.add(self.body_finished_class)
        self[actionIndex.SET_LOADINGANIMATIONDONE](true)
      }, self.page_load_animation_delay)
    },
    isloadingAnimationDone(newValue, oldValue) {
      const self = this as any
      // dom 畫面 & loading 全數結束
      window._body.classList.add(self.body_loadingfinished_class)
      setTimeout(() => {
        self.serverPending = false
      }, self.bodyCoverFadeOute_duration + self.bodyCoverFadeOute_delay)
    },
    screenWidthState: {
      async handler(newValue, oldValue) {
        const self = this as any
        if ((oldValue === null || !oldValue) && process.client) {
          if (await self.extraLoadListen()) {
            const sS_loadLanding = sessionStorage.getItem(st.st_loadLanding)
            if (self.isCrawler || self.isServerApiError || sS_loadLanding) {
              self[actionIndex.SET_PAGELOADDONE]()
            } else {
              const openAnimeTL = self.landingAnime()
              openAnimeTL.play().then(() => {
                self[actionIndex.SET_PAGELOADDONE]()
                sessionStorage.setItem(st.st_loadLanding, 'Y')
              })
            }

            // const openAnimeTL = self.landingAnime()
            // openAnimeTL.play().then(() => {
            //   self[actionIndex.SET_PAGELOADDONE]()
            // })
          }
        }
      },
      immediate: true,
    },
  },
  beforeCreate() {
    const self = this as any
  },
  created() {
    const self = this as any
    if (process.client) {
    }
  },
  mounted() {
    const self = this as any
    document.body.style.overflow = 'hidden'
    self.$setHtmlCssVar({
      '--loader_fadeout_dur': `${self.bodyCoverFadeOute_duration / 1000}s`,
      '--loader_fadeout_delay': `${self.bodyCoverFadeOute_delay / 1000}s`,
    })
  },
  methods: {
    ...mapActions(useGlobalStore, [
      `${actionIndex.SET_LOADINGANIMATIONDONE}`,
      `${actionIndex.SET_PAGELOADDONE}`,
    ]),
    //為此活動額外添加 等待主視覺banner圖片載入完成才結束loading cover
    async extraLoadListen() {
      const self = this as any
      let imgs = []
      // if (!self.$isMobile()) {
      //   imgs = [self.getCurentImgPath(`pc/model.png`)]
      // } else {
      //   imgs = [self.getCurentImgPath(`mb/model.png`)]
      // }
      const res = await self.loadImage(imgs)
      return res
    },
    landingAnime() {
      const self = this as any
      const _loader = document.getElementById('landingLoader')
      if (!_loader) return gsap.timeline({})

      const randomRadius = gsap.utils.random(20, 80, 0, true)
      const randomRotate = gsap.utils.random(-50, 50, 20, true)
      const randomScale = gsap.utils.random(0.7, 1, 0, true)
      const repeatRim = 0
      const repeatDelayRim = 0
      const durationRim = 0
      const durationStuff = (repeatDelayRim + durationRim) * repeatRim + 0.2

      let tl = gsap.timeline({}).to(
        { t: 0 },
        {
          t: 100,
          duration: 0.2,
        },
        0
      )
      tl.pause()
      return tl
    },
  },
}
</script>
