import { WamDescriptor } from "@webaudiomodules/api";
import { url } from "inspector/promises";

export type FullWamDescriptor = WamDescriptor & {moduleURL: string, descriptorURL: string}

export class ModuleInfo{

    private descriptor: FullWamDescriptor|undefined = undefined

    constructor(readonly url: string){}

    async get(): Promise<FullWamDescriptor>{
        if(!this.descriptor){
            const rootURL = this.url.split("/").slice(0,-1).join("/")+"/"

            const descriptorURL = rootURL + "descriptor.json"

            let fetched = await fetch(descriptorURL)
            let json = await fetched.json() as FullWamDescriptor
            this.descriptor = json
            json.thumbnail = rootURL + json.thumbnail
            json.descriptorURL = descriptorURL
            json.moduleURL = this.url
            json.identifier ??= json.vendor+"."+json.name
        }
        return this.descriptor!!
    }

}

let modules: ModuleInfo[]|undefined = undefined

export async function getModules(): Promise<ModuleInfo[]> {
    if(!modules){
        modules = []
        
        // From gallery
        {
            const response = await fetch('https://www.webaudiomodules.com/community/plugins.json')
            const json = await response.json()
            for(const item of json){
                modules.push(new ModuleInfo(`https://www.webaudiomodules.com/community/plugins/${item.path}`))
            }
        }

        // Other
        {
            for(const item of OTHER_MODULES){
                modules.push(new ModuleInfo(item))
            }
        }

    }
    return modules
}

const OTHER_MODULES = [
    "https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/fluteForIS2/index.js",
    "https://mainline.i3s.unice.fr/WAMChorusMB/",
    "https://mainline.i3s.unice.fr/WamSampler/src/index.js",
    "https://mainline.i3s.unice.fr/wam2/packages/faustPingPongDelay/plugin/index.js",
    "https://mainline.i3s.unice.fr/wam2/packages/obxd/index.js",
    "https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/clarinetMIDI/indexGUIStandard.js",
    "https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/JUNO6v2/indexGUIStandard.js",
    "https://wam-4tt.pages.dev/Pro54/index.js",
    "https://mainline.i3s.unice.fr/WAMViktorNV1/viktorNV1/index.js",
    "https://jempasam.github.io/cardboardwam/dist/index.mjs",
]