const express = require('express')
const passport = require('passport')
const axios = require('axios')
require('dotenv').config()
const sign = require('../libs/sign.js')

var TwitterStrategy = require('passport-twitter').Strategy;
var router = express.Router();

router.get('/twitter/:privkey', 
    function(req, res){
        console.log('Requested twitter authentication.')
        var privkey = req.params.privkey
        req.session.privkey = privkey
        res.redirect('/auth/twitter');
    }
);
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { failureRedirect: '/auth/error', session: false }),
    function(req, res) {
        res.json(req.session.twitter);
    }
);

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CLIENTID,
    consumerSecret: process.env.TWITTER_CLIENTSECRET,
    callbackURL: process.env.TWITTER_CALLBACK,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    let twitterID = {
        name: profile.displayName,
        id: profile.id,
        token: accessToken
    }
    console.log(profile)
    sign.signWithKey(req.session.privkey, JSON.stringify(twitterID)).then(signature => {
        let twitter = {
            profile: twitterID,
            signature: signature.signature,
            address: signature.address,
            pubKey: signature.pubKey
        }
        console.log('Authentication done and signed.')
        req.session.twitter = twitter
        return done(null, twitter)
    })
  }
));

router.get('/twitter/verify/:token', function(req, res){
    let token = req.params.token
    if(token !== undefined){
        
    }
})

module.exports = router;