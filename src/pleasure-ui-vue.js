import pleasure from './pleasure.vue'
import * as PleasureStore from './lib/pleasure-store.js'
import { BrowserStorageCache } from './lib/browser-storage-cache'
import CoercePropsMixin from 'vue-coerce-props'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import Vue from 'vue'
import Cookies from 'js-cookie'
import './pleasure.pcss'
import * as ui from './ui/index.js'
import { bus } from './lib/bus.js'
import pleasureApiClient from './lib/client.js'

export { pleasureApiClient }

Vue.use(VueI18n)

/**
 * @module vue-pleasure
 * @desc Implements a set of tools for {@link https://vuejs.org/ Vue.js} to use along the {@link pleasure/api The Pleasure Api}
 */

function install (Vue, { app, store, noCoerce = false } = {}) {
  Vue.prototype.$pleasureApiClient = pleasureApiClient
  if (!store) {
    Vue.use(Vuex)
    store = new Vuex.Store({
      modules: {
        pleasure: PleasureStore
      }
    })
    // throw new Error('Please provide vuex store.')
  } else {
    // register your own vuex module
    store.registerModule('pleasure', PleasureStore)
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
      Cookies.set('accessToken', pleasureApiClient.accessToken)
      store.commit('pleasure/setUser', user)
    })

  pleasureApiClient
    .on('logout', () => {
      Cookies.remove('accessToken')
      store.commit('pleasure/setUser', null)
    })

  if (!process.server) {
    const storageCache = new BrowserStorageCache()

    const sessionChanged = () => {
      storageCache.clearAll()
      store.dispatch('pleasure/clearDropdowns')
      return store.dispatch('pleasure/syncEntities')
    }

    // Vue.$pleasure = pleasureApiClient
    pleasureApiClient
      .cache(storageCache)

    pleasureApiClient
      .on('logout', sessionChanged)

    pleasureApiClient
      .on('login', sessionChanged)
  }

  if (!noCoerce) {
    // console.log(`enabling coerce`)
    Vue.mixin(CoercePropsMixin)
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
        const $this = this
        return {
          error (message) {
            $this.$message({
              message: $this.$t(message),
              type: 'error'
            })
          },
          api: pleasureApiClient,
          settings: store.getters['pleasure/settings'],
          dropdown: store.getters['pleasure/dropdown'],
          entities: store.getters['pleasure/entities'],
          user: store.getters['pleasure/user'],
          setHeadbarTitle (title) {
            bus.$emit('pleasure-headbar', { exec: ['setTitle', title] })
          }
        }
      }
    }
  })

  pleasureApiClient.on('profile-update', user => {
    // console.log(`updating profile`, { user })
    store.dispatch('pleasure/changeUserProfile', user)
  })

  if (process.client) {
    store.dispatch('pleasure/syncEntities')

    // keep store synced
    pleasureApiClient.on('update', (payload) => {
      store.dispatch('pleasure/dropdownChanged', payload)
    })
  }
}

export default {
  install
}
