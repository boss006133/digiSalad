import { Context } from '@nuxt/types'
import { action as actionIndex } from '@/constants/store/index'
import useGlobalStore from '~/store/index'
export default (
  { app, route, params, query, $pinia, req, error: nuxtError }: Context,
  inject: any
) => {
  const storeGlobal = useGlobalStore($pinia) as any
  /* 取得裝置類型 */
  inject('getDevice', () => {
    let device = ''
    switch (true) {
      case app.$device.isDesktop:
        device = 'pc'
        break
      case app.$device.isMobile: //from mobile
        device = 'mb'
        break
      case app.$ua.isFromAppliance(): //from mobile app
        device = 'mbe'
        break
      case app.$device.isTablet:
        device = 'tb'
        break
      default:
        break
    }
    return device
  })
  /* 電腦版 */
  inject('isPc', () => {
    const device = app.$getDevice()
    return device === 'pc'
  })
  /* 行動版 */
  inject('isMobile', () => {
    const device = app.$getDevice()
    return device !== 'pc'
  })
  /**
   * update LocomotiveScroll
   */
  const locomotiveScrollUpdate = () => {
    window.LocomotiveScroll && window.LocomotiveScroll.update()
  }
  inject('LocomotiveScrollUpdate', locomotiveScrollUpdate)
  /* Set Html Css Variables   */
  inject('setHtmlCssVar', (cssObj) => {
    storeGlobal[actionIndex.SET_HTMLCSSVAR](cssObj)
  })
}
