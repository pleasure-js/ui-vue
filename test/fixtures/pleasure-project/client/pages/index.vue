<template>
  <div class="tests">
    <profile></profile>
    <pleasure
      v-if="!$pleasure.user"
      :cancelable="false"
      action-label="Login"
      :custom-schema="loginSchema"
      :login="true"
      :value="login"
      key="login"
    ></pleasure>
    <pleasure
      v-if="$pleasure.user"
      method="update"
      entity="user"
      action-label="Update"
      :cancelable="false"
      :entry-id="$pleasure.user._id"
      key="create"
    ></pleasure>
  </div>
</template>
<script>
  import Profile from '~/components/profile.vue'

  export default {
    mounted () {
      // console.log(this.$pleasure.api.product.on('create'))
      // window.$pleasureApi = this.$pleasure.api
      // console.log(this.$pleasure.api)
      /*this.$pleasure.api.product.on('create', function (product) {
        // console.log({ product })
      })*/
    },
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
