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
    db.any("SELECT username,day,starttime,endtime FROM users;")
    .then(users => {
        console.log(users);
        res.render('pages/home',{users})
    })
    .catch(error => {
        console.log(error);
        res.end()
    })
})


//All users
app.get('/users', (req, res) => {
    db.any("SELECT username,day,starttime,endtime FROM users;")
    .then(users => {
        console.log(users);
        res.render('pages/allusers',{users})
    })
    .catch(error => {
        console.log(error);
        res.end()
    })
})

//module.exports = app;

//Routes
app.get('/posts', (req,res) => {
    db.any("SELECT username,day,starttime,endtime FROM users;")
    .then(data => {
        console.log(data);
        res.render('pages/post',{data})
    })
    .catch(error => {
        console.log(error);
        res.end()
    })
});


app.get('/users', (req,res) => {
    db.any("SELECT username,day,starttime,endtime FROM users;")
    .then(data => {
        console.log(data);
        res.render('pages/users',{data})
    })
    .catch(error => {
        console.log(error);
        res.end()
    })
});


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


