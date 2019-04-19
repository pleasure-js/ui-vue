<template>
  <div class="pleasure-field-container">
    <component
      :is="fieldContainer"
    >
      <slot />
    </component>
  </div>
</template>
<script>
  export default {
    computed: {
      fieldContainer() {
        if (this.$pleasure.settings.ui === 'element-ui') {
          return 'el-form-item'
        }

        return 'div'
      }
    }
  }
</script>
