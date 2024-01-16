const socket = io();

socket.on("products", async (data) => {
    console.log(data)
    const template = data.map((product) => `
    <div class="col">
        <div class="card h-100 shadow-sm"> <img src="${product.photo}" class="card-img-top" alt="Product Image">
            <div class="card-body">
                <div class="clearfix mb-3">
                    <span class="float-start badge rounded-pill bg-primary">Stock: ${product.stock}</span>
                    <span class="float-end price-hp">Price: ${product.price}$</span> </div>
                    <h5 class="card-title">${product.title}</h5>
                <div class="text-center my-4"> <a href="#" class="btn btn-warning">Check offer</a> </div>
            </div>
        </div>
    </div>`
    ).join("")

    document.querySelector("#container").innerHTML = template
});
