import { html } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class LinkList extends Component {

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
        background: var(--back-more);
        border-radius: var(--radius-normal);
        overflow: hidden;
        box-shadow: var(--shadow);
    }
    ::slotted(a) {
        display: flex !important;
        align-items: center !important;
        padding: var(--spacing-normal) var(--spacing-large) !important;
        color: var(--front) !important;
        text-decoration: none !important;
        border-bottom: 1px solid var(--back) !important;
        transition: var(--transition) !important;
        position: relative !important;
        gap: var(--spacing-small) !important;
    }
    ::slotted(a:last-child) {
        border-bottom: none !important;
    }
    ::slotted(a::before) {
        content: "→" !important;
        color: var(--spice) !important;
        opacity: 0 !important;
        transform: translateX(-10px) !important;
        transition: all 0.3s ease !important;
    }
    ::slotted(a:hover) {
        background: var(--back) !important;
        padding-left: calc(var(--spacing-large) + var(--spacing-small)) !important;
        color: var(--spice) !important;
    }
    ::slotted(a:hover::before) {
        opacity: 1 !important;
        transform: translateX(0) !important;
    }
    ::slotted(a::after) {
        display: none !important;
    }
    ::slotted(a.active) {
        background: var(--back) !important;
        color: var(--spice) !important;
        border-left: 4px solid var(--spice) !important;
    }
`
