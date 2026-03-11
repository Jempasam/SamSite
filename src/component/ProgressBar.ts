import { Component } from "../utils/Component";

export class ProgressBar extends Component {

    private _value: number = 0;
    private progressFill: HTMLElement;
    private labelElement: HTMLElement;
    private shadowRoot: ShadowRoot;

    readonly element: HTMLDivElement;

    constructor(value: number = 0) {
        super();
        
        // Créer l'élément et le shadow root en mode open pour y accéder
        this.element = document.createElement('div');
        this.shadowRoot = this.element.attachShadow({mode: 'open'});
        
        // Ajouter le contenu au shadow root
        this.shadowRoot.innerHTML = `
            <style>${style}</style>
            <div class="-container">
                <div class="-fill"></div>
                <div class="-label"></div>
            </div>
        `;
        
        this.progressFill = this.shadowRoot.querySelector('.-fill') as HTMLElement;
        this.labelElement = this.shadowRoot.querySelector('.-label') as HTMLElement;
        this.value = value;
    }

    set value(val: number) {
        this._value = Math.max(0, Math.min(100, val));
        this.progressFill.style.width = `${this._value}%`;
        this.labelElement.textContent = `${Math.round(this._value)}%`;
    }

    get value() {
        return this._value;
    }
}

const style = /*css*/`
    :host {
        display: block;
        margin: var(--spacing-normal) 0 !important;
    }
    .-container {
        position: relative;
        width: 100%;
        height: 30px;
        background: var(--back);
        border-radius: var(--radius-normal);
        overflow: hidden;
        border: 2px solid var(--back-more);
        box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
    }
    .-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: linear-gradient(135deg, var(--spice) 0%, var(--spice-more) 100%);
        transition: width 0.4s ease;
        box-shadow: 0 0 10px rgba(255, 140, 66, 0.5);
    }
    .-label {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--front);
        font-weight: 600;
        font-size: var(--font-tiny);
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        z-index: 1;
    }
`
