export default async function ({ store }) {
  // todo: move to nuxt module
  await store.dispatch(`pleasure/syncEntities`)
  await store.dispatch(`pleasure/loadDropdown`, { entity: 'product' })
}
