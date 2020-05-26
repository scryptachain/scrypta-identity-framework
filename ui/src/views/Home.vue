<template>
  <div class="home">
    <div class="login-7 tab-box">
        <div class="container-fluid">
            <div class="row">
                <div class="" v-if="address">
                    <div class="login-inner-form" v-if="!success">
                        <div class="details">
                            <h1>Link a Digital Identity</h1>
                            <br>to {{ address }}<br><br>
                            <div class="columns" v-bind:class="{ isGithub: isGithub, isGoogle: isGoogle, isTwitter: isTwitter, isLinkedin: isLinkedin, isEmail: isEmail, isPhone: isPhone }">
                              <div v-for="provider in providers" class="column" v-on:click="selectProvider(provider)" v-bind:key="provider">
                                  <div :class="'card is-' + provider" style="cursor:pointer">
                                    <div class="card-content">
                                      <img :src="'/'+provider+'.png'" width="100%">
                                    </div>
                                    <footer class="card-footer">
                                      <p class="card-footer-item">
                                        <span>
                                          {{ provider.toUpperCase() }}
                                        </span>
                                      </p>
                                    </footer>
                                  </div>
                              </div>
                            </div>
                            <form id="verificationForm" :action="backendURL + '/auth/' + provider" method="GET">
                                <br>
                                <div class="form-group" v-if="provider === 'email' && showEmailVerification === false">
                                  Insert your e-mail to continue:<br><br>
                                  <b-input v-model="email" type="email" placeholder="Insert E-Mail"></b-input><br>
                                </div>
                                <div class="form-group" v-if="provider === 'phone' && showSmsVerification === false">
                                    Insert your phone number to continue:<br><br>
                                    <b-input v-model="phone"  placeholder="Insert Phone number"></b-input>
                                    <br><small>Insert the country prefix before (ex +393331122333)</small><br><br>
                                </div>
                                <div class="form-group" v-if="provider === 'phone' && showSmsVerification === true">
                                    Insert the OTP received by SMS:<br><br>
                                    <b-input v-model="smsverification"  placeholder="Insert code"></b-input><br>
                                </div>
                                <div class="form-group" v-if="provider === 'email' && showEmailVerification === true">
                                    Insert the OTP received by E-Mail:<br><br>
                                    <b-input v-model="emailverification" placeholder="Insert code"></b-input><br>
                                </div>
                                <div class="form-group row">
                                    <div class="col-12">
                                        <b-button v-if="provider !== 'phone' && provider !== 'email'" v-on:click="submitVerification()" type="is-primary">Start verification with {{ provider.toUpperCase() }}</b-button>
                                        <b-button v-if="provider === 'phone' && showSmsVerification === false" v-on:click="sendSMS()" type="is-primary">Send verification SMS</b-button>
                                        <b-button v-if="provider === 'phone' && showSmsVerification === true" v-on:click="verifySMS()" type="is-primary">Verify SMS</b-button>
                                        <b-button v-if="provider === 'email' && showEmailVerification === false" v-on:click="sendEmail()" type="is-primary">Send verification e-mail</b-button>
                                        <b-button v-if="provider === 'email' && showEmailVerification === true" v-on:click="verifyEMail()" type="is-primary">Verify e-mail</b-button>
                                        <br>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div><!--login-form-->
                    <div v-if="!updated">
                        <div class="login-inner-form" v-if="success">
                            <img src="/success.png" width="200"><br>
                            <br>You've successfully verified your <b>{{ success.toUpperCase() }}</b> account:<br><br>
                            <b>Username:</b> {{ payload.identity.username }}<br>
                            <span v-if="payload.identity.id !== undefined">
                              <b>ID:</b> {{ payload.identity.id }}<br><br>
                            </span><br>
                            <b-button v-on:click="writeIdentity()" v-if="!isWriting" type="is-primary">Write identity's signature into the Blockchain</b-button>
                            <div v-if="isWriting">
                                {{ workingmessage }}
                            </div>
                        </div>
                    </div>
                    <div v-if="updated">
                        <div class="login-inner-form text-center">
                            <h4>Process completed!</h4>
                            Now is time to download your updated .sid file and sync your dApps and your extension!<br>
                            Please note, no one keeps your identity payload, only you can share it, these informations are not stored in any server.<br><br>
                            <a id="downloadsid" style="display:none"></a>
                            <b-button v-on:click="downloadSidFile()" type="is-primary">Download .sid file</b-button><br><br>
                            <a :href="shareURL" target="_blank"><b-button type="is-success">SHARE IDENTITY</b-button></a><br><br>
                            <a href="/">Go back</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
