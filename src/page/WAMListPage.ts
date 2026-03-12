import { Component } from "../utils/Component";
import { PageBase } from "../part/PageBase";
import { Page } from "../component/Router";
import { get, html } from "sam-lib";
import { FlowBox } from "../component/layout";
import { Card } from "../component/Card";
import { AsyncContent } from "../component/AsyncContent";
import { getModules } from "../model/modules";
import { root } from "../model/root";
import { ItemCard } from "../part/ItemCard";
import { getPresets } from "../model/presets";



export class WAMListPage extends Component {
    element: Node;

    constructor(pageId: string, pages: Page[]) {
        super()


        // FILL LIST
        let searched = ""

        let container = html.a`<section></section>`

        let promise = Promise.resolve() as Promise<any>
        
        function createList(){
            promise = promise.then(async()=>{
                const list = await getModules()
            
                container.replaceChildren(html.a`
                    <${new FlowBox()}>
                        ${function*(){
                            for(const item of list){
                                let async = new AsyncContent(async()=>{
                                    let info = await item.get()
                                    
                                    let searchtext = (info.name+" "+info.description+" "+info.identifier+" "+info.vendor+" "+info.keywords.join(" ")).toLowerCase()
                                    if(!searchtext.includes(searched)) return html``

                                    return html.a`
                                        <${new ItemCard()}>
                                            <h4>${info.name}</h4>
                                            <img src="${info.thumbnail}" alt="${info.name}"> </img>
                                            <ul>
                                                ${info.keywords.map(k=>html.a`<li>${k}</li>`)}
                                            </ul>
                                            <p>${info.description}</p>
                                            <span>By ${info.vendor}</span>
                                            <a href="${root}/wam/${info.identifier}">En savoir plus →</a>
                                        </div>
                                    `
                                })

                                yield async
                            }
                        }}
                    </div>
                `)
            })
        }

        createList()

        const searchbar = html.a`<input type="search" placeholder="Search..."/>` as HTMLInputElement
        searchbar.oninput = (e)=>{
            searched = searchbar.value.toLowerCase()
            createList()
        }

        const content = html`
            <section>
                <h2>Web Audio Modules</h2>
                <p>Découvrez les derniers plugins audio pour le web, créés par la communauté Web Audio Modules. Explorez une variété de modules, des synthétiseurs aux effets, tous conçus pour fonctionner directement dans votre navigateur.</p>
                ${searchbar}
            </section>
            ${container}
        `
        
        const pageBase = new PageBase("wam", content)
        this.element = pageBase.element;
    }
}
