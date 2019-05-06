import pleasureClient from 'pleasure/src/ui/lib/pleasure-client'
import Vue from 'vue'
import objectHash from 'object-hash'
import defaults from 'lodash/defaults'
import forOwn from 'lodash/forOwn'

export const namespaced = true

export const state = {
  entitiesSync: 0, // 0 = not syncing, -1 = syncing, 1 = synced
  entitiesSchema: {},
  dropdown: {},
  settings: process.env.$pleasure.settings,
  dropdownLoading: [],
  user: null,
  locales: ['en', 'es'],
  locale: 'en'
}

export const mutations = {
  setLocale (state, locale) {
    state.locale = locale
  },
  setDropdownLoading (state, id) {
    if (state.dropdownLoading.indexOf(id) < 0) {
      state.dropdownLoading.push(id)
    }
  },
  removeDropdownLoading (state, id) {
    state.dropdownLoading.splice(state.dropdownLoading.indexOf(id), 1)
  },
  setUser (state, user) {
    Vue.set(state, 'user', user)
  },
  setEntitiesSync (state, entitiesSync) {
    Vue.set(state, 'entitiesSync', entitiesSync)
  },
  setEntitiesSchema (state, entitiesSchema) {
    forOwn(entitiesSchema, (entity) => {
      forOwn(entity, (field) => {
        defaults(field, { $pleasure: {} })
      })
    })
    Vue.set(state, 'entitiesSchema', entitiesSchema)
  },
  setDropdown (state, { dropdownName, results }) {
    console.log(`setting dropdown`, { dropdownName, results })
    Vue.set(state.dropdown, dropdownName, results)
  }
}

/**
 * @function store/dropdown
 * @params {Object} options
 * @param options.entity
 * @param listOptions
 * @param name
 * @param force
 * @return {Promise<*>}
 */

export const actions = {
  changeUserProfile ({ commit }, user) {
    return commit('setUser', user)
  },
  async locale ({ commit }, locale) {
    commit('setlocale', locale)
  },
  async loadDropdown ({ commit, state }, { entity, listOptions, name, force = false } = {}) {
    const dropdownName = entity || name
    const id = objectHash({ entity, listOptions, dropdownName })

    if (state.dropdownLoading.indexOf(id) >= 0) {
      return
    }

    console.log(`load dropdown`)

    if (!force && state.dropdown[dropdownName]) {
      return state.dropdown[dropdownName]
    }

    commit('setDropdownLoading', id)
    const results = await pleasureClient.list(entity, listOptions)
    commit('setDropdown', { dropdownName, results })
    commit('removeDropdownLoading', id)
    return results
  },
  logout () {
    return pleasureClient.logout()
  },
  async syncEntities ({ commit, state }, { force = false } = {}) {
    if (!force && state.entitiesSync !== 0) {
      return
    }

    commit('setEntitiesSync', -1)
    let entities

    try {
      entities = await pleasureClient.getEntities()
    } catch (err) {
      commit('setEntitiesSync', 0)
      console.log(`Could not retrieve entities`, err.message)
      return
    }

    commit('setEntitiesSchema', entities)
    commit('setEntitiesSync', 1)
  }
}

export const getters = {
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
}
