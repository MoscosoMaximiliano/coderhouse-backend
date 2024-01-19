const socket = io();

document.querySelector("#submit").addEventListener("click", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;

    const data = {};
    name && (data.name = name);
    email && (data.email = email);
    //console.log(data);
    socket.emit("new user", data);
  });