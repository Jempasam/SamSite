import { HtmlTemplateComponent } from "sam-lib";


export abstract class Component implements HtmlTemplateComponent {

    abstract element: Node;

    setTemplateAttr(name: string, value: string): boolean {
        const prototype = Object.getPrototypeOf(this)
        const prop = Object.getOwnPropertyDescriptor(prototype, name)
        if(prop?.set){
            prop.set.call(this, value)
            return true
        }
        return false
    }
}

export function shadow<K extends keyof HTMLElementTagNameMap>(element: K, shadowDom: Node, visibleDom: Node): HTMLElementTagNameMap[K] {
    const el = document.createElement(element)
    el.attachShadow({mode: "closed"}).append(shadowDom)
    el.append(visibleDom)
    return el
}