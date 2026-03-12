(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const l of t)if(l.type==="childList")for(const m of l.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function o(t){const l={};return t.integrity&&(l.integrity=t.integrity),t.referrerPolicy&&(l.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?l.credentials="include":t.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(t){if(t.ep)return;t.ep=!0;const l=o(t);fetch(t.href,l)}})();function j(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function a(s,...e){let o=0,i="",t={};function l(n,r){n in t||(t[n]=[]),t[n].push(r)}function m(n){if(n!=null)if(n instanceof Node){var r=`_sam_frament_target_${o++}`;i+=`<span ${r}=""></span>`,l(r,c=>c.replaceWith(n))}else if(typeof n=="object"&&"element"in n)m(n.element);else if(typeof n=="string")i+=j(n);else if(typeof n[Symbol.iterator]=="function")for(const c of n)m(c);else typeof n=="function"?m(n()):i+=j(""+n)}function u(n,r){if(n!=null)if(n instanceof Element)r.push(c=>{for(let p=0;p<c.attributes.length;p++){const x=c.attributes.item(p);n.attributes.setNamedItem(x.cloneNode())}for(;c.firstChild;)n.appendChild(c.firstChild);c.before(n)});else if(typeof n=="object"&&"element"in n&&n.element instanceof Element){const c=n,p=c.element;r.push(x=>{for(let E=0;E<x.attributes.length;E++){const h=x.attributes.item(E);(!c.setTemplateAttr||!c.setTemplateAttr(h.name,h.value))&&p.attributes.setNamedItem(h.cloneNode())}for(;x.firstChild;)p.appendChild(x.firstChild);x.before(p)})}else if(typeof n=="string")i+=j(n);else if(typeof n[Symbol.iterator]=="function")for(const c of n)u(c,r);else if(typeof n=="function")u(n(),r);else throw new Error("Invalid type to be placed as an element: "+typeof n)}function f(n,r){if(n!=null)if(typeof n[Symbol.iterator]=="function")for(const c of n)f(c,r);else if(typeof n=="function")r.push(n);else if(typeof n=="object")r.push(c=>{for(const[p,x]of Object.entries(n))if(typeof x=="function")p=="init"?r.push(x):c.addEventListener(p,x);else throw new Error("Invalid event listener for @ placeholder: "+p)});else throw new Error("Invalid type to be placed as an element: "+typeof n)}function y(n){return n.replace("</>","</div>")}const d={};try{for(let n=0;n<e.length;n++)if(s[n].endsWith("<")){const r=`_sam_frament_to_remove_${o++}`;i+=s[n]+`div ${r} `;const c=[];d[r]=c,u(e[n],c)}else if(s[n].endsWith("@")){i+=s[n];const r=`_sam_frament_callback_${o++}`;i+=` ${r}="" `;const c=t[r]??[];t[r]=c,f(e[n],c)}else i+=y(s[n]),m(e[n]);i+=y(s[s.length-1])}catch(n){const r=i.length<20?i:i.slice(-20,-1);throw new Error(`[${r}...] : ${n!=null&&typeof n=="object"&&"message"in n?n.message:n}`)}const b=document.createRange().createContextualFragment(i);for(const[n,r]of Object.entries(d)){const c=b.querySelector(`[${n}]`);c.removeAttribute(n);for(const p of r)p(c);c.remove()}for(const[n,r]of Object.entries(t)){let c=b.querySelector(`[${n}]`);for(const p of r)c.parentNode||(c=b.getElementById(n)),p(c);c.removeAttribute(n)}return b}a.opt=function(s,...e){if(!(e.includes(null)||e.includes(void 0)))return a(s,...e)};a.not_empty=function(s,...e){if(!e.every(o=>o==null||o?.length===0))return a(s,...e)};a.a=function(s,...e){return a(s,...e).firstElementChild};class g{setTemplateAttr(e,o){const i=Object.getPrototypeOf(this),t=Object.getOwnPropertyDescriptor(i,e);return t?.set?(t.set.call(this,o),!0):!1}}function A(s,e,o){const i=document.createElement(s);return i.attachShadow({mode:"closed"}).append(e),i.append(o),i}class U extends g{constructor(e,o,i){super(),this.root=e,this.pages=o,this.defaultPage=i,this.currentComponent=null,this.container=null,this.element=a``,window.addEventListener("hashchange",()=>this.navigate()),this.navigate()}buildRegex(e){const i="^/"+e.map(t=>typeof t=="string"?t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"):t.source).join("\\/")+"$";return new RegExp(i)}matchRoute(e){e.startsWith(this.root)&&(e=e.slice(this.root.length));for(const o of this.pages){const i=this.buildRegex(o.pattern),t=e.match(i);if(t)return{page:o,pageId:e,matches:t}}return null}navigate(){const e=window.location.pathname;let o=this.matchRoute(e);!o&&this.defaultPage&&(o={page:this.defaultPage,pageId:e,matches:[]}),o&&(!this.container&&this.currentComponent&&(this.container=this.getContainer()),this.currentComponent&&this.container&&(this.container.innerHTML=""),this.currentComponent=o.page.factory(o.pageId,o.matches.slice(1),this.pages),this.container?this.container.appendChild(this.currentComponent.element):this.element.appendChild(this.currentComponent.element))}getContainer(){if(this.currentComponent){let e=this.currentComponent.element.parentNode;for(;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.parentNode;return e}return null}navigateTo(e){window.location.hash="#"+e}getCurrentPage(){const e=window.location.hash;return this.matchRoute(e)?.page||null}}const v="/SamSite",V={home:"Accueil",wam:"Web Audio Modules",layouts:"Layouts",about:"À propos"};class k extends g{constructor(e,o){super(),this.name=e,this.main=o,this.element=a`
            <header>
                <div class="header-container">
                    <h1>Le site de Sam</h1>
                    <nav class="menu">
                        ${function*(){for(const[i,t]of Object.entries(V)){const l=i===e;yield a.a`<a href="${v}/${i}" class="menu-item ${l?"selected":""}">${t}</a>`}}}
                    </nav>
                </div>
            </header>
            <main>
                ${o}
            </main>
            <footer>
                <p>&copy; 2026 Le site de Sam. Tous droits réservés.</p>
            </footer>
        `,console.log(this.element)}}class F extends g{constructor(e,o){super();const i=a.a`
            <section id="home">
                <h2>Bienvenue sur mon site</h2>
                <p>Ceci est un site de démonstration utilisant TypeScript avec Vite et un système de routing.</p>
                
                <h3>Navigation</h3>
                <ul>
                    <li><a href="${v}/home">Accueil</a></li>
                    <li><a href="${v}/wam">Web Audio Modules</a></li>
                    <li><a href="${v}/wam/123">WAM Detail (exemple avec ID 123)</a></li>
                    <li><a href="${v}/layouts">Composants de Layout</a></li>
                    <li><a href="${v}/about">À propos</a></li>
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
        `,t=new k("home",i);this.element=t.element}}const G=`
    :host {
        display: flex;
        flex-direction: row;
        gap: var(--gap, 1rem);
        align-items: var(--align, stretch);
        justify-content: var(--justify, flex-start);
        flex-wrap: var(--wrap, nowrap);
    }
`;class J extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${G}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set align(e){this.element.style.setProperty("--align",e)}set justify(e){this.element.style.setProperty("--justify",e)}set wrap(e){this.element.style.setProperty("--wrap",e)}}const Y=`
    :host {
        display: flex;
        flex-direction: column;
        gap: var(--gap, 1rem);
        align-items: var(--align, stretch);
        justify-content: var(--justify, flex-start);
    }
`;class K extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${Y}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set align(e){this.element.style.setProperty("--align",e)}set justify(e){this.element.style.setProperty("--justify",e)}}const X=`
    :host {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--gap, 1rem);
        align-items: var(--align, stretch);
        justify-content: var(--justify, flex-start);
        align-content: var(--align-content, flex-start);
    }
`;class I extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${X}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set align(e){this.element.style.setProperty("--align",e)}set justify(e){this.element.style.setProperty("--justify",e)}set alignContent(e){this.element.style.setProperty("--align-content",e)}}const Z=`
    :host {
        display: grid;
        gap: var(--gap, 1rem);
        grid-template-columns: var(--columns, repeat(auto-fit, minmax(250px, 1fr)));
        grid-template-rows: var(--rows, auto);
        align-items: var(--align, stretch);
        justify-items: var(--justify, stretch);
    }
`;class Q extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${Z}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set columns(e){this.element.style.setProperty("--columns",e)}set rows(e){this.element.style.setProperty("--rows",e)}set align(e){this.element.style.setProperty("--align",e)}set justify(e){this.element.style.setProperty("--justify",e)}}const ee=`
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: var(--min-height, auto);
        padding: var(--padding, 0);
    }
`;class O extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${ee}</style>
            <slot></slot>
        `)}set minHeight(e){this.element.style.setProperty("--min-height",e)}set padding(e){this.element.style.setProperty("--padding",e)}}const te=`
    :host {
        display: grid;
        grid-template-areas: "stack";
    }
    
    ::slotted(*) {
        grid-area: stack;
    }
`;class ne extends g{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(a`
            <style>${te}</style>
            <slot></slot>
        `)}}class oe extends g{constructor(e="medium"){super(),this.size=e,this.element=A("div",a`
            <style>${ie}</style>
            <div class="-spinner"></div>
        `,a``),this.element.classList.add(`-${e}`)}}const ie=`
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
`;class B extends g{constructor(e,o=!1){super(),this.simplified=o,this.element=document.createElement("div"),this.shadowRoot=this.element.attachShadow({mode:"open"}),this.spinner=new oe("medium"),this.shadowRoot.appendChild(a.a`<style>${se}</style>`);const i=document.createElement("div");i.className="-container";const t=document.createElement("div");if(t.className="-loading",t.appendChild(this.spinner.element),!o){const l=document.createElement("p");l.className="-loading-text",l.textContent="Chargement...",t.appendChild(l)}t.classList.toggle("-simplified",o),i.appendChild(t),this.shadowRoot.appendChild(i),this.load(e,t,i)}async load(e,o,i){try{const t=await e();o.style.animation="fadeOut 0.3s ease",setTimeout(()=>{let l;typeof t=="string"?(l=document.createElement("div"),l.innerHTML=t):l=t;const m=this.element.parentNode;m&&m.replaceChild(l,this.element),this.element=l},300)}catch(t){o.innerHTML=`
                <div class="-error">
                    <p class="-error-icon">⚠</p>
                    <p class="-error-text">Erreur de chargement</p>
                    <p class="-error-details">${t instanceof Error?t.message:"Erreur inconnue"}</p>
                </div>
            `,console.error("Error loading AsyncContent:",t)}}}const se=`
    :host {
        display: block !important;
    }

    .-container {
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
    .-loading.-simplified{
        padding: 0;
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
`;class M{constructor(e){this.url=e,this.descriptor=void 0}async get(){if(!this.descriptor){const e=this.url.split("/").slice(0,-1).join("/")+"/",o=e+"descriptor.json";let t=await(await fetch(o)).json();this.descriptor=t,t.thumbnail=e+t.thumbnail,t.descriptorURL=o,t.moduleURL=this.url,t.identifier??=t.vendor+"."+t.name}return this.descriptor}}let S;async function z(){if(!S){S=[];{const e=await(await fetch("https://www.webaudiomodules.com/community/plugins.json")).json();for(const o of e)S.push(new M(`https://www.webaudiomodules.com/community/plugins/${o.path}`))}for(const s of re)S.push(new M(s))}return S}const re=["https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/fluteForIS2/index.js","https://mainline.i3s.unice.fr/WAMChorusMB/","https://mainline.i3s.unice.fr/WamSampler/src/index.js","https://mainline.i3s.unice.fr/wam2/packages/faustPingPongDelay/plugin/index.js","https://mainline.i3s.unice.fr/wam2/packages/obxd/index.js","https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/clarinetMIDI/indexGUIStandard.js","https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/JUNO6v2/indexGUIStandard.js","https://wam-4tt.pages.dev/Pro54/index.js","https://mainline.i3s.unice.fr/WAMViktorNV1/viktorNV1/index.js","https://jempasam.github.io/cardboardwam/dist/index.mjs","https://wam-bank.i3s.univ-cotedazur.fr/pedalboard2/index.js","https://wam-4tt.pages.dev/TX81Z/index.js","https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/JUNO6v2/index.js"];class ae extends g{constructor(){super(...arguments),this.element=A("div",a`
            <style>${le}</style>
            <slot></slot>
        `,a`
        `)}}const le=`
    *, ::slotted(*) {
        margin: 0 !important;
    }
    
    :host {

        width: 21rem;
        height: 25rem;

        padding: var(--spacing-small) !important;
        border-radius: var(--radius-normal);

        background: var(--back);
        box-shadow: var(--shadow);
        transition: var(--transition);

        display: flex;
        flex-direction: column;
    }

    :host(:hover) {
        box-shadow: var(--shadow-large);
        transform: translateY(-4px);
    }

    ::slotted(h4){
        margin-bottom: var(--spacing-tiny) !important;
        font-size: var(--font-large) !important;
    }

    ::slotted(img){
        width: 100% !important;
        height: 50% !important;
        object-fit: contain !important;
        box-shadow: none !important;
    }

    ::slotted(p){
        text-align: justify !important;
        font-size: var(--font-tiny) !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        padding-top: var(--spacing-tiny) !important;
        max-height: 6rem !important;
    }

    ::slotted(span){
        font-style: italic !important;
        font-size: var(--font-tiny) !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        padding-top: var(--spacing-tiny) !important;

        color: var(--front);

        text-align: right !important;
    }

    ::slotted(ul){
        display: flex;
        justify-content: space-around;
        list-style: none !important;
        width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;

        font-size: var(--font-tiny) !important;

        font-style: italic !important;
        font-weight: bold !important;
    }

    ::slotted(a:last-child){
        margin-top: auto !important;
        width: fit-content !important;
    }
`;class ce extends g{constructor(e,o){super();let i="",t=a.a`<section></section>`,l=Promise.resolve();function m(){l=l.then(async()=>{const d=await z();t.replaceChildren(a.a`
                    <${new I}>
                        ${function*(){for(const b of d)yield new B(async()=>{let r=await b.get();return(r.name+" "+r.description+" "+r.identifier+" "+r.vendor+" "+r.keywords.join(" ")).toLowerCase().includes(i)?a.a`
                                        <${new ae}>
                                            <h4>${r.name}</h4>
                                            <img src="${r.thumbnail}" alt="${r.name}"> </img>
                                            <ul>
                                                ${r.keywords.map(p=>a.a`<li>${p}</li>`)}
                                            </ul>
                                            <p>${r.description}</p>
                                            <span>By ${r.vendor}</span>
                                            <a href="${v}/wam/${r.identifier}">En savoir plus →</a>
                                        </div>
                                    `:a``})}}
                    </div>
                `)})}m();const u=a.a`<input type="search" placeholder="Search..."/>`;u.oninput=d=>{i=u.value.toLowerCase(),m()};const f=a`
            <section>
                <h2>Web Audio Modules</h2>
                <p>Découvrez les derniers plugins audio pour le web, créés par la communauté Web Audio Modules. Explorez une variété de modules, des synthétiseurs aux effets, tous conçus pour fonctionner directement dans votre navigateur.</p>
                ${u}
            </section>
            ${t}
        `,y=new k("wam",f);this.element=y.element}}const de="modulepreload",pe=function(s){return"/SamSite/"+s},_={},N=function(e,o,i){let t=Promise.resolve();if(o&&o.length>0){let y=function(d){return Promise.all(d.map(b=>Promise.resolve(b).then(n=>({status:"fulfilled",value:n}),n=>({status:"rejected",reason:n}))))};var m=y;document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),f=u?.nonce||u?.getAttribute("nonce");t=y(o.map(d=>{if(d=pe(d),d in _)return;_[d]=!0;const b=d.endsWith(".css"),n=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${n}`))return;const r=document.createElement("link");if(r.rel=b?"stylesheet":de,b||(r.as="script"),r.crossOrigin="",r.href=d,f&&r.setAttribute("nonce",f),document.head.appendChild(r),b)return new Promise((c,p)=>{r.addEventListener("load",c),r.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${d}`)))})}))}function l(u){const f=new Event("vite:preloadError",{cancelable:!0});if(f.payload=u,window.dispatchEvent(f),!f.defaultPrevented)throw u}return t.then(u=>{for(const f of u||[])f.status==="rejected"&&l(f.reason);return e().catch(l)})};class ue extends g{constructor(){super(),this.element=A("div",a`
            <style>${me}</style>
            <div class="-container">
                <slot></slot>
            </div>
        `,a``)}}const me=`
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
`;class W extends g{constructor(e=""){super(),this._text="",this.textElement=null,this.copyButton=null,this._text=e,this.element=document.createElement("div");const o=this.element.attachShadow({mode:"open"});o.append(a`
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
        `),this.textElement=o.querySelector(".text-container"),this.copyButton=o.querySelector("button"),this.copyButton&&this.copyButton.addEventListener("click",()=>this.copyToClipboard())}set text(e){this._text=e,this.textElement&&(this.textElement.textContent=e)}get text(){return this._text}async copyToClipboard(){if(this.copyButton)try{await navigator.clipboard.writeText(this._text);const e=this.copyButton.textContent;this.copyButton.textContent="✓ Copié!",this.copyButton.classList.add("copied"),setTimeout(()=>{this.copyButton&&(this.copyButton.textContent=e,this.copyButton.classList.remove("copied"))},2e3)}catch(e){console.error("Erreur lors de la copie:",e),this.copyButton.textContent="✗ Erreur",setTimeout(()=>{this.copyButton&&(this.copyButton.textContent="⎘ Copier")},2e3)}}}const he=`
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
`;class q extends g{constructor(e,o={}){super();const{icon:i="▶",text:t="Initialiser",description:l="Cliquez pour charger le contenu"}=o;this.element=document.createElement("div"),this.shadowRoot=this.element.attachShadow({mode:"open"}),this.shadowRoot.appendChild(a.a`<style>${he}</style>`);const m=document.createElement("div");m.className="-container";const u=document.createElement("button");u.className="-init-button",u.type="button";const f=document.createElement("p");f.className="-init-icon",f.textContent=i;const y=document.createElement("p");y.className="-init-text",y.textContent=t;const d=document.createElement("p");d.className="-init-description",d.textContent=l,u.appendChild(f),u.appendChild(y),u.appendChild(d),m.appendChild(u),this.shadowRoot.appendChild(m),u.addEventListener("click",()=>this.initialize(e,m))}initialize(e,o){try{o.style.animation="fadeOut 0.3s ease",setTimeout(()=>{try{const i=e(),t=this.element.parentNode;if(t){if(typeof i=="string"){const l=document.createElement("div");for(l.innerHTML=i;l.firstChild;)t.insertBefore(l.firstChild,this.element)}else t.insertBefore(i,this.element);t.removeChild(this.element)}}catch(i){o.innerHTML=`
                        <div class="-init-button" style="cursor: default; border-color: #f44336;">
                            <p class="-init-icon" style="color: #f44336;">⚠</p>
                            <p class="-init-text">Erreur d'initialisation</p>
                            <p class="-init-description">${i instanceof Error?i.message:"Erreur inconnue"}</p>
                        </div>
                    `}},300)}catch(i){o.innerHTML=`
                <div class="-init-button" style="cursor: default; border-color: #f44336;">
                    <p class="-init-icon" style="color: #f44336;">⚠</p>
                    <p class="-init-text">Erreur d'initialisation</p>
                    <p class="-init-description">${i instanceof Error?i.message:"Erreur inconnue"}</p>
                </div>
            `}}}const fe=`
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
`;class H extends g{constructor(e){super(),this.stream=null,this.audioContext=null,this.sourceNode=null,this.isActive=!1,this.isChanging=!1,this.onStart=null,this.onEnd=null,this.audioContext=e||null,this.element=document.createElement("div"),this.shadowRoot=this.element.attachShadow({mode:"open"}),this.shadowRoot.append(a`
            <style>${fe}</style>
            <div class="status-indicator">🎤</div>
            <div class="info">
                <p class="label">Microphone</p>
                <p class="state">Prêt</p>
            </div>
            <button type="button">Démarrer</button>
        `),this.indicatorElement=this.shadowRoot.querySelector(".status-indicator"),this.stateElement=this.shadowRoot.querySelector(".state"),this.button=this.shadowRoot.querySelector("button"),this.button.addEventListener("click",()=>this.toggle())}async toggle(){this.isChanging||(this.isActive?await this.stop():await this.start())}async start(){if(!(this.isActive||this.isChanging))try{this.isChanging=!0,this.button.disabled=!0,this.stateElement.textContent="Accès...",this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),this.audioContext||(this.audioContext=new AudioContext),this.sourceNode=this.audioContext.createMediaStreamSource(this.stream),this.isActive=!0,this.indicatorElement.classList.add("active"),this.stateElement.classList.add("active"),this.stateElement.classList.remove("error"),this.stateElement.textContent="Actif",this.button.classList.add("active"),this.button.textContent="Arrêter",this.button.disabled=!1,this.onStart&&this.sourceNode&&this.onStart(this.sourceNode)}catch(e){throw console.error("Erreur lors du démarrage du microphone:",e),this.stateElement.classList.add("error"),this.stateElement.textContent="Erreur",this.button.disabled=!1,e}finally{this.isChanging=!1}}async stop(){if(!(!this.isActive||this.isChanging))try{this.isChanging=!0,this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),this.stream=null),this.sourceNode&&(this.sourceNode.disconnect(),this.sourceNode=null),this.isActive=!1,this.indicatorElement.classList.remove("active"),this.stateElement.classList.remove("active"),this.stateElement.textContent="Arrêté",this.button.classList.remove("active"),this.button.textContent="Démarrer",this.button.disabled=!1,this.onEnd&&this.onEnd()}catch(e){throw console.error("Erreur lors de l'arrêt du microphone:",e),e}finally{this.isChanging=!1}}}const ge=`
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
            <style>${ge}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set padding(e){this.element.style.setProperty("--padding",e)}set background(e){this.element.style.setProperty("--background",e)}set radius(e){this.element.style.setProperty("--radius",e)}static createSeparator(){const e=document.createElement("div");return e.className="separator",e}static createButton(e,o,i){const t=document.createElement("button");return t.textContent=e,t.onclick=o,i?.disabled&&(t.disabled=!0),i?.title&&(t.title=i.title),t}}class ve{constructor(e){this.promise=e,this.loaded=void 0}async get(){return this.loaded||(this.loaded=(await this.promise()).default),this.loaded}}const R=Object.assign({"./presets/jempasam.cardboardwam.json":()=>N(()=>import("./jempasam.cardboardwam-B8FLJr4z.js"),[])});let T;function ye(){if(!T){T={};for(const s in R){const e=s.split("/").slice(-1)[0].split(".").slice(0,-1).join(".");T[e]=new ve(R[s])}}return T}class be extends g{constructor(e){super(),this.copyFn=e,this.element=document.createElement("div");const o=this.element.attachShadow({mode:"open"});o.innerHTML=`
            <style>
                :host {
                    display: inline-block;
                }

                button {
                    background: var(--back);
                    color: var(--front-less);
                    border: 1px solid var(--back-less);
                    border-radius: var(--radius-small);
                    padding: var(--spacing-tiny);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: var(--font-normal);
                    font-family: inherit;
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
            <button type="button">⎘ Copier</button>
        `;const i=o.querySelector("button");i&&i.addEventListener("click",()=>this.copyToClipboard())}async copyToClipboard(){const e=this.element.shadowRoot?.querySelector("button");if(e)try{await navigator.clipboard.writeText(this.copyFn());const o=e.textContent;e.textContent="✓ Copié!",e.classList.add("copied"),setTimeout(()=>{e.textContent=o,e.classList.remove("copied")},2e3)}catch(o){console.error("Erreur lors de la copie:",o),e.textContent="✗ Erreur",setTimeout(()=>{e.textContent="⎘ Copier"},2e3)}}}class xe extends g{constructor(e,o,i){super();async function t(y){const d=await(await ye()[i])?.get();if(!d)return a``;const n=Object.entries(d).map(([p,x])=>{const E=a.a`<option value="${p}">${p}</option>`;return E.onclick=()=>{y(x)},E}),r=a.a`
                <select>
                    <option disabled selected>---PRESETS---</option>
                </select>
            `;r.append(...n);const c=new be(()=>JSON.stringify(d));return a`
                ${r}
                ${c}
            `}async function l(y){const d=new AudioContext,{default:b}=await N(async()=>{const{default:C}=await import("https://www.webaudiomodules.com/sdk/2.0.0-alpha.6/src/initializeWamHost.js");return{default:C}},[]),[n,r]=await b(d,"example"),p=await(await import(y)).default.createInstance(n,d),x=await p.createGui(),h=await(await N(async()=>{const{default:C}=await import("https://mainline.i3s.unice.fr/wam_wc/wam-host/assets/midiKeyboard/simpleMidiKeyboard/index.js");return{default:C}},[])).default.createInstance(n,d),P=await h.createGui(),$=new H(d);$.onStart=C=>{C.connect(p.audioNode)};const D=a.a`
                <${new w}>
                    ${w.createButton("Copy State",async()=>{const C=await p.audioNode.getState();await navigator.clipboard.writeText(JSON.stringify(C))})}

                    ${w.createButton("Paste State",async()=>{const C=await navigator.clipboard.readText();await p.audioNode.setState(JSON.parse(C))})}

                    ${new B(()=>t(C=>p.audioNode.setState(C)),!0)}
                </div>
            `;return h.audioNode.connectEvents(p.audioNode.instanceId),p.audioNode.connect(d.destination),a`
                ${D}
                <${new ue}>${x}</div>
                ${P}
                ${$}
            `}async function m(){const d=(await Promise.all((await z()).map(n=>n.get()))).find(n=>n.identifier===i);return d?a`
                <h2>${d.name}</h2>
                <${new O}>
                    <img
                        alt="${d.name}"
                        width=100%
                        src="${d.thumbnail}"
                        style="max-height: 600px; object-fit: contain;"
                    />
                </div>
                <p>${d.description}</p>
                ${new W(d.moduleURL)}
                <hr/>
                ${new q(()=>new B(()=>l(d.moduleURL)).element)}
            `:a`<p>Module non trouvé</p>`}const u=a`
            <section>
                ${new B(m)}
            </section>
        `,f=new k("wam",u);this.element=f.element}getModuleType(e){return{123:"Synthétiseur modulaire",456:"Effet de réverbération",789:"Analyseur de spectre"}[e]||"Module personnalisé"}}class L extends g{constructor(e,o){super(),this.element=document.createElement("span"),this.link=document.createElement("a"),this.link.href=o,this.arrowText=document.createTextNode("← "),this.textNode=document.createTextNode(e),this.link.append(this.arrowText,this.textNode),this.element.appendChild(this.link)}set reverse(e){e?(this.arrowText.textContent=" →",this.link.textContent="",this.link.append(this.textNode,this.arrowText)):(this.arrowText.textContent="← ",this.link.textContent="",this.link.append(this.arrowText,this.textNode))}set alignRight(e){e?(this.element.style.display="block",this.element.style.textAlign="right"):(this.element.style.display="",this.element.style.textAlign="")}}class we extends g{constructor(e,o){super();const i=a.a`
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

                ${new L("Retour à l'accueil",`${v}/home`).element}
            </section>
        `,t=new k("about",i);this.element=t.element}}class Ce extends g{constructor(e,o){super();const i=(h,P="#")=>{const $=document.createElement("a");return $.href=P,$.textContent=h,$},t=new J;t.gap="1rem",t.justify="space-between",t.element.append(i("Premier lien",`${v}/home`),i("Deuxième lien",`${v}/wam`),i("Troisième lien",`${v}/about`));const l=new K;l.gap="0.5rem",l.element.append(i("Lien du haut",`${v}/home`),i("Lien du milieu",`${v}/wam`),i("Lien du bas",`${v}/about`));const m=new I;m.gap="0.5rem";for(let h=1;h<=15;h++)m.element.appendChild(i(`Lien ${h}`,"#"));const u=new Q;u.gap="1rem",u.columns="repeat(3, 1fr)";for(let h=1;h<=6;h++)u.element.appendChild(i(`Lien grille ${h}`,"#"));const f=new O;f.minHeight="200px",f.padding="2rem",f.element.appendChild(i("Lien centré","#/home"));const y=new ne,d=document.createElement("div");d.textContent="Couche de base";const b=i("Lien superposé","#");y.element.append(d,b);const n=new w;n.element.append(w.createButton("Nouveau",()=>alert("Nouveau")),w.createButton("Ouvrir",()=>alert("Ouvrir")),w.createButton("Enregistrer",()=>alert("Enregistrer")),w.createSeparator(),w.createButton("Couper",()=>alert("Couper")),w.createButton("Copier",()=>alert("Copier")),w.createButton("Coller",()=>alert("Coller")),w.createSeparator(),w.createButton("Annuler",()=>alert("Annuler"),{disabled:!0}));const r=new W("npm install @webaudiomodules/api"),c=new q(()=>{const h=document.createElement("div");return h.style.padding="2rem",h.style.background="var(--back-more)",h.style.borderRadius="var(--radius-normal)",h.innerHTML=`
                    <h4 style="color: var(--spice); margin-bottom: 1rem;">Contenu Initialisé</h4>
                    <p style="color: var(--front-less); margin-bottom: 1rem;">
                        Ce contenu a été créé en cliquant sur le bouton d'initialisation.
                        Le composant InitiableContent s'est complètement remplacé par ce contenu.
                    </p>
                    <p style="color: var(--front-less);">
                        Vous pouvez retourner du HTML, un Node, ou même une Promise.
                    </p>
                `,h},{icon:"▸",text:"Démarrer le module",description:"Cliquez pour initialiser et charger le contenu"}),p=new H,x=a.a`
            <section id="layouts">
                <h2>Composants de Layout</h2>
                <p>Découvrez les différents composants de layout disponibles pour structurer vos interfaces.</p>

                <article>
                    <h3>HBox - Conteneur Horizontal</h3>
                    <p>Aligne les éléments horizontalement avec flexbox.</p>
                    <div>
                        ${t.element}
                    </div>
                    <p><code>const hbox = new HBox(); hbox.gap = '1rem'; hbox.justify = 'space-between';</code></p>
                </article>

                <article>
                    <h3>VBox - Conteneur Vertical</h3>
                    <p>Aligne les éléments verticalement avec flexbox.</p>
                    <div>
                        ${l.element}
                    </div>
                    <p><code>const vbox = new VBox(); vbox.gap = '0.5rem';</code></p>
                </article>

                <article>
                    <h3>FlowBox - Layout Fluide</h3>
                    <p>Wrap automatique des éléments sur plusieurs lignes.</p>
                    <div>
                        ${m.element}
                    </div>
                    <p><code>const flowbox = new FlowBox(); flowbox.gap = '0.5rem';</code></p>
                </article>

                <article>
                    <h3>GridBox - Grille CSS</h3>
                    <p>Organisation en grille configurable.</p>
                    <div>
                        ${u.element}
                    </div>
                    <p><code>const gridbox = new GridBox(); gridbox.gap = '1rem'; gridbox.columns = 'repeat(3, 1fr)';</code></p>
                </article>

                <article>
                    <h3>CenterBox - Centrage</h3>
                    <p>Centre le contenu horizontalement et verticalement.</p>
                    <div>
                        ${f.element}
                    </div>
                    <p><code>const centerbox = new CenterBox(); centerbox.minHeight = '200px'; centerbox.padding = '2rem';</code></p>
                </article>

                <article>
                    <h3>StackBox - Empilement</h3>
                    <p>Superpose les éléments les uns sur les autres (utile pour les overlays).</p>
                    <div>
                        ${y.element}
                    </div>
                    <p><code>new StackBox()</code></p>
                </article>

                <article>
                    <h3>NavLink - Lien de Navigation</h3>
                    <p>Lien avec flèche pour la navigation.</p>
                    <div>
                        ${new L("Retour à l'accueil","#/home").element}
                    </div>
                    <div>
                        ${(function(){const h=new L("Page suivante","#/wam");return h.reverse=!0,h.alignRight=!0,h.element})()}
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
                        ${r.element}
                    </div>
                    <p><code>const copyableText = new CopyableText('npm install @webaudiomodules/api');</code></p>
                </article>

                <article>
                    <h3>InitiableContent - Contenu Initialisable</h3>
                    <p>Gros bloc-bouton qui se remplace par un élément quand on clique dessus.</p>
                    <div>
                        ${c.element}
                    </div>
                    <p><code>new InitiableContent(() => element, { icon, text, description });</code></p>
                </article>

                <article>
                    <h3>Microphone - Contrôle Audio</h3>
                    <p>Contrôle d'accès au microphone avec MediaStream. Démarre/arrête la capture audio et fournit un MediaStreamAudioSourceNode pour le Web Audio API via les callbacks.</p>
                    <div>
                        ${p.element}
                    </div>
                    <p><code>const mic = new Microphone(); mic.onStart = (source) => source.connect(node);</code></p>
                </article>

                ${new L("Retour à l'accueil","#/home").element}
            </section>
        `,E=new k("layouts",x);this.element=E.element}}class Ee extends g{constructor(e,o){super();const i=a.a`
            <section id="not-found">
                <h2>404 - Page non trouvée</h2>
                <p>La page que vous recherchez n'existe pas.</p>
                
                <h3>Pages disponibles</h3>
                <ul>
                    <li><a href="${v}/home">Accueil</a></li>
                    <li><a href="${v}/wam">Web Audio Modules</a></li>
                    <li><a href="${v}/layouts">Composants de Layout</a></li>
                    <li><a href="${v}/about">À propos</a></li>
                </ul>
                
                ${new L("Retour à l'accueil",`${v}/home`).element}
            </section>
        `,t=new k("not-found",i);this.element=t.element}}const $e=new U(v,[{name:"home",pattern:["home"],factory:(s,e,o)=>new F(s,o)},{name:"wam",pattern:["wam"],factory:(s,e,o)=>new ce(s,o)},{name:"wam-detail",pattern:["wam",/(.+)/],factory:(s,e,o)=>new xe(s,o,e[0])},{name:"about",pattern:["about"],factory:(s,e,o)=>new we(s,o)},{name:"layouts",pattern:["layouts"],factory:(s,e,o)=>new Ce(s,o)}],{name:"not-found",pattern:[],factory:(s,e,o)=>new Ee(s,o)});document.body.innerHTML="";document.body.appendChild($e.element);
