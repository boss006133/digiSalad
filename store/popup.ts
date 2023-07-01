import { defineStore } from 'pinia'
import { action as actionPopup } from '@/constants/store/popup'

const state = () => ({
  navIsShow: false,
})
const getters = {
  isShow_Nav: (state) => state.navIsShow,
}
const actions = {
  [actionPopup.SET_POPUP_NAV_STATE](value) {
    const self = this as any
    self.navIsShow = value
  },
}

export default defineStore('popupStore', {
  // 對應 data
  state,
  // 對應 computed (物件形式)
  getters,
  // 對應 methods (物件形式)
  actions,
})
