<template>
  <div :class="{ content: true, 'pleasure-table-edit': true, 'friendly-table': true, 'can-add': canAdd }">
    <!--
        <div
          v-if="withSearch"
          class="controls"
        >
          <slot name="controls" />
          <el-row>
            <el-col
              :xs="{ span: searchSpan }"
              style="padding: 0"
            >
              <el-input
                v-model="search"
                spellcheck="false"
                autocomplete="off"
                class="search-input"
                placeholder="Search"
                suffix-icon="el-icon-search"
                name="search"
              />
            </el-col>
          </el-row>
        </div>
    -->
    <el-table
      ref="tb"
      class="the-table"
      :default-sort="defaultSort"
      :style="tableStyle"
      height="100%"
      :data="datatable"
      stripe
      tooltip-effect="dark"
      highlight-current-row
      row-class-name="pleasure-row"
      :row-class-name="rowClassName"
      @cell-click="handleCellClick"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >

      <el-table-column type="selection" width="35" v-if="canDelete"></el-table-column>
            <el-table-column
              v-for="field in fields"
              :prop="field"
              :label="guessLabel(field)"
              min-width="180"
              sortable="custom">
              <template slot-scope="scope">{{ scope.row[field] }}</template>
            </el-table-column>

    </el-table>
    <el-button
      v-if="canAdd"
      class="add-btn"
      name="add"
      icon="el-icon-plus"
      circle
      @click="promptCreate"
    />
    <el-button
      v-if="selections.length > 0 && canDelete"
      name="delete"
      class="delete-btn"
      icon="el-icon-minus"
      circle
      @click="handleDeleteSelection"
    />
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
        left: 30px;
      }
    }

    position: absolute;
    overflow: hidden;
    top: var(--headbar-height);
    left: 0;
    width: 100vw;
    bottom: 0;

    .controls {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
    }

    .the-table {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: auto !important;
    }

    .el-table__body-wrapper {
      .el-table__body {
        margin-bottom: 100px;
      }
    }
  }

  .friendly-table {

    .search-input {
      .el-input__inner {
        border: none;
        color: var(--table-edit-search-color) !important;
        background-color: var(--table-edit-search-background) !important;
        @include border-radius(0);

        &:focus {
          color: var(--table-edit-search-color-focus) !important;
          background-color: var(--table-edit-search-background-focus) !important;
        }
      }
    }

    .controls {
      height: 40px;
    }

    .el-card .el-row {
      margin-top: 20px;
    }

    .el-card .el-row:first-child {
      margin-top: 0;
    }

    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }

    .the-table {
      background: var(--table-background);

      .cell-top {
        vertical-align: text-top;
      }

      .cell {
        cursor: pointer;
        padding-left: 3px;
        padding-right: 3px;
      }

      th:first-child, td:first-child {
        .cell {
          padding-left: 15px;
        }
      }

      th:last-child, td:last-child {
        .cell {
          padding-right: 15px;
        }
      }

      .el-table-column--selection {
        .cell {
          padding-left: 20px;
        }
      }

      /*
            .el-table-column--selection {
              background: var(--table-row-selected-background);
              color: var(--table-row-selected-color);
            }
      */

      .el-table__body tr {
        & > td {
          background: var(--table-body-row-background);
          color: var(--table-body-row-color);
        }

        &:hover > td:not(.el-table__expanded-cell) {
          background: var(--table-row-over-background);
          color: var(--table-row-over-color);

          .el-checkbox__inner {
            background: var(--table-body-checkbox-background-over);
            border: var(--table-body-checkbox-border-over);
          }
        }
      }

      .sort-caret.ascending {
        border-bottom-color: var(--projects-sort-caret-ascending-default)
      }

      .sort-caret.descending {
        border-top-color: var(--projects-sort-caret-descending-default)
      }

      .descending .sort-caret.ascending {
        border-bottom-color: var(--projects-sort-caret-ascending-disabled)
      }

      .descending .sort-caret.descending {
        border-top-color: var(--projects-sort-caret-descending)
      }

      .ascending .sort-caret.ascending {
        border-bottom-color: var(--projects-sort-caret-ascending)
      }

      .ascending .sort-caret.descending {
        border-top-color: var(--projects-sort-caret-descending-disabled)
      }

      tbody {
        th.is-leaf, td, /*div.cell,*/
        tr {
          background: var(--table-body-row-background);
        }

        .el-checkbox__inner {
          background: var(--table-body-checkbox-background);
          border: var(--table-body-checkbox-border);

          &:after {
            border-color: var(--table-body-checkbox-color);
          }
        }

        .is-checked {
          .el-checkbox__inner {
            background: var(--table-body-checkbox-background-checked);
            border: var(--table-body-checkbox-border-checked);
          }
        }

        .el-table__row--striped {
          background: var(--table-body-odd-background);
        }
      }

      thead {
        th.is-leaf, td, /*div.cell,*/
        tr {
          font-weight: normal;
          color: var(--table-head-row-color);
          background: var(--table-head-row-background);
        }

        .el-checkbox__inner {
          background: var(--table-head-checkbox-background);
          border: var(--table-head-checkbox-border);

          &:after {
            border-color: var(--table-head-checkbox-color);
          }
        }

        .is-checked {
          .el-checkbox__inner {
            background: var(--table-head-checkbox-background-checked);
            border: var(--table-head-checkbox-border-checked);
          }
        }
      }

      th.is-leaf, td {
        padding: 4px 0;
        /*border-bottom: 1px solid rgba(var(--table-body-even-border-color), .3);*/
      }
    }

    .el-table::before {
      display: none !important;
    }

    .el-table__body-wrapper {
      overflow-scrolling: touch;
      background: var(--table-edit-background);
    }
  }
