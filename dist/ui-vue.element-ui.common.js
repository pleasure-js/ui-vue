/*!
 * @pleasure-js/ui-vue v1.0.0
 * (c) 2018-2020 Martin Rafael Gonzalez <tin@devtin.io>
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var castArray = _interopDefault(require('lodash/castArray'));
var find = _interopDefault(require('lodash/find'));
var map = _interopDefault(require('lodash/map'));
var filter = _interopDefault(require('lodash/filter'));
var isEqual = _interopDefault(require('lodash/isEqual'));
var forOwn = _interopDefault(require('lodash/forOwn'));
var get = _interopDefault(require('lodash/get'));
var mapValues = _interopDefault(require('lodash/mapValues'));
var size = _interopDefault(require('lodash/size'));
var mustache = _interopDefault(require('mustache'));
var md5 = _interopDefault(require('md5'));

//

function objExistsInAnotherObj (obj1, obj2) {
  let valid = true;
  forOwn(obj1, (v, k) => {
    if (!isEqual(v, get(obj2, k))) {
      valid = false;
      return false
    }
  });

  return valid
}

var script = {
  props: {
    readonly: Boolean,
    name: String,
    placeholder: String,
    field: Object,
    otherAvailable: Boolean
  },
  data () {
    let otherActive = false;
    let selected = this.theValue(this.value);

    if (this.value) {
      if (!this.findOptionByValue(this.value)) {
        otherActive = true;
        selected = this.value;
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
          const prop = v.match(/^\$(.+)$/)[1];
          return get(this, 'pleasureValues.' + prop)
        }

        return v
      })
    },
    key () {
      const labels = [];
      this.realOptions.forEach(opt => {
        labels.push(opt.label);
      });
      return md5(labels.join('-'))
    }
  },
  watch: {
    selected (v) {
      console.log(`input`, v);
      this.$emit('input', v);
    }
  },
  mounted () {
    this.setReadOnlyLabel();
    this.$emit('input', this.theValue(this.value));
  },
  methods: {
    theLabel (label) {
      const altLabels = [`labels.${ label }`, label];
      if (this.i18nScope) {
        altLabels.unshift(`${ this.i18nScope }.label.${ label }`);
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
      let options = this.options;
      let realOptions = []; // important to initialize variable for vuedoc

      const fixValues = v => {
        return {
          value: this.getValue(v),
          label: this.label(v)
        }
      };

      if (typeof options === 'string') {
        options = this.$store.getters['pleasure/dropdown'][options];

        if (this.path) {
          options = get(options, this.path);
        }
      }

      realOptions = Array.isArray(options) ? options.map(fixValues) : map(options, fixValues);
      // console.log({ realOptions })
      // realOptions = options.map(fixValues)

      let value = this.value;

      if (typeof value === 'object') {
        value = get(value, this.optionsMap ? this.optionsMap.value : '_id');
      }

      if (this.sort) {
        realOptions.sort((a, b) => {
          const { labelA = '' } = a;
          const { labelB = '' } = b;
          if (labelA.toLowerCase() < labelB.toLowerCase()) {
            return -1
          } else if (labelA.toLowerCase() > labelB.toLowerCase()) {
            return 1
          } else {
            return 0
          }
        });
      }

      this.selected = value;

      if (this.parsedFind) {
        realOptions = filter(options, (option) => objExistsInAnotherObj(this.parsedFind, option)).map(fixValues);
      }

      return realOptions
    },
    setReadOnlyLabel () {
      const { selected } = this;
      // console.log({ selected })

      if (typeof selected === 'string' && this.realOptions.length > 0) {
        console.log(`here`, { selected });
        // this.selectedLabel = this.$options.filters.none(this.$t(get(find(this.realOptions, { value: selected }), 'label', selected)))
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

      console.log(`label name`, this.optionsMap.label);
      return get(row, this.optionsMap.label, this.selected)
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: { "pleasure-select-container": true, focused: _vm.focused } },
    [
      !_vm.readonly && !_vm.otherActive
        ? [
            _c(
              "select",
              {
                key: _vm.key,
                staticClass: "pleasure-select",
                attrs: { name: _vm.name },
                on: {
                  focus: function($event) {
                    _vm.focused = true;
                  },
                  blur: function($event) {
                    _vm.focused = false;
                  },
                  change: function($event) {
                    _vm.selected = $event.target.value;
                  }
                }
              },
              [
                _c("option", { attrs: { value: "" } }, [
                  _vm._v(
                    "\n        [ " + _vm._s(_vm.placeholder) + " ]\n      "
                  )
                ]),
                _vm._v(" "),
                _vm._l(_vm.options, function(option) {
                  return _c(
                    "option",
                    {
                      key: option.value,
                      domProps: {
                        value: option.value,
                        selected: _vm.selected === option.value
                      }
                    },
                    [_vm._v("\n        " + _vm._s(option.label) + "\n      ")]
                  )
                })
              ],
              2
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.otherActive && !_vm.readonly
        ? _c("el-input", {
            ref: "manual-input",
            attrs: {
              clearable: "",
              placeholder: _vm.$t(_vm.otherPlaceholder),
              value: _vm.selected
            },
            on: {
              input: function($event) {
                _vm.selected = $event;
              },
              clear: function($event) {
                _vm.otherActive = false;
              },
              keyup: function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "esc", 27, $event.key, [
                    "Esc",
                    "Escape"
                  ])
                ) {
                  return null
                }
                _vm.otherActive = false;
              },
              focus: function($event) {
                _vm.focused = true;
              },
              blur: function($event) {
                _vm.focused = false;
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.readonly
        ? _c("el-input", { attrs: { readonly: "", value: _vm.selectedLabel } })
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      value: []
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "el-select",
    {
      attrs: { multiple: "", placeholder: "Select" },
      on: {
        input: function($event) {
          return _vm.$emit("input", $event)
        }
      },
      model: {
        value: _vm.value,
        callback: function($$v) {
          _vm.value = $$v;
        },
        expression: "value"
      }
    },
    _vm._l(_vm.options, function(item) {
      return _c("el-option", {
        key: item.value,
        attrs: { label: item.label, value: item.value }
      })
    }),
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//

const availableHours = [];

const pm = ['AM', 'PM'];

pm.forEach(amPm => {
  for (let i = 1; i <= 12; i++) {
    availableHours.push(`${ i }${ amPm }`);
  }
});

var script$2 = {
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      schema: {
        date: {
          component: 'Date',
          $pleasure: {
            label: ''
          }
        },
        time: {
          enumValues: availableHours,
          $pleasure: {
            label: ''
          }
        }
      }
    }
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "pleasure-date-time" },
    [
      _c("pleasure", {
        attrs: { "custom-schema": _vm.schema, "with-controls": false },
        on: {
          input: function($event) {
            return _vm.$emit("input", $event)
          }
        }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

function install (Vue) {
  Vue.mixin({
    components: {
      PleasureMultipleSelect: __vue_component__$1,
      PleasureSelect: __vue_component__,
      PleasureDateTime: __vue_component__$2
    }
  });
}

exports.install = install;
