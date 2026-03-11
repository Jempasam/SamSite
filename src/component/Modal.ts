import { Component } from "../utils/Component";

export class Modal extends Component {

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
            <div class="-backdrop"></div>
            <div class="-modal">
                <div class="-header">
                    <slot name="header"></slot>
                    <button class="-close">✕</button>
                </div>
                <div class="-body">
                    <slot></slot>
                </div>
                <div class="-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        `;
        
        const backdrop = this.shadowRoot.querySelector('.-backdrop') as HTMLElement;
        const closeBtn = this.shadowRoot.querySelector('.-close') as HTMLButtonElement;
        
        backdrop.addEventListener('click', () => this.close());
        closeBtn.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    open() {
        this.element.classList.add('-open');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.element.classList.remove('-open');
        document.body.style.overflow = '';
        setTimeout(() => this.element.remove(), 300);
    }
}

const style = /*css*/`
    :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: none;
    }
    :host(.-open) {
        display: block;
    }
    .-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--back-more);
        border-radius: var(--radius-normal);
        box-shadow: var(--shadow-large);
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        border: 2px solid var(--back-more);
        animation: slideUp 0.3s ease;
    }
    @keyframes slideUp {
        from {
            transform: translate(-50%, -40%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    }
    .-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-large);
        border-bottom: 2px solid var(--back);
    }
    ::slotted([slot="header"]) {
        color: var(--front) !important;
        font-size: var(--font-large) !important;
        font-weight: 600 !important;
        margin: 0 !important;
    }
    .-close {
        background: none;
        border: none;
        color: var(--front-less);
        cursor: pointer;
        padding: var(--spacing-small);
        border-radius: var(--radius-small);
        transition: var(--transition);
        font-size: var(--font-large);
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .-close:hover {
        background: var(--back);
        color: var(--spice);
    }
    .-body {
        flex: 1;
        padding: var(--spacing-large);
        overflow-y: auto;
        color: var(--front-less);
    }
    .-footer {
        padding: var(--spacing-large);
        border-top: 2px solid var(--back);
        display: flex;
        gap: var(--spacing-normal);
        justify-content: flex-end;
    }
`
