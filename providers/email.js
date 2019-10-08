const express = require('express')
const passport = require('passport')
const axios = require('axios')
require('dotenv').config()
var router = express.Router();

/* Using MailGun API */

router.get('/email/:privkey:/:email', 
    function(req, res){
        console.log('Requested email authentication.')
        var privkey = req.params.privkey
        req.session.privkey = privkey
    }
);

module.exports = router;