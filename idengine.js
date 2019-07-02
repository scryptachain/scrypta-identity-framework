const express = require('express')
const passport = require('passport')
const axios = require('axios')
require('dotenv').config()
var app = express()
app.use(require('serve-static')(__dirname + '/public'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(passport.initialize())
const port = 3000
var CoinKey = require('coinkey')
const CryptoJS = require('crypto-js')
const secp256k1 = require('secp256k1')

const lyraInfo = {
    private: 0xae,
    public: 0x30,
    scripthash: 0x0d
};

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
    
    signWithKey(privKeyTest, JSON.stringify(githubID)).then(signature => {
        let ID = {
            profile: jwt,
            signature: signature.signature,
            pubKey: signature.pubKey
        }
        return cb(JSON.stringify(ID))
    })
  }
));
//GITHUB

//SIGNING FUNCTIONS
async function signWithKey(key, message){
    return new Promise(response => {
        //CREATING CK OBJECT
        var ck = CoinKey.fromWif(key, lyraInfo);
        //CREATE HASH FROM MESSAGE
        let hash = CryptoJS.SHA256(message);
        let msg = Buffer.from(hash.toString(CryptoJS.enc.Hex), 'hex');
        //GETTING PUBKEY FROM PRIVATEKEY
        let privKey = ck.privateKey
        //SIGNING MESSAGE
        const sigObj = secp256k1.sign(msg, privKey)
        const pubKey = secp256k1.publicKeyCreate(privKey)

        response({
            signature: sigObj.signature.toString('hex'),
            pubKey: pubKey.toString('hex')
        })
    })
}

async function returnPubKey(key){
    return new Promise(response => {
        //CREATING CK OBJECT
        var ck = CoinKey.fromWif(key, lyraInfo);
        //GETTING PUBKEY FROM PRIVATEKEY
        let privKey = ck.privateKey
        const pubKey = secp256k1.publicKeyCreate(privKey)
        response(pubKey)
    })
}

async function verifySign(keyhex, sighex, message){
    return new Promise(response => {
        //CREATE HASH FROM MESSAGE
        let hash = CryptoJS.SHA256(message);
        let msg = Buffer.from(hash.toString(CryptoJS.enc.Hex), 'hex')
        //VERIFY MESSAGE
        let signature = Buffer.from(sighex,'hex')
        let pubKey = Buffer.from(keyhex,'hex')
        verified = secp256k1.verify(msg, signature, pubKey)
        response(verified)
    })
}

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