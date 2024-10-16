const formLogin = document.querySelector(".form-login")

// Variable permettant ensuite d'intégrer event
let y = ""

function login () {
    const log = {
        email: y.target.querySelector("[name=email]").value,
        password : y.target.querySelector("[name=password]").value
    }
    // Création Charge utile 
    const chargeUtile = JSON.stringify(log)
    // Partie fetch à l'API
    const response = fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: chargeUtile
    })
    // Récupération du token
    const token = response.then(response => response.json()
    .then(response => response.token))
    return token
}

formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();
    y = event
    login()
    let token = await login()
    // Stockage du token dans localstorage + renvoie à la page index
    if (token !== undefined) {
        window.localStorage.setItem("token", token)
        window.location.replace("index.html")
    }
    /* Nécessité de refaire cette partie avec innerHTML pour éviter
    si mot de passe incorrect de relancer la fonction*/
    else {
    const champEmail = document.querySelector(".form-login");
    const wrongPwd = document.createElement("p")
    wrongPwd.innerText = "E-mail ou mot de passe incorrect"
    champEmail.appendChild(wrongPwd)
    }
})


/* 
1) Lors de l'appuie sur le bouton viens prendre les values
dans e-mail et mdp 

2) Effectue ensuite la charge utile et la reponse

3) return la reponse pour ensuite vérifier si status OK
et enregistrement du token
PS : check keep-alive et timeout dans header POSTMAN

4) renvoie vers la page index qui permet les modifications

5) Promesse  .catch
*/


/* Partie Modification de la page index une fois connecté 

1) Une fois connecté = token enregistré dans x dans submit. 

2) Autre fichier Connected qui permet de modifier le HTML


*/