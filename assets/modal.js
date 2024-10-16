const reponseWorks = await fetch("http://localhost:5678/api/works/");
let works = await reponseWorks.json();

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

export async function modaleBox () { 
    const main = document.querySelector("body")
    const modaleSection = document.createElement("section")
    const modaleDiv = document.createElement("div")
    const closeCross = document.createElement("span")
    const text = document.createElement("p")
    const bar = document.createElement("div")
    const addButton = document.createElement("button")

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

    main.insertAdjacentElement("afterbegin", modaleSection)
    modaleSection.appendChild(modaleDiv)
    modaleDiv.appendChild(closeCross)
    modaleDiv.appendChild(text)
    modalePictures()
    modaleDiv.appendChild(bar)
    modaleDiv.appendChild(addButton)
}

export async function openCloseModale () {
    const closeModale = document.querySelector(".close")
    const modal = document.querySelector(".modale")
    const modaleButton = document.querySelector("#portfolio span")

    modaleButton.onclick = function() {
        modal.style.display = "block"
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