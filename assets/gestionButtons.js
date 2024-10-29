import {works, genererProjets} from "./index.js"
import {modalePictures} from "./modal.js"

/* Gestion des boutons des catégories */

    // Gestion class active
    function removeActive () {
        let allButtons = document.querySelectorAll(".filtres button")
        allButtons.forEach(function (button) {
            button.classList.remove("active")
        })
    }

    function btnTous () {
        const boutonAll = document.querySelector(".All")
        boutonAll.addEventListener("click", function () {
            removeActive()
            boutonAll.classList.add("active") 
            document.querySelector(".gallery").innerHTML = ""
            genererProjets(works)
        })
    }
    
    function btnObjet () {
        const boutonObjet = document.querySelector(".Objets")
        boutonObjet.addEventListener("click", function () {
            const worksObjets = works.filter(function (work) {
                return work.categoryId === 1;
            });
            removeActive()
            boutonObjet.classList.add("active") 
            document.querySelector(".gallery").innerHTML = ""
            genererProjets(worksObjets)
        })
    }
    
    
    function btnAppartement () {
        const boutonAppartement = document.querySelector(".Appartements")
        boutonAppartement.addEventListener("click", function () {
        const worksAppartement = works.filter(function (work) {
            return work.categoryId === 2;
        });
            removeActive()
            boutonAppartement.classList.add("active") 
            document.querySelector(".gallery").innerHTML = ""
            genererProjets(worksAppartement)
        })
    }
    
    
    function btnHotelEtRestaurants () {
        // Check si possibilité de modifier la classe récupérer
    const boutonHotelEtRestaurants = document.querySelector(".Hotels")
    boutonHotelEtRestaurants.addEventListener("click", function () {
        const worksHetR = works.filter(function (work) {
            return work.categoryId === 3;
        });
            removeActive()
            boutonHotelEtRestaurants.classList = "active"
            document.querySelector(".gallery").innerHTML = ""
            genererProjets(worksHetR)
        })
    }
    

    export function filterButtons () {
        btnTous()
        btnObjet()
        btnAppartement()
        btnHotelEtRestaurants()
    }

    // Gestion des boutons relatif à la partie login 

    /* INDEX
Permet de modifier la balise li login en logout et clear
le localstorage pour supprimer le token et refresh la page index
    */

export function logoutButton () {
    const logout = document.querySelectorAll("header li")[2]
    logout.innerText = "logout"
    logout.addEventListener("click", function() {
        localStorage.clear()
        window.location.replace("index.html")
    })
}

// Boutons relatif à la modal
/*
export async function openCloseModale () {
    const closeModale = document.querySelector(".close")
    const modal = document.querySelector(".modale")
    const modaleButton = document.querySelector("#portfolio span")
    const returnArrow = document.querySelector(".fa-arrow-left")
    const photoContainer = document.querySelector(".container-photos")
    const addPhotoContainer = document.querySelector(".ajouter-photo")
    const nameAndCategory = document.querySelector(".name-category")

    modaleButton.onclick = function() {
        modal.style.display = "block"
        returnArrow.style.display = "none"
        photoContainer.style.display = "flex"
        addPhotoContainer.style.display = "none"
        nameAndCategory.style.display = "none"
    }

    closeModale.onclick = function() {
        modal.style.display = "none"
    }

    window.onclick = function(y) {
        if (y.target == modal) {
          modal.style.display = "none";
        }
    }
}

export function ajouterPhotoModal () {
    const ajouterPhoto = document.querySelector(".modale-btn")
    const returnArrow = document.querySelector(".fa-arrow-left")
    const photoContainer = document.querySelector(".container-photos")
    const addPhotoContainer = document.querySelector(".ajouter-photo")
    const nameAndCategory = document.querySelector(".name-category")
    const fetchBtn = document.querySelector(".fetch")

    ajouterPhoto.addEventListener("click", function(){
        returnArrow.style.display = "block"
        photoContainer.style.display = "none"
        addPhotoContainer.style.display = "flex"
        nameAndCategory.style.display = "flex"
        fetchBtn.style.display = "block"
        ajouterPhoto.style.display = "none"
    })

    returnArrow.addEventListener("click", function(){
        returnArrow.style.display = "none"
        photoContainer.style.display = "flex"
        addPhotoContainer.style.display = "none"
        nameAndCategory.style.display = "none"
    })
}
*/
// Bouton modal qui gère le fetch

