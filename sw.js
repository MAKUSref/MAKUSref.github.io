if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let t={};const l=e=>i(e,o),f={module:{uri:o},exports:t,require:l};s[o]=Promise.all(n.map((e=>f[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-b9799537.css",revision:null},{url:"assets/index-ff1f9bd0.js",revision:null},{url:"index.html",revision:"89fe86835ea93389cb6b820ed041c163"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"logo144.png",revision:"ff73449492bf906ffca93aa173b18add"},{url:"logo256.png",revision:"df8553b2aa5944db2c51a2b0371efb8c"},{url:"logo512.png",revision:"b6ce47f509a9cfc61013e5062e89ee48"},{url:"manifest.webmanifest",revision:"643e346c456f302e596e1dc8dbf2e895"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
