

export interface ModuleInfo {
    id: string;
    name: string;
    desc: string;
    url: string;
    img: string;
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
                modules.push({
                    id: item.identifier,
                    name: item.name,
                    desc: item.description,
                    url: `https://www.webaudiomodules.com/community/plugins/${item.path}`,
                    img: `https://www.webaudiomodules.com/community/plugins/${item.thumbnail}`,
                })
            }
        }

        // Other
        {
            for(const item of OTHER_MODULES){
                modules.push(item)
            }
        }

        modules.sort((a,b) => a.name.localeCompare(b.name))

    }
    return modules
}

const OTHER_MODULES = [
    {
        id: "flute-for-is2",
        name: "Flute for IS2",
        desc: "Un instrument à vent virtuel conçu pour la plateforme Interactive Synthesizer 2 (IS2), offrant des sons de flûte réalistes et expressifs pour les musiciens et les producteurs.",
        url: "https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/fluteForIS2/index.js",
        img: "https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/fluteForIS2/screenshot.png",
    },
    {
        id: "wam-chorus-mb",
        name: "WAM Chorus MB",
        desc: "Un module de chorus multi-bande pour la plateforme Web Audio Modules (WAM), offrant des effets de modulation riches et complexes pour les producteurs de musique et les ingénieurs du son.",
        url: "https://mainline.i3s.unice.fr/WAMChorusMB/",
        img: "https://mainline.i3s.unice.fr/WAMChorusMB/screenshot.png",
    },
    {
        id: "wam-sampler",
        name: "WAM Sampler",
        desc: "Un échantillonneur polyvalent pour la plateforme Web Audio Modules (WAM), permettant aux utilisateurs de charger, manipuler et jouer des échantillons audio avec une interface intuitive et des fonctionnalités avancées.",
        url: "https://mainline.i3s.unice.fr/WamSampler/src/index.js",
        img: "https://mainline.i3s.unice.fr/WamSampler/src/screenshot.png",
    },
    {
        id: "faust-ping-pong-delay",
        name: "Faust Ping Pong Delay",
        desc: "Un module de delay ping-pong développé avec Faust pour la plateforme Web Audio Modules (WAM), offrant des effets de delay stéréo dynamiques et personnalisables pour les musiciens et les producteurs.",
        url: "https://mainline.i3s.unice.fr/wam2/packages/faustPingPongDelay/plugin/index.js",
        img: "https://mainline.i3s.unice.fr/wam2/packages/faustPingPongDelay/plugin/screenshot.png",
    },
    {
        id: "obxd",
        name: "OBXD",
        desc: "Un synthétiseur virtuel inspiré du légendaire Oberheim OB-X, développé pour la plateforme Web Audio Modules (WAM), offrant des sons analogiques riches et une interface utilisateur intuitive pour les producteurs de musique.",
        url: "https://mainline.i3s.unice.fr/wam2/packages/obxd/index.js",
        img: "https://mainline.i3s.unice.fr/wam2/packages/obxd/screenshot.png",
    },
    {
        id: "clarinet-midi",
        name: "Clarinet MIDI",
        desc: "Un module de clarinette MIDI pour la plateforme Web Audio Modules (WAM), offrant des sons de clarinette réalistes et expressifs, contrôlés via MIDI pour les musiciens et les producteurs.",
        url: "https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/clarinetMIDI/indexGUIStandard.js",
        img: "https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/clarinetMIDI/screenshot.png",
    },
    {
        id: "juno-6",
        name: "JUNO-6",
        desc: "Un synthétiseur virtuel inspiré du légendaire Roland JUNO-6, développé pour la plateforme Web Audio Modules (WAM), offrant des sons analogiques classiques et une interface utilisateur intuitive pour les producteurs de musique.",
        url: "https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/JUNO6v2/indexGUIStandard.js",
        img: "https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/JUNO6v2/Juno6.png",
    },
    {
        id: "pro-54",
        name: "Pro-54",
        desc: "Un synthétiseur virtuel inspiré du légendaire Sequential Circuits Prophet-5, développé pour la plateforme Web Audio Modules (WAM), offrant des sons analogiques riches et une interface utilisateur intuitive pour les producteurs de musique.",
        url: "https://wam-4tt.pages.dev/Pro54/index.js",
        img: "https://wam-4tt.pages.dev/Pro54/thumbnail.png",
    },
    {
        id: "viktor-nv1",
        name: "Viktor NV1",
        desc: "Un synthétiseur virtuel développé pour la plateforme Web Audio Modules (WAM) par Viktor NV, offrant une large gamme de sons et une interface utilisateur intuitive pour les producteurs de musique.",
        url: "https://mainline.i3s.unice.fr/WAMViktorNV1/viktorNV1/index.js",
        img: "https://mainline.i3s.unice.fr/WAMViktorNV1/viktorNV1/viktorNV1.png",
    },
    {
        id: "cardboard-wam",
        name: "Cardboard WAM",
        desc: "A synthetizer made of cardboard with a drawable wave shape and envelope.",
        url: "https://jempasam.github.io/cardboardwam/dist/index.mjs",
        img: "https://jempasam.github.io/cardboardwam/dist/screenshot.png",
    }

]