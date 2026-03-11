import { html } from "sam-lib"
import { Component } from "../utils/Component"


const menus = {
    "home": "Accueil",
    "wam": "Web Audio Modules",
    "layouts": "Layouts",
    "about": "À propos"
}

export class PageBase extends Component{

    element: DocumentFragment

    constructor(
        readonly name: string,
        readonly main: Node,
    ){
        super()
        this.element = html`
            <header>
                <div class="header-container">
                    <h1>Le site de Sam</h1>
                    <nav class="menu">
                        ${function*(){
                            for(const [id, label] of Object.entries(menus)){
                                const isSelected = id === name
                                yield html.a`<a href="/${id}" class="menu-item ${isSelected?"selected":""}">${label}</a>`
                            }
                        }}
                    </nav>
                </div>
            </header>
            <main>
                ${main}
            </main>
            <footer>
                <p>&copy; 2026 Le site de Sam. Tous droits réservés.</p>
            </footer>
        `
        console.log(this.element)
    }
}