<template>
  <div class="page-home">
    <section class="banner">
      <div class="video-wrap">
        <iframe
          ref="brandVideo"
          class="brand-video"
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/8_4JRK4QkqU?wmode=transparent&modestbranding=0&autohide=0&branding=0&controls=0&showinfo=0&autoplay=1&mute=1&rel=0&enablejsapi=1&widgetid=1&loop=1&playlist=8_4JRK4QkqU"
          title="[DigiSalad Showcase] Digital Real Time Display for Cathay Pacific"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import mixinPageHome from '~/plugins/mixin/page/mixin_home'

export default Vue.extend({
  mixins: [mixinPageHome],
})
</script>
<style lang="scss">
@import './assets/css/pages/home';
</style>
