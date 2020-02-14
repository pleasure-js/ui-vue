<template>
  <pleasure
    :key="id"
    :entity="entity"
    :entry-id="entry"
    :value="value"
    method="update"
    :autoload="false"
  />
</template>
<script>
  import { ApiClient } from '@pleasure-js/api-client'

  const pleasureApiClient = ApiClient.instance()

  export default {
    async asyncData ({ route: { params: { entity, entry } } }) {
      console.log(`pleasure-update`, { entity, entry }, pleasureApiClient.accessToken)
      try {
        return {
          value: await pleasureApiClient.read(entity, entry),
          entity,
          entry
        }
      } catch (err) {
        console.log(`pleasure-update-error`, err)
        return {
          value: {},
          entity,
          entry
        }
      }
    },
    computed: {
      id () {
        return `${ this.entity }-${ this.entry }`
      }
    }
  }
</script>