</style>
<script>
  import uniq from 'lodash/uniq'
  import startCase from 'lodash/startCase'

  const fnStub = {
    type: Function,
    default () {
      return () => {}
    }
  }

  export default {
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
      defaultSort: {
        type: Object
      },
      /**
       * @vue-prop {Boolean} [withSearch=true] - Add
       */
      withSearch: {
        type: Boolean,
        default: true
      },
      canEdit: Boolean,
      canAdd: {
        type: Boolean,
        default: true
      },
      canDelete: {
        type: Boolean,
        default: false
      },
      /**
       * @vue-prop {String} entity - Entity name
       */
      entity: {
        type: String,
        required: true
      },
      cellClick: fnStub,
      /**
       * @vue-prop {Function|Boolean} rowClick=true - A function to handle the row click. `true` to let pleasure handle
       * the request automatically. `false` to disable. Defaults to `true`.
       **/
      rowClick: {
        type: [Function, Boolean],
        default: true
      },
      rowClassName: Function,
      action: fnStub,
      appendData: Object
    },
    data () {
      return {
        loadingMore: false,
        sort: null,
        tableScroll: null,
        searchResults: null,
        selections: [],
        search: null
        // results: (this.dropdowns[this.entity] ? this.dropdowns[this.entity].slice() : [])
      }
    },
    computed: {
      indexes () {
        if (!this.$pleasure.entities[this.entity]) {
          return []
        }

        return uniq(this.$pleasure.entities[this.entity].$pleasure.index.search.concat(this.$pleasure.entities[this.entity].$pleasure.index.sort).filter(fieldName => fieldName !== '_id'))
      },
      fields () {
        // todo: add prop to override default indexes fields
        return this.indexes
      },
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

        return this.withSearch ? { top } : null
      },
      datatable () {
        if (this.searchResults !== null) {
          return this.searchResults
        }

        return this.$pleasure.dropdown[this.entity] || []
      },
      safeLookUp () {
        return debounce(this.lookUp.bind(this), 150)
      }
    },
    mounted () {
      console.log(`entity>>>`, this.$pleasure.entities[this.entity])
      /*
            this.tableScroll = this.$el.querySelector('.el-table__body-wrapper')
            this.tableScroll.addEventListener('scroll', this.handleScroll)

            if (!this.defaultSort && !this.customBehavior && this.entity) {
              // this.reload()
              /!* this.$store.dispatch('db/dropdown', {
                model: this.entity,
                token: getToken()
              }) *!/
            }
      */
    },
    methods: {
      guessLabel(field) {
        const requestedLabel = `entities.label.${field}`
        const foundLabel = this.$t(requestedLabel)
        return requestedLabel !== foundLabel ? foundLabel : startCase(field)
      },
      async reload () {
        if (!this.entity) {
          return
        }
        console.log(`reloading`, this.entity)
        // this.$store.dispatch('db/clean', this.entity)
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
        if (!this.entity) {
          return
        }

        this.sort = sort
        this.$emit('sort-change', sort)
        console.log(`table sort`)
        /*
                await this.$store.dispatch('db/dropdown', {
                  model: this.entity,
                  sort: { [sort.prop]: sort.order === 'descending' ? -1 : 1 },
                  params: this.appendData,
                  token: getToken()
                })

                this.$el.querySelector('.el-table__body-wrapper').scrollTop = 0
                this.loadingMore = false
        */
      },
      handleScroll () {
        const { tableScroll } = this

        const scrollHeight = tableScroll.scrollHeight - tableScroll.offsetHeight
        const scrollTop = tableScroll.scrollTop

        if (scrollTop >= scrollHeight) {
          this.loadMore()
        }
      },
      async loadMore (r) {
        return console.log(`loadMore`)
        if ((!r && this.loadingMore) || !this.entity) {
          return
        }

        const { sortValue: sort } = this

        this.loadingMore = true
        let data

        // todo: list
        try {
          ({ data } = await this.$store.dispatch('db/api', {
            model: this.entity,
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
          this.$store.commit('db/APPEND_DROPDOWN', { model: this.entity, data })
        }

        this.loadingMore = !r && data.length < 1
      },
      promptCreate () {
        this.$router.push({ path: `/pleasure/create/${ this.entity }` })
      },
      handleDeleteSelection () {
        this.$confirm(this.$t('confirm.remove.default'))
          .then(_ => {
            this.deleteSelection()
          })
          .catch(_ => {})
      },
      async lookUp () {
        // console.log('searching', this.search)
        if (!this.search) {
          return this.$set(this, 'searchResults', null)
        }

        this.searching = true

        try {
          const { data } = await
            this.$store.dispatch('db/api', {
              model: this.entity,
              params: this.appendData,
              ...this.getSearch()
            })

          this.$set(this, 'searchResults', data)
        } catch (err) {
          // console.log({ err })
        } finally {
          this.searching = false
        }
      },
      async deleteSelection () {
        this.loading = true
        const remove = this.selections.map(v => v._id)
        const model = this.entity
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
          // console.log('row click is false')
          return
        }
        if (typeof this.rowClick === 'function') {
          return this.rowClick(row, event, col)
        }

        // todo: check if can update / read
        this.$router.push({ path: `/pleasure/update/${ this.entity }/${ row._id }` })
      },
      handleCellClick (row, event, col) {
        if (this.cellClick) {
          return this.cellClick(row, event, col)
        }
      }
    }
  }
</script>
