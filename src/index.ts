import { Router } from "./component/Router"
import { HomePage } from "./page/HomePage"
import { WAMListPage } from "./page/WAMListPage"
import { WAMDetailPage } from "./page/WAMDetailPage"
import { AboutPage } from "./page/AboutPage"
import { LayoutsPage } from "./page/LayoutsPage"
import { NotFoundPage } from "./page/NotFoundPage"

// Configuration du router avec les pages
const router = new Router([
    {
        name: "home",
        pattern: ["home"],
        factory: (pageId, vars, pages) => new HomePage(pageId, pages)
    },
    {
        name: "wam",
        pattern: ["wam"],
        factory: (pageId, vars, pages) => new WAMListPage(pageId, pages)
    },
    {
        name: "wam-detail",
        pattern: ["wam", /(.+)/], // Match /wam/123, /wam/456, etc.
        factory: (pageId, vars, pages) => new WAMDetailPage(pageId, pages, vars[0])
    },
    {
        name: "about",
        pattern: ["about"],
        factory: (pageId, vars, pages) => new AboutPage(pageId, pages)
    },
    {
        name: "layouts",
        pattern: ["layouts"],
        factory: (pageId, vars, pages) => new LayoutsPage(pageId, pages)
    }
], {
    name: "not-found",
    pattern: [],
    factory: (pageId, vars, pages) => new NotFoundPage(pageId, pages)
})

// Remplacer le body par le router
document.body.innerHTML = ''
document.body.appendChild(router.element)

