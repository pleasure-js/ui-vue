<template>
  <el-select
    multiple
    v-model="value"
    placeholder="Select"
    @input="$emit('input', $event)"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
  export default {
    props: {
      field: {
        type: Object,
        required: true
      }
    },
    computed: {
      item () {
        return this.field.values.map((v) => {
          return {
            label: v,
            value: v
          }
        })
      }
    },
    data () {
      return {
        value: []
      }
    }
  }
</script>
