// Check si nécessite refactorisation pour éviter les répétitions


// Récupération works et catégorie depuis l'API
const reponseWorks = await fetch("http://localhost:5678/api/works/");
let works = await reponseWorks.json();
const reponseCategories = await fetch("http://localhost:5678/api/categories");
let categories = await reponseCategories.json();

// Transformation en chaîne de charactère JSON 
const valeurWorks = JSON.stringify(works);
const valeurCategories = JSON.stringify(categories);

function genererProjets(works){
    for (let i = 0; i < works.length; i++) {
        const figure = works[i];
        // Récupération de l'élément DOM
        const divFiltres = document.querySelector(".gallery");
        // Création de balise pour works
        const workElement = document.createElement("figure");
        // Création balise
        const imageElement = document.createElement("img");
        const textElement = document.createElement("figcaption")

        // Ajout source pour imageElement (balise img)
        imageElement.src = figure.imageUrl;
        imageElement.alt = figure.title
        // Ajout texte pour textElement (balise figcaption)
        textElement.innerText = figure.title

        // Rattachement à la div gallery
        divFiltres.appendChild(workElement)
        workElement.appendChild(imageElement)
        workElement.appendChild(textElement)
    }
}

// Création des filtres pour les catégories 

function genererCategories(categorie){
    // Récupération de l'élément DOM
    const divFiltres = document.querySelector(".filtres");
    // Création div + balise p pour filtre tous
    const allTextElement = document.createElement("button")
    // Ajout texte
    allTextElement.innerText = "Tous"
    allTextElement.classList = "All active"
    // Rattachement à div gallery en 1ere place 
    divFiltres.appendChild(allTextElement)

    for (let i = 0; i < categorie.length; i++){
        const figure = categorie[i];
        // Création balise
        const textElement = document.createElement("button")
        // Ajout texte pour textElement (balise p)
        textElement.innerText = figure.name
        textElement.classList = figure.name
        // Rattachement à la div gallery
        divFiltres.appendChild(textElement)
    }
}

genererCategories(categories)
genererProjets(works)

// Gestion des boutons 
    // Gestion class active
function removeActive () {
    let allButtons = document.querySelectorAll(".filtres button")
    allButtons.forEach(function (button) {
        button.classList.remove("active")
    })
}

    // Bouton All 
const boutonAll = document.querySelector(".All")
boutonAll.addEventListener("click", function () {
    /// document.querySelector(".filtres").innerHTML = ""
    /// genererCategories(categories)
    removeActive()
    boutonAll.classList.add("active") 
    document.querySelector(".gallery").innerHTML = ""
    genererProjets(works)
})

    // Bouton Objet 
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

    // Bouton Appartement 
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

// Bouton Hotel & Restaurants
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
