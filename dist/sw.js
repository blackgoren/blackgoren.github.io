if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const d=e=>i(e,t),l={module:{uri:t},exports:o,require:d};s[t]=Promise.all(r.map((e=>l[e]||d(e)))).then((e=>(n(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/fontawesome.75fdd073.3004be67.js",revision:null},{url:"assets/index.551031bd.js",revision:null},{url:"assets/index.d6386254.css",revision:null},{url:"assets/vue.737eb4c4.022931d0.js",revision:null},{url:"index.html",revision:"955c092aaa46fb005c5e28a6eb09ae60"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"stats.html",revision:"3c0f8c5d50c9b0bd6e7802c4473d87e9"},{url:"favicon.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"robots.txt",revision:"2379dcd1a7e3bbb7feb008f092f7f3de"},{url:"sitemap.xml",revision:"143229a1f8004931d037e06dc34b4224"},{url:"manifest.webmanifest",revision:"0d321571db95e84f38c8b9c0cf1b1f27"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
