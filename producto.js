let id = window.location.search;
const urlParams = new URLSearchParams(id);
let producto = urlParams.get('id');
console.log(producto)
let carrito = [];
let productContainer = document.querySelector('.producto');

let res = await fetch('https://colombiaamaarte-8a32e-default-rtdb.firebaseio.com/obra.json')
let data = await res.json()

//ARREGLO CON PRODUCTOS LIMITAMOS
let productsArray = data

//IMPRIMIR PRODUCTOS EN PANTALLA
productsArray.forEach(obra => {
    if (obra.id == producto) {
        
        productContainer.innerHTML += `
        <section class="py-5">
        <div class="container px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5 align-items-center">
        <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0"
        src="${obra.img1}" alt="..."></div>
        <div class="col-md-6">
        <h1 class="display-5 fw-bolder">${obra.titulo}</h1>
        <div class="fs-5 mb-5">
        <span class="text-decoration-line-through"></span>
        <span>USD $${obra.precio}</span>
        </div>
        <p class="lead">Autor de la obra ${obra.autor} esta pintura ${obra.tecnica} tiene como medidas ${obra.medidas}. No te pierdas
         la oportunidad de llevarte a tu casa y disfrutar cada dia de esta magnífica pieza de arte contemporáneo.</p>
        <div class="d-flex">
        <button class="btn btn-outline-dark flex-shrink-0" type="button" value="${obra.id}">
        <i class="bi-cart-fill me-1"></i>
        Estoy interesado
        </button>
        </div>
        </div>
        </div>
        </div>
        </section>
        
        `
    }
});

let addBtns = document.querySelectorAll('div.d-flex button');
addBtns = [...addBtns];

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
		*ColombiAmArte*%0A%0A
		Tu compra:%0A
		${texto}`;

    window.open(url);
}


