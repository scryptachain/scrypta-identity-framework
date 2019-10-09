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
const providers = require('./providers')
const fs = require('fs')

app.use(session({
    secret: process.env.SESSION_SECRET,  
    resave: false,
    saveUninitialized: true
}))
app.use(express.static('public'))

app.get('/', 
    function(req, res){
        fs.readFile('index.html', {encoding: 'utf-8'}, function(err,data){
            res.send(data)
        })
    }
)

if(providers.github !== undefined){
    var github = require('./providers/github');
    app.use('/', github);
}

if(providers.google !== undefined){
    var google = require('./providers/google');
    app.use('/', google);
}

if(providers.twitter !== undefined){
    var twitter = require('./providers/twitter');
    app.use('/', twitter);
}

if(providers.linkedin !== undefined){
    var linkedin = require('./providers/linkedin');
    app.use('/', linkedin);
}

if(providers.phone !== undefined){
    var phone = require('./providers/phone');
    app.use('/', phone);
}

app.get('/auth/error', function (req, res) {
    res.json({message: 'Authentication failed', status: 401})
})

app.listen(port, () => console.log(`Scrypta identity framework listening on port ${port}!`))
