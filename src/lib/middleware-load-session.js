// IMPORTANT
// DO NOT DELETE

/*
Could not find a way from the nuxt module to hook a middleware without placing the file in the middleware folder.
It would be nice to solve this for a cleaner implementation.
 */

import { pleasureApiClient } from '@pleasure-js/ui-vue'

export default async function ({ store, req }) {
  if (process.server && req.$pleasure.cookies && req.$pleasure.cookies.accessToken) {
    pleasureApiClient.setCredentials({ accessToken: req.$pleasure.cookies.accessToken })
  }

  if (process.server && req.$pleasure.user) {
    store.commit('pleasure/setUser', req.$pleasure.user)
  }

  await store.dispatch(`pleasure/syncEntities`)
}
