/*!
 * vue-pleasure v1.0.0
 * (c) 2018-2019 Martin Rafael Gonzalez <tin@devtin.io>
 * Released under the MIT License.
 */
var VuePleasure = (function (exports, forOwn, kebabCase, startCase, get$1, defaults, utils, merge, pleasureClient, Vue, objectHash, CoercePropsMixin, Vuex, vueI18n) {
  'use strict';

  forOwn = forOwn && forOwn.hasOwnProperty('default') ? forOwn['default'] : forOwn;
  kebabCase = kebabCase && kebabCase.hasOwnProperty('default') ? kebabCase['default'] : kebabCase;
  startCase = startCase && startCase.hasOwnProperty('default') ? startCase['default'] : startCase;
  get$1 = get$1 && get$1.hasOwnProperty('default') ? get$1['default'] : get$1;
  defaults = defaults && defaults.hasOwnProperty('default') ? defaults['default'] : defaults;
  utils = utils && utils.hasOwnProperty('default') ? utils['default'] : utils;
  merge = merge && merge.hasOwnProperty('default') ? merge['default'] : merge;
  pleasureClient = pleasureClient && pleasureClient.hasOwnProperty('default') ? pleasureClient['default'] : pleasureClient;
  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
  objectHash = objectHash && objectHash.hasOwnProperty('default') ? objectHash['default'] : objectHash;
  CoercePropsMixin = CoercePropsMixin && CoercePropsMixin.hasOwnProperty('default') ? CoercePropsMixin['default'] : CoercePropsMixin;
  Vuex = Vuex && Vuex.hasOwnProperty('default') ? Vuex['default'] : Vuex;
  vueI18n = vueI18n && vueI18n.hasOwnProperty('default') ? vueI18n['default'] : vueI18n;

  //
  //
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
        type: [Number, Boolean, String, Object, Array],
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

        return Object.assign({}, this.$props, childProps, get$1(this.field, '$pleasure', {}))
      },
      componentType () {
        // Arrays -> 'select'
        if (
          (
            this.field.enumValues &&
            this.field.enumValues.length > 0
          ) ||
          this.field.instance === 'Array'
        ) {
          return 'array'
        }

        return 'input'
      },
      fieldComponent () {
        switch (this.componentType) {
          case 'array':
            return 'pleasure-select'

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

    const { randomUniqueId } = utils;

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
     */
    var script$4 = {
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
            console.log(`coercing`, ...args);
            console.log(`coercing>>>`, this.i18nScope, this.entity);
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
        }
      },
      data () {
        return {
          componentWrapper: 'el-form-item',
          values: merge.all([this.values || {}, this.value]),
          formId: randomUniqueId(),
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
            // skip if it's virtual or starts with an underscore
            if (/^_/.test(fieldName) || get$1(field, 'options.options.virtual') || this.omit.indexOf(fieldName) >= 0) {
              console.log(`skipping`, { fieldName });
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
            this.$emit('input', v);
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
            this.i18nScope ? `${this.i18nScope}.placeholder.${i18nLabel}` : null,
            this.i18nScope ? `${this.i18nScope}.${i18nLabel}` : null,
            `placeholders.${i18nLabel}`
          ].filter(v => !!v);

          const label = [
            this.i18nScope ? `${this.i18nScope}.label.${i18nLabel}` : null,
            this.i18nScope ? `${this.i18nScope}.${i18nLabel}` : null,
            `labels.${i18nLabel}`
          ].filter(v => !!v);

          const legacy = {
            $pleasure: {}
          };

          field = defaults(field, legacy);

          if (!field.$pleasure.label && this.guessLabel) {
            field.$pleasure.label = startCase(field.path);
          }

          if (!field.$pleasure.placeholder && this.guessPlaceholder) {
            field.$pleasure.placeholder = startCase(field.path);
          }

          if (this.autoLabelI18n) {
            field.$pleasure.label = this.plsi18n(label, field.$pleasure.label);
          }

          if (this.autoPlaceholderI18n) {
            field.$pleasure.placeholder = this.plsi18n(placeholder, field.$pleasure.placeholder);
          }

          return field
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
              await this.$pleasure.api.login(this.values);
            } else {
              // other operations
              await this.performSubmit();
            }
          } catch (err) {
            this.$pleasure.error(err.message);
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
      { staticClass: "pleasure" },
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
    

    
    var pleasure = normalizeComponent_1(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      undefined,
      undefined
    );

  const namespaced = true;

  const state = {
    entitiesSync: 0, // 0 = not syncing, -1 = syncing, 1 = synced
    entitiesSchema: {},
    dropdown: {},
    settings: process.env.$pleasure.settings,
    dropdownLoading: [],
    user: null,
    locales: ['en', 'es'],
    locale: 'en'
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
      state.dropdownLoading.splice(state.dropdownLoading.indexOf(id), 1);
    },
    setUser (state, user) {
      Vue.set(state, 'user', user);
    },
    setEntitiesSync (state, entitiesSync) {
      Vue.set(state, 'entitiesSync', entitiesSync);
    },
    setEntitiesSchema (state, entitiesSchema) {
      forOwn(entitiesSchema, (entity) => {
        forOwn(entity, (field) => {
          defaults(field, { $pleasure: {} });
        });
      });
      Vue.set(state, 'entitiesSchema', entitiesSchema);
    },
    setDropdown (state, { dropdownName, results }) {
      console.log(`setting dropdown`, { dropdownName, results });
      Vue.set(state.dropdown, dropdownName, results);
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
    async loadDropdown ({ commit, state }, { entity, listOptions, name, force = false } = {}) {
      const dropdownName = entity || name;
      const id = objectHash({ entity, listOptions, dropdownName });

      if (state.dropdownLoading.indexOf(id) >= 0) {
        return
      }

      console.log(`load dropdown`);

      if (!force && state.dropdown[dropdownName]) {
        return state.dropdown[dropdownName]
      }

      commit('setDropdownLoading', id);
      const results = await pleasureClient.list(entity, listOptions);
      commit('setDropdown', { dropdownName, results });
      commit('removeDropdownLoading', id);
      return results
    },
    logout () {
      return pleasureClient.logout()
    },
    async syncEntities ({ commit, state }, { force = false } = {}) {
      if (!force && state.entitiesSync !== 0) {
        return
      }

      commit('setEntitiesSync', -1);
      let entities;

      try {
        entities = await pleasureClient.getEntities();
      } catch (err) {
        commit('setEntitiesSync', 0);
        console.log(`Could not retrieve entities`, err.message);
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
    }
  };

  var PleasureStore = /*#__PURE__*/Object.freeze({
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

  /**
   * @module vue-pleasure
   * @desc Implements a set of tools for {@link https://vuejs.org/ Vue.js} to use along the {@link pleasure/api The Pleasure Api}
   */

  function install (Vue, { app, store, noCoerce = false } = {}) {
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

    /*
      app.i18n = new VueI18n({
        locale: store.state.pleasure.locale,
        fallbackLocale: 'en',
        messages: {
          'en': require('~/locales/en.json'),
          'es': require('~/locales/es.json')
        }
      })
    */

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

    if (!process.server) {
      const storageCache = new BrowserStorageCache();

      const sessionChanged = async () => {
        storageCache.clearAll();
        await store.dispatch('pleasure/syncEntities');
      };

      // Vue.$pleasure = pleasureClient
      pleasureClient
        .cache(storageCache);

      pleasureClient
        .on('logout', sessionChanged);

      pleasureClient
        .on('login', sessionChanged);
    }

    pleasureClient
      .on('login', (user) => {
        store.commit('pleasure/setUser', user);
      });

    pleasureClient
      .on('logout', () => {
        store.commit('pleasure/setUser', null);
      });

    if (!noCoerce) {
      console.log(`enabling coerce`);
      Vue.mixin(CoercePropsMixin);
    }

    Vue.mixin({
      components: {
        pleasure
      },
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
                message,
                type: 'error'
              });
            },
            api: pleasureClient,
            settings: store.getters['pleasure/settings'],
            dropdown: store.getters['pleasure/dropdown'],
            entities: store.getters['pleasure/entities'],
            user: store.getters['pleasure/user']
          }
        }
      }
    });

    pleasureClient.on('profile-update', user => {
      store.dispatch('pleasure/changeUserProfile', user);
    });

    if (!process.server) {
      store.dispatch('pleasure/syncEntities');
    }
  }

  exports.install = install;

  return exports;

}({}, forOwn, kebabCase, startCase, get$1, defaults, utils, merge, pleasureClient, Vue, objectHash, CoercePropsMixin, Vuex, vueI18n));
