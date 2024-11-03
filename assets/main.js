import { supprProjet, ajouterWorkBtn, imgChange, txtChange, loginBouton } from "./gestionButtons.js"
import {genererProjets, genererCategories, works, edition} from "./index.js"
import { modalButtons, modaleBox } from "./modal.js"

// window href login et projet

let token = window.localStorage.getItem("token")

genererProjets(works)
genererCategories()

if (token) {
    edition()
    modaleBox()
    modalButtons()
    supprProjet()
    imgChange()
    txtChange()
    ajouterWorkBtn()
}
else {
    loginBouton()
}

