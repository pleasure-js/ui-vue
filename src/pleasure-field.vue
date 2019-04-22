<template>
  <div class="pleasure-field">
    <component
      :is="fieldType"
      v-bind="$props"
      :name="field.path"
      :placeholder="field.path"
      @input="$emit('input', $event || null)"
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
      fieldType () {
        // Arrays -> 'select'
        if (
          (this.field.enumValues && this.field.enumValues.length > 0) ||
          this.field.instance === 'Array'
        ) {
          return 'pleasure-select'
        }

        return 'el-input'
      },
      fieldComponent () {
        if (this.$pleasure.settings.ui === 'element-ui') {
          return 'el-input'
        }

        return 'input'
      }
    }
  }
</script>
