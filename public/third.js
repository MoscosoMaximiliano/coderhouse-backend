const google = document.querySelector("#google");
google.addEventListener("click", async () => {
    try {
        const opts = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        };
        let response = await fetch("/api/sessions/google", opts);
        response = await response.json();
        console.log(response);
        alert(response.message);
        response.session && location.replace("/");
    } catch (error) {
        alert(error.message);
    }
});