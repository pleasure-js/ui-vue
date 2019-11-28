<template>
  <div :class="cls">
    <slot name="head"></slot>
    <el-menu>
      <pleasure-menu-item
        v-for="(item, itemIndex) in items"
        :key="`menu-${ itemIndex }`"
        :index="`menu-${itemIndex}`"
        :item="item"
      />
    </el-menu>
  </div>
</template>
<style lang="postcss">
  .menu {
    top: 0;
    left: 0;
    position: fixed;
    overflow: hidden;
    height: 100vh;
    background: var(--menu-background);
    width: var(--menu-width);
    transform: translateX(calc(var(--menu-width) * -1));
    padding-top: var(--headbar-height);
    box-sizing: border-box;
    z-index: 100;
    transition: transform 0.2s easeOutCubic;
    transition-delay: 0s;
    user-select: none;

    .el-menu {
      background: transparent;
    }

    &.right {
      left: auto;
      right: 0;
      transform: translateX(calc(var(--menu-width)));
    }

    &.center {
      top: auto;
      bottom: 0;
      width: 100%;
      height: auto;
      max-height: 75vh;
      transform: translateY(100%);
      padding-top: 0;
      padding-bottom: calc(var(--headbar-height) + var(--menu-bars-bottom-gap));

      &.open {
        transform: translateY(0);
        transition-delay: 0s;
      }
    }

    &.open {
      transform: translateX(0);
      transition: transform 0.3s easeOutSine;
      transition-delay: .45s;
    }

    .el-menu {
      border-right: none;
    }
  }
</style>
<script>
  export default {
    /**
     * Initial state of the menu
     */
    props: {
      opened: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default: null
      },
      position: {
        type: String,
        default: 'left',
        validator: function (value) {
          // The value must match one of these strings
          return ['left', 'right', 'center'].indexOf(value) !== -1
        }
      }
    },
    data () {
      return {
        isOpen: this.opened,
      }
    },
    computed: {
      cls () {
        return {
          menu: true,
          open: this.isOpen,
          [this.position]: true
        }
      }
    },
    watch: {
      isOpen (v) {
        this.$emit(v ? 'opened' : 'closed')
      }
    },
    methods: {
      toggle () {
        return this.isOpen = !this.isOpen
      },
      close () {
        this.isOpen = false
      },
      open () {
        this.isOpen = true
      }
    }
  }
</script>
