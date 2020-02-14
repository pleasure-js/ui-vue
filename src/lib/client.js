import Cookies from 'js-cookie'
import { ApiClient } from '@pleasure-js/api-client'

export default function getClient () {
// console.log(`ui-vue/client`)
  let accessToken
  const client = ApiClient.instance()

  if (process.client && (accessToken = Cookies.get('accessToken'))) {
    if (!client.token) {
      // auto load accessToken
      console.log(`auto loading access token`, Cookies.get('accessToken'))
      // todo: load refreshToken
      const { accessToken: savedAccessToken, refreshToken } = client.savedCredentials()

      const clientPayload = {
        accessToken: Cookies.get('accessToken'),
        refreshToken: savedAccessToken === accessToken ? refreshToken : null
      }
      client.setCredentials(clientPayload)
    }
  }
  return client
}
