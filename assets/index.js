import { logoutButton, boutonsFiltres } from "./gestionButtons.js";

// Récupération works et catégorie depuis l'API
const reponseWorks = await fetch("http://localhost:5678/api/works/");
export let works = await reponseWorks.json();
const reponseCategories = await fetch("http://localhost:5678/api/categories");
let categories = await reponseCategories.json();

/* Ajout HTML pour la partie index sans token */

export function genererProjets(works) {
    for (let i = 0; i < works.length; i++) {
        const figure = works[i];
        const divGallerie = document.querySelector(".gallery");
        const workElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const textElement = document.createElement("figcaption")

        // Ajout source pour imageElement (balise img)
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title
        // Ajout texte pour textElement (balise figcaption)
        textElement.innerText = figure.title

        // Rattachement à la div gallery
        divGallerie.appendChild(workElement)
        workElement.appendChild(imageElement)
        workElement.appendChild(textElement)
    }
}

// Création des filtres pour les catégories 
export function genererCategories(){
    // Récupération de l'élément DOM
    const divFiltres = document.querySelector(".filtres");
    // Création boutons pour filtre "Tous"
    const allTextElement = document.createElement("button")
    // Ajout texte + class
    allTextElement.innerText = "Tous"
    allTextElement.classList = "All active"
    // Rattachement à div filtre
    divFiltres.appendChild(allTextElement)

    for (let i = 0; i < categories.length; i++){
        const figure = categories[i];
        // Création balise des autres boutons
        const textElement = document.createElement("button")
        // Ajout texte pour textElement (balise p)
        textElement.innerText = figure.name
        textElement.classList = figure.name
        // Rattachement à la div filtres
        divFiltres.appendChild(textElement)
    }
    boutonsFiltres()
}

/* Ajout HTML pour la partie index avec token */

// Ajout de la barre "Mode édition"
function modeEdition () {
    const body = document.querySelector("body")
    const editionBar = document.createElement("div")
    const icone = document.createElement("i")
    const text = document.createElement("p")
    editionBar.classList = "edition"
    icone.classList = "fa-regular fa-pen-to-square"
    text.innerText = "Mode édition"
    body.insertAdjacentElement("afterbegin", editionBar)
    editionBar.appendChild(icone)
    editionBar.appendChild(text)
    logoutButton()
}

function boutonEdition () {
    const filtres = document.querySelector(".filtres")
    filtres.classList.add("invisible")

    const portFolio = document.querySelector("#portfolio h2")
    const editionButton = document.createElement("span")
    const icone = document.createElement("i")
    icone.classList = "fa-regular fa-pen-to-square"
    editionButton.innerText = "modifier"
    
    portFolio.appendChild(editionButton)
    editionButton.insertAdjacentElement("afterbegin", icone)
}

export function edition () {
    modeEdition()
    boutonEdition()
}