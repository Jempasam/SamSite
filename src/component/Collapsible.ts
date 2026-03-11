import { Component } from "../utils/Component";

export class Collapsible extends Component {

    private isOpen: boolean = false;
    readonly element: HTMLDivElement;
    private shadowRoot: ShadowRoot;

    constructor() {
        super();
        
        // Créer l'élément et le shadow root en mode open
        this.element = document.createElement('div');
        this.shadowRoot = this.element.attachShadow({mode: 'open'});
        
        // Ajouter le contenu au shadow root
        this.shadowRoot.innerHTML = `
            <style>${style}</style>
            <button class="-trigger">
                <span class="-icon">▶</span>
                <slot name="trigger"></slot>
            </button>
            <div class="-content">
                <div class="-content-inner">
                    <slot></slot>
                </div>
            </div>
        `;
        
        const trigger = this.shadowRoot.querySelector('.-trigger') as HTMLButtonElement;
        trigger.addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.element.classList.add('-open');
        } else {
            this.element.classList.remove('-open');
        }
    }

    open() {
        this.isOpen = true;
        this.element.classList.add('-open');
    }

    close() {
        this.isOpen = false;
        this.element.classList.remove('-open');
    }
}

const style = /*css*/`
    :host {
        display: block;
        margin: var(--spacing-normal) 0;
        background: var(--back);
        border-radius: var(--radius-normal);
        border: 2px solid var(--back-more);
        overflow: hidden;
    }
    .-trigger {
        width: 100%;
        padding: var(--spacing-normal);
        background: var(--back-more);
        border: none;
        color: var(--front);
        font-family: var(--font-family);
        font-size: var(--font-normal);
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: var(--spacing-small);
        transition: var(--transition);
        text-align: left;
    }
    .-trigger:hover {
        background: var(--back);
    }
    .-icon {
        color: var(--spice);
        transition: transform 0.3s ease;
        display: inline-block;
    }
    :host(.-open) .-icon {
        transform: rotate(90deg);
    }
    .-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    :host(.-open) .-content {
        max-height: 1000px;
    }
    .-content-inner {
        padding: var(--spacing-normal);
        color: var(--front-less);
    }
`
