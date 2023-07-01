<template>
  <div
    id="digiSalad-app"
    :class="[
      {
        [`${uaMobile}`]: !$isPc(),
        [`${uaPc}`]: $isPc(),
      },
      'main-flex-outer',
    ]"
  >
    <!-- html css var -->
    <style>
      {{htmlCssVarInline}}
    </style>

    <!-- landing loading  -->
    <LandingLoader />

    <LocomotiveScroll id="main-flex-inner">
      <Header />
      <main data-scroll-section>
        <nuxt class="container" data-nuxt-page v-cloak></nuxt>
      </main>
    </LocomotiveScroll>

    <!-- #region =========== Popup =========== -->
    <!-- Nav選單 -->
    <PopupNav />
    <!-- #endregion =========== Popup ===========-->
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
import mixinLayouts from '~/plugins/mixin/common/mixin_layouts'

if (process.client) {
  window._body = document.getElementsByTagName('body')[0]
}
export default Vue.extend({
  components: {},
  mixins: [mixinLayouts],
  data() {
    return {
      // title: this.OBTitle,
    }
  },
  head() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const self = this as any
  },
  methods: {},
})
</script>
<style lang="scss" scoped>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
