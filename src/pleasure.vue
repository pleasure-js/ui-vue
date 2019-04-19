<template>
  <div class="pleasure">
    <pleasure-form>
      <template v-if="schema">
        <pleasure-field-container
          v-for="field in schema"
          :key="`${formName}-${field.path}`"
        >
          <pleasure-field
            v-model="values[field.path]"
            :field="field"
            :form-values="values"
          />
        </pleasure-field-container>
      </template>
      <pleasure-form-controls
        :cancelable="cancelable"
        :method="method"
      />
    </pleasure-form>
  </div>
</template>
<script>
  import forOwn from 'lodash/forOwn'
  import PleasureForm from './pleasure-form.vue'
  import PleasureFieldContainer from './pleasure-field-container.vue'
  import PleasureField from './pleasure-field.vue'
  import PleasureFormControls from './pleasure-form-controls.vue'

  /**
   * @vue-prop {String} formName - Name to be assigned to the <form> element.
   * @vue-prop {String} [method=create] - Pleasure method.
   * @vue-prop {String} [entity] - Name of the `entity`.
   * @vue-prop {Boolean} [partialUpdate=false] - Whether to update the entry completely or partially.
   */
  export default {
    components: {
      PleasureForm,
      PleasureFieldContainer,
      PleasureField,
      PleasureFormControls
    },
    props: {
      method: {
        type: String,
        default: 'create'
      },
      cancelable: {
        type: Boolean,
        default: true
      },
      value: {
        type: Object,
        default () {
          return {}
        }
      },
      formName: {
        type: String,
        default: null
      },
      entity: {
        type: String,
        default: null
      },
      partialUpdate: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        componentWrapper: 'el-form-item',
        values: {}
      }
    },
    computed: {
      formId () {
        if (this.formName) {
          return this.formName
        }

        return this.entity
      },
      schema () {
        if (!this.entity || !this.$pleasure.entities || !this.$pleasure.entities[this.entity]) {
          return []
        }

        const entitySchema = this.$pleasure.entities[this.entity]
        const schema = []

        forOwn(entitySchema, (field, fieldName) => {
          if (/^_/.test(fieldName)) {
            return
          }

          field = Object.assign({}, field, {
            component: 'el-input'
          })

          schema.push(field)
        })

        return schema
      }
    }
  }
</script>
