const express = require('express')
const passport = require('passport')
require('dotenv').config()
var app = express()
app.use(require('serve-static')(__dirname + '/public'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(passport.initialize())
const port = process.env.ENGINE_PORT

var github = require('./providers/github.js');
app.use('/', github);

app.listen(port, () => console.log(`ScryptaID Engine listening on port ${port}!`))
