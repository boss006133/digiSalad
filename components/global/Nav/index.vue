<template>
  <div :class="[`${classDefault}`]" ref="menuNav" v-show="open">
    <div class="nav-menu__container">
      <div class="nav-menu__wrap">
        <div class="main-level__panel" data-scroll-container></div>
      </div>
      <div class="bg"></div>
    </div>
    <div class="bg-cover" @click.self="$Nav.close()"></div>
  </div>
</template>
<script lang="ts">
import { gsap } from 'gsap'
import { mapState, mapActions } from 'pinia'
import useGlobalStore from '@/store/index'
import usePopupStore from '@/store/popup'
export default {
  name: 'PopupNav',
  components: {},
  props: {},
  data() {
    return {
      classDefault: 'nav-menu',
      classActive: '--show',
      variablesName: '--NAV_MENU',
      open: false,
      closeDuration: 350,
      closeTimer: null,
    }
  },
  computed: {
    ...mapState(useGlobalStore, {
      menuData: (state: any) => state.SystemData.nav,
      footerMenuData: (state: any) => state.SystemData.footerNav,
    }),
    ...mapState(usePopupStore, {
      isActive: (state) => state.isShow_Nav,
    }),
    activeClass() {
      const self = this as any
      return `${self.classDefault}${self.classActive}`
    },
    defaultMenuTypeIndex() {
      const self = this as any
      return self.menuData.findIndex((object) => {
        return object.path === self.menuTypeId
      })
    },
    //首層 data
    navMainCurrentData() {
      const self = this as any
      let r = self.$deepClone(self.menuData) || []
      r = self.menuData.filter((object) => {
        return object.path === self.menuTypeId
      })
      return r && r.length > 0 ? r[0].children : []
    },
    pickedLangText() {
      const self = this as any
      const r = self.langCurcyData.lang.filter(
        (x) => x.value === self.radioLangGroup
      )
      const label = r && r.length > 0 ? r[0].label : ''
      return label
    },
    pickedCurcyText() {
      const self = this as any
      const r = self.langCurcyData.curcy.filter(
        (x) => x.value === self.radioCurcyGroup
      )
      const label = r && r.length > 0 ? r[0].label : ''
      return label
    },
  },
  watch: {
    //open and close
    isActive(newValue, oldValue) {
      const self = this as any
      clearTimeout(self.closeTimer)
      if (newValue) {
        self.open = newValue
        self.$nextTick(() => {
          setTimeout(() => {
            document.documentElement.classList.add(self.activeClass)
            if (self.$refs.navSliderComp) {
              self.$refs.navSliderComp.$refs.flicking.camera.destroy()
              self.$refs.navSliderComp.$refs.flicking.resize()
            }
            setTimeout(() => {
              self.updateNavSlider()
            }, self.closeDuration)
          }, 1)
        })
      } else {
        self.$nextTick(() => {
          document.documentElement.classList.remove(self.activeClass)
          self.closeTimer = setTimeout(() => {
            self.open = newValue
          }, self.closeDuration)
        })
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
    self.$setHtmlCssVar({
      [`${self.variablesName}__closeDuration`]: `${self.closeDuration / 1000}s`,
    })
  },
  methods: {},
}
</script>
<style lang="scss" scope></style>
