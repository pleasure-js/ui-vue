# pleasure dummy project

Pleas have a look at the config file:

> [pleasure.config.js](pleasure.config.js)
```js
module.exports = {
  api: {
    debug: process.env.NODE_ENV === 'development',
    entitiesUri: '/schemas'
  }
}
```
