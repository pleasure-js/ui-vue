<template>
  <div class="pleasure-date-time">
    <pleasure
      :custom-schema="schema"
      :with-controls="false"
      @input="$emit('input', $event)"
    />
  </div>
</template>
<script>
  const availableHours = []

  const pm = ['AM', 'PM']

  pm.forEach(amPm => {
    for (let i = 1; i <= 12; i++) {
      availableHours.push(`${ i }${ amPm }`)
    }
  })

  export default {
    props: {
      value: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        schema: {
          date: {
            component: 'Date',
            $pleasure: {
              label: ''
            }
          },
          time: {
            enumValues: availableHours,
            $pleasure: {
              label: ''
            }
          }
        }
      }
    }
  }
</script>
