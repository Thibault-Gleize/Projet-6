import { deleteWork, addFetchBtn, imgChange, txtChange } from "./gestionButtons.js"
import {genererProjets, genererCategories, works, editionFeatures} from "./index.js"
import { modalButtons, modaleBox } from "./modal.js"

let token = window.localStorage.getItem("token")

genererProjets(works)
genererCategories()

if (token) {
    editionFeatures()
    modaleBox()
    modalButtons()
    deleteWork()
    imgChange()
    txtChange()
    addFetchBtn()
}

