const express = require('express')
const passport = require('passport')
const axios = require('axios')
require('dotenv').config()
var router = express.Router();

/* Using Twilio API */

router.get('/sms/:privkey/:number', 
    function(req, res){
        console.log('Requested SMS authentication.')
        var privkey = req.params.privkey
        req.session.privkey = privkey
    }
);

module.exports = router;