const express = require('express')
const passport = require('passport')
const axios = require('axios')
require('dotenv').config()
var app = express()
app.use(require('serve-static')(__dirname + '/public'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(passport.initialize())
const port = process.env.ENGINE_PORT
const sign = require('./sign.js')

var GitHubStrategy = require('passport-github').Strategy;
var privKeyTest = 'Spv2RHfg2sheqCmLAvPsyGgTHYDCvKe9tS9yH47jzwEsFVCWe9mP'

app.listen(port, () => console.log(`ScryptaID Engine listening on port ${port}!`))

//GITHUB
app.get('/auth/github',passport.authenticate('github'));
app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/auth/github' }),
    function(req, res) {
        res.redirect('/');
    }
);
app.get('/auth/github/verify/:token', function(req, res){ // example: /auth/github/verify/fafdfd02c4b0071d2b36a81f374eb8c95f124c71
    let token = req.params.token
    if(token !== undefined){
        axios.get('https://api.github.com/user', { params: {access_token: token }}).then(result => {
            res.json({verified: true, profile: result.data})
        }).catch(error => {
            res.json({verified: false})
        })
    }
})

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_CLIENTSECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    let githubID = {
        username: profile.username,
        id: profile.id,
        token: accessToken
    }
    
    sign.signWithKey(privKeyTest, JSON.stringify(githubID)).then(signature => {
        let ID = {
            profile: githubID,
            signature: signature.signature,
            pubKey: signature.pubKey
        }
        return cb(JSON.stringify(ID))
    })
  }
));
//GITHUB

//EXAMPLE
/*
signWithKey('Spv2RHfg2sheqCmLAvPsyGgTHYDCvKe9tS9yH47jzwEsFVCWe9mP', "Hello ScryptaID!").then(signature => {
    console.log(signature)
    //VERIFY WITH PUBLIC KEY
    verifySign('0379cbafcd800a600eaf7984f48fb51b59b2ee0a2a21e3f065eeed907ec8adac38', signature, 'Hello ScryptaID!').then(verified => {
        console.log(verified)
    })
})
*/