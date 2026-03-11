import { html } from "sam-lib"
import { Component } from "../utils/Component"
import { PageBase } from "../part/PageBase"
import { Page } from "../component/Router"
import { AsyncContent } from "../component/AsyncContent"
import { NavLink } from "../component/NavLink"
import { getModules } from "../model/modules"
import { CenterBox } from "../component/layout"
import { WebAudioModule } from "@webaudiomodules/api"
import { EmbedContainer } from "../component/EmbedContainer"
import CopyableText from "../component/CopyableText"
import { InitiableContent } from "../component/InitiableContent"
import { Microphone } from "../component/Microphone"
import { Toolbar } from "../component/Toolbar"

export class WAMDetailPage extends Component {
    element: Node

    constructor(pageId: string, pages: Page[], wamId: string) {
        super()

        console.log(wamId)

        async function createWebAudioModule(url: string){
            const audioContext = new AudioContext()
            const { default: initializeWamHost } = await import("https://www.webaudiomodules.com/sdk/2.0.0-alpha.6/src/initializeWamHost.js")
            const [groupId, key] = await initializeWamHost(audioContext, "example");
            
            const constructor = (await import(url)).default as typeof WebAudioModule
            const wam = await constructor.createInstance(groupId, audioContext)
            const gui = await wam.createGui()

            const pianoConstructor = (await import("https://mainline.i3s.unice.fr/wam_wc/wam-host/assets/midiKeyboard/simpleMidiKeyboard/index.js")).default as typeof WebAudioModule
            const piano = await pianoConstructor.createInstance(groupId, audioContext)
            const pianoGui = await piano.createGui()

            const microphone = new Microphone(audioContext)
            microphone.onStart = (source) => {
                source.connect(wam.audioNode)
            }

            const toolbar = html.a`
                <${new Toolbar()}>
                    ${Toolbar.createButton("Copy State", async()=>{
                        const state = await wam.audioNode.getState()
                        await navigator.clipboard.writeText(JSON.stringify(state))
                    })}

                    ${Toolbar.createButton("Paste State", async ()=>{
                        const text = await navigator.clipboard.readText()
                        await wam.audioNode.setState(JSON.parse(text))
                    })}
                </div>
            `

            piano.audioNode.connectEvents(wam.audioNode.instanceId)
            wam.audioNode.connect(audioContext.destination)
            return html`
                ${toolbar}
                <${new EmbedContainer()}>${gui}</div>
                ${pianoGui}
                ${microphone}
            `
        }

        async function createModule(){
            const modules = await getModules()
            const module = modules.find(m => m.id === wamId)
            if(!module) return html`<p>Module non trouvé</p>`

            const description = html`
                <h2>${module.name}</h2>
                <${new CenterBox()}>
                    <img
                        alt="${module.name}"
                        width=100%
                        src="${module.img}"
                        style="max-height: 600px; object-fit: contain;"
                    />
                </div>
                <p>${module.desc}</p>
                ${new CopyableText(module.url)}
                <hr/>
                ${new InitiableContent(()=>new AsyncContent(()=>createWebAudioModule(module.url)).element)}
            `

            return description
        }

        const content = html`
            <section>
                ${new AsyncContent(createModule)}
            </section>
        `

        const pageBase = new PageBase("wam", content)
        this.element = pageBase.element;
    }

    private getModuleType(id: string): string {
        const types: { [key: string]: string } = {
            '123': 'Synthétiseur modulaire',
            '456': 'Effet de réverbération',
            '789': 'Analyseur de spectre'
        }
        return types[id] || 'Module personnalisé'
    }
}
