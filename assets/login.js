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
        // .catch((error) => alert("Impossible de communiquer avec le serveur"))
    return token
}

formLogin.addEventListener("submit", async function (event) {
    const incorrectPwd = document.querySelector(".login p")
    incorrectPwd.style.display = "none"
    event.preventDefault();
    y = event
    try {
        login()
        let token = await login()
        if (token) {
            window.localStorage.setItem("token", token)
            window.location.replace("index.html")
        }
        else {
            incorrectPwd.style.display = "block"
        }
    }
    catch {
        alert("Impossible de communiquer avec le serveur")  
    }
})
