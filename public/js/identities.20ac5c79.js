(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["identities"],{"4d63":function(t,e,i){var n=i("83ab"),s=i("da84"),r=i("94ca"),a=i("7156"),o=i("9bf2").f,c=i("241c").f,u=i("44e7"),d=i("ad6d"),l=i("9f7f"),f=i("6eeb"),h=i("d039"),_=i("69f3").set,p=i("2626"),v=i("b622"),g=v("match"),b=s.RegExp,m=b.prototype,k=/a/g,y=/a/g,w=new b(k)!==k,x=l.UNSUPPORTED_Y,M=n&&r("RegExp",!w||x||h((function(){return y[g]=!1,b(k)!=k||b(y)==y||"/a/i"!=b(k,"i")})));if(M){var B=function(t,e){var i,n=this instanceof B,s=u(t),r=void 0===e;if(!n&&s&&t.constructor===B&&r)return t;w?s&&!r&&(t=t.source):t instanceof B&&(r&&(e=d.call(t)),t=t.source),x&&(i=!!e&&e.indexOf("y")>-1,i&&(e=e.replace(/y/g,"")));var o=a(w?new b(t,e):b(t,e),n?this:m,B);return x&&i&&_(o,{sticky:i}),o},R=function(t){t in B||o(B,t,{configurable:!0,get:function(){return b[t]},set:function(e){b[t]=e}})},O=c(b),S=0;while(O.length>S)R(O[S++]);m.constructor=B,B.prototype=m,f(s,"RegExp",B)}p("RegExp")},7156:function(t,e,i){var n=i("861d"),s=i("d2bb");t.exports=function(t,e,i){var r,a;return s&&"function"==typeof(r=e.constructor)&&r!==i&&n(a=r.prototype)&&a!==i.prototype&&s(t,a),t}},9643:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home"},[i("div",{staticClass:"login-7 tab-box"},[i("h1",[t._v("Your Digital Identity")]),t.isLoading?i("div",[i("br"),t._v("Loading informations from the blockchain...")]):t._e(),t.isLoading||0!==Object.keys(t.identities).length?t._e():i("div",[i("br"),t._v("Nothing to show, start creating your first digital identity.")]),t.linked.length>0?i("div",[t.showQRCanvas?t._e():i("div",[i("br"),t._v("These are your "),i("b",[t._v("private")]),t._v(" informations, share it only with trusted parties: "),i("div",{staticStyle:{border:"1px solid #ccc","text-align":"left",color:"#000","border-radius":"5px","margin-top":"20px","font-size":"12px",padding:"15px"}},[i("v-gravatar",{staticStyle:{float:"left",height:"55px","margin-right":"10px"},attrs:{email:t.address}}),i("strong",[t._v("LYRA ADDRESS")]),i("br"),t._v(" Created at block "),i("strong",[t._v(t._s(t.first_tx.blockheight))]),i("br"),t._v(" "+t._s(t.address.substr(0,6))+"..."+t._s(t.address.substr(-6))),i("br")],1),t._l(t.linked,(function(e){return i("div",{key:e.refID},[i("a",{attrs:{href:"https://proof.scryptachain.org/#/uuid/"+e.uuid,target:"_blank"}},[i("div",{staticStyle:{border:"1px solid #ccc","text-align":"left",color:"#000","border-radius":"5px","margin-top":"20px","font-size":"12px",padding:"15px"}},[i("img",{staticStyle:{float:"left",height:"75px","margin-right":"10px"},attrs:{src:"/"+e.refID.toLowerCase()+".png"}}),i("strong",[t._v(t._s(e.refID))]),void 0!==e.identity.username&&""!==e.identity.username?i("span",[i("br"),t._v(t._s(e.identity.username)),i("br")]):t._e(),void 0!==e.identity.id&&""!==e.identity.id?i("span",[t._v("ID: "+t._s(e.identity.id)),i("br")]):t._e(),t._v(" Written at block "),i("strong",[t._v(t._s(e.block))]),i("br"),t._v(" "+t._s(e.data.signature.substr(0,6))+" ... "+t._s(e.data.signature.substr(-6))+" "),"EID"===e.refID?i("div",[i("div",{staticStyle:{display:"inline-block"}},[i("b",[t._v("SUBJECT")]),t._v(": "+t._s(e.identity.payload.subject)),i("br"),i("b",[t._v("eID NUMBER")]),t._v(": "+t._s(e.identity.payload.id_number)),i("br"),i("b",[t._v("NAME")]),t._v(": "+t._s(e.identity.payload.name)),i("br"),i("b",[t._v("SURNAME")]),t._v(": "+t._s(e.identity.payload.surname)),i("br"),i("b",[t._v("ISSUED BY")]),t._v(": "+t._s(e.identity.payload.issuer)),i("br"),i("b",[t._v("OFFICE")]),t._v(": "+t._s(e.identity.payload.office)),i("br"),i("b",[t._v("COUNTRY")]),t._v(": "+t._s(e.identity.payload.country)),i("br"),i("b",[t._v("P7M HASH")]),t._v(": "+t._s(e.identity.payload.p7mhash)),i("br")])]):t._e()])])])}))],2),t.showQRCanvas?i("canvas",{staticStyle:{"margin-top":"20px"},attrs:{id:"qrcode"}}):t._e(),i("br"),i("b-button",{staticStyle:{width:"100%"},attrs:{type:"is-primary"},on:{click:t.toggleQR}},[t.showQRCanvas?t._e():i("span",[t._v("SHOW")]),t.showQRCanvas?i("span",[t._v("HIDE")]):t._e(),t._v(" QR-CODE")]),i("br"),i("a",{attrs:{href:t.shareURL,target:"_blank"}},[i("b-button",{staticStyle:{width:"100%"},attrs:{type:"is-success"}},[t._v("SHARE IDENTITY")])],1),i("br")],1):t._e(),Object.keys(t.identities).length>0&&!t.unlocked?i("div",[i("br"),t._v("These are your "),i("b",[t._v("public")]),t._v(" informations: "),i("div",{staticStyle:{border:"1px solid #ccc","text-align":"left",color:"#000","border-radius":"5px","margin-top":"20px","font-size":"12px",padding:"15px"}},[i("v-gravatar",{staticStyle:{float:"left",height:"55px","margin-right":"10px"},attrs:{email:t.address}}),i("strong",[t._v("LYRA ADDRESS")]),i("br"),t._v(" Created at block "),i("strong",[t._v(t._s(t.first_tx.blockheight))]),i("br"),t._v(" "+t._s(t.address.substr(0,6))+"..."+t._s(t.address.substr(-6))),i("br")],1),t._l(t.identities,(function(e){return i("div",{key:e.refID},[i("a",{attrs:{href:"https://proof.scryptachain.org/#/uuid/"+e.uuid,target:"_blank"}},[i("div",{staticStyle:{border:"1px solid #ccc","text-align":"left",color:"#000","border-radius":"5px","margin-top":"20px","font-size":"12px",padding:"15px"}},[i("img",{staticStyle:{float:"left",height:"55px","margin-right":"10px"},attrs:{src:"/"+e.refID.toLowerCase()+".png"}}),i("strong",[t._v(t._s(e.refID))]),i("br"),t._v(" Written at block "),i("strong",[t._v(t._s(e.block))]),i("br"),t._v(" "+t._s(e.data.signature.substr(0,6))+" ... "+t._s(e.data.signature.substr(-6))+" ")])])])})),i("br"),i("b-button",{staticStyle:{width:"100%"},attrs:{type:"is-primary",size:"is-big"},on:{click:function(e){return t.unlockWallet()}}},[t._v("Unlock private informations")]),i("b-button",{staticStyle:{width:"100%"},attrs:{type:"is-success",size:"is-big"},on:{click:function(e){return t.downloadSidFile()}}},[t._v("Backup .sid file")]),i("a",{staticStyle:{display:"none"},attrs:{id:"downloadsid"}})],2):t._e()])])},s=[],r=(i("d3b7"),i("4d63"),i("ac1f"),i("25f0"),i("3ca3"),i("5319"),i("1276"),i("ddb0"),i("2b3d"),i("96cf"),i("1da1")),a=i("07c9"),o=i("bc3a"),c=i("c4a7"),u=i("470b"),d={name:"Home",data:function(){return{scrypta:new a(!0),backendURL:"",address:"",file:"",isWriting:!1,showSmsVerification:!1,showEmailVerification:!1,smsverification:"",emailverification:"",unlockPwd:"",showQRCanvas:!1,provider:"",unlocked:!1,email:"",providers:[],identities:[],phone:"",workingmessage:"",success:"",encrypted_wallet:"",public_qrcode:"",sync_qrcode:"",decrypted_wallet:"",linked:"",updated:"",isLoading:!0,first_tx:{},axios:o,shareURL:"",payload:{identity:{username:"",id:""}}}},mounted:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=t,e.next=3,i.checkUser();case 3:i.checkIdentities();case 4:case"end":return e.stop()}}),e)})))()},methods:{toggleQR:function(){var t=this;t.showQRCanvas?t.showQRCanvas=!1:(t.showQRCanvas=!0,setTimeout((function(){var e=new c({element:document.getElementById("qrcode"),value:t.public_qrcode});e.level="L";var i=window.screen.width-40;i>360&&(i=400),e.size=i}),30))},checkUser:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.scrypta.returnDefaultIdentity();case 2:if(i=e.sent,!i){e.next=8;break}return n=i.split(":"),t.address=n[0],t.encrypted_wallet=i,e.abrupt("return",!0);case 8:case"end":return e.stop()}}),e)})))()},checkIdentities:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var i,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=t,e.next=3,i.scrypta.get("/transactions/"+i.address);case 3:n=e.sent,s=n.data.length-1,i.first_tx=n.data[s],i.scrypta.post("/read",{protocol:"I://",address:i.address}).then(function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var n,s,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:for(s in n={},i.identities={},e.data)r=e.data[s],void 0===n[r.refID]&&(n[r.refID]=r);i.identities=n,i.isLoading=!1;case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 7:case"end":return e.stop()}}),e)})))()},unlockWallet:function(){var t=this;t.$buefy.dialog.prompt({message:"Enter wallet password",inputAttrs:{type:"password"},trapFocus:!0,onConfirm:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(i){var n,s,r,a,o,c,d,l,f,h;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.scrypta.readKey(i,t.encrypted_wallet);case 2:if(n=e.sent,!1===n){e.next=40;break}if(void 0===n.identity){e.next=37;break}t.linked=[],e.t0=regeneratorRuntime.keys(n.identity);case 7:if((e.t1=e.t0()).done){e.next=26;break}return s=e.t1.value,r=n.identity[s],e.next=12,t.scrypta.signMessage(n.prv,JSON.stringify(r));case 12:a=e.sent,e.t2=regeneratorRuntime.keys(t.identities);case 14:if((e.t3=e.t2()).done){e.next=24;break}if(o=e.t3.value,c=t.identities[o],c.data.signature!==a.signature){e.next=22;break}return e.next=20,t.scrypta.verifyMessage(n.key,c.data.signature,JSON.stringify(r));case 20:d=e.sent,!1!==d&&d.address===t.address&&(c.identity=r.identity,t.linked.push(c));case 22:e.next=14;break;case 24:e.next=7;break;case 26:t.unlocked=!0,n.identity.address=t.address,n.identity.key=n.key,l=u.deflateSync(JSON.stringify(n.identity)).toString("base64"),f="/",h=new RegExp(f,"g"),l=l.replace(h,"*"),t.shareURL="https://me.scrypta.id/#/share/"+l,t.public_qrcode=l,e.next=38;break;case 37:t.$buefy.toast.open({message:"The .sid file doesn't contain any identity! Please use the latest version!",type:"is-danger"});case 38:e.next=41;break;case 40:t.$buefy.toast.open({message:"Wrong password!",type:"is-danger"});case 41:case"end":return e.stop()}}),e)})));function i(t){return e.apply(this,arguments)}return i}()})},downloadSidFile:function(){var t=document.getElementById("downloadsid"),e=new Blob([this.encrypted_wallet],{type:"sid"});t.href=URL.createObjectURL(e),t.download=this.address+".sid";var i=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!1});t.dispatchEvent(i)}}},l=d,f=(i("eb0c"),i("2877")),h=Object(f["a"])(l,n,s,!1,null,null,null);e["default"]=h.exports},c4a7:function(t,e,i){(function(e,i){t.exports=i()})(0,(function(){"use strict";var t=function(){},e=Object.prototype.hasOwnProperty,i=Array.prototype.slice;function n(e,i){var n;return"function"===typeof Object.create?n=Object.create(e):(t.prototype=e,n=new t,t.prototype=null),i&&r(!0,n,i),n}function s(t,e,i,s){var a=this;return"string"!==typeof t&&(s=i,i=e,e=t,t=null),"function"!==typeof e&&(s=i,i=e,e=function(){return a.apply(this,arguments)}),r(!1,e,a,s),e.prototype=n(a.prototype,i),e.prototype.constructor=e,e.class_=t||a.class_,e.super_=a,e}function r(t,n,s){var r,a;s=i.call(arguments,2);for(var o=0,c=s.length;o<c;o++)for(r in a=s[o],a)t&&!e.call(a,r)||(n[r]=a[r])}var a=s;function o(){}o.class_="Nevis",o.super_=Object,o.extend=a;var c=o,u=c,d=u.extend((function(t,e,i){this.qrious=t,this.element=e,this.element.qrious=t,this.enabled=Boolean(i)}),{draw:function(t){},getElement:function(){return this.enabled||(this.enabled=!0,this.render()),this.element},getModuleSize:function(t){var e=this.qrious,i=e.padding||0,n=Math.floor((e.size-2*i)/t.width);return Math.max(1,n)},getOffset:function(t){var e=this.qrious,i=e.padding;if(null!=i)return i;var n=this.getModuleSize(t),s=Math.floor((e.size-n*t.width)/2);return Math.max(0,s)},render:function(t){this.enabled&&(this.resize(),this.reset(),this.draw(t))},reset:function(){},resize:function(){}}),l=d,f=l.extend({draw:function(t){var e,i,n=this.qrious,s=this.getModuleSize(t),r=this.getOffset(t),a=this.element.getContext("2d");for(a.fillStyle=n.foreground,a.globalAlpha=n.foregroundAlpha,e=0;e<t.width;e++)for(i=0;i<t.width;i++)t.buffer[i*t.width+e]&&a.fillRect(s*e+r,s*i+r,s,s)},reset:function(){var t=this.qrious,e=this.element.getContext("2d"),i=t.size;e.lineWidth=1,e.clearRect(0,0,i,i),e.fillStyle=t.background,e.globalAlpha=t.backgroundAlpha,e.fillRect(0,0,i,i)},resize:function(){var t=this.element;t.width=t.height=this.qrious.size}}),h=f,_=u.extend(null,{BLOCK:[0,11,15,19,23,27,31,16,18,20,22,24,26,28,20,22,24,24,26,28,28,22,24,24,26,26,28,28,24,24,26,26,26,28,28,24,26,26,26,28,28]}),p=_,v=u.extend(null,{BLOCKS:[1,0,19,7,1,0,16,10,1,0,13,13,1,0,9,17,1,0,34,10,1,0,28,16,1,0,22,22,1,0,16,28,1,0,55,15,1,0,44,26,2,0,17,18,2,0,13,22,1,0,80,20,2,0,32,18,2,0,24,26,4,0,9,16,1,0,108,26,2,0,43,24,2,2,15,18,2,2,11,22,2,0,68,18,4,0,27,16,4,0,19,24,4,0,15,28,2,0,78,20,4,0,31,18,2,4,14,18,4,1,13,26,2,0,97,24,2,2,38,22,4,2,18,22,4,2,14,26,2,0,116,30,3,2,36,22,4,4,16,20,4,4,12,24,2,2,68,18,4,1,43,26,6,2,19,24,6,2,15,28,4,0,81,20,1,4,50,30,4,4,22,28,3,8,12,24,2,2,92,24,6,2,36,22,4,6,20,26,7,4,14,28,4,0,107,26,8,1,37,22,8,4,20,24,12,4,11,22,3,1,115,30,4,5,40,24,11,5,16,20,11,5,12,24,5,1,87,22,5,5,41,24,5,7,24,30,11,7,12,24,5,1,98,24,7,3,45,28,15,2,19,24,3,13,15,30,1,5,107,28,10,1,46,28,1,15,22,28,2,17,14,28,5,1,120,30,9,4,43,26,17,1,22,28,2,19,14,28,3,4,113,28,3,11,44,26,17,4,21,26,9,16,13,26,3,5,107,28,3,13,41,26,15,5,24,30,15,10,15,28,4,4,116,28,17,0,42,26,17,6,22,28,19,6,16,30,2,7,111,28,17,0,46,28,7,16,24,30,34,0,13,24,4,5,121,30,4,14,47,28,11,14,24,30,16,14,15,30,6,4,117,30,6,14,45,28,11,16,24,30,30,2,16,30,8,4,106,26,8,13,47,28,7,22,24,30,22,13,15,30,10,2,114,28,19,4,46,28,28,6,22,28,33,4,16,30,8,4,122,30,22,3,45,28,8,26,23,30,12,28,15,30,3,10,117,30,3,23,45,28,4,31,24,30,11,31,15,30,7,7,116,30,21,7,45,28,1,37,23,30,19,26,15,30,5,10,115,30,19,10,47,28,15,25,24,30,23,25,15,30,13,3,115,30,2,29,46,28,42,1,24,30,23,28,15,30,17,0,115,30,10,23,46,28,10,35,24,30,19,35,15,30,17,1,115,30,14,21,46,28,29,19,24,30,11,46,15,30,13,6,115,30,14,23,46,28,44,7,24,30,59,1,16,30,12,7,121,30,12,26,47,28,39,14,24,30,22,41,15,30,6,14,121,30,6,34,47,28,46,10,24,30,2,64,15,30,17,4,122,30,29,14,46,28,49,10,24,30,24,46,15,30,4,18,122,30,13,32,46,28,48,14,24,30,42,32,15,30,20,4,117,30,40,7,47,28,43,22,24,30,10,67,15,30,19,6,118,30,18,31,47,28,34,34,24,30,20,61,15,30],FINAL_FORMAT:[30660,29427,32170,30877,26159,25368,27713,26998,21522,20773,24188,23371,17913,16590,20375,19104,13663,12392,16177,14854,9396,8579,11994,11245,5769,5054,7399,6608,1890,597,3340,2107],LEVELS:{L:1,M:2,Q:3,H:4}}),g=v,b=u.extend(null,{EXPONENT:[1,2,4,8,16,32,64,128,29,58,116,232,205,135,19,38,76,152,45,90,180,117,234,201,143,3,6,12,24,48,96,192,157,39,78,156,37,74,148,53,106,212,181,119,238,193,159,35,70,140,5,10,20,40,80,160,93,186,105,210,185,111,222,161,95,190,97,194,153,47,94,188,101,202,137,15,30,60,120,240,253,231,211,187,107,214,177,127,254,225,223,163,91,182,113,226,217,175,67,134,17,34,68,136,13,26,52,104,208,189,103,206,129,31,62,124,248,237,199,147,59,118,236,197,151,51,102,204,133,23,46,92,184,109,218,169,79,158,33,66,132,21,42,84,168,77,154,41,82,164,85,170,73,146,57,114,228,213,183,115,230,209,191,99,198,145,63,126,252,229,215,179,123,246,241,255,227,219,171,75,150,49,98,196,149,55,110,220,165,87,174,65,130,25,50,100,200,141,7,14,28,56,112,224,221,167,83,166,81,162,89,178,121,242,249,239,195,155,43,86,172,69,138,9,18,36,72,144,61,122,244,245,247,243,251,235,203,139,11,22,44,88,176,125,250,233,207,131,27,54,108,216,173,71,142,0],LOG:[255,0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,4,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,5,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,29,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,6,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,54,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,30,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,202,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,7,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,227,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,55,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,242,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,31,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,108,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,203,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,79,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175]}),m=b,k=u.extend(null,{BLOCK:[3220,1468,2713,1235,3062,1890,2119,1549,2344,2936,1117,2583,1330,2470,1667,2249,2028,3780,481,4011,142,3098,831,3445,592,2517,1776,2234,1951,2827,1070,2660,1345,3177]}),y=k,w=u.extend((function(t){var e,i,n,s,r,a=t.value.length;this._badness=[],this._level=g.LEVELS[t.level],this._polynomial=[],this._value=t.value,this._version=0,this._stringBuffer=[];while(this._version<40)if(this._version++,n=4*(this._level-1)+16*(this._version-1),s=g.BLOCKS[n++],r=g.BLOCKS[n++],e=g.BLOCKS[n++],i=g.BLOCKS[n],n=e*(s+r)+r-3+(this._version<=9),a<=n)break;this._dataBlock=e,this._eccBlock=i,this._neccBlock1=s,this._neccBlock2=r;var o=this.width=17+4*this._version;this.buffer=w._createArray(o*o),this._ecc=w._createArray(e+(e+i)*(s+r)+r),this._mask=w._createArray((o*(o+1)+1)/2),this._insertFinders(),this._insertAlignments(),this.buffer[8+o*(o-8)]=1,this._insertTimingGap(),this._reverseMask(),this._insertTimingRowAndColumn(),this._insertVersion(),this._syncMask(),this._convertBitStream(a),this._calculatePolynomial(),this._appendEccToData(),this._interleaveBlocks(),this._pack(),this._finish()}),{_addAlignment:function(t,e){var i,n=this.buffer,s=this.width;for(n[t+s*e]=1,i=-2;i<2;i++)n[t+i+s*(e-2)]=1,n[t-2+s*(e+i+1)]=1,n[t+2+s*(e+i)]=1,n[t+i+1+s*(e+2)]=1;for(i=0;i<2;i++)this._setMask(t-1,e+i),this._setMask(t+1,e-i),this._setMask(t-i,e-1),this._setMask(t+i,e+1)},_appendData:function(t,e,i,n){var s,r,a,o=this._polynomial,c=this._stringBuffer;for(r=0;r<n;r++)c[i+r]=0;for(r=0;r<e;r++){if(s=m.LOG[c[t+r]^c[i]],255!==s)for(a=1;a<n;a++)c[i+a-1]=c[i+a]^m.EXPONENT[w._modN(s+o[n-a])];else for(a=i;a<i+n;a++)c[a]=c[a+1];c[i+n-1]=255===s?0:m.EXPONENT[w._modN(s+o[0])]}},_appendEccToData:function(){var t,e=0,i=this._dataBlock,n=this._calculateMaxLength(),s=this._eccBlock;for(t=0;t<this._neccBlock1;t++)this._appendData(e,i,n,s),e+=i,n+=s;for(t=0;t<this._neccBlock2;t++)this._appendData(e,i+1,n,s),e+=i+1,n+=s},_applyMask:function(t){var e,i,n,s,r=this.buffer,a=this.width;switch(t){case 0:for(s=0;s<a;s++)for(n=0;n<a;n++)n+s&1||this._isMasked(n,s)||(r[n+s*a]^=1);break;case 1:for(s=0;s<a;s++)for(n=0;n<a;n++)1&s||this._isMasked(n,s)||(r[n+s*a]^=1);break;case 2:for(s=0;s<a;s++)for(e=0,n=0;n<a;n++,e++)3===e&&(e=0),e||this._isMasked(n,s)||(r[n+s*a]^=1);break;case 3:for(i=0,s=0;s<a;s++,i++)for(3===i&&(i=0),e=i,n=0;n<a;n++,e++)3===e&&(e=0),e||this._isMasked(n,s)||(r[n+s*a]^=1);break;case 4:for(s=0;s<a;s++)for(e=0,i=s>>1&1,n=0;n<a;n++,e++)3===e&&(e=0,i=!i),i||this._isMasked(n,s)||(r[n+s*a]^=1);break;case 5:for(i=0,s=0;s<a;s++,i++)for(3===i&&(i=0),e=0,n=0;n<a;n++,e++)3===e&&(e=0),(n&s&1)+!(!e|!i)||this._isMasked(n,s)||(r[n+s*a]^=1);break;case 6:for(i=0,s=0;s<a;s++,i++)for(3===i&&(i=0),e=0,n=0;n<a;n++,e++)3===e&&(e=0),(n&s&1)+(e&&e===i)&1||this._isMasked(n,s)||(r[n+s*a]^=1);break;case 7:for(i=0,s=0;s<a;s++,i++)for(3===i&&(i=0),e=0,n=0;n<a;n++,e++)3===e&&(e=0),(e&&e===i)+(n+s&1)&1||this._isMasked(n,s)||(r[n+s*a]^=1);break}},_calculateMaxLength:function(){return this._dataBlock*(this._neccBlock1+this._neccBlock2)+this._neccBlock2},_calculatePolynomial:function(){var t,e,i=this._eccBlock,n=this._polynomial;for(n[0]=1,t=0;t<i;t++){for(n[t+1]=1,e=t;e>0;e--)n[e]=n[e]?n[e-1]^m.EXPONENT[w._modN(m.LOG[n[e]]+t)]:n[e-1];n[0]=m.EXPONENT[w._modN(m.LOG[n[0]]+t)]}for(t=0;t<=i;t++)n[t]=m.LOG[n[t]]},_checkBadness:function(){var t,e,i,n,s,r=0,a=this._badness,o=this.buffer,c=this.width;for(s=0;s<c-1;s++)for(n=0;n<c-1;n++)(o[n+c*s]&&o[n+1+c*s]&&o[n+c*(s+1)]&&o[n+1+c*(s+1)]||!(o[n+c*s]||o[n+1+c*s]||o[n+c*(s+1)]||o[n+1+c*(s+1)]))&&(r+=w.N2);var u=0;for(s=0;s<c;s++){for(i=0,a[0]=0,t=0,n=0;n<c;n++)e=o[n+c*s],t===e?a[i]++:a[++i]=1,t=e,u+=t?1:-1;r+=this._getBadness(i)}u<0&&(u=-u);var d=0,l=u;l+=l<<2,l<<=1;while(l>c*c)l-=c*c,d++;for(r+=d*w.N4,n=0;n<c;n++){for(i=0,a[0]=0,t=0,s=0;s<c;s++)e=o[n+c*s],t===e?a[i]++:a[++i]=1,t=e;r+=this._getBadness(i)}return r},_convertBitStream:function(t){var e,i,n=this._ecc,s=this._version;for(i=0;i<t;i++)n[i]=this._value.charCodeAt(i);var r=this._stringBuffer=n.slice(),a=this._calculateMaxLength();t>=a-2&&(t=a-2,s>9&&t--);var o=t;if(s>9){r[o+2]=0,r[o+3]=0;while(o--)e=r[o],r[o+3]|=255&e<<4,r[o+2]=e>>4;r[2]|=255&t<<4,r[1]=t>>4,r[0]=64|t>>12}else{r[o+1]=0,r[o+2]=0;while(o--)e=r[o],r[o+2]|=255&e<<4,r[o+1]=e>>4;r[1]|=255&t<<4,r[0]=64|t>>4}o=t+3-(s<10);while(o<a)r[o++]=236,r[o++]=17},_getBadness:function(t){var e,i=0,n=this._badness;for(e=0;e<=t;e++)n[e]>=5&&(i+=w.N1+n[e]-5);for(e=3;e<t-1;e+=2)n[e-2]===n[e+2]&&n[e+2]===n[e-1]&&n[e-1]===n[e+1]&&3*n[e-1]===n[e]&&(0===n[e-3]||e+3>t||3*n[e-3]>=4*n[e]||3*n[e+3]>=4*n[e])&&(i+=w.N3);return i},_finish:function(){var t,e;this._stringBuffer=this.buffer.slice();var i=0,n=3e4;for(e=0;e<8;e++){if(this._applyMask(e),t=this._checkBadness(),t<n&&(n=t,i=e),7===i)break;this.buffer=this._stringBuffer.slice()}i!==e&&this._applyMask(i),n=g.FINAL_FORMAT[i+(this._level-1<<3)];var s=this.buffer,r=this.width;for(e=0;e<8;e++,n>>=1)1&n&&(s[r-1-e+8*r]=1,e<6?s[8+r*e]=1:s[8+r*(e+1)]=1);for(e=0;e<7;e++,n>>=1)1&n&&(s[8+r*(r-7+e)]=1,e?s[6-e+8*r]=1:s[7+8*r]=1)},_interleaveBlocks:function(){var t,e,i=this._dataBlock,n=this._ecc,s=this._eccBlock,r=0,a=this._calculateMaxLength(),o=this._neccBlock1,c=this._neccBlock2,u=this._stringBuffer;for(t=0;t<i;t++){for(e=0;e<o;e++)n[r++]=u[t+e*i];for(e=0;e<c;e++)n[r++]=u[o*i+t+e*(i+1)]}for(e=0;e<c;e++)n[r++]=u[o*i+t+e*(i+1)];for(t=0;t<s;t++)for(e=0;e<o+c;e++)n[r++]=u[a+t+e*s];this._stringBuffer=n},_insertAlignments:function(){var t,e,i,n=this._version,s=this.width;if(n>1)for(t=p.BLOCK[n],i=s-7;;){e=s-7;while(e>t-3){if(this._addAlignment(e,i),e<t)break;e-=t}if(i<=t+9)break;i-=t,this._addAlignment(6,i),this._addAlignment(i,6)}},_insertFinders:function(){var t,e,i,n,s=this.buffer,r=this.width;for(t=0;t<3;t++){for(e=0,n=0,1===t&&(e=r-7),2===t&&(n=r-7),s[n+3+r*(e+3)]=1,i=0;i<6;i++)s[n+i+r*e]=1,s[n+r*(e+i+1)]=1,s[n+6+r*(e+i)]=1,s[n+i+1+r*(e+6)]=1;for(i=1;i<5;i++)this._setMask(n+i,e+1),this._setMask(n+1,e+i+1),this._setMask(n+5,e+i),this._setMask(n+i+1,e+5);for(i=2;i<4;i++)s[n+i+r*(e+2)]=1,s[n+2+r*(e+i+1)]=1,s[n+4+r*(e+i)]=1,s[n+i+1+r*(e+4)]=1}},_insertTimingGap:function(){var t,e,i=this.width;for(e=0;e<7;e++)this._setMask(7,e),this._setMask(i-8,e),this._setMask(7,e+i-7);for(t=0;t<8;t++)this._setMask(t,7),this._setMask(t+i-8,7),this._setMask(t,i-8)},_insertTimingRowAndColumn:function(){var t,e=this.buffer,i=this.width;for(t=0;t<i-14;t++)1&t?(this._setMask(8+t,6),this._setMask(6,8+t)):(e[8+t+6*i]=1,e[6+i*(8+t)]=1)},_insertVersion:function(){var t,e,i,n,s=this.buffer,r=this._version,a=this.width;if(r>6)for(t=y.BLOCK[r-7],e=17,i=0;i<6;i++)for(n=0;n<3;n++,e--)1&(e>11?r>>e-12:t>>e)?(s[5-i+a*(2-n+a-11)]=1,s[2-n+a-11+a*(5-i)]=1):(this._setMask(5-i,2-n+a-11),this._setMask(2-n+a-11,5-i))},_isMasked:function(t,e){var i=w._getMaskBit(t,e);return 1===this._mask[i]},_pack:function(){var t,e,i,n=1,s=1,r=this.width,a=r-1,o=r-1,c=(this._dataBlock+this._eccBlock)*(this._neccBlock1+this._neccBlock2)+this._neccBlock2;for(e=0;e<c;e++)for(t=this._stringBuffer[e],i=0;i<8;i++,t<<=1){128&t&&(this.buffer[a+r*o]=1);do{s?a--:(a++,n?0!==o?o--:(a-=2,n=!n,6===a&&(a--,o=9)):o!==r-1?o++:(a-=2,n=!n,6===a&&(a--,o-=8))),s=!s}while(this._isMasked(a,o))}},_reverseMask:function(){var t,e,i=this.width;for(t=0;t<9;t++)this._setMask(t,8);for(t=0;t<8;t++)this._setMask(t+i-8,8),this._setMask(8,t);for(e=0;e<7;e++)this._setMask(8,e+i-7)},_setMask:function(t,e){var i=w._getMaskBit(t,e);this._mask[i]=1},_syncMask:function(){var t,e,i=this.width;for(e=0;e<i;e++)for(t=0;t<=e;t++)this.buffer[t+i*e]&&this._setMask(t,e)}},{_createArray:function(t){var e,i=[];for(e=0;e<t;e++)i[e]=0;return i},_getMaskBit:function(t,e){var i;return t>e&&(i=t,t=e,e=i),i=e,i+=e*e,i>>=1,i+=t,i},_modN:function(t){while(t>=255)t-=255,t=(t>>8)+(255&t);return t},N1:3,N2:3,N3:40,N4:10}),x=w,M=l.extend({draw:function(){this.element.src=this.qrious.toDataURL()},reset:function(){this.element.src=""},resize:function(){var t=this.element;t.width=t.height=this.qrious.size}}),B=M,R=u.extend((function(t,e,i,n){this.name=t,this.modifiable=Boolean(e),this.defaultValue=i,this._valueTransformer=n}),{transform:function(t){var e=this._valueTransformer;return"function"===typeof e?e(t,this):t}}),O=R,S=u.extend(null,{abs:function(t){return null!=t?Math.abs(t):null},hasOwn:function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},noop:function(){},toUpperCase:function(t){return null!=t?t.toUpperCase():null}}),E=S,L=u.extend((function(t){this.options={},t.forEach((function(t){this.options[t.name]=t}),this)}),{exists:function(t){return null!=this.options[t]},get:function(t,e){return L._get(this.options[t],e)},getAll:function(t){var e,i=this.options,n={};for(e in i)E.hasOwn(i,e)&&(n[e]=L._get(i[e],t));return n},init:function(t,e,i){var n,s;for(n in"function"!==typeof i&&(i=E.noop),this.options)E.hasOwn(this.options,n)&&(s=this.options[n],L._set(s,s.defaultValue,e),L._createAccessor(s,e,i));this._setAll(t,e,!0)},set:function(t,e,i){return this._set(t,e,i)},setAll:function(t,e){return this._setAll(t,e)},_set:function(t,e,i,n){var s=this.options[t];if(!s)throw new Error("Invalid option: "+t);if(!s.modifiable&&!n)throw new Error("Option cannot be modified: "+t);return L._set(s,e,i)},_setAll:function(t,e,i){if(!t)return!1;var n,s=!1;for(n in t)E.hasOwn(t,n)&&this._set(n,t[n],e,i)&&(s=!0);return s}},{_createAccessor:function(t,e,i){var n={get:function(){return L._get(t,e)}};t.modifiable&&(n.set=function(n){L._set(t,n,e)&&i(n,t)}),Object.defineProperty(e,t.name,n)},_get:function(t,e){return e["_"+t.name]},_set:function(t,e,i){var n="_"+t.name,s=i[n],r=t.transform(null!=e?e:t.defaultValue);return i[n]=r,r!==s}}),C=L,A=u.extend((function(){this._services={}}),{getService:function(t){var e=this._services[t];if(!e)throw new Error("Service is not being managed with name: "+t);return e},setService:function(t,e){if(this._services[t])throw new Error("Service is already managed with name: "+t);e&&(this._services[t]=e)}}),N=A,I=new C([new O("background",!0,"white"),new O("backgroundAlpha",!0,1,E.abs),new O("element"),new O("foreground",!0,"black"),new O("foregroundAlpha",!0,1,E.abs),new O("level",!0,"L",E.toUpperCase),new O("mime",!0,"image/png"),new O("padding",!0,null,E.abs),new O("size",!0,100,E.abs),new O("value",!0,"")]),D=new N,T=u.extend((function(t){I.init(t,this,this.update.bind(this));var e=I.get("element",this),i=D.getService("element"),n=e&&i.isCanvas(e)?e:i.createCanvas(),s=e&&i.isImage(e)?e:i.createImage();this._canvasRenderer=new h(this,n,!0),this._imageRenderer=new B(this,s,s===e),this.update()}),{get:function(){return I.getAll(this)},set:function(t){I.setAll(t,this)&&this.update()},toDataURL:function(t){return this.canvas.toDataURL(t||this.mime)},update:function(){var t=new x({level:this.level,value:this.value});this._canvasRenderer.render(t),this._imageRenderer.render(t)}},{use:function(t){D.setService(t.getName(),t)}});Object.defineProperties(T.prototype,{canvas:{get:function(){return this._canvasRenderer.getElement()}},image:{get:function(){return this._imageRenderer.getElement()}}});var U=T,z=U,j=u.extend({getName:function(){}}),P=j,q=P.extend({createCanvas:function(){},createImage:function(){},getName:function(){return"element"},isCanvas:function(t){},isImage:function(t){}}),Q=q,F=Q.extend({createCanvas:function(){return document.createElement("canvas")},createImage:function(){return document.createElement("img")},isCanvas:function(t){return t instanceof HTMLCanvasElement},isImage:function(t){return t instanceof HTMLImageElement}}),K=F;z.use(new K);var H=z;return H}))},e094:function(t,e,i){},eb0c:function(t,e,i){"use strict";var n=i("e094"),s=i.n(n);s.a}}]);
//# sourceMappingURL=identities.20ac5c79.js.map