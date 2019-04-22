<template>
  <div class="pleasure-field-container">
    <component
      :is="fieldContainer"
      :required="field.$pleasure.required"
      :disabled="field.$pleasure.disabled"
      :label="field.$pleasure.label"
    >
      <slot />
    </component>
  </div>
</template>
<script>
  export default {
    props: {
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
      fieldContainer () {
        if (this.$pleasure.settings.ui === 'element-ui') {
          return 'el-form-item'
        }

        return 'div'
      }
    }
  }
</script>
