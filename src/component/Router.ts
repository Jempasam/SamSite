import { html } from "sam-lib";
import { Component } from "../utils/Component";

export type RoutePattern = (string | RegExp)[];

export interface Page {
    name: string;
    pattern: RoutePattern;
    factory: (pageId: string, variable: string[], pages: Page[]) => Component;
}

export class Router extends Component {
    readonly element: DocumentFragment;
    private currentComponent: Component | null = null;
    private container: HTMLElement | null = null;

    constructor(
        private root: string,
        private pages: Page[],
        private defaultPage?: Page
    ) {
        super();
        this.element = html``;

        // Écouter les changements de hash
        window.addEventListener('hashchange', () => this.navigate());
        
        // Navigation initiale
        this.navigate();
    }

    private buildRegex(pattern: RoutePattern): RegExp {
        const parts = pattern.map(part => {
            if (typeof part === 'string') {
                return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            } else {
                return part.source
            }
        })
        const regexString = '^\/' + parts.join('\\/') + '$';
        return new RegExp(regexString);
    }

    private matchRoute(path: string): { page: Page; pageId: string, matches: string[] } | null {

        if(path.startsWith(this.root)) path = path.slice(this.root.length)
        
        for (const page of this.pages) {
            const regex = this.buildRegex(page.pattern)
            const match = path.match(regex)
            
            if (match) {
                return { page, pageId: path, matches: match };
            }
        }
        
        return null;
    }

    private navigate() {
        const path = window.location.pathname
        let match = this.matchRoute(path);
        
        // Si aucune route ne correspond, utiliser la page par défaut
        if (!match && this.defaultPage) {
            match = { page: this.defaultPage, pageId: path, matches: [] };
        }
        
        if (match) {
            // Obtenir le conteneur après la première navigation
            if (!this.container && this.currentComponent) {
                this.container = this.getContainer();
            }
            
            if (this.currentComponent && this.container) {
                this.container.innerHTML = '';
            }
            
            this.currentComponent = match.page.factory(match.pageId, match.matches.slice(1), this.pages);
            
            if (this.container) {
                this.container.appendChild(this.currentComponent.element);
            } else {
                this.element.appendChild(this.currentComponent.element);
            }
        }
    }
    
    /**
     * Obtient le conteneur après que l'élément soit appendé au DOM
     */
    private getContainer(): HTMLElement | null {
        // Le DocumentFragment est vide après avoir été appendé, donc on récupère le parent
        if (this.currentComponent) {
            let node = this.currentComponent.element.parentNode;
            while (node && node.nodeType !== Node.ELEMENT_NODE) {
                node = node.parentNode;
            }
            return node as HTMLElement;
        }
        return null;
    }

    /**
     * Navigation programmatique
     */
    navigateTo(pageId: string) {
        window.location.hash = '#' + pageId;
    }

    /**
     * Obtenir la page courante
     */
    getCurrentPage(): Page | null {
        const hash = window.location.hash;
        const match = this.matchRoute(hash);
        return match?.page || null;
    }
}
