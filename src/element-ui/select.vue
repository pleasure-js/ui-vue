<template>
  <div :class="{ 'pleasure-select-container': true, focused: focused }">
    <template v-if="!readonly && !otherActive">
      <select
        :key="key"
        class="pleasure-select"
        :name="name"
        @focus="focused = true"
        @blur="focused = false"
        @change="selected = $event.target.value"
      >
        <option value="">
          [ {{ placeholder }} ]
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="selected === option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </template>
    <el-input
      v-if="otherActive && !readonly"
      ref="manual-input"
      clearable
      :placeholder="$t(otherPlaceholder)"
      :value="selected"
      @input="selected = $event"
      @clear="otherActive = false"
      @keyup.esc="otherActive = false"
      @focus="focused = true"
      @blur="focused = false"
    />
    <el-input
      v-if="readonly"
      readonly
      :value="selectedLabel"
    />
  </div>
</template>
<style lang="postcss">
  .pleasure-select-container {
    .pleasure-select {
      display: block;
      position: relative;
      width: 100%;
      border: none;
      height: 40px;
      background: var(--pleasure-input-background);
      box-sizing: border-box;
      text-indent: 10px;
      padding: 0 20px;
      outline: none;
    }

    &.focused {
      .el-input__suffix {
        .el-input__icon {
          color: var(--pleasure-input-color-icon) !important;
        }
      }
    }
  }
</style>
<script>
  import castArray from 'lodash/castArray'
  import find from 'lodash/find'
  import map from 'lodash/map'
  import filter from 'lodash/filter'
  import isEqual from 'lodash/isEqual'
  import forOwn from 'lodash/forOwn'
  import get from 'lodash/get'
  import mapValues from 'lodash/mapValues'
  import size from 'lodash/size'
  import mustache from 'mustache'
  import md5 from 'md5'

  function objExistsInAnotherObj (obj1, obj2) {
    let valid = true
    forOwn(obj1, (v, k) => {
      if (!isEqual(v, get(obj2, k))) {
        valid = false
        return false
      }
    })

    return valid
  }

  export default {
    props: {
      readonly: Boolean,
      name: String,
      placeholder: String,
      field: Object,
      otherAvailable: Boolean
    },
    data () {
      let otherActive = false
      let selected = this.theValue(this.value)

      if (this.value) {
        if (!this.findOptionByValue(this.value)) {
          otherActive = true
          selected = this.value
        }
      }

      return {
        selectedLabel: '',
        focused: false,
        otherActive,
        selected,
        realOptions: this.getRealOptions()
      }
    },
    computed: {
      options () {
        return this.field.enumValues.map(v => {
          return typeof v === 'object' ? v : { value: v, label: v }
        })
      },
      isNumber () {
        return typeof this.getValue(castArray(this.options)[0]) === 'number'
      },
      parsedFind () {
        if (size(this.find) < 1) {
          return null
        }

        return mapValues(this.find, (v) => {
          if (/^\$/.test(v)) {
            const prop = v.match(/^\$(.+)$/)[1]
            return get(this, 'pleasureValues.' + prop)
          }

          return v
        })
      },
      key () {
        const labels = []
        this.realOptions.forEach(opt => {
          labels.push(opt.label)
        })
        return md5(labels.join('-'))
      }
    },
    watch: {
      selected (v) {
        console.log(`input`, v)
        this.$emit('input', v)
      }
    },
    mounted () {
      this.setReadOnlyLabel()
      this.$emit('input', this.theValue(this.value))
    },
    methods: {
      theLabel (label) {
        const altLabels = [`labels.${ label }`, label]
        if (this.i18nScope) {
          altLabels.unshift(`${ this.i18nScope }.label.${ label }`)
        }
        return this.plsi18n(altLabels, label)
      },
      theValue (value) {
        if (typeof value === 'object') {
          return get(value, this.optionsMap.value)
        }

        return value
      },
      getRealOptions () {
        let options = this.options
        let realOptions = [] // important to initialize variable for vuedoc

        const fixValues = v => {
          return {
            value: this.getValue(v),
            label: this.label(v)
          }
        }

        if (typeof options === 'string') {
          options = this.$store.getters['pleasure/dropdown'][options]

          if (this.path) {
            options = get(options, this.path)
          }
        }

        realOptions = Array.isArray(options) ? options.map(fixValues) : map(options, fixValues)
        // console.log({ realOptions })
        // realOptions = options.map(fixValues)

        let value = this.value

        if (typeof value === 'object') {
          value = get(value, this.optionsMap ? this.optionsMap.value : '_id')
        }

        if (this.sort) {
          realOptions.sort((a, b) => {
            const { labelA = '' } = a
            const { labelB = '' } = b
            if (labelA.toLowerCase() < labelB.toLowerCase()) {
              return -1
            } else if (labelA.toLowerCase() > labelB.toLowerCase()) {
              return 1
            } else {
              return 0
            }
          })
        }

        this.selected = value

        if (this.parsedFind) {
          realOptions = filter(options, (option) => objExistsInAnotherObj(this.parsedFind, option)).map(fixValues)
        }

        return realOptions
      },
      setReadOnlyLabel () {
        const { selected } = this
        // console.log({ selected })

        if (typeof selected === 'string' && this.realOptions.length > 0) {
          console.log(`here`, { selected })
          // this.selectedLabel = this.$options.filters.none(this.$t(get(find(this.realOptions, { value: selected }), 'label', selected)))
        } else {
          // this.selectedLabel = this.$options.filters.none(this.label(selected))
        }
      },
      findOptionByValue (value) {
        return find(this.realOptions, { value })
      },
      getValue (row) {
        if (typeof row !== 'object') {
          return row
        }

        return get(row, this.optionsMap.value)
      },
      label (row) {
        if (this.labelResolve) {
          return this.labelResolve(row)
        }

        if (typeof row !== 'object') {
          return row
        }

        if (this.optionsMap.label.indexOf('{') >= 0) {
          return mustache.render(this.optionsMap.label, row)
        }

        console.log(`label name`, this.optionsMap.label)
        return get(row, this.optionsMap.label, this.selected)
      }
    }
  }
</script>
