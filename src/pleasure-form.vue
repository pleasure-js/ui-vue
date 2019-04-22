<template>
  <div class="pleasure-form">
    <component
      :is="formComponent"
      :key="formId"
    >
      <slot />
    </component>
  </div>
</template>
<script>
  export default {
    props: {
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
