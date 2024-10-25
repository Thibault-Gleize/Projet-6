import { deleteWork, addFetchBtn, imgChange } from "./gestionButtons.js"
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
    addFetchBtn()

    

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
}

