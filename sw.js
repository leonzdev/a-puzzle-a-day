if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const f=e=>i(e,t),o={module:{uri:t},exports:c,require:f};s[t]=Promise.all(n.map((e=>o[e]||f(e)))).then((e=>(r(...e),c)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index--D8h5bI2.js",revision:null},{url:"assets/index-WCA7b5qR.css",revision:null},{url:"index.html",revision:"4061fc71484d6d3b479f7ba95cffc460"},{url:"registerSW.js",revision:"36e7844afc5dc0387dc4fd6fcb5c98fa"},{url:"manifest.webmanifest",revision:"f6bf810484958ccceb4a66fc6f0ca0f6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
