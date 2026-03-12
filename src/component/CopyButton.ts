import { Component } from "../utils/Component";

export class CopyButton extends Component {
    readonly element: HTMLDivElement;
    private copyFn: () => string;

    constructor(copyFn: () => string) {
        super();
        this.copyFn = copyFn;
        
        this.element = document.createElement('div');
        const shadow = this.element.attachShadow({ mode: "open" });
        
        shadow.innerHTML = /*html*/`
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
        `;

        const button = shadow.querySelector('button');
        if (button) {
            button.addEventListener('click', () => this.copyToClipboard());
        }
    }

    private async copyToClipboard() {
        const button = this.element.shadowRoot?.querySelector('button');
        if (!button) return;

        try {
            await navigator.clipboard.writeText(this.copyFn());
            
            // Retour visuel
            const originalText = button.textContent;
            button.textContent = '✓ Copié!';
            button.classList.add('copied');

            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Erreur lors de la copie:', err);
            button.textContent = '✗ Erreur';
            setTimeout(() => {
                button.textContent = '⎘ Copier';
            }, 2000);
        }
    }
}
