import pleasure from './pleasure.vue'
import pleasureClient from 'pleasure/src/ui/lib/pleasure-client'
import * as PleasureStore from './lib/pleasure-store.js'
import { BrowserStorageCache } from './lib/browser-storage-cache'
import CoercePropsMixin from 'vue-coerce-props'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'

export function install (Vue, { app, store, noCoerce = false } = {}) {
  if (!store) {
    console.log(`VUEX store NOT provided`)
    Vue.use(Vuex)
    store = new Vuex.Store({
      modules: {
        pleasure: PleasureStore
      }
    })
    // throw new Error('Please provide vuex store.')
  } else {
    console.log(`VUEX store provided`)
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

    // Vue.$pleasure = pleasureClient
    pleasureClient
      .cache(storageCache)

    pleasureClient
      .on('logout', () => {
        storageCache.clearAll()
      })
  }

  pleasureClient
    .on('login', (user) => {
      store.commit('pleasure/setUser', user)
    })

  if (!noCoerce) {
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
        return {
          api: pleasureClient,
          settings: this.$store.getters['pleasure/settings'],
          dropdown: this.$store.getters['pleasure/dropdown'],
          entities: this.$store.getters['pleasure/entities']
        }
      }
    }
  })
  if (!process.server) {
    store.dispatch('pleasure/syncEntities')
  }
}
