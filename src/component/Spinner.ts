import { html } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class Spinner extends Component {

    readonly element = shadow(
        "div",
        html`
            <style>${style}</style>
            <div class="-spinner"></div>
        `,
        html``
    )

    constructor(public size: 'small' | 'medium' | 'large' = 'medium') {
        super();
        this.element.classList.add(`-${size}`);
    }
}

const style = /*css*/`
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
`
