const socketClient = io();

const form = document.getElementById("form");
const inputTitle = document.getElementById("formInputTitle");
const inputDescription = document.getElementById("formInputDescription");
const inputCode = document.getElementById("formInputCode");
const inputPrice = document.getElementById("formInputPrice");
const inputStatus = document.getElementById("formInputStatus");
const inputStock = document.getElementById("formInputStock");
const inputCategory = document.getElementById("formInputCategory");
const table = document.getElementById("table");
const tableBody = document.getElementById("tableBody");

form.onsubmit = (e) => {
  e.preventDefault();
  const product = {
        title: inputTitle.value,
        description: inputDescription.value,
        code: inputCode.value,
        price: inputPrice.value,
        status: inputStatus.value,
        stock: inputStock.value,
        category: inputCategory.value
    };
  socketClient.emit("crearProducto", product);
};

socketClient.on("productoCreado", (product) => {
  const { id, title, description, code, price, status, stock, category } = product;
  const row = `
    <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td>${description}</td>
        <td>${code}</td>
        <td>${price}</td>
        <td>${status}</td>
        <td>${stock}</td>
        <td>${category}</td>
    </tr>`;
  table.innerHTML += row;
});