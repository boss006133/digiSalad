<template>
  <div id="landingLoader" class="loader pace" v-if="serverPending">
    <div class="loading-bar-animation">
      <span class="loading-bar-line">
        <span class="line"></span>
      </span>
    </div>
    <div class="loader__bg"></div>
    <div class="loader__rim">
      <span class="rim rim-1"></span>
      <span class="rim rim-2"></span>
      <span class="stuff stuff-5"></span>
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
      bodyCoverFadeOute_duration: 250,
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
      //window._body.classList.add(self.body_loadingfinished_header_class)

      setTimeout(() => {
        self.serverPending = false
      }, self.bodyCoverFadeOute_duration)
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
      if (!_loader) return
      const _rim = _loader.querySelectorAll('.rim')
      const _stuff = _loader.querySelectorAll('.stuff')

      const randomRadius = gsap.utils.random(20, 80, 0, true)
      const randomRotate = gsap.utils.random(-50, 50, 20, true)
      const randomScale = gsap.utils.random(0.7, 1, 0, true)
      const repeatRim = 0
      const repeatDelayRim = 0
      const durationRim = 0
      const durationStuff = (repeatDelayRim + durationRim) * repeatRim + 0.2

      gsap.set([_rim], {
        scale: 0.3,
        borderTopLeftRadius: () => {
          return `${randomRadius()}%`
        },
        borderTopRightRadius: () => {
          return `${randomRadius()}%`
        },
        borderBottomLeftRadius: () => {
          return `${randomRadius()}%`
        },
        borderBottomRightRadius: () => {
          return `${randomRadius()}%`
        },
      })
      gsap.set(_stuff, {
        opacity: 0,
        scale: 0.7,
      })
      let tl = gsap
        .timeline({})
        .to(
          _rim,
          {
            scale: 1,
            opacity: 1,
            duration: 0.2,
          },
          0
        )
        .to(
          _rim,
          {
            rotate: () => {
              return `${randomRotate()}deg`
            },
            scale: () => {
              return `${randomScale()}`
            },
            duration: durationRim,
            repeat: repeatRim,
            repeatRefresh: true,
            repeatDelay: repeatDelayRim,
            ease: 'linear',
          },
          0
        )
        .to(
          _rim,
          {
            borderTopLeftRadius: () => {
              return `${randomRadius()}% ${randomRadius()}%`
            },
            borderTopRightRadius: () => {
              return `${randomRadius()}%`
            },
            borderBottomLeftRadius: () => {
              return `${randomRadius()}% ${randomRadius()}%`
            },
            borderBottomRightRadius: () => {
              return `${randomRadius()}%`
            },
            duration: durationRim,
            repeat: repeatRim,
            repeatRefresh: true,
            repeatDelay: repeatDelayRim,
            ease: 'linear',
          },
          0
        )
        .to(_rim, {
          borderTopLeftRadius: () => {
            return `50%`
          },
          borderTopRightRadius: () => {
            return `50%`
          },
          borderBottomLeftRadius: () => {
            return `50%`
          },
          borderBottomRightRadius: () => {
            return `50%`
          },
          scale: 1.6,
          opacity: 0,
          duration: 0.4,
          delay: repeatDelayRim,
        })
        .to(
          _stuff,
          {
            keyframes: [
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
              },
              {
                opacity: 0,
                duration: 0.1,
              },
            ],
            ease: 'power1.out',
            // duration: durationStuff,
            stagger: {
              amount: durationStuff,
            },
            onStart: () => {
              setTimeout(() => {
                window._body.classList.add(self.body_loadingfinished_class)
              }, 0.1)
            },
          },
          0.2
        )

      tl.pause()
      return tl
    },
  },
}
</script>
