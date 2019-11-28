<template>
  <div
    ref="bars"
    :class="cls"
  >
    <div/>
    <div/>
  </div>
</template>
<style lang="postcss">
  :root {
    --box: 30px;
    --line-height: 2px;
    --space: 8px;
  }

  ::placeholder {
    color: gray;
  }

  .menu-bars {
    transition: all .3s easeOutBack;
    transition-delay: .2s;
    display: block;
    left: 0;
    top: var(--menu-bars-top-gap);
    position: fixed;
    z-index: 110;
    width: var(--box);
    height: var(--box);
    margin: 15px 20px;
    cursor: pointer;

    &.side-navigation {
      transition-delay: .15s;
      transition: all .45s easeInBack;
      transform: translateX(calc(var(--menu-width) - 60px));
    }

    &.right {
      left: auto;
      right: 0;

      &.side-navigation {
        transform: translateX(calc((var(--menu-width) * -1) + 60px));
      }
    }

    &.center {
      left: 50%;
      transform: translateX(calc((var(--box) * -1) - 10px));
    }

    &.bottom {
      top: auto;
      bottom: var(--menu-bars-bottom-gap);
    }

    &.hide {
      opacity: 0 !important;
    }

    > div {
      display: block;
      position: absolute;
      height: var(--line-height);
      width: 100%;
      opacity: 1;
      left: 0;
      transition: all .3s ease-out 0s;
      transform-origin: 50% 50%;
      transform: rotate(0deg);
      background-color: var(--menu-bars-color);
      z-index: 2000;

      &:nth-child(1) {
        top: calc(calc(var(--box) / 3) + calc(var(--line-height) / -2));
      }

      &:nth-child(2) {
        top: calc(calc(var(--box) * 2 / 3) + calc(var(--line-height) / -2));
      }
    }

    &:hover {
      > div {
        background-color: var(--menu-bars-color-over);
      }
    }

    &.state-back {
      > div {
        width: 70%;

        &:nth-child(1) {
          top: calc(var(--box) / 2);
          transform-origin: 0 0;
          transform: rotate(-45deg);
        }

        &:nth-child(2) {
          top: calc(calc(var(--box) / 2) - var(--line-height));
          transform-origin: 0 100%;
          transform: rotate(45deg);
        }
      }
    }

    &.state-close {
      > div {
        top: calc(calc(var(--box) / 2) + calc(var(--line-height) / -2));
        transform-origin: 50% 50%;

        &:nth-child(1) {
          transform: rotate(-45deg);
        }

        &:nth-child(2) {
          transform: rotate(45deg);
        }
      }
    }
  }
</style>
<script>
  export default {
    props: {
      /**
       * Adds a gap between the bars and the viewport edge.
       */
      sideNavigation: {
        type: Boolean,
        default: false
      },
      state: {
        type: String,
        default: 'open'
      },
      xPosition: {
        type: String,
        default: 'left',
        validator: function (value) {
          // The value must match one of these strings
          return ['left', 'right', 'center'].indexOf(value) !== -1
        }
      },
      yPosition: {
        type: String,
        default: 'top',
        validator: function (value) {
          // The value must match one of these strings
          return ['top', 'bottom'].indexOf(value) !== -1
        }
      }
    },
    data () {
      return {
        theState: this.state,
        theSideNavigation: this.sideNavigation
      }
    },
    computed: {
      cls () {
        return {
          'menu-bars': true,
          'side-navigation': this.theSideNavigation,
          [this.xPosition]: true,
          [this.yPosition]: true,
          [`state-${ this.theState }`]: true
        }
      },
    },
    methods: {
      setState (s) {
        return this.theState = s
      },
      setSideNavigation (s) {
        return this.theSideNavigation = s
      }
    }
  }
</script>
