
const carritoDeCompras = ["Lavandina", "Jabon liquido", "Pascualina", "Carne molida", "Fideos"].sort();
let continuar = confirm(("Bienvenido al supermecado JS\n Ya tienes tu orden habitual lista.\n Necesita algo mas de la tienda??"))

const agregarProductoAlFinal = function(){
    const productoAAgregar = prompt("Que producto desea agregar a la lista? ")
    carritoDeCompras.push(productoAAgregar)
    carritoActual(carritoDeCompras)} ;

const agregarProductoAlPrincipio = function(){
    const productoAAgregar = prompt("Que producto esencial quieres agregar? ")
    carritoDeCompras.unshift(productoAAgregar)
    carritoActual(carritoDeCompras)};

function posicionProducto(producto, posicion){
    if(posicion < 2){
    alert("El producto " + producto + " es esencial y se encuentra en la posición: " + posicion); 
    }
    else{
    alert("El producto " + producto + " no es necesario y se encuentra en la posición: " + posicion); 
    }
}

function buscarProducto(productoABuscar){
    if(carritoDeCompras.includes(productoABuscar)){
        alert("El producto " + productoABuscar + " se encuentra en el carrito");    
    } else {
        alert("El producto " + productoABuscar + " no se encuentra en el carrito");
        if(confirm("Desea agregarlo? ")){
            carritoDeCompras.splice(2, 0, productoABuscar)
            alert("Se agrego correctamente")
            carritoActual(carritoDeCompras);
        }else{
            alert("No se agrego al carrito")
            carritoActual(carritoDeCompras)}
    }
}

const carritoActual = (carrito) => {
    for(producto of carrito){
        console.log("Producto: " + producto)
    }
};


while(continuar){   
        const opcion = prompt("Seleccione una opción:\n1. Agregar producto al final\n2. Agregar producto al principio\n3. Eliminar producto\n4. Buscar producto en la lista\n5. Posicion del producto\n0. Salir")
        
        switch(opcion) {
        case "1":
            agregarProductoAlFinal()
            break
        case "2":
            agregarProductoAlPrincipio()
            break
        case "3":
            if(confirm("Quiere eliminar el ultimo producto?")){
            const productoEliminado = carritoDeCompras.pop()
            console.log("El producto eliminado del carrito es " + productoEliminado)
            }
            break
        case "4":
            const productoBuscado = prompt("Que producto desea buscar en la lista??")
            buscarProducto(productoBuscado)
            break
        case "5":
            const productoIncluido = prompt("Ingrese el producto que desea buscar: ");
            const indexProducto = carritoDeCompras.indexOf(productoIncluido);
            posicionProducto(productoIncluido, indexProducto)
            break
        case "0":
            continuar = false
            alert("Gracias por comprar con nosotros")
            break
        default:
            alert("Opcion Invalida")
            break
        }
    }
console.log("Tu lista de compra final es: ")
carritoActual(carritoDeCompras)


