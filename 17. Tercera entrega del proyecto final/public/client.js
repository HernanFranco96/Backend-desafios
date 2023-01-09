const socket = io.connect();

const validation = () => {
    const author = document.getElementById('email');
    author.addEventListener('change', event =>{
        document.getElementById('message').disabled = false;
        document.getElementById('btnMessage').disabled = false;
    });
};

const addMessage = () => {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const age = document.getElementById('age').value;
    const alias = document.getElementById('alias').value;
    const text = document.getElementById('message').value;
    const today = new Date();
    const date = today.toLocaleString('en-GB');
    const message = {
        author: {
            email: email,
            name: name,
            lastname: lastname,
            age: age,
            alias: alias,
        },
        text: text,
        date: date
    }

    socket.emit('new-Message', { id: 'messages', message });
    return false;
};

const renderProduct = data => {
    const arrayProducts = JSON.parse(data);
    const html = arrayProducts.map((element) => {
        return (`
            <tr>
                <td name="title" id="title">${element.title}</td>
                <td name="price" id="price">${element.price}</td>
                <td name="thumbnail" id="thumbnail"><img src="/${element.thumbnail}" class="rounded" width="75"/></td>
            </tr>
        `);
    })
    document.getElementById('products').innerHTML = html;
    socket.emit('products-shown', 'Productos mostrados');
};

const renderChat = data => {
    const arrayProducts = JSON.parse(data);
    const html = arrayProducts.map((element) => {
        return (`
            <b style="color=blue">${element.email}</b>
            <p style="color=#E59866">${element.date}</p>
            <p style="color=green"><i>${element.text}</i></p>
        `);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('products', data => {
    renderProduct(data);
});
 
socket.on('show-messages', data => {
    renderChat(data);
    document.getElementById('message').value = "";
});