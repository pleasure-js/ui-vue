<template>
  <div class="pleasure-form">
    <component
      :is="formComponent"
    >
      <slot />
    </component>
  </div>
</template>
<script>
  export default {
    props: {

    },
    computed: {
      formComponent() {
        return 'el-form'
      }
    }
  }
</script>
