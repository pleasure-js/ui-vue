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
import defaults from 'lodash/defaults';
import { PleasureApiClient } from 'pleasure-api-client';
import Vue from 'vue';
import Cookies from 'cookies';
import objectHash from 'object-hash';
import find from 'lodash/find';
import CoercePropsMixin from 'vue-coerce-props';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';

//
//
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

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

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
  

  
  var PleasureForm = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
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
  

  
  var PleasureFieldContainer = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
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
  

  
  var PleasureField = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
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
  

  
  var PleasureFormControls = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
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

var script$4 = {
  props: {
    customBehavior: {
      type: Boolean,
      default: false
    },
    tableTop: {
      type: Number,
      default: 0
    },
    searchSpan: {
      type: Number,
      default: 24
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
    /**
     * @vue-prop {String} entity - Entity name
     */
    entity: {
      type: String,
      required: true
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
      loadingMore: false,
      sort: null,
      tableScroll: null,
      searchResults: null,
      selections: [],
      search: null
      // results: (this.dropdowns[this.entity] ? this.dropdowns[this.entity].slice() : [])
    }
  },
  computed: {
    indexes () {
      if (!this.$pleasure.entities[this.entity]) {
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

      return this.withSearch ? { top } : null
    },
    datatable () {
      if (this.searchResults !== null) {
        return this.searchResults
      }

      return this.$pleasure.dropdown[this.entity] || []
    },
    safeLookUp () {
      return debounce(this.lookUp.bind(this), 150)
    }
  },
  mounted () {
    console.log(`entity>>>`, this.$pleasure.entities[this.entity]);
    /*
          this.tableScroll = this.$el.querySelector('.el-table__body-wrapper')
          this.tableScroll.addEventListener('scroll', this.handleScroll)

          if (!this.defaultSort && !this.customBehavior && this.entity) {
            // this.reload()
            /!* this.$store.dispatch('db/dropdown', {
              model: this.entity,
              token: getToken()
            }) *!/
          }
    */
  },
  methods: {
    guessLabel(field) {
      const requestedLabel = `entities.label.${field}`;
      const foundLabel = this.$t(requestedLabel);
      return requestedLabel !== foundLabel ? foundLabel : startCase(field)
    },
    async reload () {
      if (!this.entity) {
        return
      }
      console.log(`reloading`, this.entity);
      // this.$store.dispatch('db/clean', this.entity)
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
    async handleSortChange (sort) {
      if (!this.entity) {
        return
      }

      this.sort = sort;
      this.$emit('sort-change', sort);
      console.log(`table sort`);
      /*
              await this.$store.dispatch('db/dropdown', {
                model: this.entity,
                sort: { [sort.prop]: sort.order === 'descending' ? -1 : 1 },
                params: this.appendData,
                token: getToken()
              })

              this.$el.querySelector('.el-table__body-wrapper').scrollTop = 0
              this.loadingMore = false
      */
    },
    handleScroll () {
      const { tableScroll } = this;

      const scrollHeight = tableScroll.scrollHeight - tableScroll.offsetHeight;
      const scrollTop = tableScroll.scrollTop;

      if (scrollTop >= scrollHeight) {
        this.loadMore();
      }
    },
    async loadMore (r) {
      return console.log(`loadMore`)
      if ((!r && this.loadingMore) || !this.entity) {
        return
      }

      const { sortValue: sort } = this;

      this.loadingMore = true;
      let data;

      // todo: list
      try {
        ({ data } = await this.$store.dispatch('db/api', {
          model: this.entity,
          skip: this.datatable.length,
          sort,
          params: this.appendData,
          ...this.getSearch()
        }));
      } catch (err) {
        data = [];
      }

      if (this.searchResults
      ) {
        this.searchResults.push(...data);
      } else {
        this.$store.commit('db/APPEND_DROPDOWN', { model: this.entity, data });
      }

      this.loadingMore = !r && data.length < 1;
    },
    promptCreate () {
      this.$router.push({ path: `/pleasure/create/${ this.entity }` });
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
const __vue_script__$4 = script$4;
/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: {
        content: true,
        "pleasure-table-edit": true,
        "friendly-table": true,
        "can-add": _vm.canAdd
      }
    },
    [
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
            "row-class-name": _vm.rowClassName
          },
          on: {
            "cell-click": _vm.handleCellClick,
            "row-click": _vm.handleRowClick,
            "selection-change": _vm.handleSelectionChange,
            "sort-change": _vm.handleSortChange
          }
        },
        [
          _vm.canDelete
            ? _c("el-table-column", {
                attrs: { type: "selection", width: "35" }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.fields, function(field) {
            return _c("el-table-column", {
              attrs: {
                prop: field,
                label: _vm.guessLabel(field),
                "min-width": "180",
                sortable: "custom"
              },
              scopedSlots: _vm._u(
                [
                  {
                    key: "default",
                    fn: function(scope) {
                      return [_vm._v(_vm._s(scope.row[field]))]
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
        : _vm._e()
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
  

  
  var PleasureTableEdit = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
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
var script$5 = {
  components: {
    PleasureForm,
    PleasureFieldContainer,
    PleasureField,
    PleasureFormControls,
    PleasureTableEdit
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
    onCancel () {

    },
    toPleasureField (field) {
      /*
              const isDeepKebabCased = v => {
                return /^[a-z][a-z.-]+[a-z]$/.test(v)
              }
      */
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
const __vue_script__$5 = script$5;
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: { pleasure: true, "multiple-lines": _vm.multipleLines } },
    [
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
  

  
  var pleasure = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
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
    settings: process.env.$pleasure.settings || {},
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
  setDropdown (state, { dropdownName, results }) {
    Vue.set(state.dropdown, dropdownName, results);
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
    Vue.set(state, 'dropdown', {});
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
  async loadDropdown ({ commit, state }, { entity, listOptions, name, force = false, req } = {}) {
    if (req) {
      const accessToken = new Cookies(req).get('accessToken');
      pleasureApiClient.setCredentials({ accessToken });
    }
    const dropdownName = entity || name;
    const id = objectHash({ entity, listOptions, dropdownName });

    if (state.dropdownLoading.indexOf(id) >= 0) {
      // console.log(`already loading id ${ id }`)
      return
    }

    // console.log(`load dropdown`)

    if (!force && state.dropdown[dropdownName]) {
      // console.log(`dropdown ${ dropdownName } already existis`, state.dropdown[dropdownName])
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

    commit('setDropdown', { dropdownName, results });
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

var script$6 = {
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
const __vue_script__$6 = script$6;
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    ref: "backdrop",
    class: _vm.classes,
    style: { "z-index": _vm.zIndex }
  })
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
  

  
  var backdrop = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

/* script */
/* template */
var __vue_render__$7 = function() {
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
  

  
  var fullHeightContainer = normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    {},
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

//

var script$7 = {
  props: {
    mainTitle: {
      type: String,
      default: ''
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
const __vue_script__$7 = script$7;
/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "header",
    { staticClass: "headbar" },
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
  

  
  var headbar = normalizeComponent_1(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$7,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
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

var script$8 = {
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
        open: this.isOpen
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
const __vue_script__$8 = script$8;
/* template */
var __vue_render__$9 = function() {
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
  

  
  var menu = normalizeComponent_1(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$8,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
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

var script$9 = {
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
const __vue_script__$9 = script$9;
/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { ref: "bars", class: _vm.cls }, [
    _c("div"),
    _vm._v(" "),
    _c("div")
  ])
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
  

  
  var menuBars = normalizeComponent_1(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$9,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
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

/**
 * @typeof {Object} Item
 * @property {String} name - Name of the item
 * @property {String} to - Link
 * @property {String} icon - Icon class name
 * @property {Item[]} children - Array of items
 */

var script$a = {
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
const __vue_script__$a = script$a;
/* template */
var __vue_render__$b = function() {
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
  

  
  var menuItem = normalizeComponent_1(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$a,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
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

var script$b = {
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
  mounted () {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.closeMenu();
      }
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
const __vue_script__$b = script$b;
/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "mobile-app" },
    [
      _c("pleasure-menu-bars", {
        ref: "bars",
        nativeOn: {
          click: function($event) {
            return _vm.toggleMenu($event)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "pleasure-menu",
        {
          ref: "menu",
          attrs: { items: _vm.menuItems },
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
      _c("pleasure-headbar", {
        class: { "pleasure-headbar-opener": true, opened: _vm.menuOpened }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "headbar-background" }),
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
            [_vm._t("default", [_c("h1", [_vm._v("Always our Pleasure!")])])],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("pleasure-backdrop", {
        ref: "backdrop",
        nativeOn: {
          click: function($event) {
            $event.stopPropagation();
            return _vm.closeMenu($event)
          }
        }
      })
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
  

  
  var _default = normalizeComponent_1(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$b,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    undefined,
    undefined
  );

/* script */
/* template */
var __vue_render__$d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "pleasure-layout-mobile-app" },
    [_vm._t("default")],
    2
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
  

  
  var mobileApp = normalizeComponent_1(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    {},
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    undefined,
    undefined
  );



var ui = /*#__PURE__*/Object.freeze({
  PleasureBackdrop: backdrop,
  PleasureFullHeightContainer: fullHeightContainer,
  PleasureHeadbar: headbar,
  PleasureLayoutDefault: _default,
  PleasureMenu: menu,
  PleasureMenuBars: menuBars,
  PleasureMenuItem: menuItem,
  PleasureLayoutMobileApp: mobileApp,
  PleasureTableEdit: PleasureTableEdit
});

Vue.use(VueI18n);

/**
 * @module vue-pleasure
 * @desc Implements a set of tools for {@link https://vuejs.org/ Vue.js} to use along the {@link pleasure/api The Pleasure Api}
 */

function install (Vue, { app, store, noCoerce = false } = {}) {
  Vue.prototype.$pleasureApiClient = pleasureApiClient;
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
    store.registerModule('pleasure', PleasureStore);
  }

  /*  const i18n = new VueI18n({
      locale: store.getters['pleasure/locale'],
      fallbackLocale: 'en',
      silentTranslationWarn: true,
      messages: {
        'en': require('~/locales/en.json'),
        'es': require('~/locales/es.json')
      }
    })

    Object.assign(app, { i18n })*/

  /*
    app.i18n.path = (link) => {
      if (app.i18n.locale === app.i18n.fallbackLocale) {
        return `/${link}`
      }

      return `/${app.i18n.locale}/${link}`
    }

    Vue.use(VueI18n)
  */

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

  if (!process.server) {
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

  Vue.mixin({
    components: Object.assign({}, ui, {
      pleasure
    }),
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
          }
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
      store.dispatch('pleasure/dropdownChanged', payload);
    });
  }
}

var pleasureUiVue = {
  install
};

export default pleasureUiVue;
export { pleasureApiClient };
