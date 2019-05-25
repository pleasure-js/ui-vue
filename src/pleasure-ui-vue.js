import pleasure from './pleasure.vue'
import { PleasureApiClient } from 'pleasure-api-client'
import * as PleasureStore from './lib/pleasure-store.js'
import { BrowserStorageCache } from './lib/browser-storage-cache'
import CoercePropsMixin from 'vue-coerce-props'
import Vuex from 'vuex'
import './pleasure.pcss'

const pleasureApiClient = PleasureApiClient.instance()

/**
 * @module vue-pleasure
 * @desc Implements a set of tools for {@link https://vuejs.org/ Vue.js} to use along the {@link pleasure/api The Pleasure Api}
 */

export function install (Vue, { app, store, noCoerce = false } = {}) {
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
    const storageCache = new BrowserStorageCache()

    const sessionChanged = async () => {
      storageCache.clearAll()
      await store.dispatch('pleasure/syncEntities')
    }

    // Vue.$pleasure = pleasureApiClient
    pleasureApiClient
      .cache(storageCache)

    pleasureApiClient
      .on('logout', sessionChanged)

    pleasureApiClient
      .on('login', sessionChanged)
  }

  pleasureApiClient
    .on('login', (user) => {
      store.commit('pleasure/setUser', user)
    })

  pleasureApiClient
    .on('logout', () => {
      store.commit('pleasure/setUser', null)
    })

  if (!noCoerce) {
    console.log(`enabling coerce`)
    Vue.mixin(CoercePropsMixin)
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
        const $this = this
        return {
          error (message) {
            $this.$message({
              message,
              type: 'error'
            })
          },
          api: pleasureApiClient,
          settings: store.getters['pleasure/settings'],
          dropdown: store.getters['pleasure/dropdown'],
          entities: store.getters['pleasure/entities'],
          user: store.getters['pleasure/user']
        }
      }
    }
  })

  pleasureApiClient.on('profile-update', user => {
    console.log(`updating profile`, { user })
    store.dispatch('pleasure/changeUserProfile', user)
  })

  if (!process.server) {
    store.dispatch('pleasure/syncEntities')
  }
}
