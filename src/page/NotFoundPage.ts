import { html } from "sam-lib"
import { Component } from "../utils/Component"
import { PageBase } from "../part/PageBase"
import { Page } from "../component/Router"
import { NavLink } from "../component/NavLink"

export class NotFoundPage extends Component {
    element: Node

    constructor(pageId: string, pages: Page[]) {
        super()

        const content = html.a`
            <section id="not-found">
                <h2>404 - Page non trouvée</h2>
                <p>La page que vous recherchez n'existe pas.</p>
                
                <h3>Pages disponibles</h3>
                <ul>
                    <li><a href="#/home">Accueil</a></li>
                    <li><a href="#/wam">Web Audio Modules</a></li>
                    <li><a href="#/layouts">Composants de Layout</a></li>
                    <li><a href="#/about">À propos</a></li>
                </ul>
                
                ${new NavLink('Retour à l\'accueil', '#/home').element}
            </section>
        `

        const pageBase = new PageBase("not-found", content)
        this.element = pageBase.element
    }
}
