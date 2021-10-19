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

//USE CSS FILE
app.use('/assets', express.static('assets'))

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

//Get all schedules
app.get('/schedules', (req, res) => {
    res.render('pages/schedules', {
        schedules: data.schedules
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

//Add new schedules
app.get('/schedules/add', (req, res) => {
    res.render('pages/new-schedules')
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

//Create new schedules
app.post('/schedules', (req, res) => {

    data.schedules.push({
        user_id: req.body.user_id,
        day: req.body.day,
        start_at: req.body.start_at,
        end_at: req.body.end_at
    })

    res.redirect('/schedules')
})
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})


