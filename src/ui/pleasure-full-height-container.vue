<template>
  <div class="pleasure-full-height-container">
    <slot name="header" />
    <slot name="default" />
  </div>
</template>
<style lang="postcss">
  .pleasure-full-height-container {
    position: relative;
    min-height: 100vh;
  }
</style>
