const socket = io();

document.querySelector("#submit").addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const price = document.querySelector("#price").value;
    const stock = document.querySelector("#stock").value;

    const data = {};
    title && (data.title = title);
    price && (data.price = price);
    stock && (data.stock = stock);

    socket.emit("new product", data);
  });