import { html } from "sam-lib";
import { Component } from "../../utils/Component";

const style = `
    :host {
        display: grid;
        grid-template-areas: "stack";
    }
    
    ::slotted(*) {
        grid-area: stack;
    }
`;

/**
 * StackBox - Place tous les enfants les uns sur les autres
 * Utile pour créer des overlays, des cartes avec contenu superposé, etc.
 */
export class StackBox extends Component {
    readonly element: HTMLElement;
    
    constructor() {
        super();
        
        this.element = document.createElement('div');
        this.element.attachShadow({ mode: 'open' }).append(html`
            <style>${style}</style>
            <slot></slot>
        `);
    }
}
