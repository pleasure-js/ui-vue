import Cookies from 'js-cookie'
import { PleasureApiClient } from 'pleasure-api-client'

const clientPayload = {}

// console.log(`pleasure-ui-vue/client`)
if (process.client && Cookies.get('accessToken')) {
  // auto load accessToken
  console.log(`auto loading access token`, Cookies.get('accessToken'))
  clientPayload.accessToken = Cookies.get('accessToken')
}

export default PleasureApiClient.instance(clientPayload)
