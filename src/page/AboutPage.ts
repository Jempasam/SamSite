import { html } from "sam-lib"
import { Component } from "../utils/Component"
import { PageBase } from "../part/PageBase"
import { Page } from "../component/Router"
import { NavLink } from "../component/NavLink"

export class AboutPage extends Component {
    element: Node

    constructor(pageId: string, pages: Page[]) {
        super()

        const content = html.a`
            <section id="about">
                <h2>À propos</h2>
                
                <div style="padding: var(--spacing-large); background: var(--back-more); border-radius: var(--radius-normal); margin: var(--spacing-normal) 0;">
                    <h3 style="color: var(--spice);">Le site de Sam</h3>
                    <p>Site de démonstration construit avec TypeScript, Vite, et Web Components.</p>
                </div>

                <h3>Technologies utilisées</h3>
                <ul>
                    <li><strong>TypeScript</strong> - Typage statique pour JavaScript</li>
                    <li><strong>Vite</strong> - Build tool rapide et moderne</li>
                    <li><strong>Web Components</strong> - Shadow DOM pour l'encapsulation</li>
                    <li><strong>sam-lib</strong> - Bibliothèque de templating HTML</li>
                </ul>

                <h3>Composants disponibles</h3>
                <ul>
                    <li>Router - Système de routing avec patterns</li>
                    <li>AsyncContent - Chargement asynchrone avec spinner</li>
                    <li>Toast - Notifications temporaires</li>
                    <li>Modal - Dialogues overlay</li>
                    <li>Tabs - Système d'onglets</li>
                    <li>Et beaucoup d'autres...</li>
                </ul>

                ${new NavLink('Retour à l\'accueil', '#/home').element}
            </section>
        `

        const pageBase = new PageBase("about", content)
        this.element = pageBase.element
    }
}
