import { html } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class Tooltip extends Component {

    readonly element = shadow(
        "span",
        html`
            <style>${style}</style>
            <slot></slot>
            <div class="-tooltip" role="tooltip">
                <slot name="tooltip"></slot>
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
        position: relative;
        display: inline-block;
        cursor: help;
    }
    .-tooltip {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%) scale(0.8);
        padding: var(--spacing-small) var(--spacing-normal);
        background: var(--back-less);
        color: var(--front);
        border-radius: var(--radius-small);
        font-size: var(--font-tiny);
        white-space: nowrap;
        box-shadow: var(--shadow-large);
        opacity: 0;
        pointer-events: none;
        transition: all 0.2s ease;
        border: 1px solid var(--spice);
        z-index: 1000;
    }
    .-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: var(--spice);
    }
    :host(:hover) .-tooltip {
        opacity: 1;
        transform: translateX(-50%) scale(1);
    }
`
