const socket = io.connect();

function render(data) {
    const html = data.map((elem, i, arr) => {
        return(
            `<div class="chat-msg ${i === arr.length - 1 ? 'animate__animated animate__bounceInLeft' : ''}">
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`
        )
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

function addProduct(e) {
    const product = {
        title: document.getElementById('product-title').value,
        price: document.getElementById('product-price').value,
        image: document.getElementById('product-image').value
    };
    socket.emit('new-product', product);
    return false;
}

const renderProductsList = (products) => {
    return fetch('./templates/productsList.ejs')
    .then(response => response.text())
    .then(template => {
        const productListTemplate = ejs.compile(template);
        const html = productListTemplate({ products });
        return html;
    })
}

socket.on('products', (data) => {
    renderProductsList(data)
        .then(html => {
            document.getElementById('products').innerHTML = html;
        })
});

socket.on('messages', function(data) { render(data); });