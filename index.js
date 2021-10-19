const express = require('express')
const data = require('./data')
const bcrypt = require('bcryptjs')
const app = express()

const PORT = process.env.PORT || 3000


//JSON and form Parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.get('/', (req, res) => {
    res.send("<h1>Welcome to our Schedule Website</h1>")
})

//Get all users
app.get('/users', (req, res) => {
    res.send(data.users)
})

//Get all posts
app.get('/posts', (req, res) => {
    res.send(data.posts)
})

//Get all schedules
app.get('/schedules', (req, res) => {
    res.send(data.schedules)
})

//Get Individual User Id
app.get('/users/:id', (req, res) => {
    
    const user = data.users[req.params.id]
    res.send(user)
})

//Get Individual Schedules
app.get('/schedules/:id', (req, res) => {
    const schedule = data.schedules[req.params.id]
    res.send(schedule)
})


//Create new post
app.post('/users', (req, res) => {
    data.users.push(req.body)
   res.send(req.body)
})

//Create new user password 

app.post('/users', (req, res) => {
    const SHA256 = req.body.password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(SHA256, salt)
    res.send(hash)
})

//CRUD - Create, Read, Update, Delete

//CRUD -   post, get, put/patch, delete


app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})


