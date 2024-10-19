// Importe les fonctions permettant d'ouvrir/fermer la modale
import { modaleBox, openCloseModale, addPhotoModal } from "./modal.js"

/* 
Récupère le token dans le local storage pour vérifier si
utilisateur connecté
*/
let token = window.localStorage.getItem("token")

/* 
Permet de modifier la balise li login en logout et clear
le localstorage pour supprimer le token et refresh la page index
*/
function logoutButton () {
    const logout = document.querySelectorAll("header li")[2]
    logout.innerText = "logout"
    logout.addEventListener("click", function() {
        localStorage.clear()
        window.location.replace("index.html")
    })
}

// Nécéssite refractorisation
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
}

// Nécéssite refractorisation
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

// Delete token after x minutes
/* Nécessité de vérifier si nécessaire de modifier cette partie 
avec un package qui pourrait servir sur la gestion de l'inactivité */
function deleteToken () {
    let hours = 1 
    let now = new Date().getTime()
    let setupTime = localStorage.getItem("setupTime")
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > hours*60*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
        }
    }
}

deleteToken()

// Applique la partie édition si le token n'est pas vide
if (token != undefined || token != null) {
    modeEdition()
    logoutButton()
    boutonEdition()
    // Ajout des fonctions lié à la modale sur l'HTML 
    modaleBox()
    openCloseModale()
    addPhotoModal()
}




