import { html } from "sam-lib"
import { Component } from "../utils/Component"
import { PageBase } from "../part/PageBase"
import { Page } from "../component/Router"

export class HomePage extends Component {
    element: Node

    constructor(pageId: string, pages: Page[]) {
        super()

        const content = html.a`
            <section id="home">
                <h2>Bienvenue sur mon site</h2>
                <p>Ceci est un site de démonstration utilisant TypeScript avec Vite et un système de routing.</p>
                
                <h3>Navigation</h3>
                <ul>
                    <li><a href="#/home">Accueil</a></li>
                    <li><a href="#/wam">Web Audio Modules</a></li>
                    <li><a href="#/wam/123">WAM Detail (exemple avec ID 123)</a></li>
                    <li><a href="#/layouts">Composants de Layout</a></li>
                    <li><a href="#/about">À propos</a></li>
                </ul>

                <h3>Fonctionnalités</h3>
                <p>Ce site démontre :</p>
                <ul>
                    <li>Routing avec patterns flexibles (strings et regex)</li>
                    <li>Web Components avec Shadow DOM</li>
                    <li>Composants réutilisables (Spinner, AsyncContent, Toast, Modal, etc.)</li>
                    <li>Composants de layout (HBox, VBox, FlowBox, GridBox, etc.)</li>
                    <li>Architecture modulaire avec pages</li>
                </ul>
            </section>
        `

        const pageBase = new PageBase("home", content)
        this.element = pageBase.element
    }
}
