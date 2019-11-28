<template>
  <div class="menu-item">
    <component
      :is="hasChildren ? 'el-submenu' : 'el-menu-item'"
      :index="index"
      :v-bind="menuItemProps"
    >
      <template v-if="hasChildren">
        <template slot="title">
          <i
            v-if="item.icon"
            :class="item.icon"
          />
          <span>{{ item.name }}</span>
        </template>
        <pleasure-menu-item
          v-for="(child, childIndex) in item.children"
          :key="`${item.name}-${childIndex}`"
          :index="`${index}-${childIndex}`"
          :item="child"
        />
      </template>
      <template v-else-if="!item.to">
        {{ item.name }}
      </template>
      <template v-else>
        <nuxt-link :to="item.to">
          {{ item.name }}
        </nuxt-link>
      </template>
    </component>
  </div>
</template>
<style lang="postcss">
  .menu-item {
    a {
      display: block;
      position: relative;
      height: 100%;
      color: var(--menu-item-color);
      text-decoration: none;
    }

    .el-menu-item {
      background-color: var(--menu-item-background);

      &:hover, &:focus {
        background-color: var(--menu-item-background-over);
      }

      a.nuxt-link-exact-active {
        color: var(--menu-item-color-active);
      }
    }
  }
</style>
<script>
  /**
   * @typeof {Object} Item
   * @property {String} name - Name of the item
   * @property {String} to - Link
   * @property {String} icon - Icon class name
   * @property {Item[]} children - Array of items
   */

  export default {
    name: 'MenuItem',
    props: {
      index: {
        type: String,
        required: true
      },
      /**
       * The item
       * @type Item
       */
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      hasChildren () {
        return this.item.children && this.item.children.length > 0
      },
      menuItemProps () {
        const props = {}
        if (this.hasChildren) {
          props.index = this.item.name
        }
        return props
      }
    }
  }
</script>
