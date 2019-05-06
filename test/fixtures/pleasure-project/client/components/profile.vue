<template>
  <div class="pleasure-profile" v-if="$pleasure.user">
    {{$pleasure.user.fullName}} - <a @click="logout">Logout</a>
  </div>
</template>
<script>
  export default {
    methods: {
      logout () {
        return this.$pleasure.api.logout()
      }
    }
  }
</script>
<style lang="postcss">
  .pleasure-profile {
    padding: 20px 10px;
    background: var(--theme-profile-background);
  }
</style>
