import { html } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class SearchBox extends Component {

    readonly element = shadow(
        "div",
        html`
            <style>${style}</style>
            <div class="-search-input-wrapper">
                <slot name="input"></slot>
            </div>
            <div class="-search-results">
                <slot name="results"></slot>
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
        margin: var(--spacing-normal) 0;
    }
    .-search-input-wrapper {
        position: relative;
        margin-bottom: var(--spacing-small);
    }
    ::slotted(input) {
        width: 100% !important;
        padding: var(--spacing-small) 3.5rem var(--spacing-small) var(--spacing-normal) !important;
        background-color: var(--back) !important;
        border: 2px solid var(--back-more) !important;
        border-radius: var(--radius-small) !important;
        color: var(--front) !important;
        font-family: var(--font-family) !important;
        font-size: var(--font-normal) !important;
        transition: var(--transition) !important;
        box-shadow: var(--shadow) !important;
        margin: 0 !important;
    }
    ::slotted(input:focus) {
        outline: none !important;
        border-color: var(--spice) !important;
        box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1), var(--shadow) !important;
    }
    ::slotted(input::placeholder) {
        color: var(--front-less) !important;
    }
    .-search-input-wrapper::after {
        content: "🔍";
        position: absolute;
        right: var(--spacing-normal);
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        font-size: 1.2rem;
    }
    .-search-results {
        background: var(--back);
        border-radius: var(--radius-normal);
        overflow-y: auto;
        box-shadow: var(--shadow);
        max-height: 300px;
        border: 2px solid var(--back-more);
    }
    ::slotted(*) {
        padding: var(--spacing-small) var(--spacing-normal) !important;
        border-bottom: 1px solid var(--back-more) !important;
        transition: var(--transition) !important;
        cursor: pointer !important;
        display: block !important;
        margin: 0 !important;
        background: transparent !important;
    }
    ::slotted(*:last-child) {
        border-bottom: none !important;
    }
    ::slotted(*:hover) {
        background-color: var(--back-more) !important;
    }
`
