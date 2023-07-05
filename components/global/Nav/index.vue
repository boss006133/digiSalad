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
              :index="item.index"
            >
              <div class="content__container">
                <div class="leftBox" v-if="item.icon">
                  <div class="iconBox">
                    <img
                      :src="`/image/nav/icon-nav-${item.type}.svg`"
                      :alt="item.type"
                    />
                    <i :class="[`icon-${item.type}`]"></i>
                  </div>
                </div>
                <div class="rightBox">
                  <div class="subTitleBox">{{ item.subTitle }}</div>
                  <div class="nameBox">
                    <div class="name">
                      <span class="text"
                        >{{ item.name }}<span class="dot"></span
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-img"></div>
              <div class="bg-color"></div>
            </nuxt-link>
          </WaterfallItem>
        </Waterfall>
      </div>
    </div>
    <div class="bg"></div>
    <div class="logo">
      <img src="/image/logo.svg" alt="DigiSalad" width="140" height="62" />
    </div>
    <div class="btn-close" @click="$Nav.close()">
      <NavCloseOutlined :size="isMedia.pc_04 ? 20 : 26"></NavCloseOutlined>
    </div>
  </div>
</template>
<script lang="ts">
import { gsap } from 'gsap'
import { NavCloseOutlined } from '@/components/icons-ds'
import { Waterfall, WaterfallItem } from 'vue2-waterfall'
import { mapState, mapActions } from 'pinia'
import usePopupStore from '@/store/popup'
const itemAbout = {
  icon: true,
  type: 'about',
  subTitle: 'EMPOWERING BRANDS',
  name: 'ABOUT US',
}
const itemCareers = {
  icon: true,
  type: 'careers',
  subTitle: 'BE COOL WITH US',
  name: 'CAREERS',
}
const itemServices = {
  icon: true,
  type: 'services',
  subTitle: 'AREAS OF EXPERTISE',
  name: 'SERVICES',
}
const itemWorks = {
  icon: true,
  type: 'works',
  subTitle: 'CASE STUDIES',
  name: 'WORKS',
}
const itemInsights = {
  icon: true,
  type: 'insights',
  subTitle: 'OUR STRATEGIES',
  name: 'INSIGHTS',
}
const itemContact = {
  icon: false,
  type: 'contact',
  subTitle: 'START YOUR JOURNEY WITH US',
  name: 'CONTACT',
}

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
      openDuration: 450,
      closeDuration: 650,
      closeTimer: null,
      items_pc: [
        {
          index: 0,
          id: '0',
          ...itemAbout,
        },
        {
          index: 1,
          id: '1',
          ...itemCareers,
        },
        {
          index: 2,
          id: '2',
          ...itemServices,
        },
        {
          index: 3,
          id: '3',
          ...itemWorks,
        },
        {
          index: 4,
          id: '4',
          ...itemContact,
        },
        {
          index: 5,
          id: '5',
          ...itemInsights,
        },
      ],
      items_mb: [
        {
          index: 0,
          id: '0',
          ...itemAbout,
        },
        {
          index: 1,
          id: '1',
          ...itemCareers,
        },
        {
          index: 2,
          id: '2',
          ...itemServices,
        },
        {
          index: 3,
          id: '3',
          ...itemWorks,
        },
        {
          index: 4,
          id: '4',
          ...itemInsights,
        },
        {
          index: 5,
          id: '5',
          ...itemContact,
        },
      ],
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
    items() {
      const self = this as any
      return self.isMedia.mb_00 ? self.items_mb : self.items_pc
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
      [`${self.variablesName}__openDuration`]: `${self.openDuration / 1000}s`,
      [`${self.variablesName}__closeDuration`]: `${self.closeDuration / 1000}s`,
    })
  },
  methods: {},
}
</script>
<style lang="scss" scope></style>
