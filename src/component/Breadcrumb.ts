import { html } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class Breadcrumb extends Component {

    readonly element = shadow(
        "nav",
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
        margin: var(--spacing-normal) 0;
    }
    .-container {
        display: flex;
        align-items: center;
        gap: var(--spacing-small);
        padding: var(--spacing-small) var(--spacing-normal);
        background: var(--back-more);
        border-radius: var(--radius-small);
        font-size: var(--font-tiny);
    }
    ::slotted(a) {
        color: var(--spice) !important;
        text-decoration: none !important;
        transition: var(--transition) !important;
        position: relative !important;
    }
    ::slotted(a:hover) {
        color: var(--spice-more) !important;
    }
    ::slotted(a::after) {
        display: none !important;
    }
    ::slotted(span) {
        color: var(--front-less) !important;
    }
    ::slotted(.separator) {
        color: var(--front-less) !important;
        user-select: none !important;
    }
`
