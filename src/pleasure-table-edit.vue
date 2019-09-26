<template>
  <div :class="{ content: true, 'pleasure-table-edit': true, 'friendly-table': true, 'can-add': canAdd }">
    <div class="controls" v-if="withSearch">
      <slot name="controls"></slot>
      <el-row>
        <el-col :xs="{ span: searchSpan }" style="padding: 0">
          <el-input
            spellcheck="false"
            autocomplete="off"
            class="search-input"
            placeholder="Search"
            suffix-icon="el-icon-search"
            v-model="search"
            name="search"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <el-table
      class="the-table"
      :default-sort="defaultSort"
      :style="tableStyle"
      height="100%"
      ref="tb"
      :data="datatable"
      stripe
      tooltip-effect="dark"
      highlight-current-row
      row-class-name="pleasure-row"
      @cell-click="handleCellClick"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      :rowClassName="rowClassName"
    >
      <slot></slot>
    </el-table>
    <el-button
      v-if="canAdd && canCreate"
      class="add-btn"
      name="add"
      icon="el-icon-plus"
      @click="promptCreate"
      circle
    ></el-button>
    <el-button
      v-if="selections.length > 0 && canDelete"
      name="delete"
      class="delete-btn"
      icon="el-icon-minus"
      @click="handleDeleteSelection"
      circle
    ></el-button>
  </div>
</template>
<style lang="postcss">
  .the-table {
    table {
      font-size: 1em;
    }
  }

  .pleasure-table-edit {
    &:not(.can-add) {
      .delete-btn {
        right: 30px;
      }
    }
  }
</style>
<script>
  // import api from '@/mixins/api'
  // import _ from 'lodash'
  // import $ from 'jquery'
  // import { getToken } from '@/utils/auth'
  // import { pleasureApi } from '@/plugins/pleasure-api'

  const fnStub = {
    type: Function,
    default () {
      return () => {}
    }
  }

  export default {
    // mixins: [api],
    props: {
      customBehavior: {
        type: Boolean,
        default: false
      },
      tableTop: {
        type: Number,
        default: 0
      },
      searchSpan: {
        type: Number,
        default: 24
      },
      searchBy: Array,
      searchStrict: {
        type: Boolean,
        default: false
      },
      defaultSort: Object,
      withSearch: {
        type: Boolean,
        default: true
      },
      canEdit: Boolean,
      canAdd: {
        type: Boolean,
        default: true
      },
      model: {
        type: String,
        required: true
      },
      cellClick: fnStub,
      rowClick: {
        type: [Function, Boolean],
        default: true
      },
      rowClassName: Function,
      action: fnStub,
      appendData: Object
    },
    mounted () {
      this.tableScroll = $(this.$el).find('.el-table__body-wrapper')
      this.tableScroll.on('scroll', this.handleScroll)

      if (!this.defaultSort && !this.customBehavior && this.model) {
        this.reload()
        /* this.$store.dispatch('db/dropdown', {
          model: this.model,
          token: getToken()
        }) */
      }
    },
    data () {
      return {
        loadingMore: false,
        sort: null,
        tableScroll: null,
        searchResults: null,
        selections: [],
        search: null
        // results: (this.dropdowns[this.model] ? this.dropdowns[this.model].slice() : [])
      }
    },
    watch: {
      model (v) {
        this.$nextTick(this.reload.bind(this))
      },
      search () {
        this.safeLookUp()
      }
    },
    computed: {
      sortValue () {
        return this.sort ? {
          [this.sort.prop]: this.sort.order === 'ascending' ? 1 : -1
        } : null
      },
      tableStyle () {
        let top = this.tableTop

        if (this.withSearch) {
          top += 40
        }

        return this.withSearch ? { top: `${ top }px` } : null
      },
      datatable () {
        if (this.searchResults !== null) {
          return this.searchResults
        }

        return this.dropdowns[this.model] || []
      },
      safeLookUp () {
        return _.debounce(this.lookUp.bind(this), 150)
      }
    },
    methods: {
      async reload () {
        if (!this.model) {
          return
        }
        this.$store.dispatch('db/clean', this.model)
        return this.loadMore(true)
      },
      getSearch () {
        let search = {}

        if (!this.searchBy || this.searchBy.length === 0) {
          search = { search: this.search }
        } else if (this.search) {
          const find = {}

          this.searchBy.forEach(prop => {
            find[prop] = this.search
          })

          search = {
            find,
            strict: this.searchStrict.toString()
          }
        }

        return search
      },
      async handleSortChange (sort) {
        if (!this.model) {
          return
        }

        this.sort = sort
        this.$emit('sort-change', sort)

        await this.$store.dispatch('db/dropdown', {
          model: this.model,
          sort: { [sort.prop]: sort.order === 'descending' ? -1 : 1 },
          params: this.appendData,
          token: getToken()
        })

        $(this.$el).find('.el-table__body-wrapper').scrollTop(0, 0)
        this.loadingMore = false
      },
      handleScroll () {
        const { tableScroll } = this

        const scrollHeight = tableScroll.get()[0].scrollHeight - tableScroll.height()
        const scrollTop = tableScroll.scrollTop()

        if (scrollTop >= scrollHeight) {
          this.loadMore()
        }
      },
      async loadMore (r) {
        if ((!r && this.loadingMore) || !this.model) {
          return
        }

        const { sortValue: sort } = this

        this.loadingMore = true
        let data

        try {
          ({ data } = await this.$store.dispatch('db/api', {
            model: this.model,
            skip: this.datatable.length,
            sort,
            params: this.appendData,
            ...this.getSearch()
          }))
        } catch (err) {
          data = []
        }

        if (this.searchResults
        ) {
          this.searchResults.push(...data)
        } else {
          this.$store.commit('db/APPEND_DROPDOWN', { model: this.model, data })
        }

        this.loadingMore = !r && data.length < 1
      },
      promptCreate () {
        this.$router.push({ path: `/pleasure/${ this.model }/create` })
      },
      handleDeleteSelection () {
        this.$confirm(this.$t('confirm.remove.default'))
          .then(_ => {
            this.deleteSelection()
          })
          .catch(_ => {
          })
      },
      async lookUp () {
        if (!this.search) {
          return this.$set(this, 'searchResults', null)
        }

        this.searching = true

        try {
          const { data } = await
            this.$store.dispatch('db/api', {
              model: this.model,
              params: this.appendData,
              ...this.getSearch()
            })

          this.$set(this, 'searchResults', data)
        } catch (err) {
        } finally {
          this.searching = false
        }
      },
      async deleteSelection () {
        this.loading = true
        const remove = this.selections.map(v => v._id)
        const model = this.model
        const { errorObj } = await
          this.$store.dispatch('db/api', {
            model,
            remove,
            ctx: this
          })
        this.$emit('deleted', remove)
        !errorObj && await
          this.$store.dispatch(`db/dropdown`, { model }) // reloading it from the page
        this.loading = false
      },
      filterTag (value, row) {
        return row.type === value
      },
      handleSelectionChange (val) {
        this.$set(this, 'selections', val || [])
      },
      handleRowClick (row, event, col) {
        if (this.rowClick === false) {
          return
        }
        if (typeof this.rowClick === 'function') {
          return this.rowClick(row, event, col)
        }

        if (this.canUpdate || this.canRead) {
          this.$router.push({ path: `/pleasure/${ this.model }/update/${ row._id }` })
        }
      },
      handleCellClick (row, event, col) {
        if (this.cellClick) {
          return this.cellClick(row, event, col)
        }
      }
    }
  }
</script>
