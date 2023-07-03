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
      </div>
    </section>
    <!-- ABOUT DIGISALAD -->
    <section class="aboutDigiSalad">
      <div class="sec-title-warp">
        <div class="sec-title">
          <div class="text">ABOUT DIGISALAD<span class="dot"></span></div>
          <div class="wave"></div>
        </div>
      </div>
      <div class="video-wrap">
        <div
          class="cover"
          @click="playAboutVideo"
          :class="{ playing: aboutYtPlaying }"
        >
          <div class="btn-play-wrap"><div class="btn-play"></div></div>
        </div>
        <div :id="`${aboutVideoId}`" class="about-video"></div>
      </div>
      <div class="sec-content">
        <p>
          Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras
          ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta.
          Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis.
          Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci.
          Donec id dignissim nunc. Donec elit ante, eleifend a dolor et,
          venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem
          elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc
          leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis
          molestie faucibus.
        </p>
      </div>
      <div class="btn__container">
        <div class="item">
          <button class="ds-button ds-button--primary">
            <span class="text">VIEW MORE</span>
          </button>
        </div>
      </div>
    </section>
    <!-- AWARDS -->
    <section class="awards">
      <div class="awards-board-wrap">
        <div class="awards-board">
          <div class="contentBox">
            <div class="sec-title-warp">
              <div class="sec-title">
                <div class="text">AWARDS<span class="dot"></span></div>
                <div class="wave"></div>
              </div>
            </div>
            <div class="sec-content">
              Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras
              ullamcorper bibendum bibendum. Duis tincidunt urna non pretium
              porta. Nam condimentum vitae ligula vel ornare. Phasellus at
              semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl,
              vitae sagittis orci. Donec id dignissim nunc.
            </div>
          </div>
          <div class="awardList">
            <div class="item" v-for="(item, index) in 4" :key="index">
              <img src="/image/award-1.png" width="283" height="108" />
            </div>
          </div>
        </div>
      </div>
      <div class="half-bg"></div>
    </section>
    <!-- OUR INGRADIENTS -->
    <section class="ourIngradients">
      <div class="sec-title-warp">
        <div class="sec-title">
          <div class="text">OUR INGRADIENTS<span class="dot"></span></div>
          <div class="wave gray"></div>
        </div>
      </div>
      <div class="sec-content">
        <p>
          Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras
          ullamcorper bibendum bibendum. Duis tincidunt urna non pretium porta.
          Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis.
          Nunc eu tellus tortor. Etiam at condimentum nisl, vitae sagittis orci.
          Donec id dignissim nunc. Donec elit ante, eleifend a dolor et,
          venenatis facilisis dolor. In feugiat orci odio, sed lacinia sem
          elementum quis. Aliquam consectetur, eros et vulputate euismod, nunc
          leo tempor lacus, ac rhoncus neque eros nec lacus. Cras lobortis
          molestie faucibus.
        </p>
      </div>
      <div class="btn__container">
        <div class="item">
          <button class="ds-button ds-button--second">
            <span class="text">OUR SERVICES</span>
          </button>
        </div>
      </div>
    </section>
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
