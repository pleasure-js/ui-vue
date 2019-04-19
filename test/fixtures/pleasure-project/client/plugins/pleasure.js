import * as pleasure from 'vue-pleasure'
import Vue from 'vue'

export default async function ({ app, store }) {
  Vue.use(pleasure, { store, app })
}
