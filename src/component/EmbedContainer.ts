import { html } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class EmbedContainer extends Component {

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
        margin: var(--spacing-normal) 0;
        padding: var(--spacing-normal);
        background: var(--back-less);
        border-radius: var(--radius-normal);
        border: 2px solid var(--back-more);
        box-shadow: var(--shadow);
        transition: var(--transition);
    }
    .-container {
        width: 100%;
        box-sizing: border-box;
        min-height: 200px;
        padding: var(--spacing-large);
        text-align: center;
        background: var(--back);
        border-radius: var(--radius-small);
        border: 2px dashed var(--spice);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        position: relative;
        overflow: scroll;
        box-shadow: inset 0 2px 12px rgba(0, 0, 0, 0.4);
    }
    .-container::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at center, rgba(255, 140, 66, 0.05) 0%, transparent 70%);
        opacity: 0;
        transition: var(--transition);
    }
    ::slotted(*){
        max-width: 100%;
        max-height: 100%;
    }
`
