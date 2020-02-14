<template>
  <div
    :class="{ content: true, 'with-search': withSearch, 'pleasure-table-edit': true, 'friendly-table': true, 'can-add': canAdd }"
  >
    <!-- Controls (search, filters) -->
    <div
      class="controls"
    >
      <slot name="controls" />
      <el-row v-if="withSearch">
        <el-col
          class="search-col"
        >
          <el-input
            v-model="search"
            :clearable="true"
            spellcheck="false"
            autocomplete="off"
            class="search-input"
            placeholder="Search"
            name="search"
            @input="searchHandler"
          />
        </el-col>
        <el-col
          class="controls-col"
        >
          <el-button
            class="plain"
            :icon="searching ? `el-icon-loading` : `el-icon-search`"
            @click="advancedSearchControls = !advancedSearchControls"
          />
          <el-button
            class="plain"
            icon="el-icon-s-operation"
            @click="filterControls = !filterControls"
          />
        </el-col>
      </el-row>
      <!-- Search Controls -->
      <div class="search-controls">
        <div
          v-if="advancedSearchControls"
          ref="advanced-search-controls"
          class="advanced-search control"
        >
          <template
            v-for="fieldName in indexes"
          >
            {{ fieldName }}
          </template>
        </div>
        <div
          v-if="filterControls"
          ref="filter-controls"
          class="filters control"
        >
          <!-- Table Edit Filter -->
          <table-edit-filter
            v-for="fieldName in indexes"
            v-model="filterData[fieldName]"
            :entity="entity"
            :field-name="fieldName"
            :manager="manager"
            @refresh-results="toggleSort(fieldName)"
          />
        </div>
        <div
          v-if="sortControls"
          ref="sort-controls"
          class="sort control"
        >
          <template
            v-for="fieldName in indexes"
          >
            {{ fieldName }}
          </template>
        </div>
      </div>
    </div>
    <!-- Actual table data -->
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
      :empty-text="empty"
      @cell-click="handleCellClick"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="canDelete"
        type="selection"
        width="35"
      />
      <el-table-column
        v-for="fieldName in fields"
        :prop="fieldName"
        :label="guessLabel(fieldName)"
        min-width="180"
        :column-key="fieldName"
      >
        <template slot-scope="scope">
          {{ isEnum(fieldName) ? guessLabel(scope.row[fieldName], `entities.enum`) :
            scope.row[fieldName] }}
        </template>
      </el-table-column>
    </el-table>
    <!-- Add / remove buttons -->
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
    <!-- prompt to add -->
    <pleasure
      :class="{ prompt: true, on: promptAdd }"
      :entity="entity"
      method="create"
      @cancel="promptAdd = false"
    />
  </div>
