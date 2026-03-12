
export class Presets{

    constructor(readonly promise: ()=>Promise<any>){}

    private loaded: any|undefined = undefined

    async get(): Promise<Record<string, any>>{
        if(!this.loaded){
            this.loaded = (await this.promise()).default
        }
        return this.loaded
    }
}

const files = import.meta.glob('./presets/*.json')
let presets: Record<string, Presets>|undefined = undefined

export function getPresets(){
    if(!presets){
        presets = {}
        for(const path in files){
            const name = path.split('/').slice(-1)[0].split('.').slice(0, -1).join('.')
            presets[name] = new Presets(files[path])
        }
    }
    return presets
}
