// TODO: check why DevTool didn't work
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}