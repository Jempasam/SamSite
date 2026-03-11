import { html } from "sam-lib";
import { Component, shadow } from "../utils/Component";

export class ItemCard extends Component{

    readonly element = shadow(
        "div",
        html`
            <style>${style}</style>
            <slot></slot>
        `,
        html`
        `
    )

}

const style = /*css*/`
    *, ::slotted(*) {
        margin: 0 !important;
    }
    
    :host {

        width: 21rem;
        height: 25rem;

        padding: var(--spacing-small) !important;
        border-radius: var(--radius-normal);

        background: var(--back);
        box-shadow: var(--shadow);
        transition: var(--transition);

        display: flex;
        flex-direction: column;
    }

    :host(:hover) {
        box-shadow: var(--shadow-large);
        transform: translateY(-4px);
    }

    ::slotted(h4){
        margin-bottom: var(--spacing-tiny) !important;
        font-size: var(--font-large) !important;
    }

    ::slotted(img){
        width: 100% !important;
        height: 50% !important;
        object-fit: contain !important;
        box-shadow: none !important;
    }

    ::slotted(p){
        text-align: justify !important;
        font-size: var(--font-tiny) !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        padding-top: var(--spacing-tiny) !important;
        max-height: 6rem !important;
    }

    ::slotted(span){
        font-style: italic !important;
        font-size: var(--font-tiny) !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        padding-top: var(--spacing-tiny) !important;

        color: var(--front);

        text-align: right !important;
    }

    ::slotted(ul){
        display: flex;
        justify-content: space-around;
        list-style: none !important;
        width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;

        font-size: var(--font-tiny) !important;

        font-style: italic !important;
        font-weight: bold !important;
    }

    ::slotted(a:last-child){
        margin-top: auto !important;
        width: fit-content !important;
    }
`

