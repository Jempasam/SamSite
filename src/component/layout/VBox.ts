import { html } from "sam-lib";
import { Component } from "../../utils/Component";

const style = `
    :host {
        display: flex;
        flex-direction: column;
        gap: var(--gap, 1rem);
        align-items: var(--align, stretch);
        justify-content: var(--justify, flex-start);
    }
`;

export class VBox extends Component {
    readonly element: HTMLElement;
    
    constructor() {
        super();
        
        this.element = document.createElement('div');
        this.element.attachShadow({ mode: 'open' }).append(html`
            <style>${style}</style>
            <slot></slot>
        `);
    }
    
    set gap(value: string) {
        this.element.style.setProperty('--gap', value);
    }
    
    set align(value: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline') {
        this.element.style.setProperty('--align', value);
    }
    
    set justify(value: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly') {
        this.element.style.setProperty('--justify', value);
    }
}
