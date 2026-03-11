import { html } from "sam-lib";
import { Card } from "./component/Card";
import { HorizontalList } from "./component/HorizontalList";
import { EmbedContainer } from "./component/EmbedContainer";
import { Aside } from "./component/Aside";
import { SearchBox } from "./component/SearchBox";
import { ProgressBar } from "./component/ProgressBar";
import { Tooltip } from "./component/Tooltip";
import { Breadcrumb } from "./component/Breadcrumb";
import { Tabs } from "./component/Tabs";
import { Toast } from "./component/Toast";
import { Modal } from "./component/Modal";
import { Collapsible } from "./component/Collapsible";
import { Badge } from "./component/Badge";
import { LinkList } from "./component/LinkList";
import { Spinner } from "./component/Spinner";
import { AsyncContent } from "./component/AsyncContent";






// Créer un conteneur pour les toasts
const toastContainer = document.createElement('div');
toastContainer.id = 'toast-container';
toastContainer.style.position = 'fixed';
toastContainer.style.top = 'var(--spacing-normal, 1rem)';
toastContainer.style.right = 'var(--spacing-normal, 1rem)';
toastContainer.style.zIndex = '9999';
toastContainer.style.display = 'flex';
toastContainer.style.flexDirection = 'column';
toastContainer.style.gap = 'var(--spacing-small, 0.5rem)';
document.body.appendChild(toastContainer);

document.querySelector("#home")!.append(html.a`
    <${new Card()} style="width:50%">
    </div>
`)

// Exemple de liste horizontale avec plusieurs cartes
const hlist = new HorizontalList()
const card1 = new Card()
card1.title = "Design Moderne"
card1.text = "Création d'interfaces utilisateur élégantes et intuitives avec les dernières tendances."

const card2 = new Card()
card2.title = "Développement Web"
card2.text = "Applications web performantes avec TypeScript et les technologies modernes."

const card3 = new Card()
card3.title = "Consulting"
card3.text = "Accompagnement personnalisé pour vos projets digitaux ambitieux."

const card4 = new Card()
card4.title = "Formation"
card4.text = "Sessions de formation adaptées à vos besoins en développement web."

const card5 = new Card()
card5.title = "Support"
card5.text = "Support technique et maintenance pour vos applications existantes."

hlist.element.append(card1.element, card2.element, card3.element, card4.element, card5.element)

document.querySelector("#home")!.append(hlist.element)

// Exemple de conteneur embed avec une image
const embedContainer = new EmbedContainer()
const embedImage = document.createElement('img')
embedImage.src = 'https://placehold.co/600x400/303030/ff8c42?text=Embedded+Content'
embedImage.alt = 'Contenu intégré'
embedImage.slot = ''
embedContainer.element.appendChild(embedImage)

document.querySelector("#embed-demo")!.replaceWith(embedContainer.element)

// Exemple d'aside avec du contenu
const aside = new Aside()
aside.element.innerHTML = `
    <h4>💡 Le saviez-vous ?</h4>
    <p>TypeScript est un sur-ensemble typé de JavaScript qui compile en JavaScript pur.</p>
    <p>Il est maintenu par Microsoft depuis 2012.</p>
`

document.querySelector("#aside-demo")!.replaceWith(aside.element)

// Exemple de barre de recherche avec résultats
const searchBox = new SearchBox()

// Créer l'input de recherche
const searchInput = document.createElement('input')
searchInput.type = 'search'
searchInput.placeholder = 'Rechercher dans la documentation...'
searchInput.slot = 'input'
searchBox.element.appendChild(searchInput)

// Créer les résultats de recherche
const results = [
    { title: 'Introduction à TypeScript', description: 'Guide complet pour démarrer avec TypeScript et comprendre les bases du typage statique...' },
    { title: 'Configuration de Vite', description: 'Comment configurer Vite pour un projet TypeScript moderne avec hot module replacement...' },
    { title: 'Les interfaces TypeScript', description: 'Utilisation avancée des interfaces pour créer des contrats de code robustes...' },
    { title: 'Optimisation des performances', description: 'Techniques pour améliorer les performances de vos applications web modernes...' },
    { title: 'Tests unitaires', description: 'Mise en place de tests unitaires avec Jest et TypeScript...' },
    { title: 'Déploiement', description: 'Guide pour déployer votre application en production...' }
]

results.forEach(result => {
    const item = document.createElement('div')
    item.className = 'search-result-item'
    item.slot = 'results'
    item.innerHTML = `
        <div style="font-weight: 600; color: var(--front); margin-bottom: 0.25rem;">${result.title}</div>
        <div style="font-size: var(--font-tiny); color: var(--front-less);">${result.description}</div>
    `
    searchBox.element.appendChild(item)
})

