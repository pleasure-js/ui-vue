import './element-ui.pcss'
import PleasureSelect from './select.vue'
import PleasureMultipleSelect from './multiple-select.vue'
import PleasureDateTime from './date-time.vue'

export function install (Vue) {
  Vue.mixin({
    components: {
      PleasureMultipleSelect,
      PleasureSelect,
      PleasureDateTime
    }
  })
}
