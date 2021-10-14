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


//Create new user

app.post('/posts', (req, res) => {
    //Add post to all posts
    data.posts.push(req.body)
    res.send(req.body)
})


//Create new user

app.post('/users', (req, res) => {
    const password = req.body.password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    res.send(hash)
})
//CRUD - Create, Read, Update, Delete

//CRUD -   Post, get, put/patch, delete


app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})


