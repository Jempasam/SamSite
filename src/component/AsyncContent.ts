import { html } from "sam-lib"
import { Component } from "../utils/Component"
import { Spinner } from "./Spinner"

export class AsyncContent extends Component {

    element: HTMLDivElement
    private shadowRoot: ShadowRoot
    private spinner: Spinner

    constructor(loadFn: () => Promise<Node | string>, readonly simplified: boolean = false) {
        super()
        
        this.element = document.createElement('div')
        this.shadowRoot = this.element.attachShadow({mode: 'open'})
        
        // Créer le spinner
        this.spinner = new Spinner('medium')
        
        // Ajouter les styles
        this.shadowRoot.appendChild(html.a`<style>${style}</style>`)
        
        // Créer la structure directement dans le shadow DOM pour le loading
        const container = document.createElement('div')
        container.className = '-container'
        
        const loadingDiv = document.createElement('div')
        loadingDiv.className = '-loading'
        loadingDiv.appendChild(this.spinner.element)
        
        if(!simplified){
            const loadingText = document.createElement('p')
            loadingText.className = '-loading-text'
            loadingText.textContent = 'Chargement...'
            loadingDiv.appendChild(loadingText)
        }

        loadingDiv.classList.toggle('-simplified', simplified)
        
        container.appendChild(loadingDiv)
        this.shadowRoot.appendChild(container)
        
        // Démarrer le chargement
        this.load(loadFn, loadingDiv, container)
    }

    private async load(loadFn: () => Promise<Node | string>, loadingDiv: HTMLElement, container: HTMLElement) {
        try {
            const result = await loadFn()
            
            // Animation de transition du loading
            loadingDiv.style.animation = 'fadeOut 0.3s ease'
            
            setTimeout(() => {
                let newElement
                if (typeof result === 'string') {
                    newElement = document.createElement('div')
                    newElement.innerHTML = result
                } else {
                    newElement = result
                }
                    
                const parent = this.element.parentNode
                if (parent) {
                    parent.replaceChild(newElement, this.element)
                }

                this.element = newElement as HTMLDivElement
            }, 300)
            
        } catch (error) {
            loadingDiv.innerHTML = `
                <div class="-error">
                    <p class="-error-icon">⚠</p>
                    <p class="-error-text">Erreur de chargement</p>
                    <p class="-error-details">${error instanceof Error ? error.message : 'Erreur inconnue'}</p>
                </div>
            `
            console.error('Error loading AsyncContent:', error)
        }
    }
}

const style = /*css*/`
    :host {
        display: block !important;
    }

    .-container {
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
    .-loading.-simplified{
        padding: 0;
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
