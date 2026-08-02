let precioXKm = 2000;
const precioXAyudante = 5000;

let calculoViaje = function (kmDelViaje, precio) {
    let viaje = kmDelViaje * precio;
    return viaje;
}

function isFueraDeCordoba(kmDelViaje){
    if(kmDelViaje > 400){
        precioXKm = 3000;
        console.log("El viaje es fuera de Cordoba, el precio por kilometro es de: " + precioXKm);
    }
}
function cantidadDeAyudantes(cantidad, precio){
    return cantidad * precio;
}

if(confirm("Buenos dias, usted necesita un flete?")) {
    let km = Number(prompt("Ingrese la cantidad de kilometros del viaje."))
    isFueraDeCordoba(km);
    let precioDelViaje = calculoViaje(km, precioXKm);
    console.log("El precio del viaje es de: " + precioDelViaje);

    let ayudante = confirm("Desea agregar un ayudante al viaje? (El costo es de $5000)");

    if(ayudante){
        let cantAyudantes = Number(prompt("Ingrese la cantidad de ayudantes que desea agregar al viaje."));
        let precioConAyudante = (viajeConAyudante) => ayudante ? precioDelViaje + cantidadDeAyudantes(cantAyudantes, precioXAyudante) : precioDelViaje;
        console.log("Usted contrato " + cantAyudantes + " ayudante(s) para el viaje.");
        console.log("El precio final del viaje con ayudantes de: " + precioConAyudante(precioDelViaje))
        }else{
            console.log("Usted no contrato ayudantes para el viaje.");
            console.log("El precio final del viaje es de: " + precioDelViaje);
    }
}
alert("Gracias por utilizar nuestro servicio de fletes, vuelva pronto!");
