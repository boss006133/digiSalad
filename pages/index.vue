<template>
  <div class="page-home">
    <!-- banner -->
    <section
      class="banner"
      ref="banner"
      data-scroll
      data-scroll-id="banner"
      data-scroll-offset="100%"
    >
      <div class="content">
        <div class="main-content">
          <div class="logo">
            <img
              src="/image/logo.svg"
              alt="DigiSalad"
              width="198.7"
              height="88"
            />
          </div>
          <div class="slogan">
            <p class="p-1">WE CREATE</p>
            <p class="p-2">AMAZING</p>
            <p class="p-3">
              <span class="ds-anime-title">
                <span class="text"
                  >DIGITAL EXPERIENCES<span class="dot"></span
                ></span>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="agency-wrap"><div class="agency">DIGITAL AGENCY</div></div>
      <div class="tasteUsNow-wrap">
        <div class="tasteUsNow" @click="scrollToTaste">
          <div class="plate"></div>
          <div class="text">TASTE US NOW!</div>
        </div>
      </div>
      <div class="line-scroll">
        <span class="line"></span>
      </div>
      <div class="bg-cover__container">
        <div class="default-bg" data-scroll data-scroll-speed="-8"></div>
        <div class="video-wrap" data-scroll data-scroll-speed="-8">
          <div :id="`${bannerVideoId}`" class="brand-video"></div>
        </div>
      </div>
    </section>
    <!-- ABOUT DIGISALAD -->
    <section class="aboutDigiSalad">
      <div class="sec-title-warp">
        <div class="sec-title" data-scroll :data-scroll-call="LOCO_FADEUP">
          <div class="text">ABOUT DIGISALAD<span class="dot"></span></div>
          <div class="wave"></div>
        </div>
      </div>
      <div
        class="video-wrap"
        data-scroll
        data-scroll-offset="30%"
        :data-scroll-call="LOCO_FADEUP"
      >
        <div
          class="cover"
          @click="playAboutVideo"
          :class="{ playing: aboutYtPlaying }"
        >
          <div class="btn-play-wrap"><div class="btn-play"></div></div>
        </div>
        <div :id="`${aboutVideoId}`" class="about-video"></div>
      </div>
      <div class="sec-content" data-scroll :data-scroll-call="LOCO_FADEUP">
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
        <div class="item" data-scroll :data-scroll-call="LOCO_FADEUP">
          <nuxt-link to="/" class="ds-button ds-button--primary">
            <span class="text">VIEW MORE</span>
          </nuxt-link>
        </div>
      </div>
    </section>
    <!-- AWARDS -->
    <section class="awards" data-scroll>
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
              <p>
                Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras
                ullamcorper bibendum bibendum. Duis tincidunt urna non pretium
                porta. Nam condimentum vitae ligula vel ornare. Phasellus at
                semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl,
                vitae sagittis orci. Donec id dignissim nunc.
              </p>
            </div>
          </div>
          <div class="awardList">
            <div class="item" v-for="(item, index) in 4" :key="index">
              <img
                src="/image/award-1.png"
                alt="Asia Smart App Awards"
                width="283"
                height="108"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="half-bg"></div>
    </section>
    <!-- OUR INGRADIENTS -->
    <section class="ourIngradients">
      <div class="sec-title-warp">
        <div class="sec-title" data-scroll :data-scroll-call="LOCO_FADEUP">
          <div class="text">OUR INGRADIENTS<span class="dot"></span></div>
          <div class="wave gray"></div>
        </div>
      </div>
      <div class="sec-content" data-scroll :data-scroll-call="LOCO_FADEUP">
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
        <div class="item" data-scroll :data-scroll-call="LOCO_FADEUP">
          <button class="ds-button ds-button--second">
            <span class="text">OUR SERVICES</span>
          </button>
        </div>
      </div>
      <div class="ingradients-wrap">
        <div class="ingradientList">
          <div class="item" v-for="(item, index) in ingradients" :key="index">
            <div
              class="ingradient"
              data-scroll
              data-scroll-offset="20%"
              :data-scroll-call="LOCO_FADEUP"
            >
              <div class="iconBox">
                <div
                  class="i-circle"
                  :class="[item.iconClass]"
                  :style="`background-image: url('/image/${item.icon}.svg');`"
                ></div>
              </div>
              <div class="nameBox">{{ item.name }}</div>
              <div class="desBox">
                Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras
                ullamcorper bibendum bibendum. Duis tincidunt urna non pretium
                porta. Nam condimentum vitae ligula vel ornare.
              </div>
              <div class="btnBox">
                <nuxt-link to="/" class="btn-viewMore">
                  <span class="text">{{ item.btnText }}</span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn__container btn__container--moreIngradients">
        <div class="item">
          <nuxt-link
            to="/"
            class="btn-moreIngradients"
            data-scroll
            :data-scroll-call="LOCO_FADEUP"
          >
            <span class="text"
              >&nbsp;VIEW MORE DIGISALAD’S INGRADIENTS&nbsp;</span
            >
          </nuxt-link>
        </div>
      </div>
    </section>
    <!-- DIRECTOR -->
    <section class="director">
      <div class="director-board-wrap">
        <div class="director-board">
          <div class="directorBox">
            <div class="director-avatar">
              <div class="avatar-circle">
                <img
                  src="/image/director.png"
                  width="204"
                  height="204"
                  alt="Tony Ng, Founder & Creative Director"
                />
              </div>
            </div>
            <div class="director-name"><h4>Tony Ng</h4></div>
            <div class="director-title">Founder & Creative Director</div>
          </div>
          <div class="contentBox">
            <div class="iconBox">
              <i class="icon-leftQuote"></i>
            </div>
            <div class="contentBox">
              <div class="sec-content">
                <p>
                  A great digital work isn’t about designing beautiful pages
                  purely. It is about context - how do we deliver the
                  <span class="highlight"
                    >right experience to the right person at the right
                    time.</span
                  >
                  The most important thing is that your work can engage
                  customers at anytime, anywhere and let users experience an
                  entire amazing digital journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="half-bg"></div>
    </section>
    <!-- OUR BRAND EXPERIENCE -->
    <section class="ourBrandExperience">
      <div class="sec-title-warp">
        <div class="sec-title" data-scroll :data-scroll-call="LOCO_FADEUP">
          <div class="text">OUR BRAND EXPERIENCE<span class="dot"></span></div>
          <div class="wave"></div>
        </div>
      </div>
      <div class="sec-content" data-scroll :data-scroll-call="LOCO_FADEUP">
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
      <div
        class="clientList__container"
        data-scroll
        data-scroll-offset="10%"
        :data-scroll-call="LOCO_FADEUP"
      >
        <img
          src="/image/DigiSalad-Client-List.png"
          alt="DigiSalad Client List"
          width="1040"
          height="720"
        />
      </div>
    </section>
    <!-- PROJECTS -->
    <section class="projects" ref="galleryComp">
      <div class="banner__container">
        <div id="projects-slideContainer" class="banner__wrap">
          <div class="imgBox" data-scroll :data-scroll-call="LOCO_FADEUP">
            <!-- Flicking Viewport element -->
            <div
              :id="`flicking-projects`"
              :class="[`flicking-projects`]"
              class="flicking-viewport"
            >
              <!-- Camera element -->
              <div class="flicking-camera">
                <div
                  class="panel panel-with-link"
                  v-for="(item, index) in projects"
                  :key="index"
                  draggable="false"
                >
                  <div class="image_wrap">
                    <img
                      class="panel-image"
                      width="540"
                      height="540"
                      :alt="item.name"
                      :src="item.bannerSrc"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="contentBox" data-scroll :data-scroll-call="LOCO_FADEUP">
            <div class="t1Box">{{ projectsObject.t1 }}</div>
            <div class="nameBox">
              <div class="ds-anime-title">
                <span class="text"
                  >{{ projectsObject.name }}<span class="dot"></span
                ></span>
              </div>
            </div>
            <div class="desBox">
              Cras quis nulla commodo, aliquam lectus sed, blandit augue. Cras
              ullamcorper bibendum bibendum. Duis tincidunt urna non pretium
              porta. Nam condimentum vitae ligula vel ornare. Phasellus at
              semper turpis. Nunc eu tellus tortor. Etiam at condimentum nisl,
              vitae sagittis orci. Donec id dignissim nunc. Donec elit ante,
              eleifend a dolor et, venenatis facilisis dolor. In feugiat orci
              odio, sed lacinia sem elementum quis. Aliquam consectetur, eros et
              vulputate euismod, nunc leo tempor lacus, ac rhoncus neque eros
              nec lacus. Cras lobortis molestie faucibus.
            </div>
          </div>
          <div class="btnBox" data-scroll :data-scroll-call="LOCO_FADEUP">
            <nuxt-link to="/" class="ds-button ds-button--primary">
              <span class="text">VIEW PROJECT</span>
            </nuxt-link>
          </div>
          <div
            class="paginationBox"
            data-scroll
            :data-scroll-call="LOCO_FADEUP"
          >
            <div class="current">
              <span class="text">{{
                String(flickingProjectsCurrent + 1).padStart(2, '0')
              }}</span>
            </div>
            <div class="total">
              <span class="text">{{
                String(projects.length).padStart(2, '0')
              }}</span>
            </div>
            <span class="divider"></span>
          </div>
          <!-- button prev -->
          <span class="flicking-arrow-prev">
            <PrevOutlined
              data-scroll
              :data-scroll-call="LOCO_FADEUP"
            ></PrevOutlined>
          </span>
          <!-- button next -->
          <span class="flicking-arrow-next">
            <NextOutlined
              data-scroll
              :data-scroll-call="LOCO_FADEUP"
            ></NextOutlined>
          </span>
        </div>
      </div>
      <div class="bg-cover">
        <div
          class="project-bg"
          :style="`background-image: url('${projectsObject.bannerSrc}');`"
        ></div>
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
