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

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})


