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
export function userData (event) {
    const log = {
        email: event.target.querySelector("[name=email]").value,
        password : event.target.querySelector("[name=password]").value
    }
    // Création Charge utile 
    const chargeUtile = JSON.stringify(log)
    const response = fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: chargeUtile
    })
    const token = response.then(response => response.json()
    .then(response => response.token))
    return token
}

const submit = formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();
    userData(event)
    const x = await userData(event)
    if (x !== undefined) {
        console.log(x);
    }
    else {
    const champEmail = document.querySelector(".form-login");
    const wrongPwd = document.createElement("p")
    wrongPwd.innerText = "E-mail ou mot de passe incorrect"
    champEmail.appendChild(wrongPwd)
    }
})
*/

