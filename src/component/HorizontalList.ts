import { html } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class HorizontalList extends Component {

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
        width: 100%;
        margin: var(--spacing-normal) 0;
        background: var(--back);
        padding: var(--spacing-tiny) !important;
        border-radius: var(--radius-normal);
        box-shadow: var(--shadow);
        overflow: hidden;
    }
    .-container {
        display: flex;
        gap: var(--spacing-normal);
        overflow-x: auto;
        overflow-y: hidden;
        scroll-behavior: smooth;
        padding-bottom: var(--spacing-tiny);
        scrollbar-width: thin;
        scrollbar-color: var(--spice) var(--back-more);
        border-radius: var(--radius-normal);
    }
    ::slotted(*) {
        flex-shrink: 0;
        min-width: 280px;
        max-width: 400px;
    }
`
