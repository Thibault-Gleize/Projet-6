import { logoutButton, filterButtons } from "./gestionButtons.js";

// Récupération works et catégorie depuis l'API
const reponseWorks = await fetch("http://localhost:5678/api/works/");
export let works = await reponseWorks.json();
const reponseCategories = await fetch("http://localhost:5678/api/categories");
let categories = await reponseCategories.json();

/* Ajout HTML pour la partie index sans token */

const parentDiv = document.querySelector(".gallery");

export function genererProjets(works) {
    for (let i = 0; i < works.length; i++) {
        const figure = works[i];
        const divFiltres = document.querySelector(".gallery");
        const workElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        const textElement = document.createElement("figcaption")

        // Ajout source pour imageElement (balise img)
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title
        // Ajout texte pour textElement (balise figcaption)
        textElement.innerText = figure.title

        // Rattachement à la div gallery
        parentDiv.appendChild(workElement)
        workElement.appendChild(imageElement)
        workElement.appendChild(textElement)
    }
}

// Création des filtres pour les catégories 
export function genererCategories(){
    // Récupération de l'élément DOM
    const divFiltres = document.querySelector(".filtres");
    // Création div + balise p pour filtre tous
    const allTextElement = document.createElement("button")
    // Ajout texte
    allTextElement.innerText = "Tous"
    allTextElement.classList = "All active"
    // Rattachement à div gallery en 1ere place 
    divFiltres.appendChild(allTextElement)

    for (let i = 0; i < categories.length; i++){
        const figure = categories[i];
        // Création balise
        const textElement = document.createElement("button")
        // Ajout texte pour textElement (balise p)
        textElement.innerText = figure.name
        textElement.classList = figure.name
        // Rattachement à la div gallery
        divFiltres.appendChild(textElement)
    }
    filterButtons()
}

/* Ajout HTML pour la partie index avec token */

export function modeEdition () {
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

export function boutonEdition () {
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

export function editionFeatures () {
    modeEdition()
    boutonEdition()
}

//