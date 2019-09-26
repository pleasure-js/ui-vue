<template>
  <el-select
    v-model="value"
    multiple
    placeholder="Select"
    @input="$emit('input', $event)"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
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
    data () {
      return {
        value: []
      }
    }
  }
</script>
