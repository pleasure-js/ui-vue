import * as pleasure from '@pleasure-js/ui-vue'
import Vue from 'vue'

export default function ({ app, store }) {
  Vue.use(pleasure, { store, app })
}