let imgCondition = false
let textCondition = false

export function deleteWork () {
    const token = localStorage.getItem("token")
    const trashList = document.querySelectorAll(".container-photos i")
    const containerPhotos = document.querySelector(".container-photos")

    trashList.forEach(function (trash) {
        trash.onclick = async function(fetchDetele) {
            fetchDetele = await fetch(`http://localhost:5678/api/works/${trash.id}`, {
                method:"DELETE",
                headers: {"Authorization": "Bearer " + token},
            })
                .catch((error) => alert("Un problème est survenu, réessayer plus tard")) 
            let newFetch = await fetch("http://localhost:5678/api/works/")
                .then ((response) => response.json())
            let works = await newFetch
            containerPhotos.innerHTML = ""
            document.querySelector(".gallery").innerHTML = ""
            modalePictures(await works)
            genererProjets(await works)
        }
    })
}

export function imgChange () {
    let fetch = document.querySelector("#fileUpload")

    fetch.onchange = () => {
        const divPicture = document.querySelector(".ajouter-photo")
        const divAddPicture = document.querySelector(".ajouter-photo div")

        const img = document.createElement("img")
        img.src = URL.createObjectURL(fetch.files[0])
        divPicture.insertAdjacentElement("afterbegin", img)
        divAddPicture.style.display = "none"
        imgCondition = true
    }
}

export function txtChange () {
    const workName = document.getElementById("pictureName")
    const validationBtn = document.querySelector(".fetch")

    workName.onchange = () => {
        if (imgCondition === true) {
            textCondition = true
            validationBtn.classList.remove("inactive-btn")
            validationBtn.classList.add("modale-btn")
        }
    }
}

export function addFetchBtn () {
    let newBtn = document.querySelector(".fetch")
    console.log(works)

    newBtn.onclick = async function (addFetch) {
        if (imgCondition === true && textCondition === true) {
            addFetch = await fetch("http://localhost:5678/api/works", fetchAddWork())
                .catch((error) => alert("Un problème est survenu, réessayer plus tard")) 
            let newFetch = await fetch("http://localhost:5678/api/works/")
                .then((response) => response.json())
            let works = await newFetch
            console.log(works)
            document.querySelector(".container-photos").innerHTML = ""
            document.querySelector(".gallery").innerHTML = ""
            modalePictures(await works)
            genererProjets(await works)
            imgCondition = false
            textCondition = false
            document.querySelector("#pictureName").value = ""
            document.querySelector(".ajouter-photo div").style.display = "flex"
            const currentImg = document.querySelector(".ajouter-photo img")
            currentImg.remove()
            newBtn.classList.add("inactive-btn")
            newBtn.classList.remove("modale-btn")
        }
        else {
            alert("Tous les champs ne sont pas remplie")
        }
    }
}



export function fetchAddWork () {
    const token = localStorage.getItem("token")
    let pictureName = document.getElementById("pictureName")
    let nameValue = pictureName.value
    let categoryName = document.getElementById("CategoryName")
    let categoryValue = categoryName.value
    let fetch = document.querySelector("#fileUpload")

        const formdata = new FormData();
        formdata.append("image", fetch.files[0]);
        formdata.append("title", nameValue);
        formdata.append("category", categoryValue);
        
        const requestOptions = {
            method:"POST",
            headers: {"Authorization": "Bearer " + token},
            body: formdata,
        }
        return requestOptions
    }

