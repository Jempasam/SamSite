(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const p of c.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&o(p)}).observe(document,{childList:!0,subtree:!0});function t(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(i){if(i.ep)return;i.ep=!0;const c=t(i);fetch(i.href,c)}})();function M(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function a(s,...e){let t=0,o="",i={};function c(n,l){n in i||(i[n]=[]),i[n].push(l)}function p(n){if(n!=null)if(n instanceof Node){var l=`_sam_frament_target_${t++}`;o+=`<span ${l}=""></span>`,c(l,r=>r.replaceWith(n))}else if(typeof n=="object"&&"element"in n)p(n.element);else if(typeof n=="string")o+=M(n);else if(typeof n[Symbol.iterator]=="function")for(const r of n)p(r);else typeof n=="function"?p(n()):o+=M(""+n)}function d(n,l){if(n!=null)if(n instanceof Element)l.push(r=>{for(let v=0;v<r.attributes.length;v++){const x=r.attributes.item(v);n.attributes.setNamedItem(x.cloneNode())}for(;r.firstChild;)n.appendChild(r.firstChild);r.before(n)});else if(typeof n=="object"&&"element"in n&&n.element instanceof Element){const r=n,v=r.element;l.push(x=>{for(let E=0;E<x.attributes.length;E++){const h=x.attributes.item(E);(!r.setTemplateAttr||!r.setTemplateAttr(h.name,h.value))&&v.attributes.setNamedItem(h.cloneNode())}for(;x.firstChild;)v.appendChild(x.firstChild);x.before(v)})}else if(typeof n=="string")o+=M(n);else if(typeof n[Symbol.iterator]=="function")for(const r of n)d(r,l);else if(typeof n=="function")d(n(),l);else throw new Error("Invalid type to be placed as an element: "+typeof n)}function u(n,l){if(n!=null)if(typeof n[Symbol.iterator]=="function")for(const r of n)u(r,l);else if(typeof n=="function")l.push(n);else if(typeof n=="object")l.push(r=>{for(const[v,x]of Object.entries(n))if(typeof x=="function")v=="init"?l.push(x):r.addEventListener(v,x);else throw new Error("Invalid event listener for @ placeholder: "+v)});else throw new Error("Invalid type to be placed as an element: "+typeof n)}function m(n){return n.replace("</>","</div>")}const f={};try{for(let n=0;n<e.length;n++)if(s[n].endsWith("<")){const l=`_sam_frament_to_remove_${t++}`;o+=s[n]+`div ${l} `;const r=[];f[l]=r,d(e[n],r)}else if(s[n].endsWith("@")){o+=s[n];const l=`_sam_frament_callback_${t++}`;o+=` ${l}="" `;const r=i[l]??[];i[l]=r,u(e[n],r)}else o+=m(s[n]),p(e[n]);o+=m(s[s.length-1])}catch(n){const l=o.length<20?o:o.slice(-20,-1);throw new Error(`[${l}...] : ${n!=null&&typeof n=="object"&&"message"in n?n.message:n}`)}const b=document.createRange().createContextualFragment(o);for(const[n,l]of Object.entries(f)){const r=b.querySelector(`[${n}]`);r.removeAttribute(n);for(const v of l)v(r);r.remove()}for(const[n,l]of Object.entries(i)){let r=b.querySelector(`[${n}]`);for(const v of l)r.parentNode||(r=b.getElementById(n)),v(r);r.removeAttribute(n)}return b}a.opt=function(s,...e){if(!(e.includes(null)||e.includes(void 0)))return a(s,...e)};a.not_empty=function(s,...e){if(!e.every(t=>t==null||t?.length===0))return a(s,...e)};a.a=function(s,...e){return a(s,...e).firstElementChild};class g{setTemplateAttr(e,t){const o=Object.getPrototypeOf(this),i=Object.getOwnPropertyDescriptor(o,e);return i?.set?(i.set.call(this,t),!0):!1}}function P(s,e,t){const o=document.createElement(s);return o.attachShadow({mode:"closed"}).append(e),o.append(t),o}class q extends g{constructor(e,t,o){super(),this.root=e,this.pages=t,this.defaultPage=o,this.currentComponent=null,this.container=null,this.element=a``,window.addEventListener("hashchange",()=>this.navigate()),this.navigate()}buildRegex(e){const o="^/"+e.map(i=>typeof i=="string"?i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"):i.source).join("\\/")+"$";return new RegExp(o)}matchRoute(e){e.startsWith(this.root)&&(e=e.slice(this.root.length));for(const t of this.pages){const o=this.buildRegex(t.pattern),i=e.match(o);if(i)return{page:t,pageId:e,matches:i}}return null}navigate(){const e=window.location.pathname;let t=this.matchRoute(e);!t&&this.defaultPage&&(t={page:this.defaultPage,pageId:e,matches:[]}),t&&(!this.container&&this.currentComponent&&(this.container=this.getContainer()),this.currentComponent&&this.container&&(this.container.innerHTML=""),this.currentComponent=t.page.factory(t.pageId,t.matches.slice(1),this.pages),this.container?this.container.appendChild(this.currentComponent.element):this.element.appendChild(this.currentComponent.element))}getContainer(){if(this.currentComponent){let e=this.currentComponent.element.parentNode;for(;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.parentNode;return e}return null}navigateTo(e){window.location.hash="#"+e}getCurrentPage(){const e=window.location.hash;return this.matchRoute(e)?.page||null}}const y="/SamSite",z={home:"Accueil",wam:"Web Audio Modules",layouts:"Layouts",about:"À propos"};class $ extends g{constructor(e,t){super(),this.name=e,this.main=t,this.element=a`
            <header>
                <div class="header-container">
                    <h1>Le site de Sam</h1>
                    <nav class="menu">
                        ${function*(){for(const[o,i]of Object.entries(z)){const c=o===e;yield a.a`<a href="${y}/${o}" class="menu-item ${c?"selected":""}">${i}</a>`}}}
                    </nav>
                </div>
            </header>
            <main>
                ${t}
            </main>
            <footer>
                <p>&copy; 2026 Le site de Sam. Tous droits réservés.</p>
            </footer>
        `,console.log(this.element)}}class D extends g{constructor(e,t){super();const o=a.a`
            <section id="home">
                <h2>Bienvenue sur mon site</h2>
                <p>Ceci est un site de démonstration utilisant TypeScript avec Vite et un système de routing.</p>
                
                <h3>Navigation</h3>
                <ul>
                    <li><a href="${y}/home">Accueil</a></li>
                    <li><a href="${y}/wam">Web Audio Modules</a></li>
                    <li><a href="${y}/wam/123">WAM Detail (exemple avec ID 123)</a></li>
                    <li><a href="${y}/layouts">Composants de Layout</a></li>
                    <li><a href="${y}/about">À propos</a></li>
                </ul>

                <h3>Fonctionnalités</h3>
                <p>Ce site démontre :</p>
                <ul>
                    <li>Routing avec patterns flexibles (strings et regex)</li>
                    <li>Web Components avec Shadow DOM</li>
                    <li>Composants réutilisables (Spinner, AsyncContent, Toast, Modal, etc.)</li>
                    <li>Composants de layout (HBox, VBox, FlowBox, GridBox, etc.)</li>
                    <li>Architecture modulaire avec pages</li>
                </ul>
            </section>
        `,i=new $("home",o);this.element=i.element}}const H=`
    :host {
        display: flex;
        flex-direction: row;
        gap: var(--gap, 1rem);
        align-items: var(--align, stretch);
        justify-content: var(--justify, flex-start);
        flex-wrap: var(--wrap, nowrap);
    }
`;class V extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${H}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set align(e){this.element.style.setProperty("--align",e)}set justify(e){this.element.style.setProperty("--justify",e)}set wrap(e){this.element.style.setProperty("--wrap",e)}}const U=`
    :host {
        display: flex;
        flex-direction: column;
        gap: var(--gap, 1rem);
        align-items: var(--align, stretch);
        justify-content: var(--justify, flex-start);
    }
`;class F extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${U}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set align(e){this.element.style.setProperty("--align",e)}set justify(e){this.element.style.setProperty("--justify",e)}}const G=`
    :host {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--gap, 1rem);
        align-items: var(--align, stretch);
        justify-content: var(--justify, flex-start);
        align-content: var(--align-content, flex-start);
    }
`;class j extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${G}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set align(e){this.element.style.setProperty("--align",e)}set justify(e){this.element.style.setProperty("--justify",e)}set alignContent(e){this.element.style.setProperty("--align-content",e)}}const J=`
    :host {
        display: grid;
        gap: var(--gap, 1rem);
        grid-template-columns: var(--columns, repeat(auto-fit, minmax(250px, 1fr)));
        grid-template-rows: var(--rows, auto);
        align-items: var(--align, stretch);
        justify-items: var(--justify, stretch);
    }
`;class Y extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${J}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set columns(e){this.element.style.setProperty("--columns",e)}set rows(e){this.element.style.setProperty("--rows",e)}set align(e){this.element.style.setProperty("--align",e)}set justify(e){this.element.style.setProperty("--justify",e)}}const X=`
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: var(--min-height, auto);
        padding: var(--padding, 0);
    }
`;class I extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${X}</style>
            <slot></slot>
        `)}set minHeight(e){this.element.style.setProperty("--min-height",e)}set padding(e){this.element.style.setProperty("--padding",e)}}const K=`
    :host {
        display: grid;
        grid-template-areas: "stack";
    }
    
    ::slotted(*) {
        grid-area: stack;
    }
`;class Q extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${K}</style>
            <slot></slot>
        `)}}class Z extends g{constructor(){super(...arguments),this.etitle=a.a`<h4>Titre</h4>`,this.etext=a.a`<p>L orem upsuorem upsuorem upsuorem upsuorem upsuorem upsu</p>`,this.eimg=a.a`<img src="https://placehold.co/600x400" alt="placeholder">`,this.elink=a.a`<a href="#">En savoir plus →</a>`,this.element=P("div",a`
            <style>${ee}</style>
            <slot name=image></slot>
            <div class=-body>
                <slot name=title></slot>
                <slot name=text></slot>
                <div class=-footer>
                    <slot name=link></slot>
                </div>
            </div>
        `,a`
            <${this.eimg} slot=image></div>
            <${this.etitle} slot=title></div>
            <${this.etext} slot=text></div>
            <${this.elink} slot=link></div>
        `)}set title(e){this.etitle.textContent=e}get title(){return this.etitle.textContent||""}set text(e){this.etext.textContent=e}get text(){return this.etext.textContent||""}set img(e){this.eimg.src=e}get img(){return this.eimg.src}set link(e){this.elink.href=e}get link(){return this.elink.href}}const ee=`
    *, ::slotted(*) {
        margin: 0 !important;
    }
    :host {
        background: var(--back);
        border-radius: var(--radius-normal);
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: var(--transition);
        display: flex;
        flex-direction: column;
    }
    :host(:hover) {
        box-shadow: var(--shadow-large);
        transform: translateY(-4px);
    }
    ::slotted(img) {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 0;
        box-shadow: none;
    }
    ::slotted(h4) {
        font-size: var(--font-large);
        font-weight: 600;
        color: var(--front);
        margin-bottom: var(--spacing-small);
    }
    ::slotted(p) {
        color: var(--front-less);
        margin-bottom: var(--spacing-small);
    }
    ::slotted(a) {
        color: var(--spice);
        text-decoration: none;
        font-weight: 500;
        transition: var(--transition);
    }
    ::slotted(a:hover) {
        color: var(--spice-more);
    }
    .-body {
        padding: var(--spacing-normal);
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .-footer {
        padding-top: var(--spacing-small);
        border-top: 1px solid var(--back-more);
        margin-top: auto;
    }
`;class te extends g{constructor(e="medium"){super(),this.size=e,this.element=P("div",a`
            <style>${ne}</style>
            <div class="-spinner"></div>
        `,a``),this.element.classList.add(`-${e}`)}}const ne=`
    :host {
        display: inline-block;
    }
    :host(.-small) .-spinner {
        width: 20px;
        height: 20px;
        border-width: 2px;
    }
    :host(.-medium) .-spinner {
        width: 40px;
        height: 40px;
        border-width: 4px;
    }
    :host(.-large) .-spinner {
        width: 60px;
        height: 60px;
        border-width: 5px;
    }
    .-spinner {
        border-radius: 50%;
        border: 4px solid var(--back-more);
        border-top-color: var(--spice);
        animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;class N extends g{constructor(e){super(),this.element=document.createElement("div"),this.shadowRoot=this.element.attachShadow({mode:"open"}),this.spinner=new te("medium"),this.shadowRoot.appendChild(a.a`<style>${oe}</style>`);const t=document.createElement("div");t.className="-container";const o=document.createElement("div");o.className="-loading",o.appendChild(this.spinner.element);const i=document.createElement("p");i.className="-loading-text",i.textContent="Chargement...",o.appendChild(i),t.appendChild(o),this.shadowRoot.appendChild(t),this.load(e,o,t)}async load(e,t,o){try{const i=await e();t.style.animation="fadeOut 0.3s ease",setTimeout(()=>{const c=this.element.parentNode;if(c){if(typeof i=="string"){const p=document.createElement("div");for(p.innerHTML=i;p.firstChild;)c.insertBefore(p.firstChild,this.element)}else c.insertBefore(i,this.element);c.removeChild(this.element)}},300)}catch(i){t.innerHTML=`
                <div class="-error">
                    <p class="-error-icon">⚠</p>
                    <p class="-error-text">Erreur de chargement</p>
                    <p class="-error-details">${i instanceof Error?i.message:"Erreur inconnue"}</p>
                </div>
            `}}}const oe=`
    :host {
        display: block !important;
    }
    .-container {
        min-height: 100px;
        position: relative;
    }
    .-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-normal);
        padding: var(--spacing-large);
    }
    .-loading-text {
        color: var(--front-less);
        font-size: var(--font-normal);
        margin: 0;
        font-weight: 500;
    }
    .-content {
        display: block;
    }
    .-content.-hidden {
        display: none !important;
    }
    .-content:not(.-hidden) {
        animation: fadeIn 0.3s ease;
    }
    .-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-small);
        padding: var(--spacing-large);
        background: var(--back-more);
        border-radius: var(--radius-normal);
        border: 2px solid #ef4444;
    }
    .-error-icon {
        font-size: 2rem;
        color: #ef4444;
        margin: 0;
    }
    .-error-text {
        color: var(--front);
        font-weight: 600;
        margin: 0;
    }
    .-error-details {
        color: var(--front-less);
        font-size: var(--font-tiny);
        margin: 0;
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;let k;async function W(){if(!k){k=[];{const e=await(await fetch("https://www.webaudiomodules.com/community/plugins.json")).json();for(const t of e)k.push({id:t.identifier,name:t.name,desc:t.description,url:`https://www.webaudiomodules.com/community/plugins/${t.path}`,img:`https://www.webaudiomodules.com/community/plugins/${t.thumbnail}`})}for(const s of ie)k.push(s);k.sort((s,e)=>s.name.localeCompare(e.name))}return k}const ie=[{id:"flute-for-is2",name:"Flute for IS2",desc:"Un instrument à vent virtuel conçu pour la plateforme Interactive Synthesizer 2 (IS2), offrant des sons de flûte réalistes et expressifs pour les musiciens et les producteurs.",url:"https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/fluteForIS2/index.js",img:"https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/fluteForIS2/screenshot.png"},{id:"wam-chorus-mb",name:"WAM Chorus MB",desc:"Un module de chorus multi-bande pour la plateforme Web Audio Modules (WAM), offrant des effets de modulation riches et complexes pour les producteurs de musique et les ingénieurs du son.",url:"https://mainline.i3s.unice.fr/WAMChorusMB/",img:"https://mainline.i3s.unice.fr/WAMChorusMB/screenshot.png"},{id:"wam-sampler",name:"WAM Sampler",desc:"Un échantillonneur polyvalent pour la plateforme Web Audio Modules (WAM), permettant aux utilisateurs de charger, manipuler et jouer des échantillons audio avec une interface intuitive et des fonctionnalités avancées.",url:"https://mainline.i3s.unice.fr/WamSampler/src/index.js",img:"https://mainline.i3s.unice.fr/WamSampler/src/screenshot.png"},{id:"faust-ping-pong-delay",name:"Faust Ping Pong Delay",desc:"Un module de delay ping-pong développé avec Faust pour la plateforme Web Audio Modules (WAM), offrant des effets de delay stéréo dynamiques et personnalisables pour les musiciens et les producteurs.",url:"https://mainline.i3s.unice.fr/wam2/packages/faustPingPongDelay/plugin/index.js",img:"https://mainline.i3s.unice.fr/wam2/packages/faustPingPongDelay/plugin/screenshot.png"},{id:"obxd",name:"OBXD",desc:"Un synthétiseur virtuel inspiré du légendaire Oberheim OB-X, développé pour la plateforme Web Audio Modules (WAM), offrant des sons analogiques riches et une interface utilisateur intuitive pour les producteurs de musique.",url:"https://mainline.i3s.unice.fr/wam2/packages/obxd/index.js",img:"https://mainline.i3s.unice.fr/wam2/packages/obxd/screenshot.png"},{id:"clarinet-midi",name:"Clarinet MIDI",desc:"Un module de clarinette MIDI pour la plateforme Web Audio Modules (WAM), offrant des sons de clarinette réalistes et expressifs, contrôlés via MIDI pour les musiciens et les producteurs.",url:"https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/clarinetMIDI/indexGUIStandard.js",img:"https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/clarinetMIDI/screenshot.png"},{id:"juno-6",name:"JUNO-6",desc:"Un synthétiseur virtuel inspiré du légendaire Roland JUNO-6, développé pour la plateforme Web Audio Modules (WAM), offrant des sons analogiques classiques et une interface utilisateur intuitive pour les producteurs de musique.",url:"https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/JUNO6v2/indexGUIStandard.js",img:"https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/JUNO6v2/Juno6.png"},{id:"pro-54",name:"Pro-54",desc:"Un synthétiseur virtuel inspiré du légendaire Sequential Circuits Prophet-5, développé pour la plateforme Web Audio Modules (WAM), offrant des sons analogiques riches et une interface utilisateur intuitive pour les producteurs de musique.",url:"https://wam-4tt.pages.dev/Pro54/index.js",img:"https://wam-4tt.pages.dev/Pro54/thumbnail.png"},{id:"viktor-nv1",name:"Viktor NV1",desc:"Un synthétiseur virtuel développé pour la plateforme Web Audio Modules (WAM) par Viktor NV, offrant une large gamme de sons et une interface utilisateur intuitive pour les producteurs de musique.",url:"https://mainline.i3s.unice.fr/WAMViktorNV1/viktorNV1/index.js",img:"https://mainline.i3s.unice.fr/WAMViktorNV1/viktorNV1/viktorNV1.png"},{id:"cardboard-wam",name:"Cardboard WAM",desc:"A synthetizer made of cardboard with a drawable wave shape and envelope.",url:"https://jempasam.github.io/cardboardwam/dist/index.mjs",img:"https://jempasam.github.io/cardboardwam/dist/screenshot.png"}];class se extends g{constructor(e,t){super();async function o(){const p=await W();return a.a`
                <${new j}>
                    ${function*(){for(const d of p){let u=new Z;u.eimg.style.objectFit="contain",u.eimg.style.maxHeight="400px",u.etext.style.overflow="hidden",yield a.a`
                                <${u}
                                    title="${d.name}"
                                    text="${d.desc}"
                                    img="${d.img}"
                                    link="${y}/wam/${d.id}"
                                    style="width: 49%;"
                                ></div>
                            `}}}
                </div>
            `}const i=a`
            <section>
                <h2>Web Audio Modules</h2>
                <p>Découvrez les derniers plugins audio pour le web, créés par la communauté Web Audio Modules. Explorez une variété de modules, des synthétiseurs aux effets, tous conçus pour fonctionner directement dans votre navigateur.</p>
                ${new N(o)}
            </section>
        `,c=new $("wam",i);this.element=c.element}}const re="modulepreload",ae=function(s){return"/SamSite/"+s},L={},T=function(e,t,o){let i=Promise.resolve();if(t&&t.length>0){let m=function(f){return Promise.all(f.map(b=>Promise.resolve(b).then(n=>({status:"fulfilled",value:n}),n=>({status:"rejected",reason:n}))))};var p=m;document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),u=d?.nonce||d?.getAttribute("nonce");i=m(t.map(f=>{if(f=ae(f),f in L)return;L[f]=!0;const b=f.endsWith(".css"),n=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${n}`))return;const l=document.createElement("link");if(l.rel=b?"stylesheet":re,b||(l.as="script"),l.crossOrigin="",l.href=f,u&&l.setAttribute("nonce",u),document.head.appendChild(l),b)return new Promise((r,v)=>{l.addEventListener("load",r),l.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${f}`)))})}))}function c(d){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=d,window.dispatchEvent(u),!u.defaultPrevented)throw d}return i.then(d=>{for(const u of d||[])u.status==="rejected"&&c(u.reason);return e().catch(c)})};class le extends g{constructor(){super(),this.element=P("div",a`
            <style>${ce}</style>
            <div class="-container">
                <slot></slot>
            </div>
        `,a``)}}const ce=`
    :host {
        display: block;
        margin: var(--spacing-normal) 0;
        padding: var(--spacing-normal);
        background: var(--back-less);
        border-radius: var(--radius-normal);
        border: 2px solid var(--back-more);
        box-shadow: var(--shadow);
        transition: var(--transition);
    }
    .-container {
        width: 100%;
        box-sizing: border-box;
        min-height: 200px;
        padding: var(--spacing-large);
        text-align: center;
        background: var(--back);
        border-radius: var(--radius-small);
        border: 2px dashed var(--spice);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        position: relative;
        overflow: scroll;
        box-shadow: inset 0 2px 12px rgba(0, 0, 0, 0.4);
    }
    .-container::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(255, 140, 66, 0.05) 0%, transparent 70%);
        opacity: 0;
        transition: var(--transition);
    }
    ::slotted(*){
        max-width: 100%;
        max-height: 100%;
    }
