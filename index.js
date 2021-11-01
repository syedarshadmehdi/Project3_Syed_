const express = require('express')
const data = require('./data')
const bcrypt = require('bcryptjs')
const morgan = require('morgan')
const app = express()
const db = require('./database')



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
    db.any('SELECT * FROM users;')
        .then((users) => {
            res.render('pages/users',
                {
                    users: users
                }
            )
        })

        .catch((error) => {
            console.log(error)
        })

})

//Get all schedules
app.get('/schedules', (req, res) => {
    db.any('SELECT * FROM schedules;')
        .then((schedules) => {
            res.render('pages/schedules',
                {
                    schedules: schedules
                }
            )
        })

        .catch((error) => {
            console.log(error)
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
    if (user) {
        res.render('pages/users', { user: user })
    } else { res.send("user not exist") 
}
    res.send(user)
})

//create new user
app.post('/users', (req, res) => {

    const { firstname, lastname, email, password } = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)


    db.none('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);',
        [firstname, lastname, email, hash])
        .then(() => {
            res.redirect('/users')
        })
        .catch((error) => {
            res.render(error)
        })

})


app.post('/schedules', (req, res) => {

    const { user_id, day, start_at, end_at } = req.body

    db.none('INSERT INTO schedules (user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);',
        [user_id, day, start_at, end_at])
        .then(() => {
            res.redirect('/schedules')
        })
        .catch((error) => {
            console.log(error)
        })

})

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})


