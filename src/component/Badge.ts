import { html } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class Badge extends Component {

    readonly element = shadow(
        "span",
        html`
            <style>${style}</style>
            <slot></slot>
        `,
        html``
    )

    constructor(variant: 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'primary', size: 'small' | 'medium' | 'large' = 'medium') {
        super();
        this.element.classList.add(`-${variant}`, `-size-${size}`);
    }

    set size(value: 'small' | 'medium' | 'large') {
        this.element.classList.remove('-size-small', '-size-medium', '-size-large');
        this.element.classList.add(`-size-${value}`);
    }

    set variant(value: 'primary' | 'success' | 'warning' | 'danger' | 'info') {
        this.element.classList.remove('-primary', '-success', '-warning', '-danger', '-info');
        this.element.classList.add(`-${value}`);
    }
}

const style = /*css*/`
    :host {
        all: revert;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.25em 0.75em !important;
        border-radius: 999px;
        font-weight: 600;
        font-size: var(--font-tiny);
        white-space: nowrap;
        transition: var(--transition);
    }
    :host(.-primary) {
        background: var(--spice);
        color: var(--back-less);
    }
    :host(.-success) {
        background: #4ade80;
        color: #1a1a1a;
    }
    :host(.-warning) {
        background: #fbbf24;
        color: #1a1a1a;
    }
    :host(.-danger) {
        background: #ef4444;
        color: #ffffff;
    }
    :host(.-info) {
        background: #3b82f6;
        color: #ffffff;
    }
    :host(.-size-small) {
        font-size: 10px;
        padding: 0.2em 0.6em;
    }
    :host(.-size-medium) {
        font-size: var(--font-tiny);
        padding: 0.25em 0.75em;
    }
    :host(.-size-large) {
        font-size: var(--font-normal);
        padding: 0.3em 0.9em;
    }
    :host(:hover) {
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }
`
