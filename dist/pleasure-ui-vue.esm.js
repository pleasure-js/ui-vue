/*!
 * pleasure-ui-vue v1.0.0
 * (c) 2018-2019 Martin Rafael Gonzalez <tin@devtin.io>
 * Released under the MIT License.
 */
import forOwn from 'lodash/forOwn';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import get$1 from 'lodash/get';
import merge from 'deepmerge';
import uniq from 'lodash/uniq';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import defaults from 'lodash/defaults';
import { PleasureApiClient } from 'pleasure-api-client';
import Vue from 'vue';
import objectHash from 'object-hash';
import find from 'lodash/find';
import CoercePropsMixin from 'vue-coerce-props';
import Vuex from 'vuex';
import mapKeys from 'lodash/mapKeys';

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

var script = {
  props: {
    i18nScope: {
      type: String,
      default: null
    },
    formId: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formComponent () {
      return 'el-form'
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

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "pleasure-form" },
    [
      _c(
        _vm.formComponent,
        {
          key: _vm.formId,
          tag: "component",
          on: {
            input: function($event) {
              return _vm.$emit("input", $event)
            }
          }
        },
        [_vm._t("default")],
        2
      )
    ],
    1
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
//
//

var script$1 = {
  props: {
    i18nScope: {
      type: String,
      default: null
    },
    field: {
      type: Object,
      required: true
    }
  },
  computed: {
    theProps () {
      const childProps = {};
      if (this.componentType === 'array') {
        Object.assign(childProps, {
          options: this.field.enumValues
        });
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
};

/* script */
const __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "pleasure-field-container" },
    [
      _c(
        _vm.fieldContainer,
        {
          tag: "component",
          attrs: {
            required: _vm.field.$pleasure.required,
            disabled: _vm.field.$pleasure.disabled,
            label: _vm.field.$pleasure.label
          }
        },
        [_vm._t("default")],
        2
      )
    ],
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

var script$2 = {
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
      const childProps = {};
      if (this.componentType === 'array') {
        Object.assign(childProps, {
          options: this.field.enumValues
        });
      }

      return merge.all([{}, this.$props, this.defaultProps[this.fieldComponent] || {}, childProps, get$1(this.field, '$pleasure', {})])
    },
    componentType () {
      const componentType = get$1(this.field, '$pleasure.component', get$1(this.field, 'component'));

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
    { staticClass: "pleasure-field" },
    [
      _c(
        _vm.fieldComponent,
        _vm._b(
          {
            tag: "component",
            attrs: { name: _vm.field.path },
            on: {
              input: function($event) {
                return _vm.$emit("input", $event || null)
              }
            }
          },
          "component",
          _vm.theProps,
          false
        )
      )
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

var script$3 = {
  props: {
    actionCallback: {
      type: Function,
      default () {}
    },
    cancelCallback: {
      type: Function,
      default () {}
    },
    actionLabel: {
      type: String,
      default: 'Create'
    },
    cancelLabel: {
      type: String,
      default: 'Cancel'
    },
    formVisible: {
      type: Boolean,
      default: true
    },
    actionDisabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: `messages.loading`
    },
    method: {
      type: String,
      required: true
    },
    cancelable: {
      type: Boolean,
      required: true
    }
  }
};

/* script */
const __vue_script__$3 = script$3;
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "pleasure-form-controls" },
    [
      _vm.formVisible
        ? _c(
            "el-button",
            {
              staticClass: "full-btn",
              attrs: {
                name: _vm.method === "update" ? "update" : "create",
                disabled: _vm.actionDisabled,
                loading: _vm.loading,
                type: "primary",
                "native-type": "submit"
              },
              nativeOn: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.actionCallback($event)
                }
              }
            },
            [
              _vm._v(
                "\n    " + _vm._s(_vm._f("lang")(_vm.actionLabel)) + "\n  "
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.cancelable
        ? _c(
            "el-button",
            {
              staticClass: "full-btn",
              nativeOn: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.cancelCallback($event)
                }
              }
            },
            [_vm._v("\n    " + _vm._s(_vm.cancelLabel) + "\n  ")]
          )
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

var PTE = {
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
      const field = this.$pleasure.entities[this.entity][fieldName];
      if (!this.isEnum(fieldName)) {
        return
      }

      return field.enumValues.map(value => {
        const i18nLabel = `entities.enum.${ value }`;
        const i18nTranslation = this.$t(i18nLabel);
        // console.log({ i18nLabel, i18nTranslation })
        return {
          label: i18nLabel !== i18nTranslation ? i18nTranslation : value,
          value
        }
      })
    },
    isEnum (fieldName) {
      const field = this.$pleasure.entities[this.entity][fieldName];
      return field.enumValues && field.enumValues.length > 0
    },
    getSortIcon (sort) {
      return sort === null ? 'el-icon-d-caret' : (sort === -1 ? 'el-icon-caret-bottom' : 'el-icon-caret-top')
    },
    guessLabel (field, root = `entities.label`) {
      const requestedLabel = `${ root }.${ field }`;
      const foundLabel = this.$t(requestedLabel);
      return requestedLabel !== foundLabel ? foundLabel : startCase(field)
    }
  }
};

class DropdownManager {
  constructor ({ entity, store, dropdownName, prefix = 'pleasure' }) {
    this._entity = entity;
    this._dropdownName = dropdownName;
    this._store = store;
    this._find = {};
    // this._sort = undefined
    this._search = null;
    this._skip = null;
    this._limit = null;
    this._synced = true;
    this._prefix = prefix;
    this.defaultLimit = process.env.PLEASURE_API_COLLECTION_LIST_LIMIT;

    console.log(`defaultLimit`, this.defaultLimit);
  }

  static debug (v) {
  }

  get prefix () {
    if (!this._prefix) {
      return ''
    }
    return `${ this._prefix }/`
  }

  get entity () {
    return this._entity
  }

  get dropdownName () {
    return this._dropdownName || this.entity
  }

  get store () {
    return this._store
  }

  get find () {
    return this._find
  }

  get sort () {
    return this._sort !== undefined ? this._sort : get$1(this.meta, 'sort')
  }

  set sort (sort) {
    if (sort !== this.sort) {
      this._synced = false;
    }
    return this._sort = sort
  }

  set find (find) {
    if (!isEqual(find, this._find)) {
      this._synced = false;
    }
    // this._find = JSON.stringify(find)
    this._find = find;
    return this._find
  }

  get meta () {
    return this.store.getters[`${ this.prefix }dropdownMeta`][this.dropdownName]
  }

  get search () {
    return this._search !== null ? this._search : get$1(this.meta, 'search')
  }

  set search (search) {
    if (search !== this.search) {
      this._synced = false;
    }
    return this._search = search
  }

  get skip () {
    return this._skip || get$1(this.meta, `skip`, 0)
  }

  set skip (skip) {
    if (skip !== this.skip) {
      this._synced = false;
    }
    return this._skip = skip
  }

  get limit () {
    return this._limit || get$1(this.meta, `limit`)
  }

  set limit (limit) {
    if (limit !== this.limit) {
      this._synced = false;
    }
    return this._limit = limit
  }

  get page () {
    return (Math.ceil(this.skip / (this.limit || this.defaultLimit)) || 0) + 1
  }

  set page (pageNumber) {
    if (pageNumber < 1) {
      return
    }
    this.skip = (pageNumber - 1) * (this.limit || this.defaultLimit);
  }

  get data () {
    console.log(`accessing data from ${ this.prefix }dropdown`, this.store.getters[`${ this.prefix }dropdown`], `for`, this.dropdownName);
    return this.store.getters[`${ this.prefix }dropdown`][this.dropdownName]
  }

  sync (force = false) {
    if (!force && this._synced) {
      return this.data
    }

    const { find, entity, limit, skip, search, sort } = this;
    // console.log({ find })
    return this.store.dispatch(`${ this.prefix }loadDropdown`, {
      entity,
      force: true,
      listOptions: { find, limit, skip, search, sort }
    })
  }

  prev () {
    this.page--;
    return this.sync()
  }

  next () {
    this.page++;
    return this.sync()
  }
}

//

function filterPropertyHandler () {
  this.refreshInput();
}

var script$4 = {
  mixins: [PTE],
  data () {
    return {
      enumValue: [],
      filter: null,
      filterType: null,
      sort: this.value.sort,
    }
  },
  methods: {
    filterHandler () {
      Object.assign(this.manager.find, {
        [this.fieldName]: {
          $in: this.enumValue
        }
      });
      console.log(`filter handler`, this.manager.find);
      this.$emit('refresh-results');
    },
    refreshInput () {
      this.$emit('input', {
        type: this.filterType,
        value: this.filter,
        sort: this.sort
      });
      this.$emit('refresh-results');
    },
    toggleSort () {
      if (this.sort === null) {
        this.sort = 1;
      } else if (this.sort === 1) {
        this.sort = -1;
      } else {
        this.sort = null;
      }
      this.refreshInput();
    },
  },
  props: {
    fieldName: {
      type: String,
      required: true
    },
    manager: {
      type: DropdownManager
    },
    value: {
      required: true,
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    filter: filterPropertyHandler,
    filterType () {
      filterPropertyHandler.call(this);
      this.$nextTick(() => {
        if (this.$refs['field']) {
          console.log(`focusing`, this.$refs['field']);
          this.$refs['field'].focus();
        }
      });
    },
    sort: filterPropertyHandler
  }
};

/* script */
const __vue_script__$4 = script$4;
/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "el-row",
    { staticClass: "table-edit-filter", attrs: { gutter: 10 } },
    [
      _c(
        "el-col",
        { attrs: { span: 8, gutter: 10 } },
        [
          _c("el-button", {
            staticClass: "plain",
            attrs: {
              icon: _vm.getSortIcon(_vm.sort),
              size: "mini",
              circle: ""
            },
            on: { click: _vm.toggleSort }
          }),
          _vm._v("\n    " + _vm._s(_vm.guessLabel(_vm.fieldName)) + "\n  ")
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-col",
        { attrs: { span: 16 } },
        [
          _vm.isEnum(_vm.fieldName)
            ? _c(
                "el-select",
                {
                  attrs: { placeholder: "Select", size: "mini", multiple: "" },
                  on: { input: _vm.filterHandler },
                  model: {
                    value: _vm.enumValue,
                    callback: function($$v) {
                      _vm.enumValue = $$v;
                    },
                    expression: "enumValue"
                  }
                },
                _vm._l(_vm.getFilter(_vm.fieldName), function(item) {
                  return _c("el-option", {
                    attrs: { value: item.value, label: item.label }
                  })
                }),
                1
              )
            : _c(
                "el-input",
                {
                  ref: "field",
                  attrs: {
                    clearable: true,
                    disabled: !_vm.filterType,
                    size: "mini"
                  },
                  model: {
                    value: _vm.filter,
                    callback: function($$v) {
                      _vm.filter = $$v;
                    },
                    expression: "filter"
                  }
                },
                [
                  _c(
                    "el-select",
                    {
                      staticStyle: { width: "70px" },
                      attrs: { slot: "prepend", size: "mini" },
                      slot: "prepend",
                      model: {
                        value: _vm.filterType,
                        callback: function($$v) {
                          _vm.filterType = $$v;
                        },
                        expression: "filterType"
                      }
                    },
                    [
                      _c("el-option", { attrs: { label: "--", value: null } }),
                      _vm._v(" "),
                      _c("el-option", {
                        attrs: { label: "Equals", value: "equals" }
                      }),
                      _vm._v(" "),
                      _c("el-option", {
                        attrs: { label: "Like", value: "like" }
                      })
                    ],
                    1
                  )
                ],
                1
              )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//

const fnStub = {
  type: Function,
  default () {
    return () => {}
  }
};

/**
 * Lists all entries in an entity and allows the user (according to their permission)
 * to search, find, sort, download in csv format, etc.
 */

var script$5 = {
  components: {
    TableEditFilter: __vue_component__$4
  },
  mixins: [PTE],
  props: {
    customBehavior: {
      type: Boolean,
      default: false
    },
    waitBeforeSearch: {
      type: Number,
      default: 300
    },
    tableTop: {
      type: Number,
      default: 0
    },
    searchBy: Array,
    searchStrict: {
      type: Boolean,
      default: false
    },
    defaultSort: {
      type: Object
    },
    /**
     * @vue-prop {Boolean} [withSearch=true] - Add
     */
    withSearch: {
      type: Boolean,
      default: true
    },
    canEdit: Boolean,
    canAdd: {
      type: Boolean,
      default: true
    },
    canDelete: {
      type: Boolean,
      default: false
    },
    cellClick: fnStub,
    /**
     * @vue-prop {Function|Boolean} rowClick=true - A function to handle the row click. `true` to let pleasure handle
     * the request automatically. `false` to disable. Defaults to `true`.
     **/
    rowClick: {
      type: [Function, Boolean],
      default: true
    },
    rowClassName: Function,
    action: fnStub,
    appendData: Object
  },
  data () {
    return {
      promptAdd: false,
      eleMeta: {
        advancedSearchControls: 0,
        filterControls: 0,
        sortControls: 0
      },
      filterData: {},
      advancedSearchControls: false,
      sortControls: false,
      filterControls: false,
      filter: {
        advancedSearchControls: {
          type: null,
          value: null
        },
        sortControls: {
          type: null,
          value: null
        },
        filterControls: {
          type: null,
          value: null
        }
      },
      loadingMore: false,
      sort: null,
      tableScroll: null,
      manager: null,
      searchResults: null,
      selections: [],
      search: null,
      searching: false,
      /**
       * @function searchHandler
       * Handles input search performing
       **/
      searchHandler: debounce(() => {
        this.doSearch(this.search);
      }, this.waitBeforeSearch)
      // results: (this.dropdowns[this.entity] ? this.dropdowns[this.entity].slice() : [])
    }
  },
  computed: {
    empty () {
      if (this.searching) {
        return `Looking for entries containing "${ this.search }" in ${ this.entity }`
      }
      return this.search ? `No entries matching "${ this.search }" found in ${ this.entity }` : `No entries found in ${ this.entity }`
    },
    indexes () {
      if (!this.$pleasure.entities[this.entity] || !this.$pleasure.entities[this.entity].$pleasure.index) {
        return []
      }

      return uniq(this.$pleasure.entities[this.entity].$pleasure.index.search.concat(this.$pleasure.entities[this.entity].$pleasure.index.sort).filter(fieldName => fieldName !== '_id'))
    },
    fields () {
      // todo: add prop to override default indexes fields
      return this.indexes
    },
    sortValue () {
      return this.sort ? {
        [this.sort.prop]: this.sort.order === 'ascending' ? 1 : -1
      } : null
    },
    tableStyle () {
      let top = this.tableTop;

      if (this.withSearch) {
        top += 40;
      }

      if (this.filterControls) {
        top += this.eleMeta.filterControls;
      }

      // console.log({ top })

      return this.withSearch ? { top: `${ top }px` } : null
    },
    datatable () {
      return this.$store.getters['pleasure/dropdown'][this.entity] || []
    },
    safeLookUp () {
      return debounce(this.lookUp.bind(this), 150)
    }
  },
  mounted () {
    // console.log(`store`, this.$store)
    this.manager = new DropdownManager({ entity: this.entity, store: this.$store });

    this.indexes.forEach(index => {
      this.$set(this.filterData, index, { type: null, value: null, sort: null });
      this.$set(this.filterData, `$sort`, []);
    });

    const track = ['advancedSearchControls', 'sortControls', 'filterControls'];

    track.forEach(ele => {
      // console.log(`turning on ${ ele }`)
      this[ele] = true;
    });

    this.$nextTick(() => {
      track.forEach(ele => {
        // console.log(`Checking offsetHeight of ${ kebabCase(ele) }`)
        // console.log(`offsetHeight of ${ kebabCase(ele) } ${ this.$refs[kebabCase(ele)].offsetHeight }`)
        try {
          this.eleMeta[ele] = this.$refs[kebabCase(ele)].offsetHeight;
        } catch (err) {
          console.log(ele, err);
        }
        this[ele] = false;
      });
    });
  },
  watch: {
    search (v) {
      this.searching = !!v;
    }
  },
  methods: {
    applyFilter () {
      return this.syncManager()
    },
    toggleSort (fieldName) {
      const newSort = this.filterData.$sort.filter((item) => {
          return Object.keys(item)[0] !== fieldName
        }
      );

      if (this.filterData[fieldName].sort !== null) {
        newSort.push({
          [fieldName]: this.filterData[fieldName].sort
        });
      }

      console.log({ newSort });
      this.$set(this.filterData, '$sort', newSort);
      console.log(`this.filterData.$sort`, this.filterData.$sort);
      return this.syncManager()
    },
    /**
     * @function doSearch
     * Uses pleasureApiClient to perform a search against the entity
     * @param {String} keywords - The keywords
     **/
    doSearch (keywords) {
      this.manager.search = keywords;
      return this.syncManager()
    },
    async syncManager () {
      this.searching = true;
      const find = this.manager.find;
      if (Object.keys(this.filterData).length > 0) {
        Object.keys(this.filterData).forEach(prop => {
          // console.log(`checking ${ prop }`, this.filterData[prop])
          if (this.filterData[prop].type && this.filterData[prop].value) {
            try {
              find[prop] = this.filterData[prop].type === 'equals' ? this.filterData[prop].value : new RegExp(this.filterData[prop].value, 'i');
            } catch (err) {
              find[prop] = this.filterData[prop].value;
            }
            // console.log(`this.filterData[${ prop }]`, this.filterData[prop])
          } else if (find[prop] && !this.isEnum(prop)) {
            delete find[prop];
          }
        });
      }
      this.manager.find = find;
      this.manager.sort = this.filterData.$sort;
      await this.manager.sync();
      this.searching = false;
    },
    filterPropertyHandler (fieldName, e) {
      this.searchHandler(e);
      // console.log(`focus`, this.$refs[`field-${ fieldName }`])
    },
    async reload () {
      if (!this.entity) {
        return
      }
      // console.log(`reloading`, this.entity)
      // this.$store.dispatch([7 90
      // 'db/clean', this.entity)
      return this.loadMore(true)
    },
    getSearch () {
      let search = {};

      if (!this.searchBy || this.searchBy.length === 0) {
        search = { search: this.search };
      } else if (this.search) {
        const find = {};

        this.searchBy.forEach(prop => {
          find[prop] = this.search;
        });

        search = {
          find,
          strict: this.searchStrict.toString()
        };
      }

      return search
    },
    handleSortChange (sort) {
      // console.log({ sort })
      this.manager.sort = { [sort.prop]: sort.order === 'ascending' ? 1 : -1 };
      return this.syncManager()
    },
    promptCreate () {
      this.promptAdd = !this.promptAdd;
      // this.$router.push({ path: `/pleasure/create/${ this.entity }` })
    },
    handleDeleteSelection () {
      this.$confirm(this.$t('confirm.remove.default'))
        .then(_ => {
          this.deleteSelection();
        })
        .catch(_ => {});
    },
    async lookUp () {
      // console.log('searching', this.search)
      if (!this.search) {
        return this.$set(this, 'searchResults', null)
      }

      this.searching = true;

      try {
        const { data } = await
          this.$store.dispatch('db/api', {
            model: this.entity,
            params: this.appendData,
            ...this.getSearch()
          });

        this.$set(this, 'searchResults', data);
      } catch (err) {
        // console.log({ err })
      } finally {
        this.searching = false;
      }
    },
    async deleteSelection () {
      this.loading = true;
      const remove = this.selections.map(v => v._id);
      const model = this.entity;
      const { errorObj } = await
        this.$store.dispatch('db/api', {
          model,
          remove,
          ctx: this
        });
      this.$emit('deleted', remove);
      !errorObj && await
        this.$store.dispatch(`db/dropdown`, { model }); // reloading it from the page
      this.loading = false;
    },
    filterTag (value, row) {
      return row.type === value
    },
    handleSelectionChange (val) {
      this.$set(this, 'selections', val || []);
    },
    handleRowClick (row, event, col) {
      if (this.rowClick === false) {
        // console.log('row click is false')
        return
      }
      if (typeof this.rowClick === 'function') {
        return this.rowClick(row, event, col)
      }

      // todo: check if can update / read
      this.$router.push({ path: `/pleasure/update/${ this.entity }/${ row._id }` });
    },
    handleCellClick (row, event, col) {
      if (this.cellClick) {
        return this.cellClick(row, event, col)
      }
    }
  }
};

/* script */
const __vue_script__$5 = script$5;
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: {
        content: true,
        "with-search": _vm.withSearch,
        "pleasure-table-edit": true,
        "friendly-table": true,
        "can-add": _vm.canAdd
      }
    },
    [
      _c(
        "div",
        { staticClass: "controls" },
        [
          _vm._t("controls"),
          _vm._v(" "),
          _vm.withSearch
            ? _c(
                "el-row",
                [
                  _c(
                    "el-col",
                    { staticClass: "search-col" },
                    [
                      _c("el-input", {
                        staticClass: "search-input",
                        attrs: {
                          clearable: true,
                          spellcheck: "false",
                          autocomplete: "off",
                          placeholder: "Search",
                          name: "search"
                        },
                        on: { input: _vm.searchHandler },
                        model: {
                          value: _vm.search,
                          callback: function($$v) {
                            _vm.search = $$v;
                          },
                          expression: "search"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { staticClass: "controls-col" },
                    [
                      _c("el-button", {
                        staticClass: "plain",
                        attrs: {
                          icon: _vm.searching
                            ? "el-icon-loading"
                            : "el-icon-search"
                        },
                        on: {
                          click: function($event) {
                            _vm.advancedSearchControls = !_vm.advancedSearchControls;
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("el-button", {
                        staticClass: "plain",
                        attrs: { icon: "el-icon-s-operation" },
                        on: {
                          click: function($event) {
                            _vm.filterControls = !_vm.filterControls;
                          }
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "search-controls" }, [
            _vm.advancedSearchControls
              ? _c(
                  "div",
                  {
                    ref: "advanced-search-controls",
                    staticClass: "advanced-search control"
                  },
                  [
                    _vm._l(_vm.indexes, function(fieldName) {
                      return [
                        _vm._v(
                          "\n          " + _vm._s(fieldName) + "\n        "
                        )
                      ]
                    })
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.filterControls
              ? _c(
                  "div",
                  { ref: "filter-controls", staticClass: "filters control" },
                  _vm._l(_vm.indexes, function(fieldName) {
                    return _c("table-edit-filter", {
                      attrs: {
                        entity: _vm.entity,
                        "field-name": fieldName,
                        manager: _vm.manager
                      },
                      on: {
                        "refresh-results": function($event) {
                          return _vm.toggleSort(fieldName)
                        }
                      },
                      model: {
                        value: _vm.filterData[fieldName],
                        callback: function($$v) {
                          _vm.$set(_vm.filterData, fieldName, $$v);
                        },
                        expression: "filterData[fieldName]"
                      }
                    })
                  }),
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.sortControls
              ? _c(
                  "div",
                  { ref: "sort-controls", staticClass: "sort control" },
                  [
                    _vm._l(_vm.indexes, function(fieldName) {
                      return [
                        _vm._v(
                          "\n          " + _vm._s(fieldName) + "\n        "
                        )
                      ]
                    })
                  ],
                  2
                )
              : _vm._e()
          ])
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "el-table",
        {
          ref: "tb",
          staticClass: "the-table",
          style: _vm.tableStyle,
          attrs: {
            "default-sort": _vm.defaultSort,
            height: "100%",
            data: _vm.datatable,
            stripe: "",
            "tooltip-effect": "dark",
            "highlight-current-row": "",
            "row-class-name": "pleasure-row",
            "row-class-name": _vm.rowClassName,
            "empty-text": _vm.empty
          },
          on: {
            "cell-click": _vm.handleCellClick,
            "row-click": _vm.handleRowClick,
            "selection-change": _vm.handleSelectionChange
          }
        },
        [
          _vm.canDelete
            ? _c("el-table-column", {
                attrs: { type: "selection", width: "35" }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.fields, function(fieldName) {
            return _c("el-table-column", {
              attrs: {
                prop: fieldName,
                label: _vm.guessLabel(fieldName),
                "min-width": "180",
                "column-key": fieldName
              },
              scopedSlots: _vm._u(
                [
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _vm._v(
                          _vm._s(
                            _vm.isEnum(fieldName)
                              ? _vm.guessLabel(
                                  scope.row[fieldName],
                                  "entities.enum"
                                )
                              : scope.row[fieldName]
                          ) + "\n      "
                        )
                      ]
                    }
                  }
                ],
                null,
                true
              )
            })
          })
        ],
        2
      ),
      _vm._v(" "),
      _vm.canAdd
        ? _c("el-button", {
            staticClass: "add-btn",
            attrs: { name: "add", icon: "el-icon-plus", circle: "" },
            on: { click: _vm.promptCreate }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.selections.length > 0 && _vm.canDelete
        ? _c("el-button", {
            staticClass: "delete-btn",
            attrs: { name: "delete", icon: "el-icon-minus", circle: "" },
            on: { click: _vm.handleDeleteSelection }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("pleasure", {
        key: _vm.id,
        class: { prompt: true, on: _vm.promptAdd },
        attrs: { entity: _vm.entity, method: "create" },
        on: {
          cancel: function($event) {
            _vm.promptAdd = false;
          }
        }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//

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
var script$6 = {
  components: {
    PleasureForm: __vue_component__,
    PleasureFieldContainer: __vue_component__$1,
    PleasureField: __vue_component__$2,
    PleasureFormControls: __vue_component__$3,
    PleasureTableEdit: __vue_component__$5
  },
  props: {
    /**
     * What to omit...
     */
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

      const entitySchema = this.customSchema || this.$pleasure.entities[this.entity];
      const schema = [];

      forOwn(entitySchema, (field, fieldName) => {
        // skip if it's virtual or starts with an underscore or dollar sign
        if (/^[_$]/.test(fieldName) || get$1(field, 'options.options.virtual') || this.omit.indexOf(fieldName) >= 0) {
          // console.log(`skipping`, { fieldName })
          return
        }

        schema.push(this.toPleasureField(defaults(field, { path: fieldName })));
      });

      return schema
    }
  },
  watch: {
    values: {
      handler (v) {
        this.$emit('input', Object.assign({}, v, this.appendValues));
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
        this.$set(this, 'values', await this.$pleasure.api.read(this.entity, this.entryId));
      } catch (err) {
        this.$pleasure.error(err.message);
      }
    }

    this.entryRead = true;
  },
  methods: {
    /**
     * Dismisses any changes made and clear the form
     */
    dismiss () {

    },
    onCancel () {
      this.$emit('cancel');
    },
    toPleasureField (field) {
      const i18nLabel = kebabCase(field.path);

      const placeholder = [
        this.i18nScope ? `${ this.i18nScope }.placeholder.${ i18nLabel }` : null,
        this.i18nScope ? `${ this.i18nScope }.${ i18nLabel }` : null,
        `placeholders.${ i18nLabel }`
      ].filter(v => !!v);

      const label = [
        this.i18nScope ? `${ this.i18nScope }.label.${ i18nLabel }` : null,
        this.i18nScope ? `${ this.i18nScope }.${ i18nLabel }` : null,
        `labels.${ i18nLabel }`
      ].filter(v => !!v);

      const legacy = {
        $pleasure: {}
      };

      field = defaults(field, legacy);

      if (!field.$pleasure.hasOwnProperty('label') && this.guessLabel) {
        field.$pleasure.label = startCase(field.path);
      }

      if (!field.$pleasure.hasOwnProperty('placeholder') && this.guessPlaceholder) {
        field.$pleasure.placeholder = startCase(field.path);
      }

      if (!field.$pleasure.hasOwnProperty('label') && this.autoLabelI18n) {
        field.$pleasure.label = this.plsi18n(label, field.$pleasure.label);
      }

      if (!field.$pleasure.hasOwnProperty('placeholder') && this.autoPlaceholderI18n) {
        field.$pleasure.placeholder = this.plsi18n(placeholder, field.$pleasure.placeholder);
      }

      return field
    },
    performSubmit () {
      const values = Object.assign({}, this.values, this.appendValues);
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
          await this.$pleasure.api.login(this.values);
        } else {
          // other operations
          this.$emit('result', await this.performSubmit());
        }
      } catch (err) {
        this.$pleasure.error(err.message);
      }
    }
  }
};

/* script */
const __vue_script__$6 = script$6;
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: { pleasure: true, "multiple-lines": _vm.multipleLines } },
    [
      _vm._t("header"),
      _vm._v(" "),
      _c(
        "pleasure-form",
        {
          attrs: {
            disabled: _vm.disabled,
            "form-id": _vm.formId,
            "i18n-scope": _vm.i18nScope
          }
        },
        [
          _vm.loaded
            ? _vm._l(_vm.schema, function(field) {
                return _c(
                  "pleasure-field-container",
                  {
                    key: _vm.formId + "-" + field.path,
                    attrs: { "i18n-scope": _vm.i18nScope, field: field }
                  },
                  [
                    _c("pleasure-field", {
                      attrs: {
                        field: field,
                        "i18n-scope": _vm.i18nScope,
                        "form-values": _vm.values
                      },
                      model: {
                        value: _vm.values[field.path],
                        callback: function($$v) {
                          _vm.$set(_vm.values, field.path, $$v);
                        },
                        expression: "values[field.path]"
                      }
                    })
                  ],
                  1
                )
              })
            : _vm._e(),
          _vm._v(" "),
          _vm._t("default"),
          _vm._v(" "),
          _vm.loaded && _vm.withControls
            ? _c("pleasure-form-controls", {
                attrs: {
                  "v-bind": _vm.$props,
                  "action-label": _vm.actionLabel,
                  "cancel-label": _vm.cancelLabel,
                  "action-callback": _vm.onSubmit,
                  "cancel-callback": _vm.onCancel,
                  cancelable: _vm.cancelable,
                  method: _vm.method
                }
              })
            : _vm._e()
        ],
        2
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var js_cookie = createCommonjsModule(function (module, exports) {
(function (factory) {
	var registeredInModuleLoader;
	{
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
});

const clientPayload = {};

console.log(`pleasure-ui-vue/client`);
if (process.client && js_cookie.get('accessToken')) {
  // auto load accessToken
  console.log(`auto loading access token`, js_cookie.get('accessToken'));
  clientPayload.accessToken = js_cookie.get('accessToken');
}

var pleasureApiClient = PleasureApiClient.instance(clientPayload);

pleasureApiClient.debug(true);

const strict = true;
const namespaced = true;

const state = () => {
  return {
    entitiesSync: 0, // 0 = not syncing, -1 = syncing, 1 = synced
    entitiesSchema: {},
    dropdown: {},
    dropdownMeta: {},
    settings: process.env['$pleasure.settings'] || {},
    dropdownLoading: [],
    user: null,
    locales: ['en', 'es'],
    locale: 'en'
  }
};

const mutations = {
  setLocale (state, locale) {
    state.locale = locale;
  },
  setDropdownLoading (state, id) {
    if (state.dropdownLoading.indexOf(id) < 0) {
      state.dropdownLoading.push(id);
    }
  },
  removeDropdownLoading (state, id) {
    const newState = state.dropdownLoading.filter(needle => needle !== id);
    Vue.set(state, 'dropdownLoading', newState);
  },
  setUser (state, user) {
    Vue.set(state, 'user', user);
  },
  setEntitiesSync (state, entitiesSync) {
    Vue.set(state, 'entitiesSync', entitiesSync);
  },
  setEntitiesSchema (state, entitiesSchema) {
    forOwn(entitiesSchema, (entity) => {
      forOwn(entity, (field, fieldName) => {
        if (!/^\$/.test(fieldName)) {
          defaults(field, { $pleasure: {} });
        }
      });
    });
    Vue.set(state, 'entitiesSchema', entitiesSchema);
  },
  setDropdown (state, { dropdownName, results, listOptions }) {
    Vue.set(state.dropdown, dropdownName, results);
    Vue.set(state.dropdownMeta, dropdownName, listOptions);
  },
  updateDropdown (state, { entity, modified, id }) {
    const set = get$1(state, `dropdown.${ entity }`);
    const localEntry = find(set, { _id: id });

    if (!localEntry) {
      return
    }

    const final = merge(localEntry, modified);
    Vue.set(set, set.indexOf(localEntry), final);
  },
  clearDropdowns (state) {
    Object.keys(state.dropdown).forEach(dropdown => {
      Vue.set(state.dropdown, dropdown, undefined);

    });
    // Vue.set(state, 'dropdown', {})
  }
};

/**
 * @function store/dropdown
 * @params {Object} options
 * @param options.entity
 * @param listOptions
 * @param name
 * @param force
 * @return {Promise<*>}
 */

const actions = {
  changeUserProfile ({ commit }, user) {
    return commit('setUser', user)
  },
  async locale ({ commit }, locale) {
    commit('setlocale', locale);
  },
  async dropdownChanged ({ commit }, payload = {}) {
    return commit('updateDropdown', payload)
  },
  async loadDropdown (store, { entity, listOptions, name, force = false, req } = {}) {
    const { commit, state } = store;

    if (process.server && req) {
      const Cookies = require('cookies');
      const accessToken = new Cookies(req).get('accessToken');
      pleasureApiClient.setCredentials({ accessToken });
    }

    const dropdownName = entity || name;
    const id = objectHash({ entity, listOptions, dropdownName });

    if (state.dropdownLoading.indexOf(id) >= 0) {
      return
    }

    if (!force && state.dropdown[dropdownName]) {
      return state.dropdown[dropdownName]
    }

    commit('setDropdownLoading', id);

    let results;
    let err;

    try {
      results = await pleasureApiClient.list(entity, listOptions);
    } catch (e) {
      err = e;
    }

    commit('setDropdown', { dropdownName, results, listOptions });
    commit('removeDropdownLoading', id);

    if (err) {
      throw err
    }

    return results
  },
  clearDropdowns ({ commit, state }, { req } = {}) {
    return commit('clearDropdowns')
  },
  logout () {
    return pleasureApiClient.logout()
  },
  async syncEntities ({ commit, state }, { force = false } = {}) {
    if (!force && state.entitiesSync !== 0) {
      return
    }

    commit('setEntitiesSync', -1);
    let entities;

    try {
      entities = await pleasureApiClient.getEntities();
    } catch (err) {
      commit('setEntitiesSync', 0);
      // console.log(`Could not retrieve entities`, err.message)
      return
    }

    commit('setEntitiesSchema', entities);
    commit('setEntitiesSync', 1);
  }
};

const getters = {
  entities (state) {
    return state.entitiesSchema
  },
  dropdown (state) {
    return state.dropdown
  },
  dropdownMeta (state) {
    return state.dropdownMeta
  },
  settings (state) {
    return state.settings
  },
  user (state) {
    return state.user
  },
  locale (state) {
    return state.locale
  }
};

var PleasureStore = /*#__PURE__*/Object.freeze({
  __proto__: null,
  strict: strict,
  namespaced: namespaced,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
});

/**
 * Caches and access ajax results to the API in the browser application store.
 */
class BrowserStorageCache {
  /**
   * @param {Object} config
   * @param {String} [config.scope=pleasure] - Scope to use as a prefix
   * @param {Object} [config.store=window.sessionStorage] - Browser Application Store
   * @param {Number} [config.lifetime=1800] - For how long to have the cache available (in seconds).
   * Defaults to half an hour.
   */
  constructor ({ scope = 'pleasure', store, lifetime = 1800 } = {}) {
    this._store = store || window.sessionStorage;
    this._lifetime = lifetime * 1000;
    this._scope = scope;
    this._cached = [];
  }

  scope (id) {
    return `${this._scope}-${id}`
  }

  req ({ id }) {
    if (!id) {
      return
    }

    const cache = this._store.getItem(this.scope(id));

    if (!cache) {
      return
    }

    const { cached, res } = JSON.parse(cache);

    // cache expired
    if (cached + this._lifetime <= Date.now()) {
      this.clear(id);
      return
    }

    return res
  }

  res ({ id, req, res }) {
    if (typeof res === 'undefined' || req.method !== 'get') {
      return
    }

    this._cached.push(id);
    this._store.setItem(this.scope(id), JSON.stringify({ cached: Date.now(), res }));

    return res
  }

  clear (id) {
    this._store.removeItem(this.scope(id));
    this._cached.splice(this._cached.indexOf(id), 1);
  }

  clearAll () {
    while (this._cached.length > 0) {
      this.clear(this._cached[0]);
    }
  }
}

const bus = new Vue();

//

var script$7 = {
  props: {
    initialZIndex: {
      type: Number,
      default: 99
    }
  },
  data () {
    return {
      on: false,
      full: false,
      zIndex: this.initialZIndex,
      bindedResetFullState: this.resetFullState.bind(this)
    }
  },
  computed: {
    classes () {
      return {
        'back-drop': true,
        full: this.full,
        on: this.on
      }
    }
  },
  mounted () {
    bus.$on('backdrop-on', this.open.bind(this));
    bus.$on('backdrop-off', this.close.bind(this));
    bus.$on('backdrop-toggle', this.toggle.bind(this));
  },
  methods: {
    resetFullState () {
      console.log(`resetFullState`);
      this.full = false;
    },
    open ({ zIndex, full } = {}) {
      this.$refs.backdrop.removeEventListener('animationend', this.bindedResetFullState);
      this.on = true;
      this.zIndex = zIndex || this.initialZIndex;
      this.full = !!full;
    },
    close ({ zIndex } = {}) {
      this.$refs.backdrop.addEventListener('animationend', this.bindedResetFullState, { once: true });

      this.on = false;
      this.zIndex = zIndex || this.initialZIndex;
    },
    toggle (payload) {
      if (this.on) {
        this.close(payload);
      } else {
        this.open(payload);
      }
    }
  }
};

/* script */
const __vue_script__$7 = script$7;
/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    ref: "backdrop",
    class: _vm.classes,
    style: { "z-index": _vm.zIndex }
  })
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$7 = normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

/* script */
/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "pleasure-full-height-container" },
    [_vm._t("header"), _vm._v(" "), _vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$8 = normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    {},
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$8 = {
  props: {
    mainTitle: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'top',
      validator: function (value) {
        // The value must match one of these strings
        return ['top', 'bottom'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      title: this.mainTitle
    }
  },
  watch: {
    $route () {
      this.setTitle(this.mainTitle);
    }
  },
  mounted () {
    bus.$on('pleasure-headbar', ({ exec }) => {
      exec && this[exec[0]](...exec.slice(1));
    });
  },
  methods: {
    setTitle (title) {
      this.title = title;
    }
  }
};

/* script */
const __vue_script__$8 = script$8;
/* template */
var __vue_render__$9 = function() {
  var _obj;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "header",
    { class: ((_obj = { headbar: true }), (_obj[_vm.position] = true), _obj) },
    [
      _vm._t("default", [
        _vm.title
          ? _c("h1", [_vm._v("\n      " + _vm._s(_vm.title) + "\n    ")])
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$9 = normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$8,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
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
//
//
//
//
//
//
//

var script$9 = {
  /**
   * Initial state of the menu
   */
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: null
    },
    position: {
      type: String,
      default: 'left',
      validator: function (value) {
        // The value must match one of these strings
        return ['left', 'right', 'center'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      isOpen: this.opened,
    }
  },
  computed: {
    cls () {
      return {
        menu: true,
        open: this.isOpen,
        [this.position]: true
      }
    }
  },
  watch: {
    isOpen (v) {
      this.$emit(v ? 'opened' : 'closed');
    }
  },
  methods: {
    toggle () {
      return this.isOpen = !this.isOpen
    },
    close () {
      this.isOpen = false;
    },
    open () {
      this.isOpen = true;
    }
  }
};

/* script */
const __vue_script__$9 = script$9;
/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.cls },
    [
      _vm._t("head"),
      _vm._v(" "),
      _c(
        "el-menu",
        _vm._l(_vm.items, function(item, itemIndex) {
          return _c("pleasure-menu-item", {
            key: "menu-" + itemIndex,
            attrs: { index: "menu-" + itemIndex, item: item }
          })
        }),
        1
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$a = normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$9,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
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
//
//
//
//

var script$a = {
  props: {
    /**
     * Adds a gap between the bars and the viewport edge.
     */
    sideNavigation: {
      type: Boolean,
      default: false
    },
    state: {
      type: String,
      default: 'open'
    },
    xPosition: {
      type: String,
      default: 'left',
      validator: function (value) {
        // The value must match one of these strings
        return ['left', 'right', 'center'].indexOf(value) !== -1
      }
    },
    yPosition: {
      type: String,
      default: 'top',
      validator: function (value) {
        // The value must match one of these strings
        return ['top', 'bottom'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      theState: this.state,
      theSideNavigation: this.sideNavigation
    }
  },
  computed: {
    cls () {
      return {
        'menu-bars': true,
        'side-navigation': this.theSideNavigation,
        [this.xPosition]: true,
        [this.yPosition]: true,
        [`state-${ this.theState }`]: true
      }
    },
  },
  methods: {
    setState (s) {
      return this.theState = s
    },
    setSideNavigation (s) {
      return this.theSideNavigation = s
    }
  }
};

/* script */
const __vue_script__$a = script$a;
/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { ref: "bars", class: _vm.cls }, [
    _c("div"),
    _vm._v(" "),
    _c("div")
  ])
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$b = normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$a,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
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

/**
 * @typeof {Object} Item
 * @property {String} name - Name of the item
 * @property {String} to - Link
 * @property {String} icon - Icon class name
 * @property {Item[]} children - Array of items
 */

var script$b = {
  name: 'MenuItem',
  props: {
    index: {
      type: String,
      required: true
    },
    /**
     * The item
     * @type Item
     */
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasChildren () {
      return this.item.children && this.item.children.length > 0
    },
    menuItemProps () {
      const props = {};
      if (this.hasChildren) {
        props.index = this.item.name;
      }
      return props
    }
  }
};

/* script */
const __vue_script__$b = script$b;
/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "menu-item" },
    [
      _c(
        _vm.hasChildren ? "el-submenu" : "el-menu-item",
        {
          tag: "component",
          attrs: { index: _vm.index, "v-bind": _vm.menuItemProps }
        },
        [
          _vm.hasChildren
            ? [
                _c("template", { slot: "title" }, [
                  _vm.item.icon ? _c("i", { class: _vm.item.icon }) : _vm._e(),
                  _vm._v(" "),
                  _c("span", [_vm._v(_vm._s(_vm.item.name))])
                ]),
                _vm._v(" "),
                _vm._l(_vm.item.children, function(child, childIndex) {
                  return _c("pleasure-menu-item", {
                    key: _vm.item.name + "-" + childIndex,
                    attrs: { index: _vm.index + "-" + childIndex, item: child }
                  })
                })
              ]
            : !_vm.item.to
            ? [_vm._v("\n      " + _vm._s(_vm.item.name) + "\n    ")]
            : [
                _c("nuxt-link", { attrs: { to: _vm.item.to } }, [
                  _vm._v("\n        " + _vm._s(_vm.item.name) + "\n      ")
                ])
              ]
        ],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$c = normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$b,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
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

var script$c = {
  props: {
    menuItems: {
      type: Array,
      default () {
        return [
          {
            name: 'Hello'
          },
          {
            name: 'My'
          },
          {
            name: 'Friend',
            children: [
              {
                name: 'Martin'
              }
            ]
          }
        ]
      }
    },
    headbarPosition: {
      type: String,
      default: 'top'
    },
    menuPosition: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      menuOpened: false
    }
  },
  watch: {
    $route () {
      this.closeMenu();
    }
  },
  computed: {
    openMenuGesture () {
      return this.menuPosition === 'left' ? 'right' : (this.menuPosition === 'center' ? 'up' : 'left')
    },
    closeMenuGesture () {
      return this.menuPosition === 'left' ? 'left' : (this.menuPosition === 'center' ? 'bottom' : 'right')
    }
  },
  mounted () {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.closeMenu();
      }
    });
    this.$pleasure.bus.$on('menu-close', () => {
      this.closeMenu();
    });
  },
  methods: {
    openMenu () {
      this.$refs.bars.setState('close');
      this.$refs.bars.setSideNavigation(true);
      this.$refs.backdrop.open({ full: true });
      this.$refs.menu.open();
    },
    closeMenu () {
      this.$refs.bars.setState('open');
      this.$refs.bars.setSideNavigation(false);
      this.$refs.backdrop.close();
      this.$refs.menu.close();
    },
    toggleMenu () {
      const open = this.$refs.menu.toggle();
      if (open) {
        this.openMenu();
      } else {
        this.closeMenu();
      }
    }
  }
};

/* script */
const __vue_script__$c = script$c;
/* template */
var __vue_render__$d = function() {
  var _obj;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "mobile-app" },
    [
      _c("pleasure-menu-bars", {
        directives: [
          {
            name: "touch",
            rawName: "v-touch:swipe[openMenuGesture].prevent",
            value: _vm.openMenu,
            expression: "openMenu",
            arg: "swipe[openMenuGesture]",
            modifiers: { prevent: true }
          },
          {
            name: "touch",
            rawName: "v-touch:swipe[closeMenuGesture].prevent",
            value: _vm.closeMenu,
            expression: "closeMenu",
            arg: "swipe[closeMenuGesture]",
            modifiers: { prevent: true }
          },
          {
            name: "touch",
            rawName: "v-touch:tap.prevent",
            value: _vm.toggleMenu,
            expression: "toggleMenu",
            arg: "tap",
            modifiers: { prevent: true }
          }
        ],
        ref: "bars",
        attrs: {
          "x-position": _vm.menuPosition,
          "y-position": _vm.headbarPosition
        }
      }),
      _vm._v(" "),
      _c(
        "pleasure-menu",
        {
          directives: [
            {
              name: "touch",
              rawName: "v-touch:swipe[closeMenuGesture].prevent",
              value: _vm.closeMenu,
              expression: "closeMenu",
              arg: "swipe[closeMenuGesture]",
              modifiers: { prevent: true }
            }
          ],
          ref: "menu",
          attrs: { items: _vm.menuItems, position: _vm.menuPosition },
          on: {
            opened: function($event) {
              _vm.menuOpened = true;
            },
            closed: function($event) {
              _vm.menuOpened = false;
            }
          }
        },
        [_vm._t("menu-head", null, { slot: "head" })],
        2
      ),
      _vm._v(" "),
      _c(
        "pleasure-headbar",
        {
          class: { "pleasure-headbar-opener": true, opened: _vm.menuOpened },
          attrs: { position: _vm.headbarPosition }
        },
        [_vm._t("menu-headbar", null, { slot: "head" })],
        2
      ),
      _vm._v(" "),
      _c("div", {
        class:
          ((_obj = { "headbar-background": true }),
          (_obj[_vm.headbarPosition] = true),
          _obj)
      }),
      _vm._v(" "),
      _c(
        "div",
        {
          class: {
            "mobile-app-body": true,
            "pleasure-opener": true,
            opened: _vm.menuOpened
          }
        },
        [
          _c(
            "pleasure-layout-mobile-app",
            { attrs: { "headbar-position": _vm.headbarPosition } },
            [_vm._t("default", [_c("h1", [_vm._v("Always our Pleasure!")])])],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("pleasure-backdrop", {
        directives: [
          {
            name: "touch",
            rawName: "v-touch:swipe[closeMenuGesture].prevent.stop",
            value: _vm.closeMenu,
            expression: "closeMenu",
            arg: "swipe[closeMenuGesture]",
            modifiers: { prevent: true, stop: true }
          },
          {
            name: "touch",
            rawName: "v-touch:swipe.top.prevent.stop",
            arg: "swipe",
            modifiers: { top: true, prevent: true, stop: true }
          },
          {
            name: "touch",
            rawName: "v-touch:swipe.bottom.prevent.stop",
            arg: "swipe",
            modifiers: { bottom: true, prevent: true, stop: true }
          },
          {
            name: "touch",
            rawName: "v-touch:tap.stop",
            value: _vm.closeMenu,
            expression: "closeMenu",
            arg: "tap",
            modifiers: { stop: true }
          }
        ],
        ref: "backdrop",
        staticClass: "menu-backdrop"
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

  /* style */
  const __vue_inject_styles__$d = undefined;
  /* scoped */
  const __vue_scope_id__$d = undefined;
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$d = normalizeComponent(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$c,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
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
//
//

var script$d = {
  props: {
    headbarPosition: {
      type: String,
      default: 'top'
    }
  }
};

/* script */
const __vue_script__$d = script$d;
/* template */
var __vue_render__$e = function() {
  var _obj;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class:
        ((_obj = { "pleasure-layout-mobile-app": true }),
        (_obj[_vm.headbarPosition] = true),
        _obj)
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;

  /* style */
  const __vue_inject_styles__$e = undefined;
  /* scoped */
  const __vue_scope_id__$e = undefined;
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$e = normalizeComponent(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$d,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    undefined,
    undefined,
    undefined
  );



var ui = /*#__PURE__*/Object.freeze({
  __proto__: null,
  PleasureBackdrop: __vue_component__$7,
  PleasureFullHeightContainer: __vue_component__$8,
  PleasureHeadbar: __vue_component__$9,
  PleasureLayoutDefault: __vue_component__$d,
  PleasureMenu: __vue_component__$a,
  PleasureMenuBars: __vue_component__$b,
  PleasureMenuItem: __vue_component__$c,
  PleasureLayoutMobileApp: __vue_component__$e,
  PleasureTableEdit: __vue_component__$5
});

var vue2TouchEvents = createCommonjsModule(function (module) {
/**
 *
 * @author    Jerry Bendy
 * @since     4/12/2017
 */

function touchX(event) {
    if(event.type.indexOf("mouse") !== -1){
        return event.clientX;
    }
    return event.touches[0].clientX;
}

function touchY(event) {
    if(event.type.indexOf("mouse") !== -1){
        return event.clientY;
    }
    return event.touches[0].clientY;
}

var isPassiveSupported = (function() {
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
            }
        });
        window.addEventListener('test', null, opts);
    } catch (e) {}
    return supportsPassive;
})();


var vueTouchEvents = {
    install: function (Vue, options) {

        // Set default options
        options = Object.assign({}, {
            disableClick: false,
            tapTolerance: 10,
            swipeTolerance: 30,
            longTapTimeInterval: 400,
            touchClass: ''
        }, options || {});


        function touchStartEvent(event) {
            var $this = this.$$touchObj,
                isTouchEvent = event.type.indexOf("touch") >= 0,
                isMouseEvent = event.type.indexOf("mouse") >= 0;

            if (isTouchEvent) {
                $this.lastTouchStartTime = event.timeStamp;
            }

            if (isMouseEvent && $this.lastTouchStartTime && event.timeStamp - $this.lastTouchStartTime < 350) {
                return
            }

            if ($this.touchStarted) {
                return
            }

            addTouchClass(this);

            $this.touchStarted = true;

            $this.touchMoved = false;
            $this.swipeOutBounded = false;

            $this.startX = touchX(event);
            $this.startY = touchY(event);

            $this.currentX = 0;
            $this.currentY = 0;

            $this.touchStartTime = event.timeStamp;

            triggerEvent(event, this, 'start');
        }

        function touchMoveEvent(event) {
            var $this = this.$$touchObj;

            $this.currentX = touchX(event);
            $this.currentY = touchY(event);

            if (!$this.touchMoved) {
                var tapTolerance = options.tapTolerance;

                $this.touchMoved = Math.abs($this.startX - $this.currentX) > tapTolerance ||
                    Math.abs($this.startY - $this.currentY) > tapTolerance;

                if($this.touchMoved){
                    triggerEvent(event, this, 'moved');
                }

            } else if (!$this.swipeOutBounded) {
                var swipeOutBounded = options.swipeTolerance;

                $this.swipeOutBounded = Math.abs($this.startX - $this.currentX) > swipeOutBounded &&
                    Math.abs($this.startY - $this.currentY) > swipeOutBounded;
            }

            if($this.touchMoved){
                triggerEvent(event, this, 'moving');
            }
        }

        function touchCancelEvent() {
            var $this = this.$$touchObj;

            removeTouchClass(this);

            $this.touchStarted = $this.touchMoved = false;
            $this.startX = $this.startY = 0;
        }

        function touchEndEvent(event) {
            var $this = this.$$touchObj,
                isTouchEvent = event.type.indexOf("touch") >= 0,
                isMouseEvent = event.type.indexOf("mouse") >= 0;

            if (isTouchEvent) {
                $this.lastTouchEndTime = event.timeStamp;
            }

            if (isMouseEvent && $this.lastTouchEndTime && event.timeStamp - $this.lastTouchEndTime < 350) {
                return
            }

            $this.touchStarted = false;

            removeTouchClass(this);

            // Fix #33, Trigger `end` event when touch stopped
            triggerEvent(event, this, 'end');

            if (!$this.touchMoved) {
                // detect if this is a longTap event or not
                if ($this.callbacks.longtap && event.timeStamp - $this.touchStartTime > options.longTapTimeInterval) {
                    event.preventDefault();
                    triggerEvent(event, this, 'longtap');

                } else {
                    // emit tap event
                    triggerEvent(event, this, 'tap');
                }

            } else if (!$this.swipeOutBounded) {
                var swipeOutBounded = options.swipeTolerance, direction;

                if (Math.abs($this.startX - $this.currentX) < swipeOutBounded) {
                    direction = $this.startY > $this.currentY ? "top" : "bottom";

                } else {
                    direction = $this.startX > $this.currentX ? "left" : "right";
                }

                // Only emit the specified event when it has modifiers
                if ($this.callbacks['swipe.' + direction]) {
                    triggerEvent(event, this, 'swipe.' + direction, direction);

                } else {
                    // Emit a common event when it has no any modifier
                    triggerEvent(event, this, 'swipe', direction);
                }
            }
        }

        function mouseEnterEvent() {
            addTouchClass(this);
        }

        function mouseLeaveEvent() {
            removeTouchClass(this);
        }

        function triggerEvent(e, $el, eventType, param) {
            var $this = $el.$$touchObj;

            // get the callback list
            var callbacks = $this.callbacks[eventType] || [];
            if (callbacks.length === 0) {
                return null
            }

            for (var i = 0; i < callbacks.length; i++) {
                var binding = callbacks[i];

                if (binding.modifiers.stop) {
                    e.stopPropagation();
                }

                if (binding.modifiers.prevent) {
                    e.preventDefault();
                }

                // handle `self` modifier`
                if (binding.modifiers.self && e.target !== e.currentTarget) {
                    continue
                }

                if (typeof binding.value === 'function') {
                    if (param) {
                        binding.value(param, e);
                    } else {
                        binding.value(e);
                    }
                }
            }
        }

        function addTouchClass($el) {
            var className = $el.$$touchClass || options.touchClass;
            className && $el.classList.add(className);
        }

        function removeTouchClass($el) {
            var className = $el.$$touchClass || options.touchClass;
            className && $el.classList.remove(className);
        }

        Vue.directive('touch', {
            bind: function ($el, binding) {

                $el.$$touchObj = $el.$$touchObj || {
                        // an object contains all callbacks registered,
                        // key is event name, value is an array
                        callbacks: {},
                        // prevent bind twice, set to true when event bound
                        hasBindTouchEvents: false
                    };


                // register callback
                var eventType = binding.arg || 'tap';
                switch (eventType) {
                    case 'swipe':
                        var _m = binding.modifiers;
                        if (_m.left || _m.right || _m.top || _m.bottom) {
                            for (var i in binding.modifiers) {
                                if (['left', 'right', 'top', 'bottom'].indexOf(i) >= 0) {
                                    var _e = 'swipe.' + i;
                                    $el.$$touchObj.callbacks[_e] = $el.$$touchObj.callbacks[_e] || [];
                                    $el.$$touchObj.callbacks[_e].push(binding);
                                }
                            }
                        } else {
                            $el.$$touchObj.callbacks.swipe = $el.$$touchObj.callbacks.swipe || [];
                            $el.$$touchObj.callbacks.swipe.push(binding);
                        }
                        break

                    default:
                        $el.$$touchObj.callbacks[eventType] = $el.$$touchObj.callbacks[eventType] || [];
                        $el.$$touchObj.callbacks[eventType].push(binding);
                }

                // prevent bind twice
                if ($el.$$touchObj.hasBindTouchEvents) {
                    return
                }

                var passiveOpt = isPassiveSupported ? { passive: true } : false;
                $el.addEventListener('touchstart', touchStartEvent, passiveOpt);
                $el.addEventListener('touchmove', touchMoveEvent, passiveOpt);
                $el.addEventListener('touchcancel', touchCancelEvent);
                $el.addEventListener('touchend', touchEndEvent);

                if (!options.disableClick) {
                    $el.addEventListener('mousedown', touchStartEvent);
                    $el.addEventListener('mousemove', touchMoveEvent);
                    $el.addEventListener('mouseup', touchEndEvent);
                    $el.addEventListener('mouseenter', mouseEnterEvent);
                    $el.addEventListener('mouseleave', mouseLeaveEvent);
                }

                // set bind mark to true
                $el.$$touchObj.hasBindTouchEvents = true;
            },

            unbind: function ($el) {
                $el.removeEventListener('touchstart', touchStartEvent);
                $el.removeEventListener('touchmove', touchMoveEvent);
                $el.removeEventListener('touchcancel', touchCancelEvent);
                $el.removeEventListener('touchend', touchEndEvent);

                if (!options.disableClick) {
                    $el.removeEventListener('mousedown', touchStartEvent);
                    $el.removeEventListener('mousemove', touchMoveEvent);
                    $el.removeEventListener('mouseup', touchEndEvent);
                    $el.removeEventListener('mouseenter', mouseEnterEvent);
                    $el.removeEventListener('mouseleave', mouseLeaveEvent);
                }

                // remove vars
                delete $el.$$touchObj;
            }
        });

        Vue.directive('touch-class', {
            bind: function ($el, binding) {
                $el.$$touchClass = binding.value;
            },
            unbind: function ($el) {
                delete $el.$$touchClass;
            }
        });
    }
};


/*
 * Exports
 */
{
    module.exports = vueTouchEvents;

}
});

// Vue.use(VueI18n)

/**
 * @module vue-pleasure
 * @desc Implements a set of tools for {@link https://vuejs.org/ Vue.js} to use along the {@link pleasure/api The Pleasure Api}
 */

function install (Vue, { app, store, noCoerce = false } = {}) {
  Vue.use(vue2TouchEvents);

  Vue.prototype.$pleasureApiClient = pleasureApiClient;
  console.log(`store${ store ? '' : ' NOT' } provided`, { store });
  if (!store) {
    Vue.use(Vuex);
    store = new Vuex.Store({
      modules: {
        pleasure: PleasureStore
      }
    });
    // throw new Error('Please provide vuex store.')
  } else {
    // register your own vuex module
    store.registerModule('pleasure', PleasureStore, { preserveState: false });
  }

  /*
  todo:
    - Provide <pleasure-entry> component to create, read, update and delete entries
    - Provide <pleasure-entity> component to list, search and bulk delete entries in an entity
    - Synchronize entities schema on auth change
    - Register a module in the store to populate all dropdowns
    - Cache api requests on localStorage or sessionStorage
    - Provide a nuxt middleware that loads the entities schema
   */

  pleasureApiClient
    .on('login', (user) => {
      js_cookie.set('accessToken', pleasureApiClient.accessToken);
      store.commit('pleasure/setUser', user);
    });

  pleasureApiClient
    .on('logout', () => {
      js_cookie.remove('accessToken');
      store.commit('pleasure/setUser', null);
    });

  if (process.client) {
    const storageCache = new BrowserStorageCache();

    const sessionChanged = () => {
      storageCache.clearAll();
      store.dispatch('pleasure/clearDropdowns');
      return store.dispatch('pleasure/syncEntities')
    };

    // Vue.$pleasure = pleasureApiClient
    pleasureApiClient
      .cache(storageCache);

    pleasureApiClient
      .on('logout', sessionChanged);

    pleasureApiClient
      .on('login', sessionChanged);
  }

  if (!noCoerce) {
    // console.log(`enabling coerce`)
    Vue.mixin(CoercePropsMixin);
  }

  const kebabKeyedComponents = mapKeys(ui, (value, key) => {
    return kebabCase(key)
  });

  console.log({ kebabKeyedComponents });
  const components = Object.assign({}, kebabKeyedComponents, {
    pleasure: __vue_component__$6
  });

  console.log({ components });

  Vue.mixin({
    components,
    filters: {
      lang (text) {
        // return app.i18n(text)
        return text
      }
    },
    computed: {
      $pleasure () {
        const $this = this;
        return {
          error (message) {
            $this.$message({
              message: $this.$t(message),
              type: 'error'
            });
          },
          api: pleasureApiClient,
          settings: store.getters['pleasure/settings'],
          dropdown: store.getters['pleasure/dropdown'],
          entities: store.getters['pleasure/entities'],
          user: store.getters['pleasure/user'],
          setHeadbarTitle (title) {
            bus.$emit('pleasure-headbar', { exec: ['setTitle', title] });
          },
          bus
        }
      }
    }
  });

  pleasureApiClient.on('profile-update', user => {
    // console.log(`updating profile`, { user })
    store.dispatch('pleasure/changeUserProfile', user);
  });

  if (process.client) {
    store.dispatch('pleasure/syncEntities');

    // keep store synced
    pleasureApiClient.on('update', (payload) => {
      // todo: move to a DropdownManager implementation
      // and keep it fully synced
      store.dispatch('pleasure/dropdownChanged', payload);
    });

    pleasureApiClient.on('create', ({ entity }) => {
      // todo: move to a DropdownManager implementation
      store.dispatch('pleasure/syncDropdown', { entity, force: true });
    });

    pleasureApiClient.on('delete', ({ entity }) => {
      // todo: move to a DropdownManager implementation
      store.dispatch('pleasure/syncDropdown', { entity, force: true });
    });
  }
}

export { install, pleasureApiClient };
