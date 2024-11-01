import { supprProjet, ajouterWorkBtn, imgChange, txtChange } from "./gestionButtons.js"
import {genererProjets, genererCategories, works, edition} from "./index.js"
import { modalButtons, modaleBox } from "./modal.js"

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

