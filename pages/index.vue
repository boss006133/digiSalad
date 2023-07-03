<template>
  <div class="page-home">
    <!-- banner -->
    <section class="banner">
      <div class="content">
        <div class="main-content">
          <div class="logo">
            <img src="/image/logo.svg" width="198.7" height="88" />
          </div>
          <div class="slogan">
            <p class="p-1">WE CREATE</p>
            <p class="p-2">AMAZING</p>
            <p class="p-3">DIGITAL EXPERIENCES</p>
          </div>
        </div>
      </div>
      <div class="agency-wrap"><div class="agency">DIGITAL AGENCY</div></div>
      <div class="tasteUsNow-wrap">
        <div class="tasteUsNow">
          <div class="plate"></div>
          <div class="text">TASTE US NOW!</div>
        </div>
      </div>
      <div class="line-scroll">
        <span class="line"></span>
      </div>
      <div class="default-bg"></div>
      <div class="video-wrap">
        <div :id="`${bannerVideoId}`" class="brand-video"></div>
        <!-- <iframe
          :id="`${bannerVideoId}`"
          class="brand-video"
          width="1280"
          height="720"
          src="https://www.youtube.com/embed/8_4JRK4QkqU?wmode=transparent&modestbranding=0&autohide=0&branding=0&controls=0&showinfo=0&autoplay=1&mute=1&rel=0&enablejsapi=1&widgetid=1&loop=1&playlist=8_4JRK4QkqU"
          title="[DigiSalad Showcase] Digital Real Time Display for Cathay Pacific"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe> -->
      </div>
    </section>
    <!-- ABOUT DIGISALAD -->
    <section class="aboutDigiSalad"></section>
    <!-- AWARDS -->
    <!-- OUR INGRADIENTS -->
    <!-- OUR BRAND EXPERIENCE -->
    <!-- PROJECTS -->
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
