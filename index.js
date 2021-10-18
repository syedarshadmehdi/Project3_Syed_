const express = require('express')
const data = require('./data')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const app = express()


const PORT = process.env.PORT || 3000


//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//logging middleware
app.use(morgan('dev'))

//Set view engine
app.set('view engine', 'ejs')


//Routing
//Welcome page
app.get('/', (req, res) => {
    res.render('pages/home')
})

//Get all users
app.get('/users', (req, res) => {
    res.render('pages/users', {
        users: data.users
    })
})

//Get all posts
app.post('./posts', (req, res) => {
    res.send(data.posts)
})

//Create New post

app.post('/posts', (req, res) => {
    data.posts.push(req.body)
    res.send(req.body)
})

//Add new user
app.get('/users/add', (req, res) => {
    res.render('pages/new-user')
})

//Get Individual user

app.get('/users/:id', (req, res) => {
    const user = data.users[req.params.id]
    res.send(user)
})


//Create new user
app.post('/users', (req, res) => {
    //using bcryptjs
    const password = req.body.password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)

    //Add hash to user object and then push to user Array
    data.users.push({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
    })

    res.redirect('/users')
})
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})


