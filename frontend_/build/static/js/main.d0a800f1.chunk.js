(this["webpackJsonpExtropy-Hacker"]=this["webpackJsonpExtropy-Hacker"]||[]).push([[0],{210:function(e,a,t){e.exports=t(496)},227:function(e,a){},229:function(e,a){},324:function(e,a){},394:function(e,a){},496:function(e,a,t){"use strict";t.r(a);t(211);var n=t(0),r=t.n(n),l=t(205),c=t.n(l),o=t(206),s=t(36),i=t.n(s),u=t(78),d=t(79),m=t(81),h=t(80),b=t(60),p=t(82),E=t(118),v=t.n(E);t(485);var f=function(e){return r.a.createElement("nav",{className:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},r.a.createElement("a",{className:"navbar-brand col-sm-3 col-md-2 mr-0",href:"#",rel:"noopener noreferrer"},"Flash Daddies"),r.a.createElement("ul",{className:"navbar-nav px-3"},r.a.createElement("li",{className:"nav-item text-nowrap d-none d-sm-none d-sm-block"},r.a.createElement("small",{className:"text-secondary"}))))},w=t(61),y=t(35),g=function(e){function a(){return Object(u.a)(this,a),Object(m.a)(this,Object(h.a)(a).apply(this,arguments))}return Object(p.a)(a,e),Object(d.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Extropy CTF"),r.a.createElement("br",null),r.a.createElement("p",null,"The Ethernaut is a Web3/Solidity CTF (Capture The Flag) based game. Each level is a smart contract that needs to be 'hacked'.",r.a.createElement("br",null),r.a.createElement("br",null),"What separates this CTF from the rest is that it is powered entirely by a smart contract developed by ",r.a.createElement("a",{href:"https://extropy.io/",target:"_blank"},"Extropy.io"),".",r.a.createElement("br",null),"The leaderboard on this website is maintained entirely by our smart contract; there is no centralized database or backend program that keeps track of users or verifies solutions!",r.a.createElement("br",null),r.a.createElement("br",null),"In the spirit of open source, contributions and level ideas can made by anyone by submitting a pull request at ",r.a.createElement("a",{href:"https://github.com/ExtropyIO",target:"_blank"},"github.com/ExtropyIO/ExtropyCTF"),".",r.a.createElement("br",null),r.a.createElement("br",null)))}}]),a}(n.Component),k=t(207),x=t.n(k);var C=function(e){return console.log(e.player),r.a.createElement("tr",null,r.a.createElement("td",null,e.rank),r.a.createElement("td",null,e.player.username),r.a.createElement("td",null,e.player.address),r.a.createElement("td",null,e.player.score))};var O=function(e){var a=e.leaderboardList.map((function(e,a){return r.a.createElement(C,{key:a+1,rank:a+1,player:e})}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Scammers leaderboard"),r.a.createElement("br",null),r.a.createElement(x.a,{striped:!0,bordered:!0,hover:!0,variant:"dark"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{style:{width:"10%"}},"World Ranking"),r.a.createElement("th",{style:{width:"20%"}},"Name"),r.a.createElement("th",{style:{width:"20%"}},"Account"),r.a.createElement("th",null,"Score"))),r.a.createElement("tbody",null,a)))};var j=function(e){return r.a.createElement(w.a,null,r.a.createElement("div",{className:"row mt-5"},r.a.createElement("div",{className:"col-sm-2"},r.a.createElement("ul",{className:"navbar-nav px-3"},r.a.createElement("li",null,r.a.createElement(w.b,{exact:!0,to:"/home",activeStyle:{fontWeight:"bold",color:"green"}},"Home")),r.a.createElement("li",null,r.a.createElement(w.b,{exact:!0,to:"/leaderboard",activeStyle:{fontWeight:"bold",color:"green"}},"Leaderboard")))),r.a.createElement("div",{className:"col-sm-10 pr-sm-5"},r.a.createElement(y.a,{exact:!0,path:"/",component:g}),r.a.createElement(y.a,{exact:!0,path:"/home",component:g}),r.a.createElement(y.a,{exact:!0,path:"/leaderboard",render:function(){return r.a.createElement(O,{account:e.account,username:e.username,setUsername:e.setUsername,handleChange:e.handleChange,leaderboardList:e.leaderboardList})}}))))},L=function(e){function a(e){var t;return Object(u.a)(this,a),(t=Object(m.a)(this,Object(h.a)(a).call(this,e))).state={leaderboardList:[]},t.loadWeb3=t.loadWeb3.bind(Object(b.a)(t)),t.handleChange=t.handleChange.bind(Object(b.a)(t)),t}return Object(p.a)(a,e),Object(d.a)(a,[{key:"componentWillMount",value:function(){return i.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.awrap(this.loadBoguseaderBoard());case 2:case"end":return e.stop()}}),null,this)}},{key:"getScammerLeaderBoard",value:function(){return i.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}))}},{key:"loadBoguseaderBoard",value:function(){var e;return i.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:this.setState({score:9999}),(e=[]).push({username:"bob",address:"0x71C7656EC7ab88b098defB751B7401B5f6d8976F",score:222}),e.push({username:"alice",address:"0x04148d6CE66cbb2F5c198c272B8117a5e7a6102E",score:10}),this.setState({leaderboardList:e});case 5:case"end":return a.stop()}}),null,this)}},{key:"loadWeb3",value:function(){return i.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.ethereum){e.next=6;break}return window.web3=new v.a(window.ethereum),e.next=4,i.a.awrap(window.ethereum.enable());case 4:e.next=7;break;case 6:window.web3?window.web3=new v.a(window.web3.currentProvider):window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");case 7:case"end":return e.stop()}}))}},{key:"handleChange",value:function(e){var a=e.target,t=a.name,n=a.value;this.setState(Object(o.a)({},t,n))}},{key:"updateLeaderboard2",value:function(){return i.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(f,{account:this.state.account,username:this.state.username}),r.a.createElement(j,{account:this.state.account,username:this.state.username,score:this.state.score,leaderboardList:this.state.leaderboardList,handleChange:this.handleChange,updateLeaderboard:this.updateLeaderboard2}))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[210,1,2]]]);
//# sourceMappingURL=main.d0a800f1.chunk.js.map