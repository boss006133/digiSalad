import Vue, { PropOptions } from 'vue'
export default Vue.extend({
  components: {},
  asyncData({ app, store, params, query, route }) {
    return {}
  },
  data() {
    return {}
  },
  head() {
    return {}
  },
  computed: {},
  watch: {
    $route(to, from) {
      const self = this as any
    },
    afterScreenResizeState() {
      const self = this as any

      self.setVideoWidth()
    },
  },
  created() {
    const self = this as any
  },
  mounted() {
    const self = this as any
    self.setVideoWidth()
  },
  methods: {
    setVideoWidth() {
      const self = this
      const v = self.$refs.brandVideo as HTMLElement
      const v_w = 1280
      const v_h = 720
      const cHeightRate = v_h / v_w
      const w_w = window.OB_STATIC.GetWindowWidth()
      const w_h = window.OB_STATIC.GetWindowHeight()
      if (w_h / w_w < cHeightRate) {
        const h = (w_w / v_w) * v_h
        v['width'] = `${w_w}`
        v['height'] = `${h}`
      } else {
        const w = (w_h / v_h) * v_w
        v['width'] = `${w}`
        v['height'] = `${w_h}`
      }
    },
  },
})
