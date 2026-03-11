import { html } from "sam-lib";
import { Component } from "../utils/Component";

const style = `
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
`;

export class Toolbar extends Component {
    readonly element: HTMLElement;
    
    constructor() {
        super();
        
        this.element = document.createElement('div');
        this.element.attachShadow({ mode: 'open' }).append(html`
            <style>${style}</style>
            <slot></slot>
        `);
    }
    
    set gap(value: string) {
        this.element.style.setProperty('--gap', value);
    }
    
    set padding(value: string) {
        this.element.style.setProperty('--padding', value);
    }
    
    set background(value: string) {
        this.element.style.setProperty('--background', value);
    }
    
    set radius(value: string) {
        this.element.style.setProperty('--radius', value);
    }
    
    /**
     * Créer un séparateur
     */
    static createSeparator(): HTMLElement {
        const sep = document.createElement('div');
        sep.className = 'separator';
        return sep;
    }
    
    /**
     * Créer un bouton de toolbar
     */
    static createButton(text: string, onClick: () => void, options?: {
        disabled?: boolean;
        title?: string;
    }): HTMLButtonElement {
        const button = document.createElement('button');
        button.textContent = text;
        button.onclick = onClick;
        
        if (options?.disabled) {
            button.disabled = true;
        }
        
        if (options?.title) {
            button.title = options.title;
        }
        
        return button;
    }
}
