import { html } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class Tabs extends Component {

    readonly element = shadow(
        "div",
        html`
            <style>${style}</style>
            <div class="-tabs-header">
                <slot name="headers"></slot>
                <div class="-indicator"></div>
            </div>
            <div class="-tabs-content">
                <slot name="content"></slot>
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
    .-tabs-header {
        position: relative;
        display: flex;
        gap: var(--spacing-tiny);
        background: transparent;
        padding: 0;
    }
    ::slotted([slot="headers"]) {
        position: relative;
        flex: 1;
        padding: var(--spacing-normal) var(--spacing-large) !important;
        background: var(--back) !important;
        color: var(--front-less) !important;
        border: 2px solid transparent !important;
        border-radius: var(--radius-normal) var(--radius-normal) 0 0 !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        font-weight: 500 !important;
        text-align: center !important;
        margin: 0 !important;
        margin-bottom: -2px !important;
        z-index: 0 !important;
    }
    ::slotted([slot="headers"]:hover) {
        background: var(--back-more) !important;
        color: var(--front) !important;
    }
    ::slotted([slot="headers"].active) {
        background: var(--back-more) !important;
        color: var(--spice) !important;
        border: 2px solid var(--spice) !important;
        border-bottom: 2px solid var(--back-more) !important;
        font-weight: 700 !important;
        z-index: 2 !important;
        box-shadow: 0 -3px 8px rgba(255, 140, 66, 0.3) !important;
        transform: translateY(2px) !important;
    }
    ::slotted([slot="headers"].active:hover) {
        transform: translateY(2px) !important;
    }
    .-indicator {
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 3px;
        background: var(--spice);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 2px 2px 0 0;
    }
    .-tabs-content {
        position: relative;
        background: var(--back-more);
        padding: var(--spacing-large);
        border-radius: 0 var(--radius-normal) var(--radius-normal) var(--radius-normal);
        border: 2px solid var(--spice);
        min-height: 150px;
        z-index: 1;
    }
    .-tabs-content ::slotted(*) {
        display: none !important;
        line-height: var(--line-height) !important;
    }
    .-tabs-content ::slotted(.active) {
        display: block !important;
        animation: slideUp 0.3s ease !important;
    }
    .-tabs-content ::slotted(*) h4 {
        color: var(--spice) !important;
        margin-bottom: var(--spacing-small) !important;
        font-size: var(--font-large) !important;
    }
    .-tabs-content ::slotted(*) p {
        color: var(--front) !important;
        margin: 0 !important;
    }
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
