import { html, HtmlTemplateComponent } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class Card extends Component{

    readonly etitle = html.a`<h4>Titre</h4>`
    readonly etext = html.a`<p>L orem upsuorem upsuorem upsuorem upsuorem upsuorem upsu</p>`
    readonly eimg = html.a`<img src="https://placehold.co/600x400" alt="placeholder">` as HTMLImageElement
    readonly elink = html.a`<a href="#">En savoir plus →</a>` as HTMLAnchorElement

    readonly element = shadow(
        "div",
        html`
            <style>${style}</style>
            <slot name=image></slot>
            <div class=-body>
                <slot name=title></slot>
                <slot name=text></slot>
                <div class=-footer>
                    <slot name=link></slot>
                </div>
            </div>
        `,
        html`
            <${this.eimg} slot=image></div>
            <${this.etitle} slot=title></div>
            <${this.etext} slot=text></div>
            <${this.elink} slot=link></div>
        `
    )

    set title(value: string){ this.etitle.textContent = value }
    get title(){ return this.etitle.textContent || "" }

    set text(value: string){ this.etext.textContent = value }
    get text(){ return this.etext.textContent || "" }

    set img(value: string){ this.eimg.src = value }
    get img(){ return this.eimg.src }

    set link(value: string){ this.elink.href = value }
    get link(){ return this.elink.href }

}

const style = /*css*/`
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
`