</template>
<style lang="postcss">
  .pleasure-table-edit {
    position: absolute;
    overflow: hidden;
    top: var(--headbar-height);
    left: 0;
    width: 100vw;
    bottom: 0;

    &:not(.can-add) {
      .delete-btn {
        left: 30px;
      }
    }

    .controls {
      min-height: 40px;
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;

      .search-col {
        width: calc(100% - var(--table-edit-controls-width));
      }

      .controls-col {
        background: var(--table-edit-controls-operations-background);
        width: var(--table-edit-controls-width);

        .el-button {
          border-radius: 0;
          padding: 0;
          text-align: center;
          height: var(--pleasure-input-height);
          width: calc(var(--table-edit-controls-width) / 2);
          float: left;
        }
      }

      .search-controls {
        .control {
          padding: 20px;
        }
      }

      .filters {
        .el-row + .el-row {
          margin-top: 10px;
        }

        .el-input--mini .el-input__inner {
          line-height: inherit;
        }
      }
    }

    .search-input {
      .el-input__inner {
        border-radius: 0;
        border: none;
        color: var(--table-edit-search-color) !important;
        background-color: var(--table-edit-search-background) !important;

        &:focus {
          color: var(--table-edit-search-color-focus) !important;
          background-color: var(--table-edit-search-background-focus) !important;
        }
      }
    }

    .the-table {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: auto !important;

      table {
        font-size: 1em;
      }
    }

    &.with-search {
      .the-table {
        top: 40px;
      }
    }

    .el-table__body-wrapper {
      .el-table__body {
        margin-bottom: 100px;
      }
    }

    .prompt {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      bottom: 0;
      box-sizing: border-box;
      padding: var(--pleasure-layout-gap);
      background: var(--table-edit-prompt-background);
      transform: translateY(100%);
      transition: all 0.4s ease-in-out;

      &.on {
        transform: translateY(0);
      }
    }
  }

  .friendly-table {
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
  import PTE from '../lib/pleasure-table-edit'
  import debounce from 'lodash/debounce'
  import forOwn from 'lodash/forOwn'
  import kebabCase from 'lodash/kebabCase'
  import { DropdownManager } from '../lib/dropdown-manager.js'
  import TableEditFilter from './pleasure-table-edit-filter.vue'

  const fnStub = {
    type: Function,
    default () {
      return () => {}
    }
  }

  /**
   * Lists all entries in an entity and allows the user (according to their permission)
   * to search, find, sort, download in csv format, etc.
   */

  export default {
    components: {
      TableEditFilter
    },
    mixins: [PTE],
    props: {
      customBehavior: {
        type: Boolean,
        default: false
      },
      waitBeforeSearch: {
        type: Number,
        default: 300
      },
      tableTop: {
        type: Number,
        default: 0
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
        promptAdd: false,
        eleMeta: {
          advancedSearchControls: 0,
          filterControls: 0,
          sortControls: 0
        },
        filterData: {},
        advancedSearchControls: false,
        sortControls: false,
        filterControls: false,
        filter: {
          advancedSearchControls: {
            type: null,
            value: null
          },
          sortControls: {
            type: null,
            value: null
          },
          filterControls: {
            type: null,
            value: null
          }
        },
        loadingMore: false,
        sort: null,
        tableScroll: null,
        manager: null,
        searchResults: null,
        selections: [],
        search: null,
        searching: false,
        /**
         * @function searchHandler
         * Handles input search performing
         **/
        searchHandler: debounce(() => {
          this.doSearch(this.search)
        }, this.waitBeforeSearch)
        // results: (this.dropdowns[this.entity] ? this.dropdowns[this.entity].slice() : [])
      }
    },
    computed: {
      empty () {
        if (this.searching) {
          return `Looking for entries containing "${ this.search }" in ${ this.entity }`
        }
        return this.search ? `No entries matching "${ this.search }" found in ${ this.entity }` : `No entries found in ${ this.entity }`
      },
      indexes () {
        if (!this.$pleasure.entities[this.entity] || !this.$pleasure.entities[this.entity].$pleasure.index) {
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

        if (this.filterControls) {
          top += this.eleMeta.filterControls
        }

        // console.log({ top })

        return this.withSearch ? { top: `${ top }px` } : null
      },
      datatable () {
        return this.$store.getters['pleasure/dropdown'][this.entity] || []
      },
      safeLookUp () {
        return debounce(this.lookUp.bind(this), 150)
      }
    },
    watch: {
      search (v) {
        this.searching = !!v
      }
    },
    mounted () {
      // console.log(`store`, this.$store)
      this.manager = new DropdownManager({ entity: this.entity, store: this.$store })

      this.indexes.forEach(index => {
        this.$set(this.filterData, index, { type: null, value: null, sort: null })
        this.$set(this.filterData, `$sort`, [])
      })

      const track = ['advancedSearchControls', 'sortControls', 'filterControls']

      track.forEach(ele => {
        // console.log(`turning on ${ ele }`)
        this[ele] = true
      })

      this.$nextTick(() => {
        track.forEach(ele => {
          // console.log(`Checking offsetHeight of ${ kebabCase(ele) }`)
          // console.log(`offsetHeight of ${ kebabCase(ele) } ${ this.$refs[kebabCase(ele)].offsetHeight }`)
          try {
            this.eleMeta[ele] = this.$refs[kebabCase(ele)].offsetHeight
          } catch (err) {
            console.log(ele, err)
          }
          this[ele] = false
        })
      })
    },
    methods: {
      applyFilter () {
        return this.syncManager()
      },
      toggleSort (fieldName) {
        const newSort = this.filterData.$sort.filter((item) => {
            return Object.keys(item)[0] !== fieldName
          }
        )

        if (this.filterData[fieldName].sort !== null) {
          newSort.push({
            [fieldName]: this.filterData[fieldName].sort
          })
        }

        console.log({ newSort })
        this.$set(this.filterData, '$sort', newSort)
        console.log(`this.filterData.$sort`, this.filterData.$sort)
        return this.syncManager()
      },
      /**
       * @function doSearch
       * Uses pleasureApiClient to perform a search against the entity
       * @param {String} keywords - The keywords
       **/
      doSearch (keywords) {
        this.manager.search = keywords
        return this.syncManager()
      },
      async syncManager () {
        this.searching = true
        const find = this.manager.find
        if (Object.keys(this.filterData).length > 0) {
          Object.keys(this.filterData).forEach(prop => {
            // console.log(`checking ${ prop }`, this.filterData[prop])
            if (this.filterData[prop].type && this.filterData[prop].value) {
              try {
                find[prop] = this.filterData[prop].type === 'equals' ? this.filterData[prop].value : new RegExp(this.filterData[prop].value, 'i')
              } catch (err) {
                find[prop] = this.filterData[prop].value
              }
              // console.log(`this.filterData[${ prop }]`, this.filterData[prop])
            } else if (find[prop] && !this.isEnum(prop)) {
              delete find[prop]
            }
          })
        }
        this.manager.find = find
        this.manager.sort = this.filterData.$sort
        await this.manager.sync()
        this.searching = false
      },
      filterPropertyHandler (fieldName, e) {
        this.searchHandler(e)
        // console.log(`focus`, this.$refs[`field-${ fieldName }`])
      },
      async reload () {
        if (!this.entity) {
          return
        }
        // console.log(`reloading`, this.entity)
        // this.$store.dispatch([7 90
        // 'db/clean', this.entity)
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
      handleSortChange (sort) {
        // console.log({ sort })
        this.manager.sort = { [sort.prop]: sort.order === 'ascending' ? 1 : -1 }
        return this.syncManager()
      },
      promptCreate () {
        this.promptAdd = !this.promptAdd
        // this.$router.push({ path: `/pleasure/create/${ this.entity }` })
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
