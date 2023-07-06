<template>
  <div id="landingLoader" class="loader pace" v-if="serverPending">
    <div class="loading-bar-animation">
      <span class="loading-bar-line">
        <span class="line"></span>
      </span>
    </div>
    <div class="loader__bg"></div>
    <div class="loader__bg2"></div>
    <div class="loader__animeBox">
      <div class="logo-split-text">
        <span
          v-for="(item, index) in logoSplitText"
          :key="index"
          :class="[`logo-t-${index}`]"
          >{{ item }}</span
        >
        <span class="i-circle">
          <span class="i-circle-anime"></span>
        </span>
      </div>
    </div>
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
      bodyCoverFadeOute_delay: 300,
      page_load_animation_delay: 0,
      loadingtext: 0,
      loadingtextEnd: false,
      logoWord: 'DIGISALAD',
    }
  },
  computed: {
    logoSplitText() {
      const self = this as any
      return self.logoWord.split('')
    },
  },
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
            // if (self.isCrawler || self.isServerApiError || sS_loadLanding) {
            //   //self[actionIndex.SET_PAGELOADDONE]()
            // } else {
            //   const openAnimeTL = self.landingAnime()
            //   openAnimeTL.play().then(() => {
            //     self[actionIndex.SET_PAGELOADDONE]()
            //     sessionStorage.setItem(st.st_loadLanding, 'Y')
            //   })
            // }
            const done = () => {
              self[actionIndex.SET_PAGELOADDONE]()
            }
            const openAnimeTL = self.landingAnime(done)
            openAnimeTL.play()
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
    landingAnime(triggerEnd) {
      const self = this as any
      const ElemLoaderAnime = document.querySelector('.loader__animeBox')
      const _loader = document.getElementById('landingLoader')
      if (!_loader || !ElemLoaderAnime) return gsap.timeline({})

      const ElemLogoT0 = ElemLoaderAnime.querySelector('.logo-t-0')
      const ElemLogoT1 = ElemLoaderAnime.querySelector('.logo-t-1')
      const ElemLogoT2 = ElemLoaderAnime.querySelector('.logo-t-2')
      const ElemLogoT3 = ElemLoaderAnime.querySelector('.logo-t-3')
      const ElemLogoT4 = ElemLoaderAnime.querySelector('.logo-t-4')
      const ElemLogoT5 = ElemLoaderAnime.querySelector('.logo-t-5')
      const ElemLogoT6 = ElemLoaderAnime.querySelector('.logo-t-6')
      const ElemLogoT7 = ElemLoaderAnime.querySelector('.logo-t-7')
      const ElemLogoT8 = ElemLoaderAnime.querySelector('.logo-t-8')
      const ElemICircle = ElemLoaderAnime.querySelector('.i-circle')
      let tl = gsap.timeline({})
      tl.set([ElemICircle], {
        opacity: 0,
        scale: 1,
      })

      tl.to(
        [ElemICircle],
        {
          keyframes: {
            '0%': { opacity: 0 },
            '15%': { opacity: 1, y: '-160%' },
            '25%': { scale: 1.6 },
            '40%': { scale: 1 },
            '60%': { y: '350%' },
            '100%': { y: 0 },
          },
          duration: 1,
          //ease: '',
        },
        0
      )
        .to(
          [ElemLogoT3],
          {
            keyframes: {
              '0%': { scaleY: 1 },
              //'15%': { opacity: 1, y: '-20px' },
              '40%': { color: 'transparent' },
              '50%': { scaleY: 0.1, color: '#fff' },
              '75%': { scaleY: 1.1 },
              '100%': { scaleY: 1 },
            },
            duration: 0.9,
            //ease: '',
          },
          0.3
        )
        .to(
          [
            ElemLogoT0,
            ElemLogoT1,
            ElemLogoT2,
            ElemLogoT3,
            ElemLogoT4,
            ElemLogoT5,
            ElemLogoT6,
            ElemLogoT7,
            ElemLogoT8,
          ],
          {
            keyframes: {
              '0%': { y: 0 },
              '20%': { y: '50%', color: 'transparent', scaleY: 0.5 },
              '30%': { color: '#fff' },
              '50%': { y: '-30%', scaleY: 1 },
              '65%': { y: '20%' },
              '75%': { y: '-11%' },
              '82%': { y: '5%' },
              '100%': { y: '0%' },
              ease: 'power1.out',
            },
            ease: 'power1.in',
            //ease: 'elastic.out(1, 0.3)',
            stagger: {
              from: 3,
              each: 0.03,
              //ease: 'power1.in',
            },
            duration: 1.7,
            //ease: '',
          },
          0.55
        )
        .call(triggerEnd)
        .to(
          [
            ElemLogoT0,
            ElemLogoT1,
            ElemLogoT2,
            ElemLogoT3,
            ElemLogoT4,
            ElemLogoT5,
            ElemLogoT6,
            ElemLogoT7,
            ElemLogoT8,
          ],
          {
            keyframes: {
              '0%': { y: 0 },
              '30%': { y: '30%' },
              '100%': { y: '-500%', opacity: 0 },
              ease: 'power1.out',
            },
            ease: 'power1.out',
            stagger: {
              from: 4,
              each: 0.03,
              ease: 'power1.in',
            },
            duration: 1.7,
            //ease: '',
          },
          1.6
        )
        .to(
          [ElemICircle],
          {
            opacity: 0,
            scale: 0,
            ease: 'power1.out',
            duration: 1,
          },
          1.65
        )

      tl.pause()
      return tl
    },
  },
}
</script>
