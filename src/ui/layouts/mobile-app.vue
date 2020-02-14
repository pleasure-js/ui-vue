<template>
  <div :class="{ 'pleasure-layout-mobile-app': true, [headbarPosition]: true}">
    <slot />
  </div>
</template>
<style lang="postcss">
  .pleasure-layout-mobile-app {
    max-width: 480px;
    box-sizing: border-box;
    padding: var(--pleasure-layout-padding);
    margin: var(--headbar-height) auto 0 auto;

    &.bottom {
      margin-top: 0;
    }
  }
</style>
<script>
  export default {
    props: {
      headbarPosition: {
        type: String,
        default: 'top'
      }
    }
  }
</script>
