<template>
  <el-row
    class="table-edit-filter"
    :gutter="10">
    <el-col :span="8" :gutter="10">
      <el-button
        :icon="getSortIcon(sort)"
        @click="toggleSort"
        size="mini"
        class="plain"
        circle
      ></el-button>
      {{ guessLabel(fieldName) }}
    </el-col>
    <el-col :span="16">
      <el-select
        v-if="isEnum(fieldName)"
        v-model="enumValue"
        placeholder="Select"
        size="mini"
        @input="filterHandler"
        multiple
      >
        <el-option
          v-for="item in getFilter(fieldName)"
          :value="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
      <el-input
        v-else
        :clearable="true"
        v-model="filter"
        :disabled="!filterType"
        size="mini"
        :ref="`field`"
      >
        <el-select
          v-model="filterType"
          slot="prepend"
          size="mini"
          style="width: 70px;"
        >
          <el-option
            label="--"
            :value="null"
          >
          </el-option>
          <el-option
            label="Equals"
            value="equals"
          >
          </el-option>
          <el-option
            label="Like"
            value="like">
          </el-option>
        </el-select>
      </el-input>
    </el-col>
  </el-row>
</template>
<style>
  .table-edit-filter {
    .el-select {
      width: 100%;
    }
  }
</style>
<script>
  import PTE from '../lib/pleasure-table-edit.js'
  import { DropdownManager } from '../lib/dropdown-manager.js'

  function filterPropertyHandler () {
    this.refreshInput()
  }

  export default {
    mixins: [PTE],
    data () {
      return {
        enumValue: [],
        filter: null,
        filterType: null,
        sort: this.value.sort,
      }
    },
    methods: {
      filterHandler () {
        Object.assign(this.manager.find, {
          [this.fieldName]: {
            $in: this.enumValue
          }
        })
        console.log(`filter handler`, this.manager.find)
        this.$emit('refresh-results')
      },
      refreshInput () {
        this.$emit('input', {
          type: this.filterType,
          value: this.filter,
          sort: this.sort
        })
        this.$emit('refresh-results')
      },
      toggleSort () {
        if (this.sort === null) {
          this.sort = 1
        } else if (this.sort === 1) {
          this.sort = -1
        } else {
          this.sort = null
        }
        this.refreshInput()
      },
    },
    props: {
      fieldName: {
        type: String,
        required: true
      },
      manager: {
        type: DropdownManager
      },
      value: {
        required: true,
        type: Object,
        default () {
          return {}
        }
      }
    },
    watch: {
      filter: filterPropertyHandler,
      filterType () {
        filterPropertyHandler.call(this)
        this.$nextTick(() => {
          if (this.$refs['field']) {
            console.log(`focusing`, this.$refs['field'])
            this.$refs['field'].focus()
          }
        })
      },
      sort: filterPropertyHandler
    }
  }
</script>
