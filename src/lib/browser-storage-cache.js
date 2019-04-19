/**
 * Caches and access ajax results to the API in the browser application store.
 */
export class BrowserStorageCache {
  /**
   * @param {Object} config
   * @param {String} [config.scope=pleasure] - Scope to use as a prefix
   * @param {Object} [config.store=window.sessionStorage] - Browser Application Store
   * @param {Number} [config.lifetime=1800] - For how long to have the cache available (in seconds).
   * Defaults to half an hour.
   */
  constructor ({ scope = 'pleasure', store, lifetime = 1800 } = {}) {
    this._store = store || window.sessionStorage
    this._lifetime = lifetime * 1000
    this._scope = scope
    this._cached = []
  }

  scope (id) {
    return `${this._scope}-${id}`
  }

  req ({ id }) {
    if (!id) {
      return
    }

    const cache = this._store.getItem(this.scope(id))

    if (!cache) {
      return
    }

    const { cached, res } = JSON.parse(cache)

    // cache expired
    if (cached + this._lifetime <= Date.now()) {
      this.clear(id)
      return
    }

    return res
  }

  res ({ id, req, res }) {
    if (typeof res === 'undefined') {
      return
    }

    this._cached.push(id)
    this._store.setItem(this.scope(id), JSON.stringify({ cached: Date.now(), res }))

    return res
  }

  clear (id) {
    this._store.removeItem(this.scope(id))
    this._cached.splice(this._cached.indexOf(id), 1)
  }

  clearAll () {
    while (this._cached.length > 0) {
      this.clear(this._cached[0])
    }
  }
}
