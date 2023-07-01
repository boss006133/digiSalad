<template>
  <div class="o-scroll" data-scroll-container>
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.o-scroll {
  overflow: hidden;
  :not(#{$hasScrollSmoothClass}) & {
    overflow: visible;
  }
}
</style>
