<template>
  <div class="entities">
    <pleasure
      v-if="$pleasure"
      :custom-schema="pickEntitySchema"
      :with-controls="false"
      i18n-scope="entities"
      @input="entity = $event.entity"
    >
    </pleasure>
    <pleasure
      v-if="entity"
      :key="`edit-${entity}`"
      :entity="entity"
    >
    </pleasure>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        entity: null
      }
    },
    computed: {
      pickEntitySchema () {
        return {
          entity: {
            path: 'entity',
            enumValues: Object.keys(this.$pleasure.entities),
            $pleasure: {
              label: `Entity`,
              placeholder: `Select Entity`
            }
          }
        }
      }

    }
  }
</script>
