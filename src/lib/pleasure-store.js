import client from './client.js'
import Vue from 'vue'
import objectHash from 'object-hash'
import defaults from 'lodash/defaults'
import forOwn from 'lodash/forOwn'
import find from 'lodash/find'
import get from 'lodash/get'
import merge from 'deepmerge'

export const strict = true
export const namespaced = true

export const state = () => {
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
    const newState = state.dropdownLoading.filter(needle => needle !== id)
    Vue.set(state, 'dropdownLoading', newState)
  },
  setUser (state, user) {
    Vue.set(state, 'user', user)
  },
  setEntitiesSync (state, entitiesSync) {
    Vue.set(state, 'entitiesSync', entitiesSync)
  },
  setEntitiesSchema (state, entitiesSchema) {
    forOwn(entitiesSchema, (entity) => {
      forOwn(entity, (field, fieldName) => {
        if (!/^\$/.test(fieldName)) {
          defaults(field, { $pleasure: {} })
        }
      })
    })
    Vue.set(state, 'entitiesSchema', entitiesSchema)
  },
  setDropdown (state, { dropdownName, results, listOptions }) {
    console.log(`setDropdown`, JSON.stringify({ dropdownName, results, listOptions, state }, null, 2))
    Vue.set(state.dropdown, dropdownName, results)
    Vue.set(state.dropdownMeta, dropdownName, listOptions)
  },
  updateDropdown (state, { entity, modified, id }) {
    const set = get(state, `dropdown.${ entity }`)
    const localEntry = find(set, { _id: id })

    if (!localEntry) {
      return
    }

    const final = merge(localEntry, modified)
    Vue.set(set, set.indexOf(localEntry), final)
  },
  clearDropdowns (state) {
    Object.keys(state.dropdown).forEach(dropdown => {
      Vue.set(state.dropdown, dropdown, undefined)

    })
    // Vue.set(state, 'dropdown', {})
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
  async dropdownChanged ({ commit }, payload = {}) {
    return commit('updateDropdown', payload)
  },
  async loadDropdown (store, { entity, listOptions, name, force = false, req } = {}) {
    const { commit, state } = store
    const pleasureApiClient = client()
    pleasureApiClient.debug(true)

    if (process.server && req) {
      const Cookies = require('cookies')
      const accessToken = new Cookies(req).get('accessToken')
      pleasureApiClient.setCredentials({ accessToken })
    }

    const dropdownName = entity || name
    const id = objectHash({ entity, listOptions, dropdownName })

    if (state.dropdownLoading.indexOf(id) >= 0) {
      return
    }

    if (!force && state.dropdown[dropdownName]) {
      return state.dropdown[dropdownName]
    }

    commit('setDropdownLoading', id)

    let results
    let err

    try {
      results = await pleasureApiClient.list(entity, listOptions)
      console.log(`results = await pleasureApiClient.list(entity, listOptions)`, results)
    } catch (e) {
      err = e
    }

    commit('setDropdown', { dropdownName, results, listOptions })
    commit('removeDropdownLoading', id)

    if (err) {
      throw err
    }

    return results
  },
  clearDropdowns ({ commit, state }, { req } = {}) {
    return commit('clearDropdowns')
  },
  logout () {
    return client().logout()
  },
  async syncEntities ({ commit, state }, { force = false } = {}) {
    if (!force && state.entitiesSync !== 0) {
      return
    }

    const pleasureApiClient = client()
    pleasureApiClient.debug(true)

    commit('setEntitiesSync', -1)
    let entities

    try {
      entities = await pleasureApiClient.getEntities()
    } catch (err) {
      commit('setEntitiesSync', 0)
      // console.log(`Could not retrieve entities`, err.message)
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
}
