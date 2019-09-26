<template>
  <header class="headbar">
    <slot name="default">
      <h1 v-if="title">
        {{ title }}
      </h1>
    </slot>
  </header>
</template>
<style lang="postcss">
  .headbar {
    position: fixed;
    top: 0;
    width: 100vw;
    height: var(--headbar-height);
    background: var(--headbar-background);
    z-index: 90;

    h1 {
      text-align: center;
      margin: 0;
      height: var(--headbar-height);
      line-height: var(--headbar-height);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--headbar-title-color);
    }
  }
</style>
<script>
  import { bus } from '../lib/bus.js'

  export default {
    props: {
      mainTitle: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        title: this.mainTitle
      }
    },
    watch: {
      $route () {
        this.setTitle(this.mainTitle)
      }
    },
    mounted () {
      bus.$on('pleasure-headbar', ({ exec }) => {
        exec && this[exec[0]](...exec.slice(1))
      })
    },
    methods: {
      setTitle (title) {
        this.title = title
      }
    }
  }
</script>
