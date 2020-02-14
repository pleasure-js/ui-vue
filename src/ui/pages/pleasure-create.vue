<template>
  <pleasure
    :key="id"
    :entity="entity"
    method="create"
  />
</template>
<script>
  export default {
    data () {
      const { entity } = this.$route.params

      return {
        entity,
      }
    },
    computed: {
      id () {
        return `${ this.entity }-${ this.entry }`
      }
    }
  }
</script>
