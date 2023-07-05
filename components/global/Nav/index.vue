<template>
  <div :class="[`${classDefault}`]" ref="menuNav" v-show="open">
    <div class="nav-menu__container">
      <div class="nav-menu__wrap">
        <Waterfall :options="options">
          <WaterfallItem
            v-for="(item, index) in items"
            :key="index"
            :class="[item.type]"
          >
            <nuxt-link
              to="/"
              class="waterFallItem"
              :class="[item.type]"
              :style="item.style"
              :index="item.index"
            >
              <div class="content__container">
                <div class="leftBox">
                  <div class="iconBox">
                    <i :class="[`icon-${item.type}`]"></i>
                  </div>
                </div>
                <div class="rightBox">
                  <div class="subTitleBox">{{ item.subTitle }}</div>
                  <div class="nameBox">
                    <div class="name">
                      <span class="text">{{ item.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg"></div>
            </nuxt-link>
          </WaterfallItem>
        </Waterfall>
      </div>
    </div>
    <div class="bg"></div>
    <div class="btn-close" @click="$Nav.close()">
      <NavCloseOutlined></NavCloseOutlined>
    </div>
  </div>
</template>
<script lang="ts">
import { gsap } from 'gsap'
import { NavCloseOutlined } from '@/components/icons-ds'
import { Waterfall, WaterfallItem } from 'vue2-waterfall'

import { mapState, mapActions } from 'pinia'
import usePopupStore from '@/store/popup'
var ItemNav = (function () {
  function generateItems() {
    return [
      {
        index: 0,
        id: '0',
        width: 200,
        height: 300,
        type: 'about',
        subTitle: 'EMPOWERING BRANDS',
        name: 'ABOUT US',
      },
      {
        index: 1,
        id: '1',
        width: 200,
        height: 300,
        type: 'careers',
        subTitle: 'BE COOL WITH US',
        name: 'CAREERS',
      },
      {
        index: 2,
        id: '2',
        width: 200,
        height: 300,
        type: 'services',
        subTitle: 'AREAS OF EXPERTISE',
        name: 'SERVICES',
      },
      {
        index: 3,
        id: '3',
        width: 200,
        height: 300,
        type: 'works',
        subTitle: 'CASE STUDIES',
        name: 'WORKS',
      },
      {
        index: 4,
        id: '4',
        width: 200,
        height: 300,
        type: 'insights',
        subTitle: 'OUR STRATEGIES',
        name: 'INSIGHTS',
      },
      {
        index: 5,
        id: '5',
        width: 200,
        height: 300,
        type: 'contact',
        subTitle: 'START YOUR JOURNEY WITH US',
        name: 'CONTACT',
      },
    ]
  }
  return {
    get: generateItems,
  }
})()
export default {
  name: 'PopupNav',
  components: {
    NavCloseOutlined,
    Waterfall,
    WaterfallItem,
  },
  props: {},
  data() {
    return {
      classDefault: 'nav-menu',
      classActive: '--show',
      variablesName: '--NAV_MENU',
      open: false,
      closeDuration: 550,
      closeTimer: null,
      items: ItemNav.get(),
      options: {},
    }
  },
  computed: {
    ...mapState(usePopupStore, {
      isActive: (state) => state.isShow_Nav,
    }),
    activeClass() {
      const self = this as any
      return `${self.classDefault}${self.classActive}`
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
