<template>
  <div
    :class="{ pleasure: true, 'multiple-lines': multipleLines }"
  >
    <pleasure-form
      :disabled="disabled"
      :form-id="formId"
      :i18n-scope="i18nScope"
    >
      <template
        v-if="loaded"
      >
        <!--
        Iterates through schemas
        -->
        <pleasure-field-container
          v-for="field in schema"
          :key="`${formId}-${field.path}`"
          :i18n-scope="i18nScope"
          :field="field"
        >
          <pleasure-field
            v-model="values[field.path]"
            :field="field"
            :i18n-scope="i18nScope"
            :form-values="values"
          />
        </pleasure-field-container>
      </template>
      <slot/>
      <pleasure-form-controls
        v-if="loaded && withControls"
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
  import kebabCase from 'lodash/kebabCase'
  import startCase from 'lodash/startCase'
  import PleasureForm from './pleasure-form.vue'
  import PleasureFieldContainer from './pleasure-field-container.vue'
  import PleasureField from './pleasure-field.vue'
  import PleasureFormControls from './pleasure-form-controls.vue'
  import defaults from 'lodash/defaults'
  import get from 'lodash/get'
  import merge from 'deepmerge'

  /**
   * @module vue-pleasure/pleasure
   * @desc A component to render entities. It implements seamlessly with the defined {@link pleasure/PleasureEntity PleasureEntities}
   *
   * @see {@link pleasure/PleasureEntity}
   * @vue-prop {String} formName - Name to be assigned to the <form> element.
   * @vue-prop {String} [method=create] - Pleasure method.
   * @vue-prop {String} [entity] - Name of the `entity`.
   * @vue-prop {Boolean} [partialUpdate=false] - Whether to update the entry completely or partially.
   * @vue-prop {Object} [customSchema=null] - Alternatively provide a customSchema to render.
   * @vue-prop {Boolean} [withControls=true] - Whether to display the control buttons at the bottom or not.
   *
   * @vue-prop {Boolean} [autoFieldI18n=true] - Whether to auto parse the `placeholder` and `label` fields. It would
   * look for the first appearance between the composition `${i18nScope}.placeholder.${field.path}`,
   * `${i18nScope}.label.${field.path}`, and last but not least, `${i18nScope}.${field.path}` and will auto replace the
   * values in `field.placeholder` and `field.label`.
   *
   * @vue-prop {String[]} [omit] - Fields to omit from the entity schema.
   *
   * @vue-prop {String} [i18nScope] - Scope where to try to resolve i18n abbreviations from `label`, `placeholder` and
   * error messages. Defaults to the name of the `entity` if any.
   *
   * @vue-prop {Boolean} [autoLabelI18n=true] - Whether to auto parse the `label` property of the field. When true,
   * it would look for the first appearance between: `${i18nScope}.label.${field.$pleasure.label}`,
   * `labels.${field.$pleasure.label}`, and last but not least, `labels.${field.$pleasure.label}` and will auto replace
   * the value in `field.$pleasure.label` with the one found, if any.
   *
   * @vue-prop {Boolean} [autoPlaceholderI18n=true] - Whether to auto parse the `placeholder` property of the field.
   * When true, it would look for the first appearance between: `${i18nScope}.label.${field.$pleasure.placeholder}`,
   * `placeholders.${field.$pleasure.placeholder}`, and last but not least, `labels.${field.$pleasure.placeholder}` and
   * will auto replace the value in `field.$pleasure.placeholder` with the one found, if any.
   *
   * @vue-prop {Boolean} [guessLabel=true] - When `true`, when no label was provided, it will use a `startCase` version
   * of the `field.path` automatically.
   *
   * @vue-prop {Boolean} [guessPlaceholder=true] - When `true`, when no placeholder was provided, it will use a
   * startCase version of the `field.path` automatically.
   *
   * @vue-prop {Boolean} [autoload=true] - Determines whether the values of the entry (if any) should be automatically
   * pulled from the server when the component is mounted.
   *
   * @vue-prop {Boolean} [multipleLines=true] - Determines whether the fields should be multiple lines or not. (label next
   * to field or not).
   *
   * @vue-prop {Object} [appendValues={}] - Whatever data being sent will be overridden with this one.
   *
   * @vue-prop {String} [controller] - Alternatively the controller of the entity to hit with the collected data.
   */
  export default {
    components: {
      PleasureForm,
      PleasureFieldContainer,
      PleasureField,
      PleasureFormControls
    },
    props: {
      omit: {
        type: Array,
        default () {
          return []
        }
      },
      multipleLines: {
        type: Boolean,
        default: true
      },
      controller: {
        type: String,
        default: null
      },
      guessLabel: {
        type: Boolean,
        default: true
      },
      guessPlaceholder: {
        type: Boolean,
        default: true
      },
      actionLabel: {
        type: String,
        default: 'Create'
      },
      autoLabelI18n: {
        type: Boolean,
        default: true
      },
      autoPlaceholderI18n: {
        type: Boolean,
        default: true
      },
      withControls: {
        type: Boolean,
        default: true
      },
      i18nScope: {
        type: String,
        default: null,
        coerce (...args) {
          // console.log(`coercing`, ...args)
          // console.log(`coercing>>>`, this.i18nScope, this.entity)
          return this.i18nScope ? this.i18nScope : (this.entity || 'default')
        }
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
      },
      autoload: {
        type: Boolean,
        default: true
      },
      appendValues: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        componentWrapper: 'el-form-item',
        values: merge.all([this.values || {}, this.value]),
        formId: 'an-id',// randomUniqueId(),
        entryRead: false,
        disabled: false
      }
    },
    computed: {
      loaded () {
        return this.schema && (!this.autoload || (this.autoload && this.entryRead))
      },
      schema () {
        if (!this.customSchema && (!this.entity || !this.$pleasure.entities || !this.$pleasure.entities[this.entity])) {
          return []
        }

        const entitySchema = this.customSchema || this.$pleasure.entities[this.entity]
        const schema = []

        forOwn(entitySchema, (field, fieldName) => {
          // skip if it's virtual or starts with an underscore
          if (/^_/.test(fieldName) || get(field, 'options.options.virtual') || this.omit.indexOf(fieldName) >= 0) {
            // console.log(`skipping`, { fieldName })
            return
          }

          schema.push(this.toPleasureField(defaults(field, { path: fieldName })))
        })

        return schema
      }
    },
    watch: {
      values: {
        handler (v) {
          this.$emit('input', Object.assign({}, v, this.appendValues))
        },
        deep: true
      }
    },
    async mounted () {
      if (!this.autoload) {
        return
      }

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
      toPleasureField (field) {
        /*
                const isDeepKebabCased = v => {
                  return /^[a-z][a-z.-]+[a-z]$/.test(v)
                }
        */
        const i18nLabel = kebabCase(field.path)

        const placeholder = [
          this.i18nScope ? `${ this.i18nScope }.placeholder.${ i18nLabel }` : null,
          this.i18nScope ? `${ this.i18nScope }.${ i18nLabel }` : null,
          `placeholders.${ i18nLabel }`
        ].filter(v => !!v)

        const label = [
          this.i18nScope ? `${ this.i18nScope }.label.${ i18nLabel }` : null,
          this.i18nScope ? `${ this.i18nScope }.${ i18nLabel }` : null,
          `labels.${ i18nLabel }`
        ].filter(v => !!v)

        const legacy = {
          $pleasure: {}
        }

        field = defaults(field, legacy)

        if (!field.$pleasure.hasOwnProperty('label') && this.guessLabel) {
          field.$pleasure.label = startCase(field.path)
        }

        if (!field.$pleasure.hasOwnProperty('placeholder') && this.guessPlaceholder) {
          field.$pleasure.placeholder = startCase(field.path)
        }

        if (!field.$pleasure.hasOwnProperty('label') && this.autoLabelI18n) {
          field.$pleasure.label = this.plsi18n(label, field.$pleasure.label)
        }

        if (!field.$pleasure.hasOwnProperty('placeholder') && this.autoPlaceholderI18n) {
          field.$pleasure.placeholder = this.plsi18n(placeholder, field.$pleasure.placeholder)
        }

        return field
      },
      performSubmit () {
        const values = Object.assign({}, this.values, this.appendValues)
        if (this.controller) {
          return this.$pleasure.api.controller(this.entity, this.controller, values)
        }

        switch (this.method) {
          case 'create':
            return this.$pleasure.api.create(this.entity, values)

          case 'update':
            return this.$pleasure.api.update(this.entity, this.entryId, values)
        }
      },
      async onSubmit () {
        try {
          if (this.login) {
            // login
            await this.$pleasure.api.login(this.values)
          } else {
            // other operations
            this.$emit('result', await this.performSubmit())
          }
        } catch (err) {
          this.$pleasure.error(err.message)
        }
      }
    }
  }
</script>