document.querySelector("#search-box-demo")!.replaceWith(searchBox.element)

// ===== NOUVEAUX COMPOSANTS =====

// Badges
const badgesContainer = document.querySelector("#badges-demo")!;
const badge1 = new Badge('primary');
badge1.element.textContent = 'Primary';
const badge2 = new Badge('success');
badge2.element.textContent = '✓ Success';
const badge3 = new Badge('warning');
badge3.element.textContent = '⚠ Warning';
const badge4 = new Badge('danger');
badge4.element.textContent = '✕ Danger';
const badge5 = new Badge('info');
badge5.element.textContent = 'ℹ Info';

badgesContainer.append(
    badge1.element, ' ',
    badge2.element, ' ',
    badge3.element, ' ',
    badge4.element, ' ',
    badge5.element
);

// ProgressBar
const progressBar = new ProgressBar(0);
document.querySelector("#progressbar-demo")!.appendChild(progressBar.element);

// Animer la barre de progression
let progress = 0;
setInterval(() => {
    progress = (progress + 1) % 101;
    progressBar.value = progress;
}, 50);

// Tooltip
const tooltipDemo = document.querySelector("#tooltip-demo")!;
const tooltip = new Tooltip();
tooltip.element.innerHTML = '<span style="text-decoration: underline dotted; cursor: help;">Survolez-moi</span>';
const tooltipContent = document.createElement('span');
tooltipContent.slot = 'tooltip';
tooltipContent.textContent = 'Ceci est un tooltip informatif !';
tooltip.element.appendChild(tooltipContent);
tooltipDemo.appendChild(tooltip.element);

// Breadcrumb
const breadcrumb = new Breadcrumb();
breadcrumb.element.innerHTML = `
    <a href="#home">Accueil</a>
    <span class="separator">›</span>
    <a href="#products">Produits</a>
    <span class="separator">›</span>
    <a href="#category">Catégorie</a>
    <span class="separator">›</span>
    <span>Article actuel</span>
`;
document.querySelector("#breadcrumb-demo")!.appendChild(breadcrumb.element);

// Collapsible
const collapsible1 = new Collapsible();
const trigger1 = document.createElement('span');
trigger1.slot = 'trigger';
trigger1.textContent = 'Question 1: Comment utiliser ce composant ?';
collapsible1.element.appendChild(trigger1);
const content1 = document.createElement('p');
content1.textContent = 'Il suffit de cliquer sur le titre pour déplier le contenu. Facile non ?';
collapsible1.element.appendChild(content1);

const collapsible2 = new Collapsible();
const trigger2 = document.createElement('span');
trigger2.slot = 'trigger';
trigger2.textContent = 'Question 2: Est-ce que c\'est responsive ?';
collapsible2.element.appendChild(trigger2);
const content2 = document.createElement('p');
content2.textContent = 'Oui, absolument ! Le composant s\'adapte à toutes les tailles d\'écran.';
collapsible2.element.appendChild(content2);

document.querySelector("#collapsible-demo")!.append(collapsible1.element, collapsible2.element);

// LinkList
const linkList = new LinkList();
linkList.element.innerHTML = `
    <a href="#home" class="active">🏠 Accueil</a>
    <a href="#about">📖 À propos</a>
    <a href="#services">⚙️ Services</a>
    <a href="#contact">✉️ Contact</a>
    <a href="#blog">📝 Blog</a>
`;
document.querySelector("#linklist-demo")!.appendChild(linkList.element);

// Tabs
const tabs = new Tabs();

// Headers
const tab1Header = document.createElement('button');
tab1Header.slot = 'headers';
tab1Header.textContent = 'Tab 1';
tab1Header.classList.add('active');

const tab2Header = document.createElement('button');
tab2Header.slot = 'headers';
tab2Header.textContent = 'Tab 2';

const tab3Header = document.createElement('button');
tab3Header.slot = 'headers';
tab3Header.textContent = 'Tab 3';

// Content
const tab1Content = document.createElement('div');
tab1Content.slot = 'content';
tab1Content.classList.add('active');
tab1Content.innerHTML = '<h4>Contenu de l\'onglet 1</h4><p>Ceci est le contenu du premier onglet. Vous pouvez y mettre ce que vous voulez !</p>';

const tab2Content = document.createElement('div');
tab2Content.slot = 'content';
tab2Content.innerHTML = '<h4>Contenu de l\'onglet 2</h4><p>Voici le deuxième onglet avec son propre contenu unique.</p>';

