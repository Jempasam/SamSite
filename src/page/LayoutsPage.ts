import { html } from "sam-lib"
import { Component } from "../utils/Component"
import { PageBase } from "../part/PageBase"
import { Page } from "../component/Router"
import { HBox } from "../component/layout/HBox"
import { VBox } from "../component/layout/VBox"
import { FlowBox } from "../component/layout/FlowBox"
import { GridBox } from "../component/layout/GridBox"
import { CenterBox } from "../component/layout/CenterBox"
import { StackBox } from "../component/layout/StackBox"
import { NavLink } from "../component/NavLink"
import { Toolbar } from "../component/Toolbar"
import CopyableText from "../component/CopyableText"
import { InitiableContent } from "../component/InitiableContent"
import { Microphone } from "../component/Microphone"
import { root } from "../model/root"

export class LayoutsPage extends Component {
    element: Node

    constructor(pageId: string, pages: Page[]) {
        super()

        // Créer des liens pour les démos
        const createLink = (text: string, href: string = '#') => {
            const link = document.createElement('a');
            link.href = href;
            link.textContent = text;
            return link;
        };

        // HBox demo
        const hbox = new HBox();
        hbox.gap = '1rem';
        hbox.justify = 'space-between';
        hbox.element.append(
            createLink('Premier lien', `${root}/home`),
            createLink('Deuxième lien', `${root}/wam`),
            createLink('Troisième lien', `${root}/about`)
        );

        // VBox demo
        const vbox = new VBox();
        vbox.gap = '0.5rem';
        vbox.element.append(
            createLink('Lien du haut', `${root}/home`),
            createLink('Lien du milieu', `${root}/wam`),
            createLink('Lien du bas', `${root}/about`)
        );

        // FlowBox demo - éléments plus petits
        const flowbox = new FlowBox();
        flowbox.gap = '0.5rem';
        for (let i = 1; i <= 15; i++) {
            flowbox.element.appendChild(createLink(`Lien ${i}`, '#'));
        }

        // GridBox demo
        const gridbox = new GridBox();
        gridbox.gap = '1rem';
        gridbox.columns = 'repeat(3, 1fr)';
        for (let i = 1; i <= 6; i++) {
            gridbox.element.appendChild(createLink(`Lien grille ${i}`, '#'));
        }

        // CenterBox demo
        const centerbox = new CenterBox();
        centerbox.minHeight = '200px';
        centerbox.padding = '2rem';
        centerbox.element.appendChild(createLink('Lien centré', '#/home'));

        // StackBox demo
        const stackbox = new StackBox();
        const baseLayer = document.createElement('div');
        baseLayer.textContent = 'Couche de base';
        const overlayLayer = createLink('Lien superposé', '#');
        stackbox.element.append(baseLayer, overlayLayer);

        // Toolbar demo
        const toolbar = new Toolbar();
        toolbar.element.append(
            Toolbar.createButton('Nouveau', () => alert('Nouveau')),
            Toolbar.createButton('Ouvrir', () => alert('Ouvrir')),
            Toolbar.createButton('Enregistrer', () => alert('Enregistrer')),
            Toolbar.createSeparator(),
            Toolbar.createButton('Couper', () => alert('Couper')),
            Toolbar.createButton('Copier', () => alert('Copier')),
            Toolbar.createButton('Coller', () => alert('Coller')),
            Toolbar.createSeparator(),
            Toolbar.createButton('Annuler', () => alert('Annuler'), { disabled: true })
        );

        // CopyableText demo
        const copyableText = new CopyableText('npm install @webaudiomodules/api');

        // InitiableContent demo
        const initiableContent = new InitiableContent(
            () => {
                // Créer un élément riche à la place du bouton
                const div = document.createElement('div');
                div.style.padding = '2rem';
                div.style.background = 'var(--back-more)';
                div.style.borderRadius = 'var(--radius-normal)';
                div.innerHTML = `
                    <h4 style="color: var(--spice); margin-bottom: 1rem;">Contenu Initialisé</h4>
                    <p style="color: var(--front-less); margin-bottom: 1rem;">
                        Ce contenu a été créé en cliquant sur le bouton d'initialisation.
                        Le composant InitiableContent s'est complètement remplacé par ce contenu.
                    </p>
                    <p style="color: var(--front-less);">
                        Vous pouvez retourner du HTML, un Node, ou même une Promise.
                    </p>
                `;
                return div;
            },
            {
                icon: '▸',
                text: 'Démarrer le module',
                description: 'Cliquez pour initialiser et charger le contenu'
            }
        );

        // Microphone demo
        const microphone = new Microphone();

        const content = html.a`
            <section id="layouts">
                <h2>Composants de Layout</h2>
                <p>Découvrez les différents composants de layout disponibles pour structurer vos interfaces.</p>

                <article>
                    <h3>HBox - Conteneur Horizontal</h3>
                    <p>Aligne les éléments horizontalement avec flexbox.</p>
                    <div>
                        ${hbox.element}
                    </div>
                    <p><code>const hbox = new HBox(); hbox.gap = '1rem'; hbox.justify = 'space-between';</code></p>
                </article>

                <article>
                    <h3>VBox - Conteneur Vertical</h3>
                    <p>Aligne les éléments verticalement avec flexbox.</p>
                    <div>
                        ${vbox.element}
                    </div>
                    <p><code>const vbox = new VBox(); vbox.gap = '0.5rem';</code></p>
                </article>

                <article>
                    <h3>FlowBox - Layout Fluide</h3>
                    <p>Wrap automatique des éléments sur plusieurs lignes.</p>
                    <div>
                        ${flowbox.element}
                    </div>
                    <p><code>const flowbox = new FlowBox(); flowbox.gap = '0.5rem';</code></p>
                </article>

                <article>
                    <h3>GridBox - Grille CSS</h3>
                    <p>Organisation en grille configurable.</p>
                    <div>
                        ${gridbox.element}
                    </div>
                    <p><code>const gridbox = new GridBox(); gridbox.gap = '1rem'; gridbox.columns = 'repeat(3, 1fr)';</code></p>
                </article>

                <article>
                    <h3>CenterBox - Centrage</h3>
                    <p>Centre le contenu horizontalement et verticalement.</p>
                    <div>
                        ${centerbox.element}
                    </div>
                    <p><code>const centerbox = new CenterBox(); centerbox.minHeight = '200px'; centerbox.padding = '2rem';</code></p>
                </article>

                <article>
                    <h3>StackBox - Empilement</h3>
                    <p>Superpose les éléments les uns sur les autres (utile pour les overlays).</p>
                    <div>
                        ${stackbox.element}
                    </div>
                    <p><code>new StackBox()</code></p>
                </article>

                <article>
                    <h3>NavLink - Lien de Navigation</h3>
                    <p>Lien avec flèche pour la navigation.</p>
                    <div>
                        ${new NavLink('Retour à l\'accueil', '#/home').element}
                    </div>
                    <div>
                        ${function() {
                            const link = new NavLink('Page suivante', '#/wam');
                            link.reverse = true;
                            link.alignRight = true;
                            return link.element;
                        }()}
                    </div>
                    <p><code>const link = new NavLink(text, href); link.reverse = true; link.alignRight = true;</code></p>
                </article>

                <article>
                    <h3>Toolbar - Barre d'outils</h3>
                    <p>Barre de boutons de commande avec séparateurs.</p>
                    <div>
                        ${toolbar.element}
                    </div>
                    <p><code>const toolbar = new Toolbar(); toolbar.element.append(Toolbar.createButton(...), Toolbar.createSeparator(), ...);</code></p>
                </article>

                <article>
                    <h3>CopyableText - Texte Copiable</h3>
                    <p>Affiche du texte facilement sélectionnable avec un bouton de copie dans le presse-papier.</p>
                    <div>
                        ${copyableText.element}
                    </div>
                    <p><code>const copyableText = new CopyableText('npm install @webaudiomodules/api');</code></p>
                </article>

                <article>
                    <h3>InitiableContent - Contenu Initialisable</h3>
                    <p>Gros bloc-bouton qui se remplace par un élément quand on clique dessus.</p>
                    <div>
                        ${initiableContent.element}
                    </div>
                    <p><code>new InitiableContent(() => element, { icon, text, description });</code></p>
                </article>

                <article>
                    <h3>Microphone - Contrôle Audio</h3>
                    <p>Contrôle d'accès au microphone avec MediaStream. Démarre/arrête la capture audio et fournit un MediaStreamAudioSourceNode pour le Web Audio API via les callbacks.</p>
                    <div>
                        ${microphone.element}
                    </div>
                    <p><code>const mic = new Microphone(); mic.onStart = (source) => source.connect(node);</code></p>
                </article>

                ${new NavLink('Retour à l\'accueil', '#/home').element}
            </section>
        `

        const pageBase = new PageBase("layouts", content)
        this.element = pageBase.element
    }
}
