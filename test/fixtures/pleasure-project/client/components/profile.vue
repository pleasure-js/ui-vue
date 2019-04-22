<template>
  <div class="pleasure-profile" v-if="$pleasure.user">
    {{$pleasure.user.fullName}} - <a @click="$pleasure.api.logout()">Logout</a>
  </div>
</template>
<style lang="postcss">
  .pleasure-profile {
    padding: 20px 10px;
    background: var(--theme-profile-background);
  }
</style>
