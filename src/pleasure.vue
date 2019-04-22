<template>
  <div
    class="pleasure"
  >
    <pleasure-form
      :disabled="disabled"
      :form-id="formId"
    >
      <template
        v-if="loaded"
      >
        <pleasure-field-container
          v-for="field in schema"
          :key="`${formId}-${field.path}`"
        >
          <pleasure-field
            v-model="values[field.path]"
            :field="field"
            :form-values="values"
          />
        </pleasure-field-container>
      </template>
      <pleasure-form-controls
        v-if="loaded"
        :v-bind="$props"
        :action-label="actionLabel"
        :cancel-label="cancelLabel"
        :action-callback="onSubmit"
        :cancel-callback="onCancel"
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
  import defaults from 'lodash/defaults'
  import get from 'lodash/get'
  import objectHash from 'object-hash'
  import utils from 'pleasure/src/lib/utils'
  import merge from 'deepmerge'

  const { randomUniqueId } = utils

  /**
   * @vue-prop {String} formName - Name to be assigned to the <form> element.
   * @vue-prop {String} [method=create] - Pleasure method.
   * @vue-prop {String} [entity] - Name of the `entity`.
   * @vue-prop {Boolean} [partialUpdate=false] - Whether to update the entry completely or partially.
   * @vue-prop {Object} [customSchema=null] - Alternatively provide a customSchema to render.
   */
  export default {
    components: {
      PleasureForm,
      PleasureFieldContainer,
      PleasureField,
      PleasureFormControls
    },
    props: {
      actionLabel: {
        type: String,
        default: 'Create'
      },
      cancelLabel: {
        type: String,
        default: 'Cancel'
      },
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
      entryId: {
        type: String,
        default: null
      },
      partialUpdate: {
        type: Boolean,
        default: false
      },
      customSchema: {
        type: Object,
        default: null
      },
      login: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        componentWrapper: 'el-form-item',
        values: merge({}, this.value),
        formId: randomUniqueId(),
        entryRead: false,
        disabled: false
      }
    },
    computed: {
      loaded () {
        return this.schema && this.entryRead
      },
      schema () {
        if (!this.customSchema && (!this.entity || !this.$pleasure.entities || !this.$pleasure.entities[this.entity])) {
          return []
        }

        const entitySchema = this.customSchema || this.$pleasure.entities[this.entity]
        const schema = []

        forOwn(entitySchema, (field, fieldName) => {
          // skip if it's virtual or starts with an underscore
          if (/^_/.test(fieldName) || get(field, 'options.options.virtual')) {
            console.log(`skipping`, { fieldName })
            return
          }

          field = Object.assign({}, field, {
            component: 'el-input'
          })

          schema.push(defaults(field, {
            path: fieldName
          }))
        })

        return schema
      }
    },
    async mounted () {
      if (this.entryId) {
        try {
          this.$set(this, 'values', await this.$pleasure.api.read(this.entity, this.entryId))
        } catch (err) {
          this.$pleasure.error(err.message)
        }
      }
      this.entryRead = true
    },
    methods: {
      onCancel () {

      },
      performSubmit () {
        switch (this.method) {
          case 'create':
            return this.$pleasure.api.create(this.entity, this.values)

          case 'update':
            return this.$pleasure.api.update(this.entity, this.entryId, this.values)
        }
      },
      async onSubmit () {
        try {
          if (this.login) {
            // login
            await this.$pleasure.api.login(this.values)
          } else {
            // other operations
            await this.performSubmit()
          }
        } catch (err) {
          this.$pleasure.error(err.message)
        }
      }
    }
  }
</script>
<style lang="postcss">
  body {
    background: var(--pleasure-page-background);
  }
</style>
