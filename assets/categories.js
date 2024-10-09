
// Récupération works et catégorie depuis l'API
const reponseWorks = await fetch("http://localhost:5678/api/works/");
let works = await reponseWorks.json();
const reponseCategories = await fetch("http://localhost:5678/api/categories");
let categories = await reponseCategories.json();

// Transformation en JSON 
const valeurWorks = JSON.stringify(works);
const valeurCategories = JSON.stringify(categories);

function genererProjets(works){
    for (let i = 0; i < works.length; i++) {
        const figure = works[i];
        // Récupération de l'élément DOM
        const divGallery = document.querySelector(".gallery");
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
        divGallery.appendChild(workElement)
        workElement.appendChild(imageElement)
        workElement.appendChild(textElement)
    }
}

function genererCategories(categorie){
    // Récupération de l'élément DOM
    const divGallery = document.querySelector("#portfolio h2");
    // Création div + balise p pour filtre tous
    const allCategoriesElement = document.createElement("div")
    const allTextElement = document.createElement("p")
    // Ajout texte
    allTextElement.innerText = "Tous"
    // Rattachement à div gallery en 1ere place 
    divGallery.appendChild(allCategoriesElement)
    allCategoriesElement.appendChild(allTextElement)


    for (let i = 0; i < categorie.length; i++){
        const figure = categorie[i];
        // Création de balise pour categories
        const categorieElement = document.createElement("div");
        // Création balise
        const textElement = document.createElement("p")

        // Ajout texte pour textElement (balise p)
        textElement.innerText = figure.name
        // Rattachement à la div gallery
        allCategoriesElement.appendChild(textElement)
    }
}

genererCategories(categories)
genererProjets(works)