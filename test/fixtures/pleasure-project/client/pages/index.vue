<template>
  <div class="tests">
    <profile />
    <pleasure
      v-if="!$pleasure.user"
      key="login"
      :cancelable="false"
      action-label="Login"
      :custom-schema="loginSchema"
      :login="true"
      :value="login"
    />
    <pleasure
      v-if="$pleasure.user"
      key="create"
      method="update"
      entity="user"
      action-label="Update"
      :cancelable="false"
      :entry-id="$pleasure.user._id"
    />
  </div>
</template>
<script>
  import Profile from '~/components/profile.vue'

  export default {
    components: {
      Profile
    },
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
