<template>
  <div
    ref="backdrop"
    :class="classes"
    :style="{ 'z-index': zIndex }"
  />
</template>
<style lang="postcss">
  .back-drop {
    display: block;
    position: fixed;
    background: rgba(#000, .8);
    top: var(--headbar-height);
    left: 0;
    width: 100vw;
    bottom: 0;
    opacity: 0;
    transition: opacity .4s ease-in-out;
    pointer-events: none;

    &.full {
      top: 0;
    }

    &.on {
      pointer-events: all;
      opacity: 1;
    }
  }
</style>
<script>
  import { bus } from '../lib/bus.js'

  export default {
    props: {
      initialZIndex: {
        type: Number,
        default: 99
      }
    },
    data () {
      return {
        on: false,
        full: false,
        zIndex: this.initialZIndex,
        bindedResetFullState: this.resetFullState.bind(this)
      }
    },
    computed: {
      classes () {
        return {
          'back-drop': true,
          full: this.full,
          on: this.on
        }
      }
    },
    mounted () {
      bus.$on('backdrop-on', this.open.bind(this))
      bus.$on('backdrop-off', this.close.bind(this))
      bus.$on('backdrop-toggle', this.toggle.bind(this))
    },
    methods: {
      resetFullState () {
        console.log(`resetFullState`)
        this.full = false
      },
      open ({ zIndex, full } = {}) {
        this.$refs.backdrop.removeEventListener('animationend', this.bindedResetFullState)
        this.on = true
        this.zIndex = zIndex || this.initialZIndex
        this.full = !!full
      },
      close ({ zIndex } = {}) {
        this.$refs.backdrop.addEventListener('animationend', this.bindedResetFullState, { once: true })

        this.on = false
        this.zIndex = zIndex || this.initialZIndex
      },
      toggle (payload) {
        if (this.on) {
          this.close(payload)
        } else {
          this.open(payload)
        }
      }
    }
  }
</script>
