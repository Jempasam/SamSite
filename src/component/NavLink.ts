import { Component } from "../utils/Component";

export class NavLink extends Component {
    readonly element: HTMLSpanElement;
    private link: HTMLAnchorElement;
    private textNode: Text;
    private arrowText: Text;
    
    constructor(text: string, href: string) {
        super();
        
        this.element = document.createElement('span');
        
        this.link = document.createElement('a');
        this.link.href = href;
        
        this.arrowText = document.createTextNode('← ');
        this.textNode = document.createTextNode(text);
        
        this.link.append(this.arrowText, this.textNode);
        this.element.appendChild(this.link);
    }
    
    set reverse(value: boolean) {
        if (value) {
            this.arrowText.textContent = ' →';
            this.link.textContent = '';
            this.link.append(this.textNode, this.arrowText);
        } else {
            this.arrowText.textContent = '← ';
            this.link.textContent = '';
            this.link.append(this.arrowText, this.textNode);
        }
    }
    
    set alignRight(value: boolean) {
        if (value) {
            this.element.style.display = 'block';
            this.element.style.textAlign = 'right';
        } else {
            this.element.style.display = '';
            this.element.style.textAlign = '';
        }
    }
}
