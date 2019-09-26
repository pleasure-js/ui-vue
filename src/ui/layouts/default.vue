<template>
  <div class="mobile-app">
    <pleasure-menu-bars
      ref="bars"
      @click.native="toggleMenu"
    />
    <pleasure-menu
      ref="menu"
      :items="menuItems"
      @opened="menuOpened = true"
      @closed="menuOpened = false"
    >
      <slot name="menu-head" slot="head"></slot>
    </pleasure-menu>
    <pleasure-headbar :class="{ 'pleasure-headbar-opener': true, opened: menuOpened }" />
    <div class="headbar-background" />
    <div :class="{ 'mobile-app-body': true, 'pleasure-opener': true, opened: menuOpened }">
      <pleasure-layout-mobile-app>
        <slot><h1>Always our Pleasure!</h1></slot>
      </pleasure-layout-mobile-app>
    </div>
    <pleasure-backdrop
      ref="backdrop"
      @click.native.stop="closeMenu"
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
  }

  .pleasure-opener {
    transition: all .3s easeOutBack;
    transition-delay: 0s;

    &.opened {
      transform: translateX(var(--menu-width));
      transition: transform 0.3s easeOutSine;
      transition-delay: .45s;
    }
  }

  .pleasure-headbar-opener {
    transition: all .3s easeOutBack;
    transition-delay: .2s;

    &.opened {
      transition-delay: .15s;
      transition: all .45s easeInBack;
      transform: translateX(var(--menu-width));
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
    mounted () {
      window.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
          this.closeMenu()
        }
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
