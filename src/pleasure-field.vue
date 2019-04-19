<template>
  <div class="pleasure-field">
    <component
      :is="fieldComponent"
      v-bind="$props"
      :name="field.path"
      @input="$emit('input', $event)"
    />
  </div>
</template>
<script>
  export default {
    props: {
      formValues: {
        type: Object,
        default: undefined
      },
      value: {
        type: [Number, Boolean, String, Object, Array],
        default: null
      },
      field: {
        type: Object,
        default: null
      }
    },
    computed: {
      fieldComponent () {
        if (this.$pleasure.settings.ui === 'element-ui') {
          return 'el-input'
        }

        return 'input'
      }
    }
  }
</script>
