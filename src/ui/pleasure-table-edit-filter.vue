<template>
  <el-row
    class="table-edit-filter"
    :gutter="10"
  >
    <el-col
      :span="8"
      :gutter="10"
    >
      <el-button
        :icon="getSortIcon(sort)"
        size="mini"
        class="plain"
        circle
        @click="toggleSort"
      />
      {{ guessLabel(fieldName) }}
    </el-col>
    <el-col :span="16">
      <el-select
        v-if="isEnum(fieldName)"
        v-model="enumValue"
        placeholder="Select"
        size="mini"
        multiple
        @input="filterHandler"
      >
        <el-option
          v-for="item in getFilter(fieldName)"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
      <el-input
        v-else
        :ref="`field`"
        v-model="filter"
        :clearable="true"
        :disabled="!filterType"
        size="mini"
      >
        <el-select
          slot="prepend"
          v-model="filterType"
          size="mini"
          style="width: 70px;"
        >
          <el-option
            label="--"
            :value="null"
          />
          <el-option
            label="Equals"
            value="equals"
          />
          <el-option
            label="Like"
            value="like"
          />
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
    data () {
      return {
        enumValue: [],
        filter: null,
        filterType: null,
        sort: this.value.sort,
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
    }
  }
</script>
