const carrito = document.getElementById('carrito');
const Productos = document.getElementById('Lista-Productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('#vaciar-carrito');

cargarEventListeners();

function cargarEventListeners(){
    Productos.addEventListener('click', comprarProducto);
    carrito.addEventListener('click', eliminarProducto);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const Producto = e.target.parentElement.parentElement;
        leerDatosProducto(Producto);
    }
}

function leerDatosProducto(Producto){
    const infoProducto ={
        Categoria: Producto.querySelector('h4').textContent,
        Imagen: Producto.querySelector('img').src,
        Producto: Producto.querySelector('h4').textContent,
        Precio: Producto.querySelector('.precio span').textContent,
        id: Producto.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoProducto);
}

function insertarCarrito(Producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${Producto.Categoria}</td>
    <td>
        <img src="${Producto.Imagen}" width=100>
    </td>
    <td>${Producto.Producto}</td>
    <td>${Producto.Precio}</td>
    <td>
    <a href="#" class="borrar-Producto" data-id="${Producto.id}">X</a>
    </td>
    `;
    listaProductos.appendChild(row);
    guardarProductoLocalStorage(Producto);
}

function eliminarProducto(e){
    e.preventDefault();

    let Producto,
        ProductoId;

    if(e.target.classList-contains('borrar-producto')){
        e.target.parentElement.parentElement.remove();
        Producto = e.target.parentElement.parentElement;
        ProductoId = Producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(ProductoId)
}

function vaciarCarrito(){
    while(listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild);
    }

    varciarLocalStorage();

    return false;
}

function guardarProductoLocalStorage(Producto) {
    let Productos;

    Productos = obtenerProductosLocalStorage();
    Productos.push(Producto);

    localStorage.setItem('Productos', JSON.stringify(Productos));
}

function obtenerProductosLocalStorage() {
    let ProductoLS;

    if(localStorage.getItem('Productos') === null){
        ProductoLS = [];
    }else{
        ProductoLS = JSON.parse(localStorage.getItem(Productos));
    }
    return ProductoLS;
}

function leerLocalStorage() {
    let ProductoLS;

    ProductoLS = obtenerProductosLocalStorage();

    ProductoLS.forEach(function(Producto){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${Producto.Categoria}</td>
        <td>
            <img src="${Producto.Imagen}" width=100>
        </td>
        <td>${Producto.Producto}</td>
        <td>${Producto.Precio}</td>
        <td>
        <a href="#" class="borrar-Producto" data-id="${Producto.id}">X</a>
        </td>
        `;
        listaProductos.appendChild(row);
    });
}

function eliminarProductoLocalStorage(Producto) {
    let ProductoLS;
    ProductoLS = obtenerProductosLocalStorage();

    ProductoLS.forEach(function(ProductoLS, index){
        if(ProductoLS.id === Producto){
            ProductoLS.splice(index, 1);
        }
    });

    localStorage.setItem('Productos', JSON.stringify(ProductoLS));
}

function varciarLocalStorage() {
    localStorage.clear();
}