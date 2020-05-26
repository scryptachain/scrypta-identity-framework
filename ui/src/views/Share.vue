<template>
  <div class="home">
    <div class="login-7 tab-box">
      <h1>Digital identities of<div style="font-size:14px;">{{ address }}</div></h1>
      <br><p>These informations are strictly confidentials, please don't share the link with third parties.</p>
      <div style="border:1px solid #ccc; text-align:left; color:#000; border-radius:5px; margin-top:20px; font-size:12px; padding:15px">
          <v-gravatar :email="address" style="float:left; height:55px; margin-right:10px;" />
          <strong>LYRA ADDRESS</strong><br>
          Created at block <strong>{{ first_tx.blockheight }}</strong><br>
          {{ address.substr(0,6) }}...{{ address.substr(-6) }}<br>
      </div>
      <div v-for="id in linked" v-bind:key="id.refID">
          <a :href="'https://proof.scryptachain.org/#/uuid/' + id.uuid" target="_blank">
            <div style="border:1px solid #ccc; text-align: left; color:#000; border-radius:5px; margin-top:20px; font-size:12px; padding:15px">
                <img :src = "'/' + id.refID.toLowerCase() + '.png'" style="float:left; height:75px; margin-right:10px;" />
                <strong>{{ id.refID }}</strong><br>{{ id.identity.username }}<br>
                <span v-if="id.identity.id !== undefined">ID: {{ id.identity.id }}<br></span>
                Written at block <strong>{{ id.block }}</strong><br>
                {{ id.data.signature.substr(0,6) }} ... {{ id.data.signature.substr(-6) }}
            </div>
          </a>
      </div>
    </div>
  </div>
</template>

<script>
const ScryptaCore = require('@scrypta/core')
const axios = require('axios')
var zlib = require('zlib')

export default {
  name: 'Home',
  data() {
    return {
        scrypta: new ScryptaCore(true),
        backendURL: '',
        address: '',
        file: '',
        isWriting: false,
        showSmsVerification: false,
        showEmailVerification: false,
        smsverification: '',
        emailverification: '',
        unlockPwd: '',
        showQRCanvas: false,
        provider: '',
        first_tx: {},
        email: '',
        providers: [],
        phone: '',
        workingmessage: '',
        success: '',
        encrypted_wallet: '',
        public_qrcode: '',
        sync_qrcode: '',
        decrypted_wallet: '',
        linked: '',
        updated: '',
        axios: axios,
        shareURL: '',
        payload: {
          identity:{
            username: '',
            id: ''
          }
        }
      }
    },
    async mounted (){
      const app = this
      app.checkIdentity()
    },
    methods: {
        async checkIdentity(){
          const app = this
          let compressed = app.$route.params.identity
          while(compressed.indexOf('*') !== -1){
            compressed = compressed.replace('*','/')
          }
          let identity = JSON.parse(zlib.inflateSync(new Buffer(compressed, 'base64')).toString())
          app.address = identity.address
          let transactions = await app.scrypta.get('/transactions/' + app.address)
          let last = transactions.data.length - 1
          app.first_tx = transactions.data[last]
          app.scrypta.post('/read', {
            protocol: 'I://',
            address: identity.address
          }).then(async result => {
            var identities = {}
            for(let k in result.data){
              let id = result.data[k]
              if(identities[id.refID] === undefined){
                identities[id.refID] = id
              }
            }
            app.linked = []
            for(let k in identity){
              let id = identity[k]
              for(let y in identities){
                let idB = identities[y]
                //PUBLIC VERIFICATION
                let verify = await app.scrypta.verifyMessage(identity.key, idB.data.signature, JSON.stringify(id))
                if(verify !== false && verify.address === identity.address){
                  idB.identity = id.identity
                  app.linked.push(idB)
                }
              }
            }
          })
        }
    }
}
</script>
<style>
  .home{
    padding: 20px;
  }
</style> 