const { CATEGORY } = require('./category')

const value = {
  request: {
    category: CATEGORY
  },
  response: {}
}

module.exports = {
  VALUE: value,
  VALUE_STRING: JSON.stringify(value)
}