`;class _ extends g{constructor(e=""){super(),this._text="",this.textElement=null,this.copyButton=null,this._text=e,this.element=document.createElement("div");const t=this.element.attachShadow({mode:"open"});t.append(a`
            <style>
                :host {
                    display: inline-flex;
                    align-items: center;
                }

                .text-container {
                    flex: 1;
                    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                    font-size: var(--font-tiny);
                    color: var(--spice-less);
                    user-select: all;
                    cursor: text;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding: var(--spacing-tiny) !important;

                    background-color: var(--back-less);
                    border: none;
                }

                button {
                    align-self: stretch;
                    flex-shrink: 0;
                    background: var(--back);
                    color: var(--front-less);
                    border: none;
                    border-radius: var(--radius-small);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 0.85em;
                }

                button:hover {
                    background: var(--spice, #ff8c42);
                    color: var(--back-less, #1a1a1a);
                    border-color: var(--spice, #ff8c42);
                }

                button:active {
                    transform: scale(0.95);
                }

                button.copied {
                    background: #4caf50;
                    color: white;
                    border-color: #4caf50;
                }
            </style>
            <div class="text-container">${this._text}</div>
            <button type="button">⎘ Copier</button>
        `),this.textElement=t.querySelector(".text-container"),this.copyButton=t.querySelector("button"),this.copyButton&&this.copyButton.addEventListener("click",()=>this.copyToClipboard())}set text(e){this._text=e,this.textElement&&(this.textElement.textContent=e)}get text(){return this._text}async copyToClipboard(){if(this.copyButton)try{await navigator.clipboard.writeText(this._text);const e=this.copyButton.textContent;this.copyButton.textContent="✓ Copié!",this.copyButton.classList.add("copied"),setTimeout(()=>{this.copyButton&&(this.copyButton.textContent=e,this.copyButton.classList.remove("copied"))},2e3)}catch(e){console.error("Erreur lors de la copie:",e),this.copyButton.textContent="✗ Erreur",setTimeout(()=>{this.copyButton&&(this.copyButton.textContent="⎘ Copier")},2e3)}}}const de=`
    .-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-normal, 1.5rem);
    }

    .-init-button {
        width: 100%;
        padding: var(--spacing-huge, 3rem) var(--spacing-large, 2rem);
        background: linear-gradient(135deg, var(--back-more, #303030) 0%, var(--back, #242424) 100%);
        border: 2px solid var(--back-more, #303030);
        border-radius: var(--radius-normal, 8px);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-normal, 1.5rem);
    }

    .-init-button:hover {
        border-color: var(--spice, #ff8c42);
        background: linear-gradient(135deg, var(--back, #242424) 0%, var(--back-more, #303030) 100%);
        transform: translateY(-2px);
        box-shadow: var(--shadow-large, 0 4px 16px rgba(0, 0, 0, 0.5));
    }

    .-init-button:active {
        transform: translateY(0);
    }

    .-init-icon {
        font-size: 3rem;
        color: var(--spice, #ff8c42);
        margin: 0;
    }

    .-init-text {
        font-size: var(--font-large, 20px);
        font-weight: 600;
        color: var(--front, #e8e8e8);
        margin: 0;
    }

    .-init-description {
        font-size: var(--font-normal, 16px);
        color: var(--front-less, #b0b0b0);
        margin: 0;
        text-align: center;
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;class O extends g{constructor(e,t={}){super();const{icon:o="▶",text:i="Initialiser",description:c="Cliquez pour charger le contenu"}=t;this.element=document.createElement("div"),this.shadowRoot=this.element.attachShadow({mode:"open"}),this.shadowRoot.appendChild(a.a`<style>${de}</style>`);const p=document.createElement("div");p.className="-container";const d=document.createElement("button");d.className="-init-button",d.type="button";const u=document.createElement("p");u.className="-init-icon",u.textContent=o;const m=document.createElement("p");m.className="-init-text",m.textContent=i;const f=document.createElement("p");f.className="-init-description",f.textContent=c,d.appendChild(u),d.appendChild(m),d.appendChild(f),p.appendChild(d),this.shadowRoot.appendChild(p),d.addEventListener("click",()=>this.initialize(e,p))}initialize(e,t){try{t.style.animation="fadeOut 0.3s ease",setTimeout(()=>{try{const o=e(),i=this.element.parentNode;if(i){if(typeof o=="string"){const c=document.createElement("div");for(c.innerHTML=o;c.firstChild;)i.insertBefore(c.firstChild,this.element)}else i.insertBefore(o,this.element);i.removeChild(this.element)}}catch(o){t.innerHTML=`
                        <div class="-init-button" style="cursor: default; border-color: #f44336;">
                            <p class="-init-icon" style="color: #f44336;">⚠</p>
                            <p class="-init-text">Erreur d'initialisation</p>
                            <p class="-init-description">${o instanceof Error?o.message:"Erreur inconnue"}</p>
                        </div>
                    `}},300)}catch(o){t.innerHTML=`
                <div class="-init-button" style="cursor: default; border-color: #f44336;">
                    <p class="-init-icon" style="color: #f44336;">⚠</p>
                    <p class="-init-text">Erreur d'initialisation</p>
                    <p class="-init-description">${o instanceof Error?o.message:"Erreur inconnue"}</p>
                </div>
            `}}}const ue=`
    :host {
        display: inline-flex;
        align-items: stretch;
        background-color: var(--back-less);
        border-radius: var(--radius-small);
        overflow: hidden;
    }

    .status-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-tiny);
        background: var(--back);
        min-width: 2.5rem;
        font-size: 1.5rem;
        transition: all 0.3s ease;
    }

    .status-indicator.active {
        background: var(--spice);
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--spacing-tiny) var(--spacing-small);
        gap: 0.25rem;
        min-width: 100px;
    }

    .label {
        font-size: var(--font-tiny);
        font-weight: 600;
        color: var(--front);
        margin: 0;
    }

    .state {
        font-size: var(--font-tiny);
        color: var(--front-less);
        margin: 0;
    }

    .state.active {
        color: var(--spice);
    }

    .state.error {
        color: #f44336;
    }

    button {
        align-self: stretch;
        padding: 0 var(--spacing-small);
        background: var(--back);
        color: var(--front-less);
        border: none;
        cursor: pointer;
        font-size: var(--font-normal);
        font-weight: 600;
        transition: all 0.2s ease;
        min-width: 70px;
    }

    button:hover {
        background: var(--spice);
        color: var(--back);
    }

    button:active {
        transform: scale(0.98);
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    button.active {
        background: var(--spice-more);
        color: var(--back);
    }

    button.active:hover {
        background: #c95e25;
    }
`;class R extends g{constructor(e){super(),this.stream=null,this.audioContext=null,this.sourceNode=null,this.isActive=!1,this.isChanging=!1,this.onStart=null,this.onEnd=null,this.audioContext=e||null,this.element=document.createElement("div"),this.shadowRoot=this.element.attachShadow({mode:"open"}),this.shadowRoot.append(a`
            <style>${ue}</style>
            <div class="status-indicator">🎤</div>
            <div class="info">
                <p class="label">Microphone</p>
                <p class="state">Prêt</p>
            </div>
            <button type="button">Démarrer</button>
        `),this.indicatorElement=this.shadowRoot.querySelector(".status-indicator"),this.stateElement=this.shadowRoot.querySelector(".state"),this.button=this.shadowRoot.querySelector("button"),this.button.addEventListener("click",()=>this.toggle())}async toggle(){this.isChanging||(this.isActive?await this.stop():await this.start())}async start(){if(!(this.isActive||this.isChanging))try{this.isChanging=!0,this.button.disabled=!0,this.stateElement.textContent="Accès...",this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),this.audioContext||(this.audioContext=new AudioContext),this.sourceNode=this.audioContext.createMediaStreamSource(this.stream),this.isActive=!0,this.indicatorElement.classList.add("active"),this.stateElement.classList.add("active"),this.stateElement.classList.remove("error"),this.stateElement.textContent="Actif",this.button.classList.add("active"),this.button.textContent="Arrêter",this.button.disabled=!1,this.onStart&&this.sourceNode&&this.onStart(this.sourceNode)}catch(e){throw console.error("Erreur lors du démarrage du microphone:",e),this.stateElement.classList.add("error"),this.stateElement.textContent="Erreur",this.button.disabled=!1,e}finally{this.isChanging=!1}}async stop(){if(!(!this.isActive||this.isChanging))try{this.isChanging=!0,this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),this.stream=null),this.sourceNode&&(this.sourceNode.disconnect(),this.sourceNode=null),this.isActive=!1,this.indicatorElement.classList.remove("active"),this.stateElement.classList.remove("active"),this.stateElement.textContent="Arrêté",this.button.classList.remove("active"),this.button.textContent="Démarrer",this.button.disabled=!1,this.onEnd&&this.onEnd()}catch(e){throw console.error("Erreur lors de l'arrêt du microphone:",e),e}finally{this.isChanging=!1}}}const pe=`
    :host {
        display: flex;
        gap: var(--gap, 0.5rem);
        align-items: center;
        padding: var(--padding, 0.5rem);
        background: var(--background, var(--back-more));
        border-radius: var(--radius, var(--radius-normal));
    }
    
    ::slotted(button) {
        padding: 0.5rem 1rem;
        background: var(--back);
        color: var(--front);
        border: 1px solid var(--front-less);
        border-radius: var(--radius-small);
        cursor: pointer;
        font-size: var(--font-normal);
        transition: var(--transition);
    }
    
    ::slotted(button:hover) {
        background: var(--spice);
        color: var(--back);
        border-color: var(--spice);
    }
    
    ::slotted(button:active) {
        transform: translateY(1px);
    }
    
    ::slotted(button:disabled) {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    ::slotted(.separator) {
        width: 1px;
        height: 1.5rem;
        background: var(--front-less);
        margin: 0 0.25rem;
    }
`;class w extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${pe}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set padding(e){this.element.style.setProperty("--padding",e)}set background(e){this.element.style.setProperty("--background",e)}set radius(e){this.element.style.setProperty("--radius",e)}static createSeparator(){const e=document.createElement("div");return e.className="separator",e}static createButton(e,t,o){const i=document.createElement("button");return i.textContent=e,i.onclick=t,o?.disabled&&(i.disabled=!0),o?.title&&(i.title=o.title),i}}class me extends g{constructor(e,t,o){super(),console.log(o);async function i(u){const m=new AudioContext,{default:f}=await T(async()=>{const{default:C}=await import("https://www.webaudiomodules.com/sdk/2.0.0-alpha.6/src/initializeWamHost.js");return{default:C}},[]),[b,n]=await f(m,"example"),r=await(await import(u)).default.createInstance(b,m),v=await r.createGui(),E=await(await T(async()=>{const{default:C}=await import("https://mainline.i3s.unice.fr/wam_wc/wam-host/assets/midiKeyboard/simpleMidiKeyboard/index.js");return{default:C}},[])).default.createInstance(b,m),h=await E.createGui(),A=new R(m);A.onStart=C=>{C.connect(r.audioNode)};const S=a.a`
                <${new w}>
                    ${w.createButton("Copy State",async()=>{const C=await r.audioNode.getState();await navigator.clipboard.writeText(JSON.stringify(C))})}

                    ${w.createButton("Paste State",async()=>{const C=await navigator.clipboard.readText();await r.audioNode.setState(JSON.parse(C))})}
                </div>
            `;return E.audioNode.connectEvents(r.audioNode.instanceId),r.audioNode.connect(m.destination),a`
                ${S}
                <${new le}>${v}</div>
                ${h}
                ${A}
            `}async function c(){const m=(await W()).find(b=>b.id===o);return m?a`
                <h2>${m.name}</h2>
                <${new I}>
                    <img
                        alt="${m.name}"
                        width=100%
                        src="${m.img}"
                        style="max-height: 600px; object-fit: contain;"
                    />
                </div>
                <p>${m.desc}</p>
                ${new _(m.url)}
                <hr/>
                ${new O(()=>new N(()=>i(m.url)).element)}
            `:a`<p>Module non trouvé</p>`}const p=a`
            <section>
                ${new N(c)}
            </section>
        `,d=new $("wam",p);this.element=d.element}getModuleType(e){return{123:"Synthétiseur modulaire",456:"Effet de réverbération",789:"Analyseur de spectre"}[e]||"Module personnalisé"}}class B extends g{constructor(e,t){super(),this.element=document.createElement("span"),this.link=document.createElement("a"),this.link.href=t,this.arrowText=document.createTextNode("← "),this.textNode=document.createTextNode(e),this.link.append(this.arrowText,this.textNode),this.element.appendChild(this.link)}set reverse(e){e?(this.arrowText.textContent=" →",this.link.textContent="",this.link.append(this.textNode,this.arrowText)):(this.arrowText.textContent="← ",this.link.textContent="",this.link.append(this.arrowText,this.textNode))}set alignRight(e){e?(this.element.style.display="block",this.element.style.textAlign="right"):(this.element.style.display="",this.element.style.textAlign="")}}class he extends g{constructor(e,t){super();const o=a.a`
            <section id="about">
                <h2>À propos</h2>
                
                <div style="padding: var(--spacing-large); background: var(--back-more); border-radius: var(--radius-normal); margin: var(--spacing-normal) 0;">
                    <h3 style="color: var(--spice);">Le site de Sam</h3>
                    <p>Site de démonstration construit avec TypeScript, Vite, et Web Components.</p>
                </div>

                <h3>Technologies utilisées</h3>
                <ul>
                    <li><strong>TypeScript</strong> - Typage statique pour JavaScript</li>
                    <li><strong>Vite</strong> - Build tool rapide et moderne</li>
                    <li><strong>Web Components</strong> - Shadow DOM pour l'encapsulation</li>
                    <li><strong>sam-lib</strong> - Bibliothèque de templating HTML</li>
                </ul>

                <h3>Composants disponibles</h3>
                <ul>
                    <li>Router - Système de routing avec patterns</li>
                    <li>AsyncContent - Chargement asynchrone avec spinner</li>
                    <li>Toast - Notifications temporaires</li>
                    <li>Modal - Dialogues overlay</li>
                    <li>Tabs - Système d'onglets</li>
                    <li>Et beaucoup d'autres...</li>
                </ul>

                ${new B("Retour à l'accueil",`${y}/home`).element}
            </section>
        `,i=new $("about",o);this.element=i.element}}class fe extends g{constructor(e,t){super();const o=(h,A="#")=>{const S=document.createElement("a");return S.href=A,S.textContent=h,S},i=new V;i.gap="1rem",i.justify="space-between",i.element.append(o("Premier lien",`${y}/home`),o("Deuxième lien",`${y}/wam`),o("Troisième lien",`${y}/about`));const c=new F;c.gap="0.5rem",c.element.append(o("Lien du haut",`${y}/home`),o("Lien du milieu",`${y}/wam`),o("Lien du bas",`${y}/about`));const p=new j;p.gap="0.5rem";for(let h=1;h<=15;h++)p.element.appendChild(o(`Lien ${h}`,"#"));const d=new Y;d.gap="1rem",d.columns="repeat(3, 1fr)";for(let h=1;h<=6;h++)d.element.appendChild(o(`Lien grille ${h}`,"#"));const u=new I;u.minHeight="200px",u.padding="2rem",u.element.appendChild(o("Lien centré","#/home"));const m=new Q,f=document.createElement("div");f.textContent="Couche de base";const b=o("Lien superposé","#");m.element.append(f,b);const n=new w;n.element.append(w.createButton("Nouveau",()=>alert("Nouveau")),w.createButton("Ouvrir",()=>alert("Ouvrir")),w.createButton("Enregistrer",()=>alert("Enregistrer")),w.createSeparator(),w.createButton("Couper",()=>alert("Couper")),w.createButton("Copier",()=>alert("Copier")),w.createButton("Coller",()=>alert("Coller")),w.createSeparator(),w.createButton("Annuler",()=>alert("Annuler"),{disabled:!0}));const l=new _("npm install @webaudiomodules/api"),r=new O(()=>{const h=document.createElement("div");return h.style.padding="2rem",h.style.background="var(--back-more)",h.style.borderRadius="var(--radius-normal)",h.innerHTML=`
                    <h4 style="color: var(--spice); margin-bottom: 1rem;">Contenu Initialisé</h4>
                    <p style="color: var(--front-less); margin-bottom: 1rem;">
                        Ce contenu a été créé en cliquant sur le bouton d'initialisation.
                        Le composant InitiableContent s'est complètement remplacé par ce contenu.
                    </p>
                    <p style="color: var(--front-less);">
                        Vous pouvez retourner du HTML, un Node, ou même une Promise.
                    </p>
                `,h},{icon:"▸",text:"Démarrer le module",description:"Cliquez pour initialiser et charger le contenu"}),v=new R,x=a.a`
            <section id="layouts">
                <h2>Composants de Layout</h2>
                <p>Découvrez les différents composants de layout disponibles pour structurer vos interfaces.</p>

                <article>
                    <h3>HBox - Conteneur Horizontal</h3>
                    <p>Aligne les éléments horizontalement avec flexbox.</p>
                    <div>
                        ${i.element}
                    </div>
                    <p><code>const hbox = new HBox(); hbox.gap = '1rem'; hbox.justify = 'space-between';</code></p>
                </article>

                <article>
                    <h3>VBox - Conteneur Vertical</h3>
                    <p>Aligne les éléments verticalement avec flexbox.</p>
                    <div>
                        ${c.element}
                    </div>
                    <p><code>const vbox = new VBox(); vbox.gap = '0.5rem';</code></p>
                </article>

                <article>
                    <h3>FlowBox - Layout Fluide</h3>
                    <p>Wrap automatique des éléments sur plusieurs lignes.</p>
                    <div>
                        ${p.element}
                    </div>
                    <p><code>const flowbox = new FlowBox(); flowbox.gap = '0.5rem';</code></p>
                </article>

                <article>
                    <h3>GridBox - Grille CSS</h3>
                    <p>Organisation en grille configurable.</p>
                    <div>
                        ${d.element}
                    </div>
                    <p><code>const gridbox = new GridBox(); gridbox.gap = '1rem'; gridbox.columns = 'repeat(3, 1fr)';</code></p>
                </article>

                <article>
                    <h3>CenterBox - Centrage</h3>
                    <p>Centre le contenu horizontalement et verticalement.</p>
                    <div>
                        ${u.element}
                    </div>
                    <p><code>const centerbox = new CenterBox(); centerbox.minHeight = '200px'; centerbox.padding = '2rem';</code></p>
                </article>

                <article>
                    <h3>StackBox - Empilement</h3>
                    <p>Superpose les éléments les uns sur les autres (utile pour les overlays).</p>
                    <div>
                        ${m.element}
                    </div>
                    <p><code>new StackBox()</code></p>
                </article>

                <article>
                    <h3>NavLink - Lien de Navigation</h3>
                    <p>Lien avec flèche pour la navigation.</p>
                    <div>
                        ${new B("Retour à l'accueil","#/home").element}
                    </div>
                    <div>
                        ${(function(){const h=new B("Page suivante","#/wam");return h.reverse=!0,h.alignRight=!0,h.element})()}
                    </div>
                    <p><code>const link = new NavLink(text, href); link.reverse = true; link.alignRight = true;</code></p>
                </article>

                <article>
                    <h3>Toolbar - Barre d'outils</h3>
                    <p>Barre de boutons de commande avec séparateurs.</p>
                    <div>
                        ${n.element}
                    </div>
                    <p><code>const toolbar = new Toolbar(); toolbar.element.append(Toolbar.createButton(...), Toolbar.createSeparator(), ...);</code></p>
                </article>

                <article>
                    <h3>CopyableText - Texte Copiable</h3>
                    <p>Affiche du texte facilement sélectionnable avec un bouton de copie dans le presse-papier.</p>
                    <div>
                        ${l.element}
                    </div>
                    <p><code>const copyableText = new CopyableText('npm install @webaudiomodules/api');</code></p>
                </article>

                <article>
                    <h3>InitiableContent - Contenu Initialisable</h3>
                    <p>Gros bloc-bouton qui se remplace par un élément quand on clique dessus.</p>
                    <div>
                        ${r.element}
                    </div>
                    <p><code>new InitiableContent(() => element, { icon, text, description });</code></p>
                </article>

                <article>
                    <h3>Microphone - Contrôle Audio</h3>
                    <p>Contrôle d'accès au microphone avec MediaStream. Démarre/arrête la capture audio et fournit un MediaStreamAudioSourceNode pour le Web Audio API via les callbacks.</p>
                    <div>
                        ${v.element}
                    </div>
                    <p><code>const mic = new Microphone(); mic.onStart = (source) => source.connect(node);</code></p>
                </article>

                ${new B("Retour à l'accueil","#/home").element}
            </section>
        `,E=new $("layouts",x);this.element=E.element}}class ge extends g{constructor(e,t){super();const o=a.a`
            <section id="not-found">
                <h2>404 - Page non trouvée</h2>
                <p>La page que vous recherchez n'existe pas.</p>
                
                <h3>Pages disponibles</h3>
                <ul>
                    <li><a href="${y}/home">Accueil</a></li>
                    <li><a href="${y}/wam">Web Audio Modules</a></li>
                    <li><a href="${y}/layouts">Composants de Layout</a></li>
                    <li><a href="${y}/about">À propos</a></li>
                </ul>
                
                ${new B("Retour à l'accueil",`${y}/home`).element}
            </section>
        `,i=new $("not-found",o);this.element=i.element}}const ve=new q(y,[{name:"home",pattern:["home"],factory:(s,e,t)=>new D(s,t)},{name:"wam",pattern:["wam"],factory:(s,e,t)=>new se(s,t)},{name:"wam-detail",pattern:["wam",/(.+)/],factory:(s,e,t)=>new me(s,t,e[0])},{name:"about",pattern:["about"],factory:(s,e,t)=>new he(s,t)},{name:"layouts",pattern:["layouts"],factory:(s,e,t)=>new fe(s,t)}],{name:"not-found",pattern:[],factory:(s,e,t)=>new ge(s,t)});document.body.innerHTML="";document.body.appendChild(ve.element);
