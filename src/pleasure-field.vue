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
  import kebabCase from 'lodash/kebabCase'

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
        type: [String, Number, Object, Array, Date, Boolean],
        default: ''
      },
      field: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        defaultProps: {
          'el-slider': {
            range: true,
            showStops: true,
            max: 10
          }
        }
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

        // console.log(`default props for ${ this.componentType }`, this.defaultProps[this.fieldComponent])
        return Object.assign({}, this.$props, this.defaultProps[this.fieldComponent] || {}, childProps, get(this.field, '$pleasure', {}))
      },
      componentType () {
        const componentType = get(this.field, '$pleasure.component', get(this.field, 'component'))
        // Arrays -> 'select'
        if (
          !componentType &&
          ((
              this.field.enumValues &&
              this.field.enumValues.length > 0
            ) ||
            this.field.instance === 'Array')
        ) {
          return 'array'
        }

        return kebabCase(componentType || 'input')
      },
      fieldComponent () {
        console.log(`componentType`, this.componentType)
        switch (this.componentType) {
          case 'array':
            return 'pleasure-select'

          case 'multiple-select':
            return 'pleasure-multiple-select'

          case 'date':
            return 'el-date-picker'

          case 'date-time':
            return 'pleasure-date-time'

          case 'range':
            return 'el-slider'

          default:
            return 'el-input'
        }
      }
    }
  }
</script>
