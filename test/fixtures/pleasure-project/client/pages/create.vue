<template>
  <div class="tests">
    <pleasure
      key="create-user"
      entity="user"
      :omit="['level']"
    />
  </div>
</template>
<script>
  export default {
    data () {
      return {
        login: {
          email: ``,
          password: ``
        },
        loginSchema: {
          email: {
            instance: String
          },
          password: {
            instance: String,
            options: {
              type: 'password'
            }
          }
        }
      }
    }
  }
</script>
