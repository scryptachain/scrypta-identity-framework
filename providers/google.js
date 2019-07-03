const express = require('express')
const passport = require('passport')
const axios = require('axios')
require('dotenv').config()
const sign = require('../libs/sign.js')

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var router = express.Router();

router.get('/google/:privkey', 
    function(req, res){
        console.log('Requested google authentication.')
        var privkey = req.params.privkey
        req.session.privkey = privkey
        res.redirect('/auth/google');
    }
);
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/auth/error', session: false }),
    function(req, res) {
        res.json(req.session.google);
    }
);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    let googleID = {
        name: profile.displayName,
        id: profile.id,
        token: accessToken,
        created_at: Date.now()
    }
    sign.signWithKey(req.session.privkey, JSON.stringify(googleID)).then(signature => {
        let google = {
            profile: googleID,
            signature: signature.signature,
            address: signature.address,
            pubKey: signature.pubKey
        }
        console.log('Authentication done and signed.')
        req.session.google = google
        return done(null, google)
    })
  }
));

router.get('/google/verify/:token', function(req, res){
    let token = req.params.token
    if(token !== undefined){
        
    }
})

module.exports = router;