const msgpack = require('msgpack5')(), encode  = msgpack.encode, decode = msgpack.decode
const ScryptaCore = require('@scrypta/core')
const axios = require('axios')

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
        isGithub: true,
        isGoogle: false,
        isTwitter: false,
        isLinkedin: false,
        isEmail: false,
        isPhone: false,
        provider: 'github',
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
      let url = document.URL
      const app = this
      let normalized = window.location.href
      let dot = normalized.split('?')
      app.backendURL = dot[0].replace(':8080/',':3000/').replace('/#/','').replace(':3000/',':3000')
      let providersRequest = await app.axios.get(app.backendURL + '/providers');
      let providers = providersRequest.data.providers
      app.providers = providers
      
      let check = await this.checkUser()
      if(check === true){
        if(url.indexOf('?') !== -1){
          let split = url.split('?')
          if(split[1] !== undefined){
            let params = split[1].split('=')
            if(params[1] !== undefined && params[1].replace('#','').replace('#/','').replace('/','') === 'success'){
              app.success = params[0]
              app.axios.post(app.backendURL + '/auth/' + params[0] + '/session').then(payload => {
                if(payload.data.identity !== undefined){
                  app.payload = payload.data
                }else{
                  window.location = '/'
                }
              })
            }
          }
        }
      }
    },
    methods: {
        selectProvider(provider){
          const app = this
          app.provider = provider
          app.isGithub = false
          app.isGoogle = false
          app.isPhone = false
          app.isEmail = false
          app.isLinkedin = false
          app.isTwitter = false
          if(provider === 'github'){
            app.isGithub = true
          }
          if(provider === 'google'){
            app.isGoogle = true
          }
          if(provider === 'twitter'){
            app.isTwitter = true
          }
          if(provider === 'linkedin'){
            app.isLinkedin = true
          }
          if(provider === 'email'){
            app.isEmail = true
          }
          if(provider === 'phone'){
            app.isPhone = true
          }
        },
        sendEmail(){
          const app = this
          if(app.email !== ''){
            app.axios.post(app.backendURL + '/email/send', {email: app.email}).then(response => {
              if(response.data.success === true){
                app.showEmailVerification = true
              }
            })
          }else{
            alert('Write email first!')
          }
        },
        verifyEMail(){
          const app = this
          if(app.emailverification !== undefined){
            app.axios.post(app.backendURL + '/email/verify', {email: app.email, code: app.emailverification}).then(result => {
              if(result.data.status === 200){
                app.success = 'email'
                app.payload = result.data.success
              }else{
                alert('Code is invalid!')
              }
            })
          }else{
            alert('Write code first!')
          }
        },
        sendSMS(){
          const app = this
          if(app.phone !== ''){
            app.axios.post(app.backendURL + '/phone/send', {number: app.phone}).then(response => {
              if(response.data.success === true){
                app.showSmsVerification = true
              }
            })
          }else{
            alert('Write phone first!')
          }
        },
        verifySMS(){
          const app = this
          if(app.smsverification !== undefined){
            app.axios.post(app.backendURL + '/phone/verify', {number: app.phone, code: app.smsverification}).then(result => {
              if(result.data.status === 200){
                app.success = 'phone'
                app.payload = result.data.success
              }else{
                alert('Code is invalid!')
              }
            })
          }else{
            alert('Write code first!')
          }
        },
        submitVerification(){
          const app = this
          if(app.provider !== ''){
            document.getElementById("verificationForm").submit();
          }
        },
        async checkUser(){
          let user = await this.scrypta.returnDefaultIdentity()
          if (user) {
            let split = user.split(':')
            this.address = split[0];
            this.encrypted_wallet = user
            return true
          }
        },
        downloadSidFile(){
          var a = document.getElementById("downloadsid");
          var file = new Blob(
            [this.encrypted_wallet],
            { type: "sid" }
          );
          a.href = URL.createObjectURL(file);
          a.download = this.address + ".sid";
          var clickEvent = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: false
          });
          a.dispatchEvent(clickEvent);
        },
        writeIdentity(){
          const app = this
          app.$buefy.dialog.prompt({
            message: `Enter wallet password`,
            inputAttrs: {
              type: "password"
            },
            trapFocus: true,
            onConfirm: async password => {
              let sid = await app.scrypta.readKey(password, app.encrypted_wallet);
              if(sid !== false){
                app.isWriting = true
                let private_key = sid.prv
                app.workingmessage = 'Signing identity with private key...'
                var toStore = {
                  identity: app.payload.identity,
                  fingerprint: app.payload.fingerprint
                }
                app.scrypta.signMessage(private_key, JSON.stringify(toStore)).then(async signed => {
                  if(sid.identity === undefined){
                    sid.identity = {}
                  }
                  sid.identity[app.success] = {}
                  sid.identity[app.success] = toStore

                  if(sid.identity[app.success] === toStore){
                      await app.scrypta.buildWallet(password, app.address, sid, true)
                      let newkey = await app.scrypta.returnIdentity(app.address)
                      let confirm = await app.scrypta.readKey(password, newkey.wallet)
                      if(confirm.identity[app.success].fingerprint === toStore.fingerprint){
                        app.encrypted_wallet = newkey.wallet
                        localStorage.setItem('SID', newkey.wallet)
                        let message = {
                          signature: signed.signature,
                          gateway: app.payload.gateway,
                          fingerprint: app.payload.fingerprint
                        }
                        app.workingmessage = 'Uploading data to the blockchain...'
                        app.scrypta.write(app.encrypted_wallet, password, JSON.stringify(message), '', app.success.toUpperCase() , 'I://').then(res => {
                          if(res.uuid !== undefined){
                            app.isWriting = false
                            app.workingmessage = 'Data written correctly.'
                            app.payload = ''
                            app.decrypted_wallet = 'WALLET LOCKED'
                            app.updated = app.encrypted_wallet
                            setTimeout(function(){
                              sid.identity.address = app.address
                              sid.identity.key = sid.key
                              let encoded = app.encodeMsgPack(sid.identity)
                              app.shareURL = 'https://me.scrypta.id/#/share/' + encoded
                            },30)
                          }else{
                            alert('There\'s an error in the upload, please retry!')
                            app.isWriting = false
                          }
                        }).catch(() => {
                          alert('There\'s an error in the upload, please retry!')
                          app.isWriting = false
                        })
                      }else{
                        alert('Something goes wrong, retry please!')
                      }
                    }else{
                      alert('Something goes wrong, retry please!')
                    }
                  })
              } else {
                app.$buefy.toast.open({
                  message: "Wrong password!",
                  type: "is-danger"
                });
              }
            }
          })
        },
        encodeMsgPack(what){
          let encoded = encode(what).toString('hex')
          return encoded
        },
        decodeMsgPack(what){
          const fromHexString = hexString => new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
          let bint = fromHexString(what)
          let decoded = decode(bint)
          return decoded
        }
    }
}
</script>
<style>
  .home{
    padding: 20px;
  }
  .isGithub .is-github{background:#eee!important}
  .isGoogle .is-google{background:#eee!important}
  .isTwitter .is-twitter{background:#eee!important}
  .isLinkedin .is-linkedin{background:#eee!important}
  .isPhone .is-phone{background:#eee!important}
  .isEmail .is-email{background:#eee!important}
</style> 