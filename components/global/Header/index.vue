<template>
  <header class="ds_header">
    <div class="ds_header__container">
      <div class="ob_header__left">
        <div class="logo">
          <img
            src="/image/logo-second.svg"
            width="120"
            height="53"
            alt="DigiSalad"
          />
        </div>
      </div>
      <div class="ob_header__right">
        <div class="start-project__container">
          <nuxt-link to="/" class="btn_startProject">
            <span class="text">START YOUR PROJECT</span>
          </nuxt-link>
        </div>
        <div class="nav-open__container">
          <button
            class="button-mini-nav"
            type="button"
            aria-label="開啟選單"
            @click="open"
          >
            <NavOutlined :size-w="isMedia.pc_04 ? 22 : 30"></NavOutlined>
          </button>
        </div>
      </div>
    </div>
    <div class="bg-cover"></div>
  </header>
</template>

<script lang="ts">
import { CLASSNAME_HEADER_STICKY } from '~/constants/type/component'
import { NavOutlined } from '@/components/icons-ds'
import Vue from 'vue'
export default Vue.extend({
  name: 'Header',
  components: { NavOutlined },
  data() {
    return {
      isMouted: false,
    }
  },
  computed: {
    loaded() {
      const self = this as any
      return self.isLocomotiveScrollDone && self.isMouted
    },
  },
  watch: {
    loaded(newValue, oldValue) {
      const self = this as any
      if (newValue) {
        self.onLocomotiveScroll()
      }
    },
  },
  beforeCreate() {
    const self = this
  },
  created() {
    const self = this
  },
  mounted() {
    const self = this as any
    self.isMouted = true
  },
  methods: {
    open() {
      const self = this as any
      self.$Nav.show()
    },
    onLocomotiveScroll() {
      const self = this as any
      const _html = document.documentElement
      let timerHeaderSticky
      window.LocomotiveScroll &&
        window.LocomotiveScroll.on('scroll', (instance) => {
          let headerChanged = false
          const y = instance.scroll.y
          const limit = window.OB_STATIC.GetWindowHeight() * 0.9
          if (y > limit) {
            if (!_html.classList.contains(CLASSNAME_HEADER_STICKY)) {
              document.documentElement.classList.add(CLASSNAME_HEADER_STICKY)
              headerChanged = true
            }
          } else {
            if (_html.classList.contains(CLASSNAME_HEADER_STICKY)) {
              document.documentElement.classList.remove(CLASSNAME_HEADER_STICKY)
              headerChanged = true
            }
          }
          if (headerChanged) {
            // clearTimeout(timerHeaderSticky)
            // self.$nextTick(() => {
            //   timerHeaderSticky = setTimeout(() => {
            //   }, 200)
            // })
          }
        })
    },
  },
})
</script>
<style lang="scss" scoped>
.ds_header {
  &,
  * {
    box-sizing: border-box;
  }
}
</style>
