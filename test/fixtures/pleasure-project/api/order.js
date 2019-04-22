const { Types: { ObjectId } } = require('mongoose')
const omit = require('lodash/omit')
const { schema: ProductSchema } = require('./product.js')

const ProductOrderSchema = Object.assign(omit(ProductSchema, ['stock']), {
  quantity: {
    type: Number,
    default: 1
  }
})

module.exports = {
  schema: {
    products: {
      type: [ProductOrderSchema],
      default () {
        return []
      }
    },
    user: {
      type: ObjectId,
      ref: 'user'
    }
  },
  schemaCreated ({mongooseSchema}) {
    mongooseSchema.virtual('total').get(function () {
      return this.products.reduce((total, { price, quantity }) => {
        return total + (price * quantity)
      }, 0)
    })
  },
  methods: {
    queue: {
      // [POST] order/queue
      create ({ newEntry, ctx }) {

      },
      // [GET] order/queue/:id
      read ({ newEntry, id, ctx }) {

      },
      // [PATCH] order/queue/:id
      update ({ newEntry, id, ctx }) {

      },
      // [DELETE] order/queue/:id
      delete ({ id, ctx }) {

      }
    },
    // list-them-all
    listThemAll: {
      // list-them-all/:id
      read ({ id, ctx }) {

      }
    }
  },
  access: {
    create ({ user, appendEntry }) {
      if (!user) {
        return false
      }

      // assign the order to the current user
      appendEntry.user = user._id
      return true
    },
    list ({ user, queryFilter }) {
      // un-authenticated users can not list orders
      if (!user) {
        return false
      }

      // if is an admin, list all orders
      if (user.level === 'admin') {
        return true
      }

      // list only current user's orders
      queryFilter.push(doc => {
        // use mongoose query object
        return doc.find({ user: user._id })
      })

      return true
    }
  }
}
