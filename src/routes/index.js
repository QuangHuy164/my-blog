const newsRouter = require('./news')

const route = (app) => {

  app.use('/news', newsRouter)

}

module.exports = route