const tab3Content = document.createElement('div');
tab3Content.slot = 'content';
tab3Content.innerHTML = '<h4>Contenu de l\'onglet 3</h4><p>Et voilà le troisième onglet pour compléter la démonstration.</p>';

tabs.element.append(tab1Header, tab2Header, tab3Header, tab1Content, tab2Content, tab3Content);

// Gérer les clics sur les tabs
[tab1Header, tab2Header, tab3Header].forEach((header, index) => {
    header.addEventListener('click', () => {
        [tab1Header, tab2Header, tab3Header].forEach(h => h.classList.remove('active'));
        [tab1Content, tab2Content, tab3Content].forEach(c => c.classList.remove('active'));
        header.classList.add('active');
        [tab1Content, tab2Content, tab3Content][index].classList.add('active');
    });
});

document.querySelector("#tabs-demo")!.appendChild(tabs.element);

// Toast & Modal
document.querySelector("#show-toast-success")!.addEventListener('click', () => {
    const toast = new Toast('success', 3000);
    toast.element.textContent = 'Opération réussie avec succès !';
    toastContainer.appendChild(toast.element);
});

document.querySelector("#show-toast-error")!.addEventListener('click', () => {
    const toast = new Toast('error', 5000);
    toast.element.textContent = 'Une erreur s\'est produite, veuillez réessayer.';
    toastContainer.appendChild(toast.element);
});

document.querySelector("#show-modal")!.addEventListener('click', () => {
    const modal = new Modal();
    
    const modalHeader = document.createElement('h3');
    modalHeader.slot = 'header';
    modalHeader.textContent = 'Titre de la Modal';
    
    const modalBody = document.createElement('div');
    modalBody.innerHTML = '<p>Ceci est le contenu de la modal. Vous pouvez cliquer en dehors ou appuyer sur ESC pour fermer.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';
    
    const modalFooter = document.createElement('div');
    modalFooter.slot = 'footer';
    modalFooter.innerHTML = '<button style="margin-right: 10px;">Annuler</button><button>Confirmer</button>';
    
    modal.element.append(modalHeader, modalBody, modalFooter);
    document.body.appendChild(modal.element);
    modal.open();
});

// Spinners
const spinnerSmall = new Spinner('small');
const spinnerMedium = new Spinner('medium');
const spinnerLarge = new Spinner('large');

const spinnerContainer = document.createElement('div');
spinnerContainer.style.display = 'flex';
spinnerContainer.style.gap = 'var(--spacing-large)';
spinnerContainer.style.alignItems = 'center';
spinnerContainer.style.padding = 'var(--spacing-normal)';

const labelSmall = document.createElement('span');
labelSmall.textContent = 'Small: ';
labelSmall.appendChild(spinnerSmall.element);

const labelMedium = document.createElement('span');
labelMedium.textContent = 'Medium: ';
labelMedium.appendChild(spinnerMedium.element);

const labelLarge = document.createElement('span');
labelLarge.textContent = 'Large: ';
labelLarge.appendChild(spinnerLarge.element);

spinnerContainer.append(labelSmall, labelMedium, labelLarge);
document.querySelector("#spinner-demo")!.appendChild(spinnerContainer);

// Contenu Async - Exemple 1: Chargement simulé avec succès
const asyncDemo1 = new AsyncContent(async () => {
    // Simuler un délai de chargement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const content = document.createElement('div');
    content.innerHTML = `
        <h4 style="color: var(--spice);">Contenu chargé avec succès !</h4>
        <p>Ce contenu a été chargé après 2 secondes de délai simulé.</p>
        <p>Le spinner a été automatiquement remplacé par ce contenu.</p>
    `;
    return content;
});

document.querySelector("#async-demo")!.appendChild(asyncDemo1.element);

// Contenu Async - Exemple 2: Chargement avec bouton
const asyncButton = document.createElement('button');
asyncButton.textContent = 'Charger un autre contenu';
asyncButton.style.marginTop = 'var(--spacing-normal)';

asyncButton.addEventListener('click', () => {
    const asyncDemo2Container = document.createElement('div');
    asyncDemo2Container.style.marginTop = 'var(--spacing-normal)';
    asyncDemo2Container.style.padding = 'var(--spacing-normal)';
    asyncDemo2Container.style.background = 'var(--back-more)';
    asyncDemo2Container.style.borderRadius = 'var(--radius-normal)';
    
    const asyncDemo2 = new AsyncContent(async () => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return `<p style="color: var(--front);">Nouveau contenu chargé en 1.5 secondes !</p>`;
    });
    
    asyncDemo2Container.appendChild(asyncDemo2.element);
    document.querySelector("#async-demo")!.appendChild(asyncDemo2Container);
});

document.querySelector("#async-demo")!.appendChild(asyncButton);
