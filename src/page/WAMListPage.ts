import { Component } from "../utils/Component";
import { PageBase } from "../part/PageBase";
import { Page } from "../component/Router";
import { html } from "sam-lib";
import { FlowBox } from "../component/layout";
import { Card } from "../component/Card";
import { AsyncContent } from "../component/AsyncContent";
import { getModules } from "../model/modules";
import { root } from "../model/root";



export class WAMListPage extends Component {
    element: Node;

    constructor(pageId: string, pages: Page[]) {
        super()

        async function createList(){
            const list = await getModules()
        
            // list
            return html.a`
                <${new FlowBox()}>
                    ${function*(){
                        for(const item of list){
                            let card = new Card()
                            card.eimg.style.objectFit = 'contain'
                            card.eimg.style.maxHeight = '400px'
                            card.etext.style.overflow = 'hidden'
                            yield html.a`
                                <${card}
                                    title="${item.name}"
                                    text="${item.desc}"
                                    img="${item.img}"
                                    link="${root}/wam/${item.id}"
                                    style="width: 49%;"
                                ></div>
                            `
                        }
                    }}
                </div>
            `
        }

        const content = html`
            <section>
                <h2>Web Audio Modules</h2>
                <p>Découvrez les derniers plugins audio pour le web, créés par la communauté Web Audio Modules. Explorez une variété de modules, des synthétiseurs aux effets, tous conçus pour fonctionner directement dans votre navigateur.</p>
                ${new AsyncContent(createList)}
            </section>
        `

        
        const pageBase = new PageBase("wam", content)
        this.element = pageBase.element;
    }
}
