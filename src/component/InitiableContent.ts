import { html } from "sam-lib";
import { Component } from "../utils/Component";

const style = `
    .-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-normal, 1.5rem);
    }

    .-init-button {
        width: 100%;
        padding: var(--spacing-huge, 3rem) var(--spacing-large, 2rem);
        background: linear-gradient(135deg, var(--back-more, #303030) 0%, var(--back, #242424) 100%);
        border: 2px solid var(--back-more, #303030);
        border-radius: var(--radius-normal, 8px);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-normal, 1.5rem);
    }

    .-init-button:hover {
        border-color: var(--spice, #ff8c42);
        background: linear-gradient(135deg, var(--back, #242424) 0%, var(--back-more, #303030) 100%);
        transform: translateY(-2px);
        box-shadow: var(--shadow-large, 0 4px 16px rgba(0, 0, 0, 0.5));
    }

    .-init-button:active {
        transform: translateY(0);
    }

    .-init-icon {
        font-size: 3rem;
        color: var(--spice, #ff8c42);
        margin: 0;
    }

    .-init-text {
        font-size: var(--font-large, 20px);
        font-weight: 600;
        color: var(--front, #e8e8e8);
        margin: 0;
    }

    .-init-description {
        font-size: var(--font-normal, 16px);
        color: var(--front-less, #b0b0b0);
        margin: 0;
        text-align: center;
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;

export class InitiableContent extends Component {

    readonly element: HTMLDivElement;
    private shadowRoot: ShadowRoot;

    constructor(
        initFn: () => Node | string | Promise<Node | string>,
        options: {
            icon?: string;
            text?: string;
            description?: string;
        } = {}
    ) {
        super();
        
        const {
            icon = '▶',
            text = 'Initialiser',
            description = 'Cliquez pour charger le contenu'
        } = options;
        
        this.element = document.createElement('div');
        this.shadowRoot = this.element.attachShadow({mode: 'open'});
        
        // Ajouter les styles
        this.shadowRoot.appendChild(html.a`<style>${style}</style>`);
        
        // Créer la structure
        const container = document.createElement('div');
        container.className = '-container';
        
        const button = document.createElement('button');
        button.className = '-init-button';
        button.type = 'button';
        
        const iconEl = document.createElement('p');
        iconEl.className = '-init-icon';
        iconEl.textContent = icon;
        
        const textEl = document.createElement('p');
        textEl.className = '-init-text';
        textEl.textContent = text;
        
        const descEl = document.createElement('p');
        descEl.className = '-init-description';
        descEl.textContent = description;
        
        button.appendChild(iconEl);
        button.appendChild(textEl);
        button.appendChild(descEl);
        container.appendChild(button);
        this.shadowRoot.appendChild(container);
        
        // Gérer le clic
        button.addEventListener('click', () => this.initialize(initFn, container));
    }

    private async initialize(
        initFn: () => Node | string | Promise<Node | string>,
        container: HTMLElement
    ) {
        try {
            // Animation de transition
            container.style.animation = 'fadeOut 0.3s ease';
            
            // Attendre la fin de l'animation
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Exécuter la fonction d'initialisation
            const result = await initFn();
            
            // Remplacer complètement l'élément InitiableContent par le contenu initialisé
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
                // Supprimer l'élément InitiableContent
                parent.removeChild(this.element);
            }
            
        } catch (error) {
            // En cas d'erreur, afficher un message d'erreur
            container.innerHTML = `
                <div class="-init-button" style="cursor: default; border-color: #f44336;">
                    <p class="-init-icon" style="color: #f44336;">⚠</p>
                    <p class="-init-text">Erreur d'initialisation</p>
                    <p class="-init-description">${error instanceof Error ? error.message : 'Erreur inconnue'}</p>
                </div>
            `;
        }
    }
}
