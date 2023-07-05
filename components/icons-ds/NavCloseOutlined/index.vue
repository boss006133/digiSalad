<template>
  <i class="icon_navCloseOutlined" ref="selfIcon">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="p_01"
        d="M24 2L2 24"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="p_02"
        d="M2 2L24 24"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </i>
</template>
<script>
export default {
  name: 'NavCloseOutlined',
  props: {
    size: {
      type: [String, Number],
      default: '26',
    },
  },
  computed: {},
  mounted() {
    const self = this
  },
}
</script>
<style lang="scss" scoped>
.p_01,
.p_02 {
  stroke: #fff;
}
</style>
