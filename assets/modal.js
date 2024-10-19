const reponseWorks = await fetch("http://localhost:5678/api/works/");
let works = await reponseWorks.json();

/* Permet de récupérer les photos dans l'API 
Certainement possibilité de récupérer plus facilement via le
fichier categories js 
*/
function modalePictures () {
    const divModale = document.querySelector(".modale-box");
    const divPhotos = document.createElement("div")
    divPhotos.classList = "container-photos"
    divModale.appendChild(divPhotos)

    for (let i = 0; i < works.length; i++) {
        const figure = works[i];
        // Récupération de l'élément DOM
        const divPhotos = document.querySelector(".container-photos");
        // Création de balise pour works
        const workElement = document.createElement("figure");
        // Création balise img
        const imageElement = document.createElement("img");
        // Création balise pour poubelle
        const binElement = document.createElement("i")

        // Ajout source et alt pour imageElement (balise img)
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title
        // Ajout class pour bin
        binElement.classList = "fa-solid fa-trash"

        // Rattachement
        divPhotos.appendChild(workElement)
        workElement.appendChild(imageElement)
        workElement.appendChild(binElement)
    }
}

// Modification de la modale pour la page ajouter photo
function AddPictures () {
    const divModale = document.querySelector(".container-photos");
    // Rajout de la partie image
    const titleText = document.querySelector(".modale-box p")
    const addPictureContainer = document.createElement("div")
    const picture = document.createElement("i")
    const pictureInput = document.createElement("input")
    const pictureInputLabel = document.createElement("label")
    const limitSizeText = document.createElement("p")
    // Rajout de la partie titre et catégorie
    const divNameCategorie = document.createElement("div")
    const pictureName = document.createElement("input")
    const pictureNameLabel = document.createElement("label")
    const categoryName = document.createElement("select")
    const categoryNameLabel = document.createElement("label")
    
    // 
    titleText.innerText = "Ajout photo"
    addPictureContainer.classList = "ajouter-photo"
    picture.classList = "fa-regular fa-image"
    pictureInput.type = "file"
    pictureInput.id = "fileUpload"
    pictureInput.accept = "image/*"
    pictureInputLabel.htmlFor = "fileUpload"
    pictureInputLabel.classList = "upload-photo"
    pictureInputLabel.innerText = "+ Ajoutez photo"
    limitSizeText.innerText = "jpg, png : 4mo max"
    //
    divNameCategorie.classList = "name-category"
    pictureName.type = "text"
    pictureName.id = "pictureName"
    pictureNameLabel.innerText = "Titre"
    pictureNameLabel.htmlFor = "pictureName"
    categoryName.name = "Category"
    categoryName.id = "CategoryName"
    categoryNameLabel.innerText = "Catégorie"
    categoryNameLabel.htmlFor = "CategoryName"

    // Rattachement ajout photo
    divModale.insertAdjacentElement("beforebegin", addPictureContainer)
    addPictureContainer.appendChild(picture)
    addPictureContainer.appendChild(pictureInput)
    addPictureContainer.appendChild(pictureInputLabel)
    addPictureContainer.appendChild(limitSizeText)

    // Rattachement name and category
    divModale.insertAdjacentElement("beforebegin", divNameCategorie)
    divNameCategorie.appendChild(pictureNameLabel)
    divNameCategorie.appendChild(pictureName)
    divNameCategorie.appendChild(categoryNameLabel)
    divNameCategorie.appendChild(categoryName)
}

// Création de la modale avec par défaut
export async function modaleBox () { 
    const main = document.querySelector("body")
    const modaleSection = document.createElement("section")
    const modaleDiv = document.createElement("div")
    const closeCross = document.createElement("span")
    const text = document.createElement("p")
    const bar = document.createElement("div")
    const addButton = document.createElement("button")
    const returnArrow = document.createElement("i")

    //
    modaleSection.classList.add("modale")
    //
    modaleDiv.classList.add("modale-box")
    // 
    closeCross.classList.add("close")
    closeCross.innerHTML = "&times;"
    // 
    text.innerText ="Galerie photo"
    //
    bar.classList.add("bar")
    //
    addButton.classList = ("modale-btn btn-hover")
    addButton.innerText = "Ajouter une photo"
    // 
    returnArrow.classList = "return-arrow fa-solid fa-arrow-left"

    main.insertAdjacentElement("afterbegin", modaleSection)
    modaleSection.appendChild(modaleDiv)
    modaleDiv.appendChild(closeCross)
    modaleDiv.insertAdjacentElement("afterbegin", returnArrow)
    modaleDiv.appendChild(text)
    modalePictures()
    modaleDiv.appendChild(bar)
    modaleDiv.appendChild(addButton)
    AddPictures()
}

// Fonction permettant de ouvrir ou fermer la modale et flèche de retour
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

// Fonction gérant l'ouverture de la 2eme fenêtre
export function addPhotoModal () {
    const ajouterPhoto = document.querySelector(".modale-btn")
    const returnArrow = document.querySelector(".fa-arrow-left")
    const photoContainer = document.querySelector(".container-photos")
    const addPhotoContainer = document.querySelector(".ajouter-photo")
    const nameAndCategory = document.querySelector(".name-category")
    ajouterPhoto.addEventListener("click", function(){
        returnArrow.style.display = "block"
        photoContainer.style.display = "none"
        addPhotoContainer.style.display = "flex"
        nameAndCategory.style.display = "flex"
    })
    returnArrow.addEventListener("click", function(){
        returnArrow.style.display = "none"
        photoContainer.style.display = "flex"
        addPhotoContainer.style.display = "none"
        nameAndCategory.style.display = "none"
    })
}