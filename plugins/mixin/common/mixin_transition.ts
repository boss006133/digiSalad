import Vue from 'vue'
import { action as actionIndex } from '@/constants/store/index'

if (!Vue.__transition_mixin) {
  Vue.__transition_mixin = true
  Vue.mixin({
    // transition(to, from) {
    //   if (
    //     !to.params.id ||
    //     (!from && to.params.id) ||
    //     (!from.params.id && to.params.id) ||
    //     from.name != to.name
    //   ) {
    //     return 'page'
    //   }
    //   return +to.params.id < +from.params.id ? 'slide' : 'slide'
    //   //return +to.params.id < +from.params.id ? 'slide-right' : 'slide-right'
    // },
    transition: {
      name: 'ob-fade',
      // mode: 'out-in',
      // css: false,
      beforeEnter(el) {
        const self = this as any
        self[actionIndex.SET_PAGE_TRANSITION_AFTER_ENTER](false)
      },
      enter(el, done) {
        const self = this as any
        done()
      },
      afterEnter(el) {
        const self = this as any
        self.$nextTick(() => {
          self[actionIndex.SET_PAGE_TRANSITION_AFTER_ENTER](true)
        })
      },
      // enterCancelled(el) {},
      beforeLeave(el) {
        const self = this as any
      },
      // leave(el, done) {
      //   done()
      // },
      afterLeave(el) {
        const self = this as any
      },
      // leaveCancelled(el) {},
    },
  })
}
