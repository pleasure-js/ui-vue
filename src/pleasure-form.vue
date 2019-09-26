<template>
  <div class="pleasure-form">
    <component
      :is="formComponent"
      :key="formId"
      @input="$emit('input', $event)"
    >
      <slot />
    </component>
  </div>
</template>
<script>
  export default {
    props: {
      i18nScope: {
        type: String,
        default: null
      },
      formId: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      formComponent () {
        return 'el-form'
      }
    }
  }
</script>
