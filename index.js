const cors = require('cors')
const express = require('express')
const login = require('./controller/login')
const app = express()
const port = 3002

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'))
// app.get('/lua-chon-game', (req, res) => res.render('index'))
app.get('/lua-chon-game', (req, res) => res.render('games'))
app.get('/dang-nhap', (req, res) => res.render('login'))
app.post('/api/login', login)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
