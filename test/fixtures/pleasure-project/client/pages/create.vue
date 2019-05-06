<template>
  <div class="tests">
    <pleasure
      entity="user"
      :omit="['level']"
      key="create-user"
    ></pleasure>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        login: {
          email: `acsosa2@gmail.com`,
          password: `anita123`
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
