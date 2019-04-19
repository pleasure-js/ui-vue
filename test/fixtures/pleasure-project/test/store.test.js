import test from 'ava'
import '../../../tools/web-server.js'
import { getConfig, api, ui } from '../../../../' // pleasure

const { api: pleasureClient } = ui

let dummyUser

process.on('dummy-user', du => dummyUser = du)

test.beforeEach(async t => {
  return pleasureClient.logout()
})

test(`Only admins can create products`, async t => {
  t.throwsAsync(() => {
    return pleasureClient
  })
  await pleasureClient.login({
    email: 'tin@devtin.io',
    password: 'aVeryStrongPassword123:)'
  })
})
