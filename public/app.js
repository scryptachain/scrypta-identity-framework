var app = new Vue({
    el: '#app',
    data: {
      scrypta: window.ScryptaCore,
      address: '',
      file: '',
      isWriting: false,
      unlockPwd: '',
      provider: '',
      email: '',
      phone: '',
      workingmessage: '',
      success: '',
      encrypted_wallet: '',
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
          }).then(result => {
            var identities = {}
            for(let k in result.data.data){
              let id = result.data.data[k]
              if(identities[id.refID] === undefined){
                identities[id.refID] = id
              }
            }
            app.linked = identities
          })
        },
        revealID(method){
          const app = this
          console.log(app.linked[method])
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
                app.scrypta.signMessage(private_key, JSON.stringify(app.payload)).then(async signed => {
                  if(sid.identity === undefined){
                    sid.identity = {}
                  }
                  if(sid.identity[app.success] === undefined){
                    sid.identity[app.success] = {}
                  }

                  sid.identity[app.success] = app.payload
                  let updated = await app.scrypta.buildWallet(app.unlockPwd, app.address, sid, true)
                  app.encrypted_wallet = updated

                  let message = {
                    signature: signed.signature,
                    provider: app.payload.provider,
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
                          element: document.getElementById('qr'),
                          value: app.updated
                        });
                        qr.level = 'H';
                        qr.padding = 0;
                        qr.size = 1000;
                      },30)
                    }else{
                      alert('There\'s an error in the upload, please retry!')
                      app.isWriting = false
                    }
                  }).catch(() => {
                    alert('There\'s an error in the upload, please retry!')
                    app.isWriting = false
                  })
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