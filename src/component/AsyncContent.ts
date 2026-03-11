import { html } from "sam-lib";
import { Component } from "../utils/Component";
import { Spinner } from "./Spinner";

export class AsyncContent extends Component {

    readonly element: HTMLDivElement;
    private shadowRoot: ShadowRoot;
    private spinner: Spinner;

    constructor(loadFn: () => Promise<Node | string>) {
        super();
        
        this.element = document.createElement('div');
        this.shadowRoot = this.element.attachShadow({mode: 'open'});
        
        // Créer le spinner
        this.spinner = new Spinner('medium');
        
        // Ajouter les styles
        this.shadowRoot.appendChild(html.a`<style>${style}</style>`);
        
        // Créer la structure directement dans le shadow DOM pour le loading
        const container = document.createElement('div');
        container.className = '-container';
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = '-loading';
        loadingDiv.appendChild(this.spinner.element);
        
        const loadingText = document.createElement('p');
        loadingText.className = '-loading-text';
        loadingText.textContent = 'Chargement...';
        loadingDiv.appendChild(loadingText);
        
        container.appendChild(loadingDiv);
        this.shadowRoot.appendChild(container);
        
        // Démarrer le chargement
        this.load(loadFn, loadingDiv, container);
    }

    private async load(loadFn: () => Promise<Node | string>, loadingDiv: HTMLElement, container: HTMLElement) {
        try {
            const result = await loadFn();
            
            // Animation de transition du loading
            loadingDiv.style.animation = 'fadeOut 0.3s ease';
            
            setTimeout(() => {
                // Remplacer complètement l'élément AsyncContent par le contenu chargé
                const parent = this.element.parentNode;
                if (parent) {
                    if (typeof result === 'string') {
                        // Créer un conteneur temporaire pour le HTML string
                        const temp = document.createElement('div');
                        temp.innerHTML = result;
                        // Remplacer par les enfants du conteneur
                        while (temp.firstChild) {
                            parent.insertBefore(temp.firstChild, this.element);
                        }
                    } else {
                        // Insérer le node directement avant l'élément actuel
                        parent.insertBefore(result, this.element);
                    }
                    // Supprimer l'élément AsyncContent
                    parent.removeChild(this.element);
                }
            }, 300);
            
        } catch (error) {
            loadingDiv.innerHTML = `
                <div class="-error">
                    <p class="-error-icon">⚠</p>
                    <p class="-error-text">Erreur de chargement</p>
                    <p class="-error-details">${error instanceof Error ? error.message : 'Erreur inconnue'}</p>
                </div>
            `;
        }
    }
}

const style = /*css*/`
    :host {
        display: block !important;
    }
    .-container {
        min-height: 100px;
        position: relative;
    }
    .-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-normal);
        padding: var(--spacing-large);
    }
    .-loading-text {
        color: var(--front-less);
        font-size: var(--font-normal);
        margin: 0;
        font-weight: 500;
    }
    .-content {
        display: block;
    }
    .-content.-hidden {
        display: none !important;
    }
    .-content:not(.-hidden) {
        animation: fadeIn 0.3s ease;
    }
    .-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-small);
        padding: var(--spacing-large);
        background: var(--back-more);
        border-radius: var(--radius-normal);
        border: 2px solid #ef4444;
    }
    .-error-icon {
        font-size: 2rem;
        color: #ef4444;
        margin: 0;
    }
    .-error-text {
        color: var(--front);
        font-weight: 600;
        margin: 0;
    }
    .-error-details {
        color: var(--front-less);
        font-size: var(--font-tiny);
        margin: 0;
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`
