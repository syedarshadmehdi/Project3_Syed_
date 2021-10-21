const express = require('express')
const data = require('./data')
const bcrypt = require('bcryptjs')
const db = require('./database')
const app = express()

const PORT = process.env.PORT || 3000


//JSON and form Parsing middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set engine
app.set('view engine', 'ejs')

//Routes
app.get('/', (req, res) => {
    res.render('pages/home')
})

//Homepage
app.get('/', (req, res) => {
    res.send //send back raw data
    res.json //send back raw data converts to json if needed
    res.render // send back a compiled html pages eg: homepage, contactpage
    res.redirect //redirect to a new url/route eg: www.google.com
    res.end // end the request/ processing / send nothing back
})






app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})


