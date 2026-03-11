import { Component } from "../utils/Component";

export class Toast extends Component {

    readonly element: HTMLDivElement;
    private shadowRoot: ShadowRoot;

    constructor(type: 'success' | 'error' | 'warning' | 'info' = 'info', duration: number = 5000) {
        super();
        
        // Créer l'élément et le shadow root en mode open
        this.element = document.createElement('div');
        this.shadowRoot = this.element.attachShadow({mode: 'open'});
        
        // Ajouter le contenu au shadow root
        this.shadowRoot.innerHTML = `
            <style>${style}</style>
            <div class="-container">
                <div class="-icon"></div>
                <div class="-content">
                    <slot></slot>
                </div>
                <button class="-close">✕</button>
            </div>
        `;
        
        const container = this.shadowRoot.querySelector('.-container') as HTMLElement;
        container.classList.add(`-${type}`);
        
        const closeBtn = this.shadowRoot.querySelector('.-close') as HTMLButtonElement;
        closeBtn.addEventListener('click', () => this.dismiss());

        if (duration > 0) {
            setTimeout(() => this.dismiss(), duration);
        }
    }

    dismiss() {
        this.element.classList.add('-dismissing');
        setTimeout(() => this.element.remove(), 300);
    }
}

const style = /*css*/`
    :host {
        display: block !important;
        margin-bottom: var(--spacing-small) !important;
        animation: slideIn 0.3s ease !important;
    }
    :host(.-dismissing) {
        animation: slideOut 0.3s ease forwards;
    }
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    .-container {
        display: flex;
        align-items: center;
        gap: var(--spacing-normal);
        padding: var(--spacing-normal);
        background: var(--back);
        border-radius: var(--radius-small);
        border-left: 4px solid var(--spice);
        box-shadow: var(--shadow-large);
        min-width: 300px;
        max-width: 500px;
    }
    .-container.-success {
        border-left-color: #4ade80;
    }
    .-container.-error {
        border-left-color: #ef4444;
    }
    .-container.-warning {
        border-left-color: #fbbf24;
    }
    .-container.-info {
        border-left-color: var(--spice);
    }
    .-icon::before {
        font-size: var(--font-large);
    }
    .-container.-success .-icon::before {
        content: "✓";
        color: #4ade80;
    }
    .-container.-error .-icon::before {
        content: "✕";
        color: #ef4444;
    }
    .-container.-warning .-icon::before {
        content: "⚠";
        color: #fbbf24;
    }
    .-container.-info .-icon::before {
        content: "ℹ";
        color: var(--spice);
    }
    .-content {
        flex: 1;
        color: var(--front);
        font-size: var(--font-normal);
    }
    .-close {
        background: none;
        border: none;
        color: var(--front-less);
        cursor: pointer;
        padding: var(--spacing-tiny);
        border-radius: var(--radius-small);
        transition: var(--transition);
        font-size: var(--font-normal);
    }
    .-close:hover {
        background: var(--back-more);
        color: var(--front);
    }
`
