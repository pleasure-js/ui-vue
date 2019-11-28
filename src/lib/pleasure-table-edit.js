import startCase from 'lodash/startCase'

export default {
  props: {
    /**
     * @vue-prop {String} entity - Entity name
     */
    entity: {
      type: String,
      required: true
    },
  },
  methods: {
    /**
     * @function getFilter
     * Returns the filters for element-ui table header from found enumValues
     * @param {String} fieldName - The field name
     * @return {[{ text, value }]|void}
     **/
    getFilter (fieldName) {
      const field = this.$pleasure.entities[this.entity][fieldName]
      if (!this.isEnum(fieldName)) {
        return
      }

      return field.enumValues.map(value => {
        const i18nLabel = `entities.enum.${ value }`
        const i18nTranslation = this.$t(i18nLabel)
        // console.log({ i18nLabel, i18nTranslation })
        return {
          label: i18nLabel !== i18nTranslation ? i18nTranslation : value,
          value
        }
      })
    },
    isEnum (fieldName) {
      const field = this.$pleasure.entities[this.entity][fieldName]
      return field.enumValues && field.enumValues.length > 0
    },
    getSortIcon (sort) {
      return sort === null ? 'el-icon-d-caret' : (sort === -1 ? 'el-icon-caret-bottom' : 'el-icon-caret-top')
    },
    guessLabel (field, root = `entities.label`) {
      const requestedLabel = `${ root }.${ field }`
      const foundLabel = this.$t(requestedLabel)
      return requestedLabel !== foundLabel ? foundLabel : startCase(field)
    }
  }
}
