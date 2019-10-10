var app = new Vue({
    el: '#app',
    data: {
      scrypta: window.ScryptaCore,
      address: '',
      file: '',
      isWriting: false,
      showSmsVerification: false,
      smsverification: '',
      unlockPwd: '',
      showQRCanvas: false,
      provider: '',
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
      axios: window.axios,
      payload: {
        identity:{
          username: '',
          id: ''
        }
      }
    },
    async mounted (){
      let url = document.URL
      const app = this
      let providersRequest = await app.axios.get('/providers');
      let providers = providersRequest.data.providers
      app.providers = providers
      
      let check = await this.checkUser()
      if(check === true){
        if(url.indexOf('?') !== -1){
          let split = url.split('?')
          if(split[1] !== undefined){
            let params = split[1].split('=')
            if(params[1] !== undefined && params[1].replace('#','') === 'success'){
              app.success = params[0]
              app.axios.post('/auth/' + params[0] + '/session').then(payload => {
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
        async checkIdentities(){
          const app = this
          let idanode = await app.scrypta.connectNode();
          app.axios.post(idanode + '/read', {
            protocol: 'I://',
            address: app.address
          }).then(async result => {
            var identities = {}
            for(let k in result.data.data){
              let id = result.data.data[k]
              if(identities[id.refID] === undefined){
                identities[id.refID] = id
              }
            }
            app.linked = []
            for(let k in app.decrypted_wallet.identity){
              let id = app.decrypted_wallet.identity[k]
              //PRIVATE VERIFICATION
              let signed = await app.scrypta.signMessage(app.decrypted_wallet.prv, JSON.stringify(id))
              for(let y in identities){
                let idB = identities[y]
                if(idB.data.signature === signed.signature){
                  //PUBLIC VERIFICATION
                  let verify = await app.scrypta.verifyMessage(app.decrypted_wallet.key, idB.data.signature, JSON.stringify(id))
                  if(verify !== false && verify.address === app.address){
                    idB.identity = id.identity
                    app.linked.push(idB)
                  }
                }
              }
            }
          })
        },
        showQR(){
          const app = this
          if(app.unlockPwd !== ''){
            app.scrypta.readKey(app.unlockPwd).then(sid => {
              if(sid !== false){
                app.decrypted_wallet = sid
                this.showQRCanvas = true
                let QR = {
                  address: app.address,
                  pubkey: sid.key,
                  identity: sid.identity
                }
                setTimeout(function(){
                  var qr = new QRious({
                    element: document.getElementById('qrcode'),
                    value: JSON.stringify(QR)
                  });
                  qr.level = 'L';
                  qr.size = 500;
                  app.public_qrcode = qr.toDataURL()
                },30)
                app.checkIdentities()
              }else{
                alert('Wrong password!')
              }
            })
          }
        },
        revealID(method){
          const app = this
          console.log(app.linked[method])
          //TODO
        },
        sendSMS(){
          const app = this
          if(app.phone !== ''){
            app.showSmsVerification = true
            app.axios.post('/phone/send', {number: app.phone}).then(response => {
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
            app.axios.post('/phone/verify', {number: app.phone, code: app.smsverification}).then(result => {
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
            document.getElementById("verificationForm").submit();
        },
        loadWalletFromFile(ev) {
          const file = ev.target.files[0];
          const reader = new FileReader();
          var app = this;
          reader.onload = function() {
            var dataKey = reader.result;
            app.scrypta.saveKey(dataKey).then(function() {
              setTimeout(function() {
                location.reload();
              }, 1000);
            });
          };
          reader.readAsText(file);
        },
        checkUser(){
          return new Promise(response => {
            if (this.scrypta.keyExist()) {
              this.$emit(
                "onFoundUser",
                this.scrypta.keyExist(),
                this.scrypta.RAWsAPIKey
              );
              this.address = this.scrypta.PubAddress;
              this.encrypted_wallet = this.scrypta.PubAddress + ':' + this.scrypta.RAWsAPIKey
              response(true)
            }
          })
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
          if(this.unlockPwd !== ''){
            app.decrypted_wallet = 'WALLET LOCKED'
            app.scrypta.readKey(this.unlockPwd).then(function (sid) {
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
                      let updated = await app.scrypta.buildWallet(app.unlockPwd, app.address, sid, true)
                      let confirm = await app.scrypta.readKey(app.unlockPwd)
                      if(confirm.identity[app.success].fingerprint === toStore.fingerprint){
                        app.encrypted_wallet = updated
                        let message = {
                          signature: signed.signature,
                          gateway: app.payload.gateway,
                          fingerprint: app.payload.fingerprint
                        }

                        app.workingmessage = 'Uploading data to the blockchain...'
                        app.scrypta.write(app.unlockPwd, JSON.stringify(message), '', app.success.toUpperCase() , 'I://', app.encrypted_wallet).then(res => {
                          if(res.uuid !== undefined){
                            app.isWriting = false
                            app.workingmessage = 'Data written correctly.'
                            app.payload = ''
                            app.decrypted_wallet = 'WALLET LOCKED'
                            app.updated = app.encrypted_wallet
                            setTimeout(function(){
                              var qr = new QRious({
                                element: document.getElementById('qrcode'),
                                value: JSON.stringify(sid.identity)
                              });
                              qr.level = 'L';
                              qr.size = 500;
                              app.sync_qrcode = qr.toDataURL()
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
              }else{
                alert('Wrong password!')
              }
            })
          }else{
            alert('Write your password first')
          }
        }
    }
  })