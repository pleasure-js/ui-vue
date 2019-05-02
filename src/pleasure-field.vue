<template>
  <div class="pleasure-field">
    <component
      :is="fieldComponent"
      v-bind="theProps"
      :name="field.path"
      @input="$emit('input', $event || null)"
    />
  </div>
</template>
<script>
  import get from 'lodash/get'

  export default {
    props: {
      i18nScope: {
        type: String,
        default: null
      },
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
        required: true
      }
    },
    computed: {
      theProps () {
        const childProps = {}
        if (this.componentType === 'array') {
          Object.assign(childProps, {
            options: this.field.enumValues
          })
        }

        return Object.assign({}, this.$props, childProps, get(this.field, '$pleasure', {}))
      },
      componentType () {
        // Arrays -> 'select'
        if (
          (
            this.field.enumValues &&
            this.field.enumValues.length > 0
          ) ||
          this.field.instance === 'Array'
        ) {
          return 'array'
        }

        return 'input'
      },
      fieldComponent () {
        switch (this.componentType) {
          case 'array':
            return 'pleasure-select'

          default:
            return 'el-input'
        }
      }
    }
  }
</script>
