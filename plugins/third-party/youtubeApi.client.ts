import useGlobalStore from '~/store/index'
import { action as actionIndex } from '@/constants/store/index'
export default ({ app }, inject) => {
  const store = useGlobalStore(app.$pinia) as any
  window.onYouTubeIframeAPIReady = () => {
    store[actionIndex.SET_YTAPI_DONE](true)
  }
  ;(function (d, w) {
    var tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/player_api'
    tag.async = true
    // tag.onerror = function () {
    //   w.dispatchEvent(event)
    // }
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode &&
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  })(document, window)
}
