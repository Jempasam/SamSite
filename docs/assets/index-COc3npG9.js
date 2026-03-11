(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const c of t)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function n(t){const c={};return t.integrity&&(c.integrity=t.integrity),t.referrerPolicy&&(c.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?c.credentials="include":t.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(t){if(t.ep)return;t.ep=!0;const c=n(t);fetch(t.href,c)}})();function N(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function l(s,...e){let n=0,i="",t={};function c(o,r){o in t||(t[o]=[]),t[o].push(r)}function u(o){if(o!=null)if(o instanceof Node){var r=`_sam_frament_target_${n++}`;i+=`<span ${r}=""></span>`,c(r,a=>a.replaceWith(o))}else if(typeof o=="object"&&"element"in o)u(o.element);else if(typeof o=="string")i+=N(o);else if(typeof o[Symbol.iterator]=="function")for(const a of o)u(a);else typeof o=="function"?u(o()):i+=N(""+o)}function d(o,r){if(o!=null)if(o instanceof Element)r.push(a=>{for(let g=0;g<a.attributes.length;g++){const x=a.attributes.item(g);o.attributes.setNamedItem(x.cloneNode())}for(;a.firstChild;)o.appendChild(a.firstChild);a.before(o)});else if(typeof o=="object"&&"element"in o&&o.element instanceof Element){const a=o,g=a.element;r.push(x=>{for(let $=0;$<x.attributes.length;$++){const f=x.attributes.item($);(!a.setTemplateAttr||!a.setTemplateAttr(f.name,f.value))&&g.attributes.setNamedItem(f.cloneNode())}for(;x.firstChild;)g.appendChild(x.firstChild);x.before(g)})}else if(typeof o=="string")i+=N(o);else if(typeof o[Symbol.iterator]=="function")for(const a of o)d(a,r);else if(typeof o=="function")d(o(),r);else throw new Error("Invalid type to be placed as an element: "+typeof o)}function m(o,r){if(o!=null)if(typeof o[Symbol.iterator]=="function")for(const a of o)m(a,r);else if(typeof o=="function")r.push(o);else if(typeof o=="object")r.push(a=>{for(const[g,x]of Object.entries(o))if(typeof x=="function")g=="init"?r.push(x):a.addEventListener(g,x);else throw new Error("Invalid event listener for @ placeholder: "+g)});else throw new Error("Invalid type to be placed as an element: "+typeof o)}function p(o){return o.replace("</>","</div>")}const h={};try{for(let o=0;o<e.length;o++)if(s[o].endsWith("<")){const r=`_sam_frament_to_remove_${n++}`;i+=s[o]+`div ${r} `;const a=[];h[r]=a,d(e[o],a)}else if(s[o].endsWith("@")){i+=s[o];const r=`_sam_frament_callback_${n++}`;i+=` ${r}="" `;const a=t[r]??[];t[r]=a,m(e[o],a)}else i+=p(s[o]),u(e[o]);i+=p(s[s.length-1])}catch(o){const r=i.length<20?i:i.slice(-20,-1);throw new Error(`[${r}...] : ${o!=null&&typeof o=="object"&&"message"in o?o.message:o}`)}const y=document.createRange().createContextualFragment(i);for(const[o,r]of Object.entries(h)){const a=y.querySelector(`[${o}]`);a.removeAttribute(o);for(const g of r)g(a);a.remove()}for(const[o,r]of Object.entries(t)){let a=y.querySelector(`[${o}]`);for(const g of r)a.parentNode||(a=y.getElementById(o)),g(a);a.removeAttribute(o)}return y}l.opt=function(s,...e){if(!(e.includes(null)||e.includes(void 0)))return l(s,...e)};l.not_empty=function(s,...e){if(!e.every(n=>n==null||n?.length===0))return l(s,...e)};l.a=function(s,...e){return l(s,...e).firstElementChild};class v{setTemplateAttr(e,n){const i=Object.getPrototypeOf(this),t=Object.getOwnPropertyDescriptor(i,e);return t?.set?(t.set.call(this,n),!0):!1}}function T(s,e,n){const i=document.createElement(s);return i.attachShadow({mode:"closed"}).append(e),i.append(n),i}class H extends v{constructor(e,n,i){super(),this.root=e,this.pages=n,this.defaultPage=i,this.currentComponent=null,this.container=null,this.element=l``,window.addEventListener("hashchange",()=>this.navigate()),this.navigate()}buildRegex(e){const i="^/"+e.map(t=>typeof t=="string"?t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"):t.source).join("\\/")+"$";return new RegExp(i)}matchRoute(e){e.startsWith(this.root)&&(e=e.slice(this.root.length));for(const n of this.pages){const i=this.buildRegex(n.pattern),t=e.match(i);if(t)return{page:n,pageId:e,matches:t}}return null}navigate(){const e=window.location.pathname;let n=this.matchRoute(e);!n&&this.defaultPage&&(n={page:this.defaultPage,pageId:e,matches:[]}),n&&(!this.container&&this.currentComponent&&(this.container=this.getContainer()),this.currentComponent&&this.container&&(this.container.innerHTML=""),this.currentComponent=n.page.factory(n.pageId,n.matches.slice(1),this.pages),this.container?this.container.appendChild(this.currentComponent.element):this.element.appendChild(this.currentComponent.element))}getContainer(){if(this.currentComponent){let e=this.currentComponent.element.parentNode;for(;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.parentNode;return e}return null}navigateTo(e){window.location.hash="#"+e}getCurrentPage(){const e=window.location.hash;return this.matchRoute(e)?.page||null}}const b="/SamSite",q={home:"Accueil",wam:"Web Audio Modules",layouts:"Layouts",about:"À propos"};class E extends v{constructor(e,n){super(),this.name=e,this.main=n,this.element=l`
            <header>
                <div class="header-container">
                    <h1>Le site de Sam</h1>
                    <nav class="menu">
                        ${function*(){for(const[i,t]of Object.entries(q)){const c=i===e;yield l.a`<a href="${b}/${i}" class="menu-item ${c?"selected":""}">${t}</a>`}}}
                    </nav>
                </div>
            </header>
            <main>
                ${n}
            </main>
            <footer>
                <p>&copy; 2026 Le site de Sam. Tous droits réservés.</p>
            </footer>
        `,console.log(this.element)}}class D extends v{constructor(e,n){super();const i=l.a`
            <section id="home">
                <h2>Bienvenue sur mon site</h2>
                <p>Ceci est un site de démonstration utilisant TypeScript avec Vite et un système de routing.</p>
                
                <h3>Navigation</h3>
                <ul>
                    <li><a href="${b}/home">Accueil</a></li>
                    <li><a href="${b}/wam">Web Audio Modules</a></li>
                    <li><a href="${b}/wam/123">WAM Detail (exemple avec ID 123)</a></li>
                    <li><a href="${b}/layouts">Composants de Layout</a></li>
                    <li><a href="${b}/about">À propos</a></li>
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
        `,t=new E("home",i);this.element=t.element}}const U=`
    :host {
        display: flex;
        flex-direction: row;
        gap: var(--gap, 1rem);
        align-items: var(--align, stretch);
        justify-content: var(--justify, flex-start);
        flex-wrap: var(--wrap, nowrap);
    }
`;class V extends v{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(l`
            <style>${U}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set align(e){this.element.style.setProperty("--align",e)}set justify(e){this.element.style.setProperty("--justify",e)}set wrap(e){this.element.style.setProperty("--wrap",e)}}const G=`
    :host {
        display: flex;
        flex-direction: column;
        gap: var(--gap, 1rem);
        align-items: var(--align, stretch);
        justify-content: var(--justify, flex-start);
    }
`;class F extends v{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(l`
            <style>${G}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set align(e){this.element.style.setProperty("--align",e)}set justify(e){this.element.style.setProperty("--justify",e)}}const Y=`
    :host {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--gap, 1rem);
        align-items: var(--align, stretch);
        justify-content: var(--justify, flex-start);
        align-content: var(--align-content, flex-start);
    }
`;class R extends v{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(l`
            <style>${Y}</style>
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
`;class K extends v{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(l`
            <style>${J}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set columns(e){this.element.style.setProperty("--columns",e)}set rows(e){this.element.style.setProperty("--rows",e)}set align(e){this.element.style.setProperty("--align",e)}set justify(e){this.element.style.setProperty("--justify",e)}}const Q=`
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: var(--min-height, auto);
        padding: var(--padding, 0);
    }
`;class _ extends v{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(l`
            <style>${Q}</style>
            <slot></slot>
        `)}set minHeight(e){this.element.style.setProperty("--min-height",e)}set padding(e){this.element.style.setProperty("--padding",e)}}const X=`
    :host {
        display: grid;
        grid-template-areas: "stack";
    }
    
    ::slotted(*) {
        grid-area: stack;
    }
`;class Z extends v{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(l`
            <style>${X}</style>
            <slot></slot>
        `)}}class ee extends v{constructor(e="medium"){super(),this.size=e,this.element=T("div",l`
            <style>${te}</style>
            <div class="-spinner"></div>
        `,l``),this.element.classList.add(`-${e}`)}}const te=`
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
`;class P extends v{constructor(e){super(),this.element=document.createElement("div"),this.shadowRoot=this.element.attachShadow({mode:"open"}),this.spinner=new ee("medium"),this.shadowRoot.appendChild(l.a`<style>${ne}</style>`);const n=document.createElement("div");n.className="-container";const i=document.createElement("div");i.className="-loading",i.appendChild(this.spinner.element);const t=document.createElement("p");t.className="-loading-text",t.textContent="Chargement...",i.appendChild(t),n.appendChild(i),this.shadowRoot.appendChild(n),this.load(e,i,n)}async load(e,n,i){try{const t=await e();n.style.animation="fadeOut 0.3s ease",setTimeout(()=>{const c=this.element.parentNode;if(c){if(typeof t=="string"){const u=document.createElement("div");for(u.innerHTML=t;u.firstChild;)c.insertBefore(u.firstChild,this.element)}else c.insertBefore(t,this.element);c.removeChild(this.element)}},300)}catch(t){n.innerHTML=`
                <div class="-error">
                    <p class="-error-icon">⚠</p>
                    <p class="-error-text">Erreur de chargement</p>
                    <p class="-error-details">${t instanceof Error?t.message:"Erreur inconnue"}</p>
                </div>
            `}}}const ne=`
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
`;class j{constructor(e){this.url=e,this.descriptor=void 0}async get(){if(!this.descriptor){const e=this.url.split("/").slice(0,-1).join("/")+"/",n=e+"descriptor.json";let t=await(await fetch(n)).json();this.descriptor=t,t.thumbnail=e+t.thumbnail,t.descriptorURL=n,t.moduleURL=this.url,t.identifier??=t.vendor+"."+t.name}return this.descriptor}}let S;async function I(){if(!S){S=[];{const e=await(await fetch("https://www.webaudiomodules.com/community/plugins.json")).json();for(const n of e)S.push(new j(`https://www.webaudiomodules.com/community/plugins/${n.path}`))}for(const s of oe)S.push(new j(s))}return S}const oe=["https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/fluteForIS2/index.js","https://mainline.i3s.unice.fr/WAMChorusMB/","https://mainline.i3s.unice.fr/WamSampler/src/index.js","https://mainline.i3s.unice.fr/wam2/packages/faustPingPongDelay/plugin/index.js","https://mainline.i3s.unice.fr/wam2/packages/obxd/index.js","https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/clarinetMIDI/indexGUIStandard.js","https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/JUNO6v2/indexGUIStandard.js","https://wam-4tt.pages.dev/Pro54/index.js","https://mainline.i3s.unice.fr/WAMViktorNV1/viktorNV1/index.js","https://jempasam.github.io/cardboardwam/dist/index.mjs"];class ie extends v{constructor(){super(...arguments),this.element=T("div",l`
            <style>${se}</style>
            <slot></slot>
        `,l`
        `)}}const se=`
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
`;class re extends v{constructor(e,n){super();let i="",t=l.a`<section></section>`,c=Promise.resolve();function u(){c=c.then(async()=>{const h=await I();t.replaceChildren(l.a`
                    <${new R}>
                        ${function*(){for(const y of h)yield new P(async()=>{let r=await y.get();return(r.name+" "+r.description+" "+r.identifier+" "+r.vendor+" "+r.keywords.join(" ")).toLowerCase().includes(i)?l.a`
                                        <${new ie}>
                                            <h4>${r.name}</h4>
                                            <img src="${r.thumbnail}" alt="${r.name}"> </img>
                                            <ul>
                                                ${r.keywords.map(g=>l.a`<li>${g}</li>`)}
                                            </ul>
                                            <p>${r.description}</p>
                                            <span>By ${r.vendor}</span>
                                            <a href="${b}/wam/${r.identifier}">En savoir plus →</a>
                                        </div>
                                    `:l``})}}
                    </div>
                `)})}u();const d=l.a`<input type="search" placeholder="Search..."/>`;d.oninput=h=>{i=d.value.toLowerCase(),u()};const m=l`
            <section>
                <h2>Web Audio Modules</h2>
                <p>Découvrez les derniers plugins audio pour le web, créés par la communauté Web Audio Modules. Explorez une variété de modules, des synthétiseurs aux effets, tous conçus pour fonctionner directement dans votre navigateur.</p>
                ${d}
            </section>
            ${t}
        `,p=new E("wam",m);this.element=p.element}}const ae="modulepreload",le=function(s){return"/SamSite/"+s},A={},M=function(e,n,i){let t=Promise.resolve();if(n&&n.length>0){let p=function(h){return Promise.all(h.map(y=>Promise.resolve(y).then(o=>({status:"fulfilled",value:o}),o=>({status:"rejected",reason:o}))))};var u=p;document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),m=d?.nonce||d?.getAttribute("nonce");t=p(n.map(h=>{if(h=le(h),h in A)return;A[h]=!0;const y=h.endsWith(".css"),o=y?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${o}`))return;const r=document.createElement("link");if(r.rel=y?"stylesheet":ae,y||(r.as="script"),r.crossOrigin="",r.href=h,m&&r.setAttribute("nonce",m),document.head.appendChild(r),y)return new Promise((a,g)=>{r.addEventListener("load",a),r.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${h}`)))})}))}function c(d){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=d,window.dispatchEvent(m),!m.defaultPrevented)throw d}return t.then(d=>{for(const m of d||[])m.status==="rejected"&&c(m.reason);return e().catch(c)})};class ce extends v{constructor(){super(),this.element=T("div",l`
            <style>${de}</style>
            <div class="-container">
                <slot></slot>
            </div>
        `,l``)}}const de=`
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
`;class O extends v{constructor(e=""){super(),this._text="",this.textElement=null,this.copyButton=null,this._text=e,this.element=document.createElement("div");const n=this.element.attachShadow({mode:"open"});n.append(l`
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
        `),this.textElement=n.querySelector(".text-container"),this.copyButton=n.querySelector("button"),this.copyButton&&this.copyButton.addEventListener("click",()=>this.copyToClipboard())}set text(e){this._text=e,this.textElement&&(this.textElement.textContent=e)}get text(){return this._text}async copyToClipboard(){if(this.copyButton)try{await navigator.clipboard.writeText(this._text);const e=this.copyButton.textContent;this.copyButton.textContent="✓ Copié!",this.copyButton.classList.add("copied"),setTimeout(()=>{this.copyButton&&(this.copyButton.textContent=e,this.copyButton.classList.remove("copied"))},2e3)}catch(e){console.error("Erreur lors de la copie:",e),this.copyButton.textContent="✗ Erreur",setTimeout(()=>{this.copyButton&&(this.copyButton.textContent="⎘ Copier")},2e3)}}}const pe=`
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
`;class z extends v{constructor(e,n={}){super();const{icon:i="▶",text:t="Initialiser",description:c="Cliquez pour charger le contenu"}=n;this.element=document.createElement("div"),this.shadowRoot=this.element.attachShadow({mode:"open"}),this.shadowRoot.appendChild(l.a`<style>${pe}</style>`);const u=document.createElement("div");u.className="-container";const d=document.createElement("button");d.className="-init-button",d.type="button";const m=document.createElement("p");m.className="-init-icon",m.textContent=i;const p=document.createElement("p");p.className="-init-text",p.textContent=t;const h=document.createElement("p");h.className="-init-description",h.textContent=c,d.appendChild(m),d.appendChild(p),d.appendChild(h),u.appendChild(d),this.shadowRoot.appendChild(u),d.addEventListener("click",()=>this.initialize(e,u))}initialize(e,n){try{n.style.animation="fadeOut 0.3s ease",setTimeout(()=>{try{const i=e(),t=this.element.parentNode;if(t){if(typeof i=="string"){const c=document.createElement("div");for(c.innerHTML=i;c.firstChild;)t.insertBefore(c.firstChild,this.element)}else t.insertBefore(i,this.element);t.removeChild(this.element)}}catch(i){n.innerHTML=`
                        <div class="-init-button" style="cursor: default; border-color: #f44336;">
                            <p class="-init-icon" style="color: #f44336;">⚠</p>
                            <p class="-init-text">Erreur d'initialisation</p>
                            <p class="-init-description">${i instanceof Error?i.message:"Erreur inconnue"}</p>
                        </div>
                    `}},300)}catch(i){n.innerHTML=`
                <div class="-init-button" style="cursor: default; border-color: #f44336;">
                    <p class="-init-icon" style="color: #f44336;">⚠</p>
                    <p class="-init-text">Erreur d'initialisation</p>
                    <p class="-init-description">${i instanceof Error?i.message:"Erreur inconnue"}</p>
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
`;class W extends v{constructor(e){super(),this.stream=null,this.audioContext=null,this.sourceNode=null,this.isActive=!1,this.isChanging=!1,this.onStart=null,this.onEnd=null,this.audioContext=e||null,this.element=document.createElement("div"),this.shadowRoot=this.element.attachShadow({mode:"open"}),this.shadowRoot.append(l`
            <style>${ue}</style>
            <div class="status-indicator">🎤</div>
            <div class="info">
                <p class="label">Microphone</p>
                <p class="state">Prêt</p>
            </div>
            <button type="button">Démarrer</button>
        `),this.indicatorElement=this.shadowRoot.querySelector(".status-indicator"),this.stateElement=this.shadowRoot.querySelector(".state"),this.button=this.shadowRoot.querySelector("button"),this.button.addEventListener("click",()=>this.toggle())}async toggle(){this.isChanging||(this.isActive?await this.stop():await this.start())}async start(){if(!(this.isActive||this.isChanging))try{this.isChanging=!0,this.button.disabled=!0,this.stateElement.textContent="Accès...",this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}),this.audioContext||(this.audioContext=new AudioContext),this.sourceNode=this.audioContext.createMediaStreamSource(this.stream),this.isActive=!0,this.indicatorElement.classList.add("active"),this.stateElement.classList.add("active"),this.stateElement.classList.remove("error"),this.stateElement.textContent="Actif",this.button.classList.add("active"),this.button.textContent="Arrêter",this.button.disabled=!1,this.onStart&&this.sourceNode&&this.onStart(this.sourceNode)}catch(e){throw console.error("Erreur lors du démarrage du microphone:",e),this.stateElement.classList.add("error"),this.stateElement.textContent="Erreur",this.button.disabled=!1,e}finally{this.isChanging=!1}}async stop(){if(!(!this.isActive||this.isChanging))try{this.isChanging=!0,this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),this.stream=null),this.sourceNode&&(this.sourceNode.disconnect(),this.sourceNode=null),this.isActive=!1,this.indicatorElement.classList.remove("active"),this.stateElement.classList.remove("active"),this.stateElement.textContent="Arrêté",this.button.classList.remove("active"),this.button.textContent="Démarrer",this.button.disabled=!1,this.onEnd&&this.onEnd()}catch(e){throw console.error("Erreur lors de l'arrêt du microphone:",e),e}finally{this.isChanging=!1}}}const me=`
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
`;class w extends v{constructor(){super(),this.element=document.createElement("div"),this.element.attachShadow({mode:"open"}).append(l`
            <style>${me}</style>
            <slot></slot>
        `)}set gap(e){this.element.style.setProperty("--gap",e)}set padding(e){this.element.style.setProperty("--padding",e)}set background(e){this.element.style.setProperty("--background",e)}set radius(e){this.element.style.setProperty("--radius",e)}static createSeparator(){const e=document.createElement("div");return e.className="separator",e}static createButton(e,n,i){const t=document.createElement("button");return t.textContent=e,t.onclick=n,i?.disabled&&(t.disabled=!0),i?.title&&(t.title=i.title),t}}class he extends v{constructor(e,n,i){super(),console.log(i);async function t(m){const p=new AudioContext,{default:h}=await M(async()=>{const{default:C}=await import("https://www.webaudiomodules.com/sdk/2.0.0-alpha.6/src/initializeWamHost.js");return{default:C}},[]),[y,o]=await h(p,"example"),a=await(await import(m)).default.createInstance(y,p),g=await a.createGui(),$=await(await M(async()=>{const{default:C}=await import("https://mainline.i3s.unice.fr/wam_wc/wam-host/assets/midiKeyboard/simpleMidiKeyboard/index.js");return{default:C}},[])).default.createInstance(y,p),f=await $.createGui(),B=new W(p);B.onStart=C=>{C.connect(a.audioNode)};const k=l.a`
                <${new w}>
                    ${w.createButton("Copy State",async()=>{const C=await a.audioNode.getState();await navigator.clipboard.writeText(JSON.stringify(C))})}

                    ${w.createButton("Paste State",async()=>{const C=await navigator.clipboard.readText();await a.audioNode.setState(JSON.parse(C))})}
                </div>
            `;return $.audioNode.connectEvents(a.audioNode.instanceId),a.audioNode.connect(p.destination),l`
                ${k}
                <${new ce}>${g}</div>
                ${f}
                ${B}
            `}async function c(){const p=(await Promise.all((await I()).map(y=>y.get()))).find(y=>y.identifier===i);return p?l`
                <h2>${p.name}</h2>
                <${new _}>
                    <img
                        alt="${p.name}"
                        width=100%
                        src="${p.thumbnail}"
                        style="max-height: 600px; object-fit: contain;"
                    />
                </div>
                <p>${p.description}</p>
                ${new O(p.moduleURL)}
                <hr/>
                ${new z(()=>new P(()=>t(p.moduleURL)).element)}
            `:l`<p>Module non trouvé</p>`}const u=l`
            <section>
                ${new P(c)}
            </section>
        `,d=new E("wam",u);this.element=d.element}getModuleType(e){return{123:"Synthétiseur modulaire",456:"Effet de réverbération",789:"Analyseur de spectre"}[e]||"Module personnalisé"}}class L extends v{constructor(e,n){super(),this.element=document.createElement("span"),this.link=document.createElement("a"),this.link.href=n,this.arrowText=document.createTextNode("← "),this.textNode=document.createTextNode(e),this.link.append(this.arrowText,this.textNode),this.element.appendChild(this.link)}set reverse(e){e?(this.arrowText.textContent=" →",this.link.textContent="",this.link.append(this.textNode,this.arrowText)):(this.arrowText.textContent="← ",this.link.textContent="",this.link.append(this.arrowText,this.textNode))}set alignRight(e){e?(this.element.style.display="block",this.element.style.textAlign="right"):(this.element.style.display="",this.element.style.textAlign="")}}class fe extends v{constructor(e,n){super();const i=l.a`
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

                ${new L("Retour à l'accueil",`${b}/home`).element}
            </section>
        `,t=new E("about",i);this.element=t.element}}class ge extends v{constructor(e,n){super();const i=(f,B="#")=>{const k=document.createElement("a");return k.href=B,k.textContent=f,k},t=new V;t.gap="1rem",t.justify="space-between",t.element.append(i("Premier lien",`${b}/home`),i("Deuxième lien",`${b}/wam`),i("Troisième lien",`${b}/about`));const c=new F;c.gap="0.5rem",c.element.append(i("Lien du haut",`${b}/home`),i("Lien du milieu",`${b}/wam`),i("Lien du bas",`${b}/about`));const u=new R;u.gap="0.5rem";for(let f=1;f<=15;f++)u.element.appendChild(i(`Lien ${f}`,"#"));const d=new K;d.gap="1rem",d.columns="repeat(3, 1fr)";for(let f=1;f<=6;f++)d.element.appendChild(i(`Lien grille ${f}`,"#"));const m=new _;m.minHeight="200px",m.padding="2rem",m.element.appendChild(i("Lien centré","#/home"));const p=new Z,h=document.createElement("div");h.textContent="Couche de base";const y=i("Lien superposé","#");p.element.append(h,y);const o=new w;o.element.append(w.createButton("Nouveau",()=>alert("Nouveau")),w.createButton("Ouvrir",()=>alert("Ouvrir")),w.createButton("Enregistrer",()=>alert("Enregistrer")),w.createSeparator(),w.createButton("Couper",()=>alert("Couper")),w.createButton("Copier",()=>alert("Copier")),w.createButton("Coller",()=>alert("Coller")),w.createSeparator(),w.createButton("Annuler",()=>alert("Annuler"),{disabled:!0}));const r=new O("npm install @webaudiomodules/api"),a=new z(()=>{const f=document.createElement("div");return f.style.padding="2rem",f.style.background="var(--back-more)",f.style.borderRadius="var(--radius-normal)",f.innerHTML=`
                    <h4 style="color: var(--spice); margin-bottom: 1rem;">Contenu Initialisé</h4>
                    <p style="color: var(--front-less); margin-bottom: 1rem;">
                        Ce contenu a été créé en cliquant sur le bouton d'initialisation.
                        Le composant InitiableContent s'est complètement remplacé par ce contenu.
                    </p>
                    <p style="color: var(--front-less);">
                        Vous pouvez retourner du HTML, un Node, ou même une Promise.
                    </p>
                `,f},{icon:"▸",text:"Démarrer le module",description:"Cliquez pour initialiser et charger le contenu"}),g=new W,x=l.a`
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
                        ${c.element}
                    </div>
                    <p><code>const vbox = new VBox(); vbox.gap = '0.5rem';</code></p>
                </article>

                <article>
                    <h3>FlowBox - Layout Fluide</h3>
                    <p>Wrap automatique des éléments sur plusieurs lignes.</p>
                    <div>
                        ${u.element}
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
                        ${m.element}
                    </div>
                    <p><code>const centerbox = new CenterBox(); centerbox.minHeight = '200px'; centerbox.padding = '2rem';</code></p>
                </article>

                <article>
                    <h3>StackBox - Empilement</h3>
                    <p>Superpose les éléments les uns sur les autres (utile pour les overlays).</p>
                    <div>
                        ${p.element}
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
                        ${(function(){const f=new L("Page suivante","#/wam");return f.reverse=!0,f.alignRight=!0,f.element})()}
                    </div>
                    <p><code>const link = new NavLink(text, href); link.reverse = true; link.alignRight = true;</code></p>
                </article>

                <article>
                    <h3>Toolbar - Barre d'outils</h3>
                    <p>Barre de boutons de commande avec séparateurs.</p>
                    <div>
                        ${o.element}
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
                        ${a.element}
                    </div>
                    <p><code>new InitiableContent(() => element, { icon, text, description });</code></p>
                </article>

                <article>
                    <h3>Microphone - Contrôle Audio</h3>
                    <p>Contrôle d'accès au microphone avec MediaStream. Démarre/arrête la capture audio et fournit un MediaStreamAudioSourceNode pour le Web Audio API via les callbacks.</p>
                    <div>
                        ${g.element}
                    </div>
                    <p><code>const mic = new Microphone(); mic.onStart = (source) => source.connect(node);</code></p>
                </article>

                ${new L("Retour à l'accueil","#/home").element}
            </section>
        `,$=new E("layouts",x);this.element=$.element}}class ve extends v{constructor(e,n){super();const i=l.a`
            <section id="not-found">
                <h2>404 - Page non trouvée</h2>
                <p>La page que vous recherchez n'existe pas.</p>
                
                <h3>Pages disponibles</h3>
                <ul>
                    <li><a href="${b}/home">Accueil</a></li>
                    <li><a href="${b}/wam">Web Audio Modules</a></li>
                    <li><a href="${b}/layouts">Composants de Layout</a></li>
                    <li><a href="${b}/about">À propos</a></li>
                </ul>
                
                ${new L("Retour à l'accueil",`${b}/home`).element}
            </section>
        `,t=new E("not-found",i);this.element=t.element}}const ye=new H(b,[{name:"home",pattern:["home"],factory:(s,e,n)=>new D(s,n)},{name:"wam",pattern:["wam"],factory:(s,e,n)=>new re(s,n)},{name:"wam-detail",pattern:["wam",/(.+)/],factory:(s,e,n)=>new he(s,n,e[0])},{name:"about",pattern:["about"],factory:(s,e,n)=>new fe(s,n)},{name:"layouts",pattern:["layouts"],factory:(s,e,n)=>new ge(s,n)}],{name:"not-found",pattern:[],factory:(s,e,n)=>new ve(s,n)});document.body.innerHTML="";document.body.appendChild(ye.element);
