import { html } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class Aside extends Component {

    readonly element = shadow(
        "div",
        html`
            <style>${style}</style>
            <div class="-container">
                <slot></slot>
            </div>
        `,
        html``
    )

    constructor() {
        super();
    }
}

const style = /*css*/`
    :host {
        display: block;
        float: right;
        width: 250px;
        margin: 0 0 var(--spacing-normal) var(--spacing-normal);
        padding: var(--spacing-tiny) !important;
        background: var(--back);
        border-left: 4px solid var(--spice);
        border-radius: var(--radius-normal);
        box-shadow: var(--shadow);
        transition: var(--transition);
    }

    :host(:hover) {
        box-shadow: var(--shadow-large);
        transform: translateX(-2px);
    }

    .-container {
        width: 100%;
        box-sizing: border-box;
        padding-left: var(--spacing-small);
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
    
    @media (max-width: 768px) {
        :host {
            float: none;
            width: 100%;
            margin: var(--spacing-normal) 0;
        }
    }
`
