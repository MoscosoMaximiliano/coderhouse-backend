document.querySelector("#signout").addEventListener("click", async () => {
    try {
        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
        };
        let response = await fetch("/api/sessions/logout", opts);
        response = await response.json();
        alert(response.message);
        if (response.statusCode === 200) {
            localStorage.removeItem("token")
            location.replace("/");
        }
    } catch (error) {
        alert(error.message);
    }
})