import { supprProjet, ajouterWorkBtn, imgChange, txtChange, loginBouton } from "./gestionButtons.js"
import {genererProjets, genererCategories, works, edition} from "./index.js"
import { modaleBoutons, modaleBox } from "./modal.js"

let token = window.localStorage.getItem("token")

genererProjets(works)
genererCategories()

if (token) {
    edition()
    modaleBox()
    modaleBoutons()
    supprProjet()
    imgChange()
    txtChange()
    ajouterWorkBtn()
}
else {
    loginBouton()
}

