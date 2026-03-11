import { html } from "sam-lib";
import { Component } from "../utils/Component";

const style = `
    :host {
        display: inline-flex;
        align-items: stretch;
        background-color: var(--back-less);
        border-radius: var(--radius-small);
        overflow: hidden;
    }

    .status-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-tiny);
        background: var(--back);
        min-width: 2.5rem;
        font-size: 1.5rem;
        transition: all 0.3s ease;
    }

    .status-indicator.active {
        background: var(--spice);
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--spacing-tiny) var(--spacing-small);
        gap: 0.25rem;
        min-width: 100px;
    }

    .label {
        font-size: var(--font-tiny);
        font-weight: 600;
        color: var(--front);
        margin: 0;
    }

    .state {
        font-size: var(--font-tiny);
        color: var(--front-less);
        margin: 0;
    }

    .state.active {
        color: var(--spice);
    }

    .state.error {
        color: #f44336;
    }

    button {
        align-self: stretch;
        padding: 0 var(--spacing-small);
        background: var(--back);
        color: var(--front-less);
        border: none;
        cursor: pointer;
        font-size: var(--font-normal);
        font-weight: 600;
        transition: all 0.2s ease;
        min-width: 70px;
    }

    button:hover {
        background: var(--spice);
        color: var(--back);
    }

    button:active {
        transform: scale(0.98);
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    button.active {
        background: var(--spice-more);
        color: var(--back);
    }

    button.active:hover {
        background: #c95e25;
    }
`;

export class Microphone extends Component {
    readonly element: HTMLElement;
    private shadowRoot: ShadowRoot;
    
    private stream: MediaStream | null = null;
    private audioContext: AudioContext | null = null;
    private sourceNode: MediaStreamAudioSourceNode | null = null;
    private isActive: boolean = false;
    private isChanging: boolean = false;
    
    private indicatorElement: HTMLElement;
    private stateElement: HTMLElement;
    private button: HTMLButtonElement;
    
    // Callbacks
    onStart: ((source: MediaStreamAudioSourceNode) => void) | null = null;
    onEnd: (() => void) | null = null;

    constructor(audioContext?: AudioContext) {
        super();
        this.audioContext = audioContext || null;
        
        this.element = document.createElement('div');
        this.shadowRoot = this.element.attachShadow({ mode: 'open' });
        
        this.shadowRoot.append(html`
            <style>${style}</style>
            <div class="status-indicator">🎤</div>
            <div class="info">
                <p class="label">Microphone</p>
                <p class="state">Prêt</p>
            </div>
            <button type="button">Démarrer</button>
        `);

        this.indicatorElement = this.shadowRoot.querySelector('.status-indicator')!;
        this.stateElement = this.shadowRoot.querySelector('.state')!;
        this.button = this.shadowRoot.querySelector('button')!;

        this.button.addEventListener('click', () => this.toggle());
    }

    private async toggle() {
        if (this.isChanging) return;
        
        if (this.isActive) {
            await this.stop();
        } else {
            await this.start();
        }
    }

    async start(): Promise<void> {
        if (this.isActive || this.isChanging) return;

        try {
            this.isChanging = true;
            this.button.disabled = true;
            this.stateElement.textContent = 'Accès...';

            // Demander la permission et obtenir le flux audio
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            // Créer le contexte audio si nécessaire
            if (!this.audioContext) {
                this.audioContext = new AudioContext();
            }

            // Créer le source node
            this.sourceNode = this.audioContext!.createMediaStreamSource(this.stream);

            // Mettre à jour l'état
            this.isActive = true;
            this.indicatorElement.classList.add('active');
            this.stateElement.classList.add('active');
            this.stateElement.classList.remove('error');
            this.stateElement.textContent = 'Actif';
            this.button.classList.add('active');
            this.button.textContent = 'Arrêter';
            this.button.disabled = false;

            // Appeler le callback onStart
            if (this.onStart && this.sourceNode) {
                this.onStart(this.sourceNode);
            }

        } catch (error) {
            console.error('Erreur lors du démarrage du microphone:', error);
            this.stateElement.classList.add('error');
            this.stateElement.textContent = 'Erreur';
            this.button.disabled = false;
            throw error;
        } finally {
            this.isChanging = false;
        }
    }

    async stop(): Promise<void> {
        if (!this.isActive || this.isChanging) return;

        try {
            this.isChanging = true;
            
            // Arrêter toutes les pistes du flux
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.stream = null;
            }

            // Déconnecter le source node
            if (this.sourceNode) {
                this.sourceNode.disconnect();
                this.sourceNode = null;
            }

            // Mettre à jour l'état
            this.isActive = false;
            this.indicatorElement.classList.remove('active');
            this.stateElement.classList.remove('active');
            this.stateElement.textContent = 'Arrêté';
            this.button.classList.remove('active');
            this.button.textContent = 'Démarrer';
            this.button.disabled = false;

            // Appeler le callback onEnd
            if (this.onEnd) {
                this.onEnd();
            }

        } catch (error) {
            console.error('Erreur lors de l\'arrêt du microphone:', error);
            throw error;
        } finally {
            this.isChanging = false;
        }
    }
}
