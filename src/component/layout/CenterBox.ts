import { html } from "sam-lib";
import { Component } from "../../utils/Component";

const style = `
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: var(--min-height, auto);
        padding: var(--padding, 0);
    }
`;

export class CenterBox extends Component {
    readonly element: HTMLElement;
    
    constructor() {
        super();
        
        this.element = document.createElement('div');
        this.element.attachShadow({ mode: 'open' }).append(html`
            <style>${style}</style>
            <slot></slot>
        `);
    }
    
    set minHeight(value: string) {
        this.element.style.setProperty('--min-height', value);
    }
    
    set padding(value: string) {
        this.element.style.setProperty('--padding', value);
    }
}
