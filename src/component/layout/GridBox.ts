import { html } from "sam-lib";
import { Component } from "../../utils/Component";

const style = `
    :host {
        display: grid;
        gap: var(--gap, 1rem);
        grid-template-columns: var(--columns, repeat(auto-fit, minmax(250px, 1fr)));
        grid-template-rows: var(--rows, auto);
        align-items: var(--align, stretch);
        justify-items: var(--justify, stretch);
    }
`;

export class GridBox extends Component {
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
    
    set columns(value: string) {
        this.element.style.setProperty('--columns', value);
    }
    
    set rows(value: string) {
        this.element.style.setProperty('--rows', value);
    }
    
    set align(value: 'stretch' | 'start' | 'end' | 'center') {
        this.element.style.setProperty('--align', value);
    }
    
    set justify(value: 'stretch' | 'start' | 'end' | 'center') {
        this.element.style.setProperty('--justify', value);
    }
}
