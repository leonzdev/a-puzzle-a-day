if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let f={};const o=e=>s(e,c),t={module:{uri:c},exports:f,require:o};i[c]=Promise.all(n.map((e=>t[e]||o(e)))).then((e=>(r(...e),f)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-CgCD9_4e.js",revision:null},{url:"assets/index-zImfB0-O.css",revision:null},{url:"index.html",revision:"5051f637773a62544d014866c3273a16"},{url:"registerSW.js",revision:"36e7844afc5dc0387dc4fd6fcb5c98fa"},{url:"favicon.ico",revision:"e77b834b84784884ae99ada8b9efdaf4"},{url:"pwa-192x192.png",revision:"1a4f500fdb7904767aa7cfcd76f19a98"},{url:"pwa-512x512.png",revision:"def5f0ededc4936d563aec1e81b5f9c1"},{url:"manifest.webmanifest",revision:"9413211eefafaa9d611b481d63cb6cac"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
