const newsRouter = require('./news')

const route = (app) => {
    app.get('/', (req, res) => {
  res.render('home')
})

app.use('/news', newsRouter)

app.get('/search', (req, res) => {
  console.log(req.query)
  res.render('search')
})

app.post('/search', (req, res) => {
  res.send('')
})
}

module.exports = route