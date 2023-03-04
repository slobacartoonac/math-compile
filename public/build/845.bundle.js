/*! For license information please see 845.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunktype_word=self.webpackChunktype_word||[]).push([[845],{845:(t,e,n)=>{n.d(e,{IH:()=>dt});var a=n(238),i=n(333),r=n(444),o=n(463),s=n(424);const c="@firebase/installations",l="0.6.3",u=`w:${l}`,d="FIS_v2",f=new r.LL("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function p(t){return t instanceof r.ZR&&t.code.includes("request-failed")}function h({projectId:t}){return`https://firebaseinstallations.googleapis.com/v1/projects/${t}/installations`}function m(t){return{token:t.token,requestStatus:2,expiresIn:(e=t.expiresIn,Number(e.replace("s","000"))),creationTime:Date.now()};var e}async function g(t,e){const n=(await e.json()).error;return f.create("request-failed",{requestName:t,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function w({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}async function y(t){const e=await t();return e.status>=500&&e.status<600?t():e}function I(t){return new Promise((e=>{setTimeout(e,t)}))}const v=/^[cdef][\w-]{21}$/;function b(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const e=function(t){var e;return(e=t,btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22)}(t);return v.test(e)?e:""}catch(t){return""}}function T(t){return`${t.appName}!${t.appId}`}const k=new Map;function C(t,e){const n=T(t);S(n,e),function(t,e){const n=(!$&&"BroadcastChannel"in self&&($=new BroadcastChannel("[Firebase] FID Change"),$.onmessage=t=>{S(t.data.key,t.data.fid)}),$);n&&n.postMessage({key:t,fid:e}),0===k.size&&$&&($.close(),$=null)}(n,e)}function S(t,e){const n=k.get(t);if(n)for(const t of n)t(e)}let $=null;const j="firebase-installations-store";let A=null;function D(){return A||(A=(0,s.X3)("firebase-installations-database",1,{upgrade:(t,e)=>{0===e&&t.createObjectStore(j)}})),A}async function P(t,e){const n=T(t),a=(await D()).transaction(j,"readwrite"),i=a.objectStore(j),r=await i.get(n);return await i.put(e,n),await a.done,r&&r.fid===e.fid||C(t,e.fid),e}async function q(t){const e=T(t),n=(await D()).transaction(j,"readwrite");await n.objectStore(j).delete(e),await n.done}async function M(t,e){const n=T(t),a=(await D()).transaction(j,"readwrite"),i=a.objectStore(j),r=await i.get(n),o=e(r);return void 0===o?await i.delete(n):await i.put(o,n),await a.done,!o||r&&r.fid===o.fid||C(t,o.fid),o}async function F(t){let e;const n=await M(t.appConfig,(n=>{const a=function(t){return O(t||{fid:b(),registrationStatus:0})}(n),i=function(t,e){if(0===e.registrationStatus){if(!navigator.onLine)return{installationEntry:e,registrationPromise:Promise.reject(f.create("app-offline"))};const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},a=async function(t,e){try{const n=await async function({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const a=h(t),i=w(t),r=e.getImmediate({optional:!0});if(r){const t=await r.getHeartbeatsHeader();t&&i.append("x-firebase-client",t)}const o={fid:n,authVersion:d,appId:t.appId,sdkVersion:u},s={method:"POST",headers:i,body:JSON.stringify(o)},c=await y((()=>fetch(a,s)));if(c.ok){const t=await c.json();return{fid:t.fid||n,registrationStatus:2,refreshToken:t.refreshToken,authToken:m(t.authToken)}}throw await g("Create Installation",c)}(t,e);return P(t.appConfig,n)}catch(n){throw p(n)&&409===n.customData.serverCode?await q(t.appConfig):await P(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}(t,n);return{installationEntry:n,registrationPromise:a}}return 1===e.registrationStatus?{installationEntry:e,registrationPromise:E(t)}:{installationEntry:e}}(t,a);return e=i.registrationPromise,i.installationEntry}));return""===n.fid?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}async function E(t){let e=await x(t.appConfig);for(;1===e.registrationStatus;)await I(100),e=await x(t.appConfig);if(0===e.registrationStatus){const{installationEntry:e,registrationPromise:n}=await F(t);return n||e}return e}function x(t){return M(t,(t=>{if(!t)throw f.create("installation-not-found");return O(t)}))}function O(t){return 1===(e=t).registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:t.fid,registrationStatus:0}:t;var e}async function z({appConfig:t,heartbeatServiceProvider:e},n){const a=function(t,{fid:e}){return`${h(t)}/${e}/authTokens:generate`}(t,n),i=function(t,{refreshToken:e}){const n=w(t);return n.append("Authorization",function(t){return`${d} ${t}`}(e)),n}(t,n),r=e.getImmediate({optional:!0});if(r){const t=await r.getHeartbeatsHeader();t&&i.append("x-firebase-client",t)}const o={installation:{sdkVersion:u,appId:t.appId}},s={method:"POST",headers:i,body:JSON.stringify(o)},c=await y((()=>fetch(a,s)));if(c.ok)return m(await c.json());throw await g("Generate Auth Token",c)}async function N(t,e=!1){let n;const a=await M(t.appConfig,(a=>{if(!L(a))throw f.create("not-registered");const i=a.authToken;if(!e&&(2===(r=i).requestStatus&&!function(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+36e5}(r)))return a;var r;if(1===i.requestStatus)return n=async function(t,e){let n=await K(t.appConfig);for(;1===n.authToken.requestStatus;)await I(100),n=await K(t.appConfig);const a=n.authToken;return 0===a.requestStatus?N(t,e):a}(t,e),a;{if(!navigator.onLine)throw f.create("app-offline");const e=function(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}(a);return n=async function(t,e){try{const n=await z(t,e),a=Object.assign(Object.assign({},e),{authToken:n});return await P(t.appConfig,a),n}catch(n){if(!p(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await P(t.appConfig,n)}else await q(t.appConfig);throw n}}(t,e),e}}));return n?await n:a.authToken}function K(t){return M(t,(t=>{if(!L(t))throw f.create("not-registered");return 1===(e=t.authToken).requestStatus&&e.requestTime+1e4<Date.now()?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t;var e}))}function L(t){return void 0!==t&&2===t.registrationStatus}function _(t){return f.create("missing-app-config-values",{valueName:t})}const X="installations";(0,a.Xd)(new o.wA(X,(t=>{const e=t.getProvider("app").getImmediate(),n=function(t){if(!t||!t.options)throw _("App Configuration");if(!t.name)throw _("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw _(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}(e);return{app:e,appConfig:n,heartbeatServiceProvider:(0,a.qX)(e,"heartbeat"),_delete:()=>Promise.resolve()}}),"PUBLIC")),(0,a.Xd)(new o.wA("installations-internal",(t=>{const e=t.getProvider("app").getImmediate(),n=(0,a.qX)(e,X).getImmediate();return{getId:()=>async function(t){const e=t,{installationEntry:n,registrationPromise:a}=await F(e);return a?a.catch(console.error):N(e).catch(console.error),n.fid}(n),getToken:t=>async function(t,e=!1){const n=t;return await async function(t){const{registrationPromise:e}=await F(t);e&&await e}(n),(await N(n,e)).token}(n,t)}}),"PRIVATE")),(0,a.KN)(c,l),(0,a.KN)(c,l,"esm2017");const B="analytics",H="https://www.googletagmanager.com/gtag/js",V=new i.Yd("@firebase/analytics");function R(t){return Promise.all(t.map((t=>t.catch((t=>t)))))}const G=new r.LL("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'}),U=new class{constructor(t={},e=1e3){this.throttleMetadata=t,this.intervalMillis=e}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,e){this.throttleMetadata[t]=e}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}};function Z(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function J(t,e=U,n){const{appId:a,apiKey:i,measurementId:r}=t.options;if(!a)throw G.create("no-app-id");if(!i){if(r)return{measurementId:r,appId:a};throw G.create("no-api-key")}const o=e.getThrottleMetadata(a)||{backoffCount:0,throttleEndTimeMillis:Date.now()},s=new Y;return setTimeout((async()=>{s.abort()}),void 0!==n?n:6e4),W({appId:a,apiKey:i,measurementId:r},o,s,e)}async function W(t,{throttleEndTimeMillis:e,backoffCount:n},a,i=U){var o;const{appId:s,measurementId:c}=t;try{await function(t,e){return new Promise(((n,a)=>{const i=Math.max(e-Date.now(),0),r=setTimeout(n,i);t.addEventListener((()=>{clearTimeout(r),a(G.create("fetch-throttle",{throttleEndTimeMillis:e}))}))}))}(a,e)}catch(t){if(c)return V.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${null==t?void 0:t.message}]`),{appId:s,measurementId:c};throw t}try{const e=await async function(t){var e;const{appId:n,apiKey:a}=t,i={method:"GET",headers:Z(a)},r="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",n),o=await fetch(r,i);if(200!==o.status&&304!==o.status){let t="";try{const n=await o.json();(null===(e=n.error)||void 0===e?void 0:e.message)&&(t=n.error.message)}catch(t){}throw G.create("config-fetch-failed",{httpStatus:o.status,responseMessage:t})}return o.json()}(t);return i.deleteThrottleMetadata(s),e}catch(e){const l=e;if(!function(t){if(!(t instanceof r.ZR&&t.customData))return!1;const e=Number(t.customData.httpStatus);return 429===e||500===e||503===e||504===e}(l)){if(i.deleteThrottleMetadata(s),c)return V.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${c} provided in the "measurementId" field in the local Firebase config. [${null==l?void 0:l.message}]`),{appId:s,measurementId:c};throw e}const u=503===Number(null===(o=null==l?void 0:l.customData)||void 0===o?void 0:o.httpStatus)?(0,r.$s)(n,i.intervalMillis,30):(0,r.$s)(n,i.intervalMillis),d={throttleEndTimeMillis:Date.now()+u,backoffCount:n+1};return i.setThrottleMetadata(s,d),V.debug(`Calling attemptFetch again in ${u} millis`),W(t,d,a,i)}}class Y{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach((t=>t()))}}let Q,tt;async function et(t,e,n,a,i,o,s){var c;const l=J(t);l.then((e=>{n[e.measurementId]=e.appId,t.options.measurementId&&e.measurementId!==t.options.measurementId&&V.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${e.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)})).catch((t=>V.error(t))),e.push(l);const u=async function(){if(!(0,r.hl)())return V.warn(G.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await(0,r.eu)()}catch(t){return V.warn(G.create("indexeddb-unavailable",{errorInfo:null==t?void 0:t.toString()}).message),!1}return!0}().then((t=>t?a.getId():void 0)),[d,f]=await Promise.all([l,u]);(function(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(H)&&n.src.includes(t))return n;return null})(o)||function(t,e){const n=document.createElement("script");n.src=`${H}?l=${t}&id=${e}`,n.async=!0,document.head.appendChild(n)}(o,d.measurementId),tt&&(i("consent","default",tt),tt=void 0),i("js",new Date);const p=null!==(c=null==s?void 0:s.config)&&void 0!==c?c:{};return p.origin="firebase",p.update=!0,null!=f&&(p.firebase_id=f),i("config",d.measurementId,p),Q&&(i("set",Q),Q=void 0),d.measurementId}class nt{constructor(t){this.app=t}_delete(){return delete at[this.app.options.appId],Promise.resolve()}}let at={},it=[];const rt={};let ot,st,ct="dataLayer",lt=!1;function ut(t,e,n){!function(){const t=[];if((0,r.ru)()&&t.push("This is a browser extension environment."),(0,r.zI)()||t.push("Cookies are not available."),t.length>0){const e=t.map(((t,e)=>`(${e+1}) ${t}`)).join(" "),n=G.create("invalid-analytics-context",{errorInfo:e});V.warn(n.message)}}();const a=t.options.appId;if(!a)throw G.create("no-app-id");if(!t.options.apiKey){if(!t.options.measurementId)throw G.create("no-api-key");V.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=at[a])throw G.create("already-exists",{id:a});if(!lt){!function(t){let e=[];Array.isArray(window[t])?e=window[t]:window[t]=e}(ct);const{wrappedGtag:t,gtagCore:e}=function(t,e,n,a,i){let r=function(...t){window[a].push(arguments)};return window[i]&&"function"==typeof window[i]&&(r=window[i]),window[i]=function(t,e,n,a){return async function(i,r,o){try{"event"===i?await async function(t,e,n,a,i){try{let r=[];if(i&&i.send_to){let t=i.send_to;Array.isArray(t)||(t=[t]);const a=await R(n);for(const n of t){const t=a.find((t=>t.measurementId===n)),i=t&&e[t.appId];if(!i){r=[];break}r.push(i)}}0===r.length&&(r=Object.values(e)),await Promise.all(r),t("event",a,i||{})}catch(t){V.error(t)}}(t,e,n,r,o):"config"===i?await async function(t,e,n,a,i,r){const o=a[i];try{if(o)await e[o];else{const t=(await R(n)).find((t=>t.measurementId===i));t&&await e[t.appId]}}catch(t){V.error(t)}t("config",i,r)}(t,e,n,a,r,o):"consent"===i?t("consent","update",o):t("set",r)}catch(t){V.error(t)}}}(r,t,e,n),{gtagCore:r,wrappedGtag:window[i]}}(at,it,rt,ct,"gtag");st=t,ot=e,lt=!0}return at[a]=et(t,it,rt,e,ot,ct,n),new nt(t)}function dt(t=(0,a.Mq)()){t=(0,r.m9)(t);const e=(0,a.qX)(t,B);return e.isInitialized()?e.getImmediate():function(t,e={}){const n=(0,a.qX)(t,B);if(n.isInitialized()){const t=n.getImmediate();if((0,r.vZ)(e,n.getOptions()))return t;throw G.create("already-initialized")}return n.initialize({options:e})}(t)}const ft="@firebase/analytics",pt="0.9.3";(0,a.Xd)(new o.wA(B,((t,{options:e})=>ut(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),e)),"PUBLIC")),(0,a.Xd)(new o.wA("analytics-internal",(function(t){try{const e=t.getProvider(B).getImmediate();return{logEvent:(t,n,a)=>function(t,e,n,a){t=(0,r.m9)(t),async function(t,e,n,a,i){if(i&&i.global)t("event",n,a);else{const i=await e;t("event",n,Object.assign(Object.assign({},a),{send_to:i}))}}(st,at[t.app.options.appId],e,n,a).catch((t=>V.error(t)))}(e,t,n,a)}}catch(t){throw G.create("interop-component-reg-failed",{reason:t})}}),"PRIVATE")),(0,a.KN)(ft,pt),(0,a.KN)(ft,pt,"esm2017")}}]);