const express = require('express')
const passport = require('passport')
const axios = require('axios')
require('dotenv').config()
const sign = require('../libs/sign.js')

var GitHubStrategy = require('passport-github').Strategy;
var router = express.Router();

router.get('/github/:privkey', 
    function(req, res){
        console.log('Requested GitHub authentication.')
        var privkey = req.params.privkey
        req.session.privkey = privkey
        res.redirect('/auth/github');
    }
);
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/auth/error', session: false }),
    function(req, res) {
        res.json(req.session.github);
    }
);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_CLIENTSECRET,
    callbackURL: process.env.GITHUB_CALLBACK,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    let githubID = {
        username: profile.username,
        id: profile.id,
        token: accessToken
    }
    sign.signWithKey(req.session.privkey, JSON.stringify(githubID)).then(signature => {
        let github = {
            profile: githubID,
            signature: signature.signature,
            address: signature.address,
            pubKey: signature.pubKey
        }
        console.log('Authentication done and signed.')
        req.session.github = github
        return done(null, github)
    })
  }
));

router.get('/github/verify/:token', function(req, res){
    let token = req.params.token
    if(token !== undefined){
        axios.get('https://api.github.com/user', { params: {access_token: token }}).then(result => {
            res.json({verified: true, profile: result.data})
        }).catch(error => {
            res.json({verified: false})
        })
    }
})

module.exports = router;