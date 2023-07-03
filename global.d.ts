export {}

declare module 'vue/types/vue' {
  interface VueConstructor {
    __global_mixin: boolean
    __transition_mixin: boolean
    __cart_mixin: boolean
    __vee_locale: boolean
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $LocomotiveScroll: any
    $isPc: () => boolean
    $Nav: any
    isMedia: any
  }
}
declare global {
  interface Window {
    _body: HTMLElement
    LocomotiveScroll: any
    LocomotiveScrollNav: any
    OB_STATIC: any
    onYouTubeIframeAPIReady: any
    YT: any
    YtPlayer: any
  }
}
