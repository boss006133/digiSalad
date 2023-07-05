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
            <NavOutlined></NavOutlined>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { NavOutlined } from '@/components/icons-ds'
import Vue from 'vue'
export default Vue.extend({
  name: 'Header',
  components: { NavOutlined },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate() {
    const self = this
  },
  created() {
    const self = this
  },
  mounted() {
    const self = this as any
  },
  methods: {
    open() {
      const self = this as any
      self.$Nav.show()
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
