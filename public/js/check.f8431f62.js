(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["check"],{"83d7":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("div",{staticClass:"login-7 tab-box"},[e.address?e._e():r("div",[r("qrcode-stream",{on:{decode:e.onDecode}})],1),e.address?r("div",[r("h1",[e._v("Digital identities of"),r("div",{staticStyle:{"font-size":"14px"}},[e._v(e._s(e.address))])]),r("br"),r("br"),r("p",[e._v("These informations are strictly confidentials, please don't share them with third parties.")]),r("div",{staticStyle:{border:"1px solid #ccc","text-align":"left",color:"#000","border-radius":"5px","margin-top":"20px","font-size":"12px",padding:"15px"}},[r("v-gravatar",{staticStyle:{float:"left",height:"55px","margin-right":"10px"},attrs:{email:e.address}}),r("strong",[e._v("LYRA ADDRESS")]),r("br"),e._v(" Created at block "),r("strong",[e._v(e._s(e.first_tx.blockheight))]),r("br"),e._v(" "+e._s(e.address.substr(0,6))+"..."+e._s(e.address.substr(-6))),r("br")],1),e._l(e.linked,(function(t){return r("div",{key:t.refID},[r("a",{attrs:{href:"https://proof.scryptachain.org/#/uuid/"+t.uuid,target:"_blank"}},[r("div",{staticStyle:{border:"1px solid #ccc","text-align":"left",color:"#000","border-radius":"5px","margin-top":"20px","font-size":"12px",padding:"15px"},on:{click:function(r){return e.revealID(t.refID)}}},[r("img",{staticStyle:{float:"left",height:"75px","margin-right":"10px"},attrs:{src:"/"+t.refID.toLowerCase()+".png"}}),r("strong",[e._v(e._s(t.refID))]),r("br"),e._v(e._s(t.identity.username)),r("br"),void 0!==t.identity.id?r("span",[e._v("ID: "+e._s(t.identity.id)),r("br")]):e._e(),e._v(" Written at block "),r("strong",[e._v(e._s(t.block))]),r("br"),e._v(" "+e._s(t.data.signature.substr(0,6))+" ... "+e._s(t.data.signature.substr(-6))+" ")])])])}))],2):e._e()])])},a=[],i=r("d557"),s=i["a"],d=(r("8cc4"),r("2877")),o=Object(d["a"])(s,n,a,!1,null,null,null);t["default"]=o.exports},"8cc4":function(e,t,r){"use strict";var n=r("ee60"),a=r.n(n);a.a},a640:function(e,t,r){"use strict";var n=r("d039");e.exports=function(e,t){var r=[][e];return!!r&&n((function(){r.call(null,t||function(){throw 1},1)}))}},ae40:function(e,t,r){var n=r("83ab"),a=r("d039"),i=r("5135"),s=Object.defineProperty,d={},o=function(e){throw e};e.exports=function(e,t){if(i(d,e))return d[e];t||(t={});var r=[][e],c=!!i(t,"ACCESSORS")&&t.ACCESSORS,u=i(t,0)?t[0]:o,l=i(t,1)?t[1]:void 0;return d[e]=!!r&&!a((function(){if(c&&!n)return!0;var e={length:-1};c?s(e,1,{enumerable:!0,get:o}):e[1]=1,r.call(e,u,l)}))}},c975:function(e,t,r){"use strict";var n=r("23e7"),a=r("4d64").indexOf,i=r("a640"),s=r("ae40"),d=[].indexOf,o=!!d&&1/[1].indexOf(1,-0)<0,c=i("indexOf"),u=s("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:o||!c||!u},{indexOf:function(e){return o?d.apply(this,arguments)||0:a(this,e,arguments.length>1?arguments[1]:void 0)}})},d557:function(e,t,r){"use strict";(function(e){r("c975"),r("d3b7"),r("ac1f"),r("25f0"),r("5319"),r("ddb0"),r("96cf");var n=r("1da1"),a=r("07c9"),i=r("bc3a"),s=r("470b");t["a"]={name:"Home",data:function(){return{scrypta:new a(!0),backendURL:"",address:"",file:"",isWriting:!1,showSmsVerification:!1,showEmailVerification:!1,smsverification:"",emailverification:"",unlockPwd:"",showQRCanvas:!1,provider:"",first_tx:{},email:"",providers:[],phone:"",workingmessage:"",success:"",encrypted_wallet:"",public_qrcode:"",sync_qrcode:"",decrypted_wallet:"",linked:"",updated:"",axios:i,shareURL:"",payload:{identity:{username:"",id:""}}}},methods:{onDecode:function(t){var r=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,d,o,c,u;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:i=r,d=t;while(-1!==d.indexOf("*"))d=d.replace("*","/");return o=JSON.parse(s.inflateSync(new e(d,"base64")).toString()),i.address=o.address,a.next=7,i.scrypta.get("/transactions/"+i.address);case 7:c=a.sent,u=c.data.length-1,i.first_tx=c.data[u],i.scrypta.post("/read",{protocol:"I://",address:o.address}).then(function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,n,a,s,d,c,u,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(n in r={},t.data)a=t.data[n],void 0===r[a.refID]&&(r[a.refID]=a);i.linked=[],e.t0=regeneratorRuntime.keys(o);case 4:if((e.t1=e.t0()).done){e.next=19;break}s=e.t1.value,d=o[s],e.t2=regeneratorRuntime.keys(r);case 8:if((e.t3=e.t2()).done){e.next=17;break}return c=e.t3.value,u=r[c],e.next=13,i.scrypta.verifyMessage(o.key,u.data.signature,JSON.stringify(d));case 13:l=e.sent,!1!==l&&l.address===o.address&&(u.identity=d.identity,i.linked.push(u)),e.next=8;break;case 17:e.next=4;break;case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 11:case"end":return a.stop()}}),a)})))()}}}}).call(this,r("b639").Buffer)},ee60:function(e,t,r){}}]);
//# sourceMappingURL=check.f8431f62.js.map