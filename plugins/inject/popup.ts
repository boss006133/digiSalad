import { Context } from '@nuxt/types'
import usePopupStore from '~/store/popup'
import { action as actionPopup } from '@/constants/store/popup'

export default (
  { app, $pinia, route, params, query, $axios, req, error: nuxtError }: Context,
  inject
) => {
  const storePopup = usePopupStore($pinia) as any

  /* Nav popup */
  const NavIsShow = () => {
    return storePopup.isShow_Nav
  }
  const Nav = {
    show: () => {
      if (!NavIsShow()) storePopup[actionPopup.SET_POPUP_NAV_STATE](true)
    },
    close: () => {
      if (NavIsShow()) storePopup[actionPopup.SET_POPUP_NAV_STATE](false)
    },
    isShow: NavIsShow,
  }
  inject('Nav', Nav)
}
