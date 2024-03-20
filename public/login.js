const selector = document.querySelector("#submit");
selector.addEventListener("click", async () => {
    try {
        const data = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
        };
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        let response = await fetch("/api/sessions/login", opts);
        response = await response.json();
        alert(response.message);
        if (response.statusCode === 200) {
            localStorage.setItem("token", response.token)
            //location.replace("/");
        }
    } catch (error) {
        alert(error.message);
    }
});