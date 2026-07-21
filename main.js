// Juego de practica
// Se pide que ingrese el nombre de un personaje e inicia con 100 de salud
//Las variables danio y recuperacion son utilizadas para modificar la salud del personaje dependiendo de la accion q elija
let personaje = prompt("Nombre de personaje")
let saludPersonaje = 100
let danio = 30
let recuperacion = 15
while(saludPersonaje > 0){
    let accionPersonaje = prompt("Decides Atacar o Huir??")
    if(accionPersonaje == "Atacar"){
        saludPersonaje -= danio
        alert(`Tu personaje ${personaje} no puede atacar y quedo con ${saludPersonaje} de salud`)
    }
    else if(accionPersonaje == "Huir"){
        saludPersonaje += recuperacion
        alert(`Tu personaje ${personaje} huyo y acumula ${saludPersonaje} de salud`)
    }       
    else{
        alert("Ingrese una accion valida")
    }
}
// Si la salud llega a 0, te avisa que el personaje está muerto
if(saludPersonaje <= 0){
    alert(`Tu personaje ${personaje} esta muerto`)
    console.log("Fin del Juego")
}

// Menu de restaurante
// Primero se elige un tipo de cliente
let tipoCliente = Number(prompt("Elige el numero de tu tipo de cliente: \n 1. Primera Vez\n 2. Comensal cotidiano\n 3. Ejecutivo\n 0. Salir"))
let opcionMenu 
let hamburguesa = 9000
let pizza = 10000
let ensalada = 5000
let milanesa = 12000
let empanadas = 20000
let lomo = 22000

// Ingresa al bucle si el usuario no ingresa 0
// Al no haber visto funciones todavia, me quedo un codigo muy repetido
while(tipoCliente!==0){
// El usuario debe elegir las opciones del menu y tiene descuento de acuerdo al tipo de cliente
if(tipoCliente===1){
    opcionMenu = Number(prompt("Menu del Restaurante\n 1.Hamburguesa Clásica\n2.Pizza Muzzarella\n3.Ensalada César\n4.Milanesa con Papas\n5.Empanadas (docena)\n6.Lomo Completo\n0.Salir"))
    switch(opcionMenu){
        case 1:
            alert(`Tu primera compra queda en un 50%\nHamburguesa de $ ${hamburguesa} queda en $${hamburguesa/2}`)
            break;
        case 2:
            alert(`Tu primera compra queda en un 50%\nPizza de $ ${pizza} queda en $${pizza/2}`)
            break
        case 3:
            alert(`Tu primera compra queda en un 50%\nEnsalada Cesar de $ ${ensalada} queda en $${ensalada/2}`)
            break
        case 4:
            alert(`Tu primera compra queda en un 50%\nMilanesa con Papas de $ ${milanesa} queda en $${milanesa/2}`)
            break
        case 5:
            alert(`Tu primera compra queda en un 50%\nDocena de Empanadas de $ ${empanadas} queda en $${empanadas/2}`)
            break
        case 6:
            alert(`Tu primera compra queda en un 50%\nLomo Completo de $ ${lomo} queda en $${lomo/2}`)
            break
        default:
            alert("Te esperamos nuevamente")
    }
    break
}
else if(tipoCliente===2){
    opcionMenu = Number(prompt("Menu del Restaurante\n 1.Hamburguesa Clásica\n2.Pizza Muzzarella\n3.Ensalada César\n4.Milanesa con Papas\n5.Empanadas (docena)\n6.Lomo Completo\n0.Salir"))
    switch(opcionMenu){
        case 1:
            alert(`Tu primera compra queda en un 30%\nHamburguesa de $ ${hamburguesa} queda en $${hamburguesa-hamburguesa*0.30}`)
            break;
        case 2:
            alert(`Tu primera compra queda en un 30%\nPizza de $ ${pizza} queda en $${pizza-pizza*0.30}`)
            break
        case 3:
            alert(`Tu primera compra queda en un 30%\nEnsalada Cesar de $ ${ensalada} queda en $${ensalada-ensalada*0.30}`)
            break
        case 4:
            alert(`Tu primera compra queda en un 30%\nMilanesa con Papas de $ ${milanesa} queda en $${milanesa-milanesa*0.30}`)
            break
        case 5:
            alert(`Tu primera compra queda en un 30%\nDocena de Empanadas de $ ${empanadas} queda en $${empanadas-empanadas*0.30}`)
            break
        case 6:
            alert(`Tu primera compra queda en un 30%\nLomo Completo de $ ${lomo} queda en $${lomo-lomo*0.30}`)
            break
        default:
            alert("Te esperamos nuevamente")
    }
    break
}
else{
    opcionMenu = Number(prompt("Menu del Restaurante\n 1.Hamburguesa Clásica\n2.Pizza Muzzarella\n3.Ensalada César\n4.Milanesa con Papas\n5.Empanadas (docena)\n6.Lomo Completo\n0.Salir"))
    switch(opcionMenu){
        case 1:
            alert(`Tu primera compra queda en un 60%\nHamburguesa de $ ${hamburguesa} queda en $${hamburguesa-hamburguesa*0.30}`)
            break;
        case 2:
            alert(`Tu primera compra queda en un 60%\nPizza de $ ${pizza} queda en $${pizza-pizza*0.60}`)
            break
        case 3:
            alert(`Tu primera compra queda en un 60%\nEnsalada Cesar de $ ${ensalada} queda en $${ensalada-ensalada*0.60}`)
            break
        case 4:
            alert(`Tu primera compra queda en un 60%\nMilanesa con Papas de $ ${milanesa} queda en $${milanesa-milanesa*0.60}`)
            break
        case 5:
            alert(`Tu primera compra queda en un 60%\nDocena de Empanadas de $ ${empanadas} queda en $${empanadas-empanadas*0.60}`)
            break
        case 6:
            alert(`Tu primera compra queda en un 60%\nLomo Completo de $ ${lomo} queda en $${lomo-lomo*0.60}`)
            break
        default:
            alert("Te esperamos nuevamente")
    }
    break
}
}
// Si el usuario elige 0, aparece el mensaje de alerta
if(tipoCliente === 0){
    alert("No decidiste comer aqui")
}