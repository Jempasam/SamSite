import { html } from "sam-lib";
import { Component } from "../utils/Component";

export default class CopyableText extends Component {
    readonly element: HTMLElement;
    private _text: string = "";
    private textElement: HTMLElement | null = null;
    private copyButton: HTMLButtonElement | null = null;

    constructor(text: string = "") {
        super();
        this._text = text;
        
        this.element = document.createElement('div');
        const shadow = this.element.attachShadow({ mode: "open" });
        
        shadow.append(html/*html*/`
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
        `);

        this.textElement = shadow.querySelector('.text-container');
        this.copyButton = shadow.querySelector('button');

        if (this.copyButton) {
            this.copyButton.addEventListener('click', () => this.copyToClipboard());
        }
    }

    set text(value: string) {
        this._text = value;
        if (this.textElement) {
            this.textElement.textContent = value;
        }
    }

    get text(): string {
        return this._text;
    }

    private async copyToClipboard() {
        if (!this.copyButton) return;

        try {
            await navigator.clipboard.writeText(this._text);
            
            // Visual feedback
            const originalText = this.copyButton.textContent;
            this.copyButton.textContent = '✓ Copié!';
            this.copyButton.classList.add('copied');

            setTimeout(() => {
                if (this.copyButton) {
                    this.copyButton.textContent = originalText;
                    this.copyButton.classList.remove('copied');
                }
            }, 2000);
        } catch (err) {
            console.error('Erreur lors de la copie:', err);
            this.copyButton.textContent = '✗ Erreur';
            setTimeout(() => {
                if (this.copyButton) {
                    this.copyButton.textContent = '⎘ Copier';
                }
            }, 2000);
        }
    }
}
