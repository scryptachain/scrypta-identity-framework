const express = require('express')
const passport = require('passport')
require('dotenv').config()
var app = express()
app.use(require('serve-static')(__dirname + '/public'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(passport.initialize())
const port = process.env.ENGINE_PORT
var session = require('express-session')
app.set('trust proxy', 1)

app.use(session({
    secret: process.env.SESSION_SECRET,  
    resave: false,
    saveUninitialized: true
}))

var github = require('./providers/github.js');
app.use('/', github);

var google = require('./providers/google.js');
app.use('/', google);

app.get('/auth/error', function (req, res) {
    res.json({message: 'Authentication failed', status: 401})
})

app.listen(port, () => console.log(`ScryptaID Engine listening on port ${port}!`))
