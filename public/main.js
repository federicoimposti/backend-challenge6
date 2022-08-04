const socket = io.connect();

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
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
    console.log(data);
    renderProductsList(data)
        .then(html => {
            document.getElementById('products').innerHTML = html;
        })
});

socket.on('messages', function(data) { render(data); });