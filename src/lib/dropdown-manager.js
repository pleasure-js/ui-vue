import get from 'lodash/get'
import isEqual from 'lodash/isEqual'

let debug = false

export class DropdownManager {
  constructor ({ entity, store, dropdownName, prefix = 'pleasure' }) {
    this._entity = entity
    this._dropdownName = dropdownName
    this._store = store
    this._find = {}
    // this._sort = undefined
    this._search = null
    this._skip = null
    this._limit = null
    this._synced = true
    this._prefix = prefix
    this.defaultLimit = process.env.PLEASURE_API_COLLECTION_LIST_LIMIT

    console.log(`defaultLimit`, this.defaultLimit)
  }

  static debug (v) {
    debug = !!v
  }

  get prefix () {
    if (!this._prefix) {
      return ''
    }
    return `${ this._prefix }/`
  }

  get entity () {
    return this._entity
  }

  get dropdownName () {
    return this._dropdownName || this.entity
  }

  get store () {
    return this._store
  }

  get find () {
    return this._find
  }

  get sort () {
    return this._sort !== undefined ? this._sort : get(this.meta, 'sort')
  }

  set sort (sort) {
    if (sort !== this.sort) {
      this._synced = false
    }
    return this._sort = sort
  }

  set find (find) {
    if (!isEqual(find, this._find)) {
      this._synced = false
    }
    // this._find = JSON.stringify(find)
    this._find = find
    return this._find
  }

  get meta () {
    return this.store.getters[`${ this.prefix }dropdownMeta`][this.dropdownName]
  }

  get search () {
    return this._search !== null ? this._search : get(this.meta, 'search')
  }

  set search (search) {
    if (search !== this.search) {
      this._synced = false
    }
    return this._search = search
  }

  get skip () {
    return this._skip || get(this.meta, `skip`, 0)
  }

  set skip (skip) {
    if (skip !== this.skip) {
      this._synced = false
    }
    return this._skip = skip
  }

  get limit () {
    return this._limit || get(this.meta, `limit`)
  }

  set limit (limit) {
    if (limit !== this.limit) {
      this._synced = false
    }
    return this._limit = limit
  }

  get page () {
    return (Math.ceil(this.skip / (this.limit || this.defaultLimit)) || 0) + 1
  }

  set page (pageNumber) {
    if (pageNumber < 1) {
      return
    }
    this.skip = (pageNumber - 1) * (this.limit || this.defaultLimit)
  }

  get data () {
    console.log(`accessing data from ${ this.prefix }dropdown`, this.store.getters[`${ this.prefix }dropdown`], `for`, this.dropdownName)
    return this.store.getters[`${ this.prefix }dropdown`][this.dropdownName]
  }

  sync (force = false) {
    if (!force && this._synced) {
      return this.data
    }

    const { find, entity, limit, skip, search, sort } = this
    // console.log({ find })
    return this.store.dispatch(`${ this.prefix }loadDropdown`, {
      entity,
      force: true,
      listOptions: { find, limit, skip, search, sort }
    })
  }

  prev () {
    this.page--
    return this.sync()
  }

  next () {
    this.page++
    return this.sync()
  }
}
