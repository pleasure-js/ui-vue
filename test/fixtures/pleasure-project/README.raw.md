# Dummy project

As an example, will demonstrate the functionality of the pleasure framework in the scenario of an online store.

- [Configuration](#dummy-project-configuration)
- [Entities](#dummy-project-entities)
- [Access & Permissions](#dummy-project-access--permissions)

### Dummy Project Configuration

@show-source(tests/dummy/project/pleasure.config.js)

### Dummy Project Entities

To start, we will create the DB structure of our online store. To do so, we are gonna set entities for:
users, products and orders, by creating their corresponding files and exporting a [PleasureEntity](#pleasure-entity).

@show-source(tests/dummy/project/api/entities/user.js)

@show-source(tests/dummy/project/api/entities/product.js)

@show-source(tests/dummy/project/api/entities/order.js)

### Dummy Project Access & Permissions

@show-source(tests/dummy/project/api/permissions/index.js)
