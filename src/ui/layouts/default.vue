<template>
  <div class="mobile-app">
    <pleasure-menu-bars
      ref="bars"
      :x-position="menuPosition"
      :y-position="headbarPosition"
      v-touch:swipe[openMenuGesture].prevent="openMenu"
      v-touch:swipe[closeMenuGesture].prevent="closeMenu"
      v-touch:tap.prevent="toggleMenu"
    />
    <pleasure-menu
      ref="menu"
      :items="menuItems"
      :position="menuPosition"
      v-touch:swipe[closeMenuGesture].prevent="closeMenu"
      @opened="menuOpened = true"
      @closed="menuOpened = false"
    >
      <slot name="menu-head" slot="head"></slot>
    </pleasure-menu>
    <pleasure-headbar
      :class="{ 'pleasure-headbar-opener': true, opened: menuOpened }"
      :position="headbarPosition"
    >
      <slot name="menu-headbar" slot="head"></slot>
    </pleasure-headbar>
    <div :class="{ 'headbar-background': true, [headbarPosition]: true }"/>
    <div :class="{ 'mobile-app-body': true, 'pleasure-opener': true, opened: menuOpened }">
      <pleasure-layout-mobile-app :headbar-position="headbarPosition">
        <slot><h1>Always our Pleasure!</h1></slot>
      </pleasure-layout-mobile-app>
    </div>
    <pleasure-backdrop
      class="menu-backdrop"
      ref="backdrop"
      v-touch:swipe[closeMenuGesture].prevent.stop="closeMenu"
      v-touch:swipe.top.prevent.stop
      v-touch:swipe.bottom.prevent.stop
      v-touch:tap.stop="closeMenu"
    />
  </div>
</template>
<style lang="postcss">
  .headbar-background {
    position: fixed;
    top: 0;
    width: 100vw;
    height: var(--headbar-height);
    background: var(--headbar-background);
    z-index: 89;
    left: 0;

    &.bottom {
      top: auto;
      bottom: 0;
    }
  }
</style>
<script>
  export default {
    props: {
      menuItems: {
        type: Array,
        default () {
          return [
            {
              name: 'Hello'
            },
            {
              name: 'My'
            },
            {
              name: 'Friend',
              children: [
                {
                  name: 'Martin'
                }
              ]
            }
          ]
        }
      },
      headbarPosition: {
        type: String,
        default: 'top'
      },
      menuPosition: {
        type: String,
        default: 'left'
      }
    },
    data () {
      return {
        menuOpened: false
      }
    },
    watch: {
      $route () {
        this.closeMenu()
      }
    },
    computed: {
      openMenuGesture () {
        return this.menuPosition === 'left' ? 'right' : (this.menuPosition === 'center' ? 'up' : 'left')
      },
      closeMenuGesture () {
        return this.menuPosition === 'left' ? 'left' : (this.menuPosition === 'center' ? 'bottom' : 'right')
      }
    },
    mounted () {
      window.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
          this.closeMenu()
        }
      })
      this.$pleasure.bus.$on('menu-close', () => {
        this.closeMenu()
      })
    },
    methods: {
      openMenu () {
        this.$refs.bars.setState('close')
        this.$refs.bars.setSideNavigation(true)
        this.$refs.backdrop.open({ full: true })
        this.$refs.menu.open()
      },
      closeMenu () {
        this.$refs.bars.setState('open')
        this.$refs.bars.setSideNavigation(false)
        this.$refs.backdrop.close()
        this.$refs.menu.close()
      },
      toggleMenu () {
        const open = this.$refs.menu.toggle()
        if (open) {
          this.openMenu()
        } else {
          this.closeMenu()
        }
      }
    }
  }
</script>
