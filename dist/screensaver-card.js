function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}function e(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=window,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new r(i,t,n)},l=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,n))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var c;const d=window,h=d.trustedTypes,u=h?h.emptyScript:"",p=d.reactiveElementPolyfillSupport,v={toAttribute(t,e){switch(e){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:f},y="finalized";let m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty(y))return!1;this[y]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{s?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const s=document.createElement("style"),n=i.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,t.appendChild(s)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=g){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:v).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:v;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||f)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var $;m[y]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:m}),(null!==(c=d.reactiveElementVersions)&&void 0!==c?c:d.reactiveElementVersions=[]).push("1.6.3");const _=window,b=_.trustedTypes,w=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",E=`lit$${(Math.random()+"").slice(9)}$`,x="?"+E,S=`<${x}>`,C=document,k=()=>C.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,P="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,O=/>/g,D=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),M=/'/g,R=/"/g,j=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),z=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),F=new WeakMap,B=C.createTreeWalker(C,129,null,!1);function V(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===U?"!--"===l[1]?r=N:void 0!==l[1]?r=O:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=D):void 0!==l[3]&&(r=D):r===D?">"===l[0]?(r=null!=n?n:U,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?D:'"'===l[3]?R:M):r===R||r===M?r=D:r===N||r===O?r=U:(r=D,n=void 0);const h=r===D&&t[e+1].startsWith("/>")?" ":"";o+=r===U?i+S:c>=0?(s.push(a),i.slice(0,c)+A+i.slice(c)+E+h):i+E+(-2===c?(s.push(void 0),e):h)}return[V(t,o+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=W(t,e);if(this.el=G.createElement(l,i),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=B.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(A)||e.startsWith(E)){const i=c[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+A).split(E),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Q:"?"===e[1]?Y:"@"===e[1]?tt:Z})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(j.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),B.nextNode(),a.push({type:2,index:++n});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===x)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)a.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,s){var n,o,r,a;if(e===z)return e;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const c=H(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=q(t,l._$AS(t,e.values),l,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:C).importNode(i,!0);B.currentNode=n;let o=B.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new J(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new et(o,this,t)),this._$AV.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(o=B.nextNode(),r++)}return B.currentNode=C,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,s){var n;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),H(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==I&&H(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(V(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new K(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new G(t)),e}T(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new J(this.k(k()),this.k(k()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Z{constructor(t,e,i,s,n){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=q(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==z,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=q(this,s[i+r],e,r),a===z&&(a=this._$AH[r]),o||(o=!H(a)||a!==this._$AH[r]),a===I?t=I:t!==I&&(t+=(null!=a?a:"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Q extends Z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}const X=b?b.emptyScript:"";class Y extends Z{constructor(){super(...arguments),this.type=4}j(t){t&&t!==I?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class tt extends Z{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:I)===z)return;const s=this._$AH,n=t===I&&s!==I||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==I&&(s===I||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const it=_.litHtmlPolyfillSupport;null==it||it(G,J),(null!==($=_.litHtmlVersions)&&void 0!==$?$:_.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var st,nt;class ot extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new J(e.insertBefore(k(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return z}}ot.finalized=!0,ot._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:ot});const rt=globalThis.litElementPolyfillSupport;null==rt||rt({LitElement:ot}),(null!==(nt=globalThis.litElementVersions)&&void 0!==nt?nt:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):at(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ct(t){return lt({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var dt,ht;null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements;let ut=ht=class extends ot{loadLocalFont(t,e){const i=document.createElement("style");console.log(t),i.textContent=`\n      @font-face {\n        font-family: 'bw_font';\n        // src: url('${t}/BwModelica-HairlineExpanded.otf') format('truetype');\n        src: url('/local/BwModelica-HairlineExpanded.otf') format('truetype');\n      }\n\n     \n    `,document.head.appendChild(i)}constructor(){super(),this.cg_alert=!1,this.events=[],this.calendars=[];const t=new URL(import.meta.url).pathname,e=t.substring(0,t.lastIndexOf("/"));this.loadLocalFont(e,t)}static get styles(){return a`
      ha-card {
        background-color: black;
        margin: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
      }
      h2 {
        margin-bottom: 8px;
      }
      .gradient-bar {
        width: 100%;
        height: 2px;
        background: linear-gradient(
          to right,
          black,
          rgba(255, 255, 255, 0.3),
          black
        );
        position: relative;
        top: 42px;
      }
      .timeline {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        overflow-x: auto;
        justify-content: space-between;
        height: auto;
      }
      .timeline-item {
        flex: 0 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: -webkit-fill-available;
      }
      .condition {
        height: 50px;
      }
      .condition img {
        width: 40px;
        height: 40px;
      }
      .details {
        font-size: 0.9em;
        color: #757575;
      }
      .details .hour {
        font-weight: bold;
      }
      .details .temperature {
        color: #ff5722;
      }
      .details .temperature.cold {
        color: #2196f3;
      }
      .details .temperature.hot {
        color: #f44336;
      }
      .details .precipitation {
        color: #9e9e9e;
        font-size: 0.8em;
      }
      .main-grid {
        height: 100%;
        background-color: black;
        display: grid;
        grid-template-areas:
          ". icon icon now_icon alert"
          ". . . temp ."
          ". date . cal-event ."
          "tline tline tline tline tline";
        grid-template-columns: 7vw auto auto auto 1vw;
        grid-template-rows: auto auto 1fr auto;
        padding-top: 1vw;
      }
      .div-temp {
        grid-area: temp;
        justify-self: end;
      }
      #date-time {
        grid-area: date;
        font-family: bw_font, monospace;
        color: white;
        align-self: end;
        justify-self: start;
      }
      .time,
      .date {
        text-align: center;
        font-family: bw_font, monospace;
        line-height: 1;
      }
      .time {
        font-size: 13vw;
        white-space: nowrap;
      }
      .date {
        font-size: 4.5vw;
        display: flex;
        justify-content: space-between;
      }
      #entityState {
        display: flex;
        flex-direction: column;
        justify-content: end;
        line-height: 1;
      }
      .entity {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-top: 1vh;
      }
      .friendly-name {
        display: flex;
        justify-content: flex-end;
        font-size: 1.7vh;
        color: #757575;
      }
      .value {
        display: flex;
        font-size: 2vh;
        margin-top: 0.5vh;
        color: white;
      }
      .state {
        margin-left: auto;
        margin-right: 4px;
      }
      .unit {
        font-style: italic;
        color: #757575;
      }
      #icon-state-div {
        grid-area: icon;
        margin-top: 4vh;
      }
      ha-icon {
        --mdc-icon-size: 4.5vh;
        color: #757575;
      }
      .now-icon {
        grid-area: now_icon;
        justify-self: end;
        width: 27vw;
        height: 100%;
      }
      .ext-temp {
        font-family: "bw_font";
        font-weight: bold;
        font-size: 4vh;
        color: #757575;
      }
      .events {
        display: flex;
        flex-direction: column;
        justify-content: end;
        color: white;
        line-height: 1;
      }
      .event {
        margin-bottom: 10px;
        text-align: right;
        color: white;
      }
      .event-title {
        text-align: right;
        margin-top: 1vh;
        font-size: 2vh;
      }
      .event-time {
        color: #757575;
        text-align: right;
        font-size: 1.7vh;
      }
      .no-events {
        color: #999;
        font-style: italic;
        text-align: right;
      }
      .cg-alert {
        grid-area: alert;
        width: 2vw;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: red;
        position: relative;
        top: 1.5%;
        right: 100%;
        opacity: 0.6;
      }
      .hidden {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }
      .visible {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
      }
    `}async getCalendars(){try{const t=this.config?.calendars||[];if(!t.length)return void(this.calendars=[]);const e=await Promise.all(t.map((t=>this.hass.callApi("GET",`calendars/${t}`))));this.calendars=e}catch{this.calendars=[]}}async getEvents(){const t=this.config?.calendars||[];if(!t.length)return;const e=new Date,i=new Date;i.setDate(e.getDate()+7);try{const s=await this.fetchCalendarEvents(this.hass,e,i,t),n=this.filterDuplicateEvents(s);this.checkCGAlert(n),this.events=n.filter((t=>"cg_alert"!==t.summary)).slice(0,5)}catch{this.events=[]}}async fetchCalendarEvents(t,e,i,s){const n=s.map((s=>t.callApi("GET",`calendars/${s}?start=${e.toISOString()}&end=${i.toISOString()}`)));return(await Promise.allSettled(n)).filter((t=>"fulfilled"===t.status)).flatMap((t=>t.value))}filterDuplicateEvents(t){const e=new Set;return t.filter((t=>{const i=`${t.summary}-${t.start}`;return!e.has(i)&&(e.add(i),!0)}))}checkCGAlert(t){const e=new Date,i=t.find((t=>{const i=t.start?.dateTime||t.start,s=t.end?.dateTime||t.end,n=new Date(i),o=new Date(s);return"cg_alert"===t.summary&&!isNaN(n.getTime())&&!isNaN(o.getTime())&&n<=e&&e<=o}));this.cg_alert=!!i}formatEventDate(t){try{const e="object"==typeof t&&"dateTime"in t?t.dateTime:t,i=new Date(e);if(isNaN(i.getTime()))throw new Error("invalid date");return`${i.toLocaleDateString()} ${i.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`}catch{return"invalid date"}}firstUpdated(){const t=this.shadowRoot?.getElementById("dynamic-card");if(!t)return void console.error("Could not find the card");const e=()=>{const e=5*Math.floor(7*Math.random()),i=60-e,s=5*Math.floor(7*Math.random()),n=60-s;t.style.padding=`${e}px ${n}px ${i}px ${s}px`};setInterval(e,3e4),e()}setConfig(t){if(!t.entity)throw new Error("Invalid configuration");this.config=t}getCardSize(){return 15}async subscribeToHourlyForecast(){this.unsubscribeHourlyForecast(),this.isConnected&&this.hass&&this.config&&this.config.entity&&this.hassSupportsForecastEvents()&&this.config.entity.startsWith("weather.")&&(this.subscribedToHourlyForecast=this.hass.connection.subscribeMessage((t=>this.hourlyForecastEvent=t),{type:"weather/subscribe_forecast",forecast_type:"hourly",entity_id:this.config.entity}))}unsubscribeHourlyForecast(){this.subscribedToHourlyForecast&&(this.subscribedToHourlyForecast.then((t=>t())),this.subscribedToHourlyForecast=void 0)}hassSupportsForecastEvents(){return!!this.hass?.services?.weather?.get_forecasts}getHourlyForecast(){const t=this.hourlyForecastEvent?.forecast;return t??[]}connectedCallback(){super.connectedCallback(),this.subscribeToHourlyForecast(),this.getCalendars(),this.getEvents()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeHourlyForecast()}renderEntityState(){if(!this.config?.value_entity)return L``;const t=this.config.value_entity;return L`
      <div id="entityState" class="icon-state-div-class">
        ${t.length>0?t.map((t=>{const e=this.hass.states[t];if(!e)return L`<div>Entità non trovata: ${t}</div>`;const i=e.attributes.friendly_name||t,s=e.state,n=e.attributes.unit_of_measurement||"";return L`
                <div class="entity">
                  <span class="friendly-name">${i}</span>
                  <div class="value">
                    <span class="state">${s}</span>
                    <span class="unit">${n}</span>
                  </div>
                </div>
              `})):L`<div>Nessuna entità configurata</div>`}
      </div>
    `}renderEvents(){return this.config?.calendars?L`
      <div class="events">
        ${this.events.length>0?this.events.map((t=>L`
                <div class="event">
                  <div class="event-title">${t.summary}</div>
                  <div class="event-time">
                    ${this.formatEventDate(t.start)} -
                    ${this.formatEventDate(t.end)}
                  </div>
                </div>
              `)):L``}
      </div>
    `:L``}render(){const t=this.getHourlyForecast().slice(0,16);let e="";const i=(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),s=this.hass?.locale?.language||"en-US",n=new Date,o=n.toLocaleDateString(s,{weekday:"short"}),r=n.toLocaleDateString(s,{day:"2-digit"}),a=n.toLocaleDateString(s,{month:"2-digit"}),l=n.toLocaleDateString(s,{year:"2-digit"}),c=`${o} : ${r} : ${a} : ${l}`,d=this.config?.entity_icon||[];this.config;const h=this.config?.entity;if(!h||!this.hass.states[h])return console.error("Invalid or not found weather entity:",h),L``;const u=this.hass.states[h].state,p=this.hass.states[h].attributes.temperature,v=this.hass.states["sun.sun"];if(!v)return console.error("Entità sun.sun non trovata"),L``;let f;f="partlycloudy"===u?"above_horizon"===v?.state?"partlycloudy":"partlycloudy-night":u;const g=this.config?.value_entity&&this.config?.calendars,y=0===Math.floor(Date.now()/7e3%2);return L`
      <ha-card id="dynamic-card" style="padding: 30px;">
        <div class="main-grid">
          ${this.cg_alert?L` <div class="cg-alert"></div> `:""}
          <div id="icon-state-div" class="icon-state-div-class">
            ${d.length>0?d.map((t=>{const e=t.entity,i=t.icon,s=this.hass.states[e];if(!s||"on"!==s.state)return"";const n=i||s.attributes.icon;return L`
                    <ha-icon
                      .icon="${n}"
                      style="margin: 0 8px; font-size: 24px;"
                      title="${s.attributes.friendly_name||e}"
                    ></ha-icon>
                  `})):L`<div>No entities configured or active</div>`}
          </div>

          <div id="date-time">
            <div class="time">
              ${i}
              <div class="date">
                <div>${o}</div>
                <div>:</div>
                <div>${r}</div>
                <div>:</div>
                <div>${a}</div>
                <div>:</div>
                <div>${l}</div>
              </div>
            </div>
            <!--    <div class="date">${c}</div> -->
          </div>

          <div class="now-icon">
            <img
              src="https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/now_icon/${f}.svg"
            />
          </div>

          <div class="div-temp">
            ${this.config?.internal_temperature?(()=>{const t=this.config?.internal_temperature||"",e=t&&this.hass.states[t]?this.hass.states[t].state:null;return L`
                    <svg
                      version="1.1"
                      id="Ñëîé_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 1152.78 354.73"
                      style="enable-background:new 0 0 1152.78 354.73; height:6vh;"
                      xml:space="preserve"
                    >
                      <style type="text/css">
                        .st0 {
                          fill: #757575;
                        }
                        .st1 {
                          font-family: "bw_font";
                          font-weight: bold;
                        }
                        .st2 {
                          font-size: 180px;
                        }
                      </style>
                      <g>
                        <path
                          class="st0"
                          d="M1134.59,158.27c1.24,1.14,1.56,2.51,0.97,4.07c-0.56,1.48-2.01,2.44-3.59,2.44h-29.34
  c-16.57,0-30,13.43-30,30v24.55c0,4.16,3.37,7.52,7.52,7.52l0,0c4.16,0,7.52-3.37,7.52-7.52v-24.55c0-8.25,6.69-14.94,14.94-14.94
  h29.43c17.14,0,25.35-21.04,12.74-32.65L853.18,8.75c-3.6-3.31-8.16-4.96-12.73-4.96c-4.57,0-9.14,1.65-12.74,4.97L555.94,147.19
  c-12.6,11.61-4.39,32.65,12.74,32.65h33.18c8.25,0,14.94,6.69,14.94,14.94v138.86c0,8.47,8.83,15.24,17.26,15.24h69.4
  c4.16,0,7.52-3.37,7.52-7.52l0,0c0-4.16-3.37-7.52-7.52-7.52h-69.4c-0.68,0-1.7-0.52-2.21-0.99V194.78c0-16.57-13.43-30-30-30
  h-33.09c-1.59,0-3.04-0.96-3.6-2.44c-0.59-1.56-0.25-2.93,0.98-4.07L837.9,19.83c0.89-0.82,1.88-0.99,2.55-0.99
  c0.67,0,1.65,0.17,2.54,0.99"
                        />
                      </g>
                      <text
                        transform="matrix(1 0 0 1 0.1313 290.461)" 
                        class="st0 st1 st2"
                      >
                        ${p}°
                      </text>
                      <text
                        transform="matrix(1 0 0 1 660.559 290.461)"
                        class="st0 st1 st2"
                      >
                        ${e}°
                      </text>
                    </svg>
                  `})():L`<div class="ext-temp">${p}°</div>`}
          </div>

          ${g?L`
                <div
                  style="grid-area: cal-event;align-self: end;"
                  class="${y?"visible":"hidden"}"
                >
                  ${y?this.renderEntityState():""}
                </div>
                <div
                  style="grid-area: cal-event;align-self: end;"
                  class="${y?"hidden":"visible"}"
                >
                  ${y?"":this.renderEvents()}
                </div>
              `:L`
                ${this.config?.value_entity?L`<div style="grid-area: cal-event;align-self: end;">
                      ${this.renderEntityState()}
                    </div>`:""}
                ${this.config?.calendars?L`<div style="grid-area: cal-event;align-self: end;">
                      ${this.renderEvents()}
                    </div>`:""}
              `}

          <div style="grid-area: tline; margin-top: 7vh;">
            <div class="gradient-bar"></div>
            <div class="timeline">
              ${t.length>0?t.map(((t,i)=>{const s=t.condition!==e;e=t.condition;const n=`https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/${ht.weatherIconsDay[t.condition]||"unknown"}.svg`,o=t.temperature<10?"cold":t.temperature>25?"hot":"";return L`
                      <div class="timeline-item">
                        ${s?L`
                              <div class="condition">
                                <img src="${n}" alt="${t.condition}" />
                              </div>
                            `:L`<div class="condition"></div>`}
                        <div class="details">
                          <div class="hour">
                            ${new Date(t.datetime).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
                          </div>
                          <div class="temperature ${o}">
                            ${t.temperature}°C
                          </div>
                          ${0!==t.precipitation?L`<div class="precipitation">
                                ${t.precipitation} mm
                              </div>`:""}
                        </div>
                      </div>
                    `})):L`<div>No hourly forecast available</div>`}
            </div>
          </div>
        </div>
      </ha-card>
    `}};ut.weatherIconsDay={clear:"day","clear-night":"night",cloudy:"cloudy",fog:"fog",hail:"hail",lightning:"lightning","lightning-rainy":"lightning-rainy",partlycloudy:"partlycloudy",pouring:"pouring",rainy:"rainy",snowy:"snowy","snowy-rainy":"snowy-rainy",sunny:"day",windy:"windy","windy-variant":"windy-variant",exceptional:"!!"},t([lt({attribute:!1}),e("design:type",Object)],ut.prototype,"hass",void 0),t([lt({attribute:!1}),e("design:type",Object)],ut.prototype,"config",void 0),t([ct(),e("design:type",Boolean)],ut.prototype,"cg_alert",void 0),t([ct(),e("design:type",Object)],ut.prototype,"hourlyForecastEvent",void 0),t([ct(),e("design:type",Promise)],ut.prototype,"subscribedToHourlyForecast",void 0),t([ct(),e("design:type",Array)],ut.prototype,"events",void 0),ut=ht=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e))("screensaver-card"),e("design:paramtypes",[])],ut);export{ut as ScreensaverCard};
