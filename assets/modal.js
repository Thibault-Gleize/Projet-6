const formLogin = document.querySelector(".form-login")

function userData (event) {
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
    /// const status = response.then(response => response.status)
    const token = response.then(response => response.json()
    .then(response => response.token))
    return token
}

function submit () {
    formLogin.addEventListener("submit", async function (event) {
        event.preventDefault();
        userData(event)
        const x = await userData(event)
        if (x !== undefined) {
            window.location.replace("index.html")
        }
        else {
            const champEmail = document.querySelector(".form-login");
            const wrongPwd = document.createElement("p")
            wrongPwd.innerText = "E-mail ou mot de passe incorrect"
            champEmail.appendChild(wrongPwd)
        }
    })
}

submit()

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