//VARIABLES INIIALES
//ARREGLO CON PRODUCTOS QUE ENTRAN EN EL CARRITO Y TOTAL
let shoppingCartArray = [];

let carrito = [];
let canItem = 0;

let total = 0;
// VARIABLE DEL DIV A DONDE VAN LOS ITEMS SE UTILIZA QUERYSELECTOR
let productContainer = document.querySelector('.pinturas');

//selecciono el elemento dentro de el html que muestra el total
let totalElement = document.querySelector('.cart-total-title');

//LLAMADO A LA API STORE
//PETICION DE PRODUCTOS AL SERVIDOR

//fetch('https://api.escuelajs.co/api/v1/products')
//.then(res => res.json())
//.then(data => console.log(data));

let res = await fetch('https://colombiaamaarte-8a32e-default-rtdb.firebaseio.com/obra.json')
let data = await res.json()

//ARREGLO CON PRODUCTOS LIMITAMOS
let productsArray = data

//IMPRIMIR PRODUCTOS EN PANTALLA
productsArray.forEach(obra => {
    // se utiliza innerHTML para decir que va ir sumar al contenido los datos del servidor
    // tecnica  <p class="card-text">Estilo: ${obra.estilo}</p>
    productContainer.innerHTML += `
    <div class="col">
        <div class="card shadow-sm">
            <img class="bd-placeholder-img card-img-top" width="100%" height="225"
                src="${obra.imagenes.img1}" role="img" aria-label="Placeholder:"
                preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef"
                    dy=".3em"></text>
            </svg>
            <div class="card-body">
                <p class="card-text">Titulo: ${obra.titulo}</p>
                <p class="card-text">Autor: ${obra.autor}</p>
                <p class="card-text">Tecnica: ${obra.tecnica}</p>
                <p class="card-text">Medidas: ${obra.medidas}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" value="${obra.id}" class="btn btn-sm btn-success btn-outline compra ">Me Interesa</button>
                    </div>
                    <small class="text-body-secondary">USD $${obra.precio}</small>
                </div>
            </div>
        </div>
    </div>`
});

let addBtns = document.querySelectorAll('div.btn-group button');
addBtns = [...addBtns];
let cartContainer = document.querySelector('.cart-items');

addBtns.forEach(btn => {
    btn.addEventListener('click', event => {
        let actualID = (btn.value)
        let actualProduct = productsArray.find(item => item.id == actualID);
        let itemCompra = {"id":actualID ,"nombre": actualProduct.titulo, "autor": actualProduct.autor, "precio": actualProduct.precio, "imagen": actualProduct.imagenes.img1 }
        carrito.push(itemCompra)
        enviarWap();
    });

});

function enviarWap() {
    //INGRESE UN NUMERO DE WHATSAPP VALIDO AQUI:
    let telefono = "573153582241";
    let texto = " ";

    //SE OBTIENE LOS PRODUCTOS CANTIDAD Y PRECIO DEL CARRITO
    carrito.forEach(item => {
        texto = `Me interesa la obra
        %0ATitulo: *${item.nombre}*
        %0AAutor: *${item.autor}*
        %0AValor: USD$ *${item.precio}*
    %0A%0A`;;
    });

    let url = `https://api.whatsapp.com/send?phone=${telefono}&text=
		*Colombiamarte*%0A%0A
		Tu compra:%0A
		${texto}`;

    window.open(url);
}
