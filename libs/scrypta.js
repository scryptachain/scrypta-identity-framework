"use strict";
import Trx from './libs/trx/trx.js'
let request = require("request")

module.exports = {
    request: async function(method, params = []) {
        return new Promise(response => {
            var rpcuser = process.env.RPCUSER
            var rpcpassword = process.env.RPCPASSWORD
            var rpcendpoint = 'http://'+ process.env.RPCADDRESS +':' + process.env.RPCPORT
            if(process.env.DEBUG === "full"){
                console.log('Connecting to ' + rpcendpoint + ' WITH ' +rpcuser+'/'+rpcpassword)
            }
            let req = {
                url: rpcendpoint,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(rpcuser + ":" + rpcpassword).toString("base64")
                },
                body: JSON.stringify({
                    id: Math.floor((Math.random() * 100000) + 1),
                    params: params,
                    method: method
                })
            };
            request(req, function (err, res, body) {
                try {
                    if(process.env.DEBUG === "full"){
                        console.log(body)
                    }
                    response(JSON.parse(body))
                } catch (err) {
                    response(body)
                }
            });
        })
    },
    send: async function(private_key, from, to, amount, metadata = '', fees = 0.001){
        return new Promise (async response => {
            var unspent = await module.exports.request('listunspent',[0,99999999,[from]])
            if(unspent['result'].length > 0){
                var inputamount = 0;
                var trx = Trx.transaction();
                for (var i=0; i < unspent['result'].length; i++){
                    if(inputamount <= amount){
                        var txin = unspent['result'][i]['txid'];
                        var index = unspent['result'][i]['vout'];
                        var script = unspent['result'][i]['scriptPubKey'];
                        trx.addinput(txin,index,script);
                        inputamount += unspent['result'][i]['amount']
                    }
                }
                var amountneed = parseFloat(amount) + fees;
                if(inputamount >= amountneed){
                    var change = inputamount - amountneed;
                    if(amount > 0.00001){
                        trx.addoutput(to,amount);
                    }
                    if(change > 0.00001){
                        trx.addoutput(from,change);
                    }

                    if(metadata !== '' && metadata.length <= 80){
                        trx.addmetadata(metadata);
                    }

                    var signed = trx.sign(private_key,1);

                    var txid = await module.exports.request('sendrawtransaction',[signed])
                    response(txid['result'])
                }else{
                    console.log('NOT ENOUGH FUNDS')
                    response(false)
                }
            }else{
                response(false)
            }
        })
    }
}
