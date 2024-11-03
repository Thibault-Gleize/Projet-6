import {works, genererProjets} from "./index.js"
import {modalePictures} from "./modal.js"

/* Gestion des boutons des catégories */

    // Enlève le style active des bouttons
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
    
// Regroupement de tous les boutons pour être intégrer à main
    export function boutonsFiltres () {
        btnTous()
        btnObjet()
        btnAppartement()
        btnHotelEtRestaurants()
    }

// Renvoie à la page de login
export function loginBouton () {
    const login = document.querySelectorAll("header li")[2]
    login.addEventListener("click", function() {
        window.location.replace("login.html")
    })
}

    /* Gestion des boutons relatif à la partie login */

/* 
INDEX :
Permet de modifier la balise li login en logout et clear
le localstorage pour supprimer le token et refresh la page index
*/

export function logoutBouton () {
    const logout = document.querySelectorAll("header li")[2]
    logout.innerText = "logout"
    logout.addEventListener("click", function() {
        localStorage.clear()
        window.location.replace("index.html")
    })
}

/* 
Boutons relatif à la 1ere page modal 
*/

// Bouton permettant de supprimer les projets
export function supprProjet () {
    const token = localStorage.getItem("token")
    const trashList = document.querySelectorAll(".container-photos i")
    const containerPhotos = document.querySelector(".container-photos")

    // Affecte fonction onclick sur chacune des icones de la trashlist
    trashList.forEach(function (trash) {
        trash.onclick = async function(fetchDetele) {
            fetchDetele = await fetch(`http://localhost:5678/api/works/${trash.id}`, {
                method:"DELETE",
                headers: {"Authorization": "Bearer " + token},
            })
                .catch((error) => alert("Un problème est survenu, réessayer plus tard")) 
            
            // Permet d'actualiser les travaux une fois la suppression effectué
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

/* 
Boutons relatif à la 2ème page modal 
*/

// Variables qui permettent de vérifier que l'image et le text sont ajouté
let imgCondition = false
let textCondition = false

// Modifie la classe CSS pour aspect du bouton valider
function ValiderBtn () {
    const validationBtn = document.querySelector(".fetch")
    validationBtn.classList.remove("inactive-btn")
    validationBtn.classList.add("modale-btn")
}

function nonValideBtn () {
    const validationBtn = document.querySelector(".fetch")
    validationBtn.classList.add("inactive-btn")
    validationBtn.classList.remove("modale-btn")
}


// Permet d'afficher l'image une fois sélectionner
export function imgChange () {
    let file = document.querySelector("#fileUpload")

    file.onchange = () => {
        const divPicture = document.querySelector(".ajouter-photo")
        const divAddPicture = document.querySelector(".ajouter-photo div")
        const img = document.createElement("img")

        // Gère l'affichage de l'image si sélectionner
        try {
            img.src = URL.createObjectURL(file.files[0])
            divPicture.insertAdjacentElement("afterbegin", img)
            divAddPicture.style.display = "none"
            imgCondition = true
            changeImg()
            // Si text est vérifié, bouton valider change
            if (textCondition) {
                ValiderBtn()
            }
        }
        // Affiche l'élément de sélection si cancel de l'input
        catch{
            document.querySelector(".ajouter-photo div").style.display = "flex"
            imgCondition = false
            nonValideBtn()
        }
    }
}

// Permet de modifier l'image précédemment sélectionné en cliquant dessus
function changeImg () {
    let img = document.querySelector(".ajouter-photo img")

    img.onclick = function () {
        img.remove()
        document.getElementById("fileUpload").click()
    }
}

// Vérifie si le champ de text est remplie
export function txtChange () {
    const workName = document.getElementById("pictureName")

    workName.addEventListener("input", function(){
        if (workName.value !== "") {
            textCondition = true
            // Si img est vérifié, bouton valider change
            if (imgCondition) {
                ValiderBtn()
            }
        }
        else{
            textCondition = false
            nonValideBtn()
        }
    })
}


// Function qui gère le POST du nouveau projet
export function ajouterWorkBtn () {
    let newBtn = document.querySelector(".fetch")

    newBtn.onclick = async function (addFetch) {
        if (imgCondition && textCondition) {
            addFetch = await fetch("http://localhost:5678/api/works", ajouterWorkInfo())
                .catch((error) => alert("Un problème est survenu, réessayer plus tard")) 
            // Permet d'actualiser les travaux une fois le travaux ajouté
            let newFetch = await fetch("http://localhost:5678/api/works/")
                .then((response) => response.json())
            let works = await newFetch
            document.querySelector(".container-photos").innerHTML = ""
            document.querySelector(".gallery").innerHTML = ""
            // Regénère les img dans la modale et gallery
            modalePictures(await works)
            genererProjets(await works)
            // Reset le form
            resetForm()
        }
        else {
            alert("Tous les champs ne sont pas remplie")
        }
    }
}


// Fonction qui gère les différentes value pour être utilisé dans la requête POST
function ajouterWorkInfo () {
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


function resetForm() {
    imgCondition = false;
    textCondition = false;
    let file = document.querySelector("#fileUpload")
    document.querySelector("#pictureName").value = "";
    document.querySelector(".ajouter-photo div").style.display = "flex";
    const currentImg = document.querySelector(".ajouter-photo img");
    if (currentImg) currentImg.remove();
        const newBtn = document.querySelector(".fetch");
        newBtn.classList.add("inactive-btn");
        newBtn.classList.remove("modale-btn");
        file.value = ""
}