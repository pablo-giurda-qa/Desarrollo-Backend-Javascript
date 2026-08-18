
class Vehiculo{
    constructor(marca, modelo, precio, stock, venta){
        this.marca = marca
        this.modelo = modelo
        this.precio = precio
        this.stock = stock
        this.venta = venta
    }
    cuotas(){
        const cuotaAuto = Math.floor(this.precio/84)
        console.log(`El plan de 84 cuotas es de ${cuotaAuto} pesos`)
    }
    actualizarStock(){
        if(this.venta){
            this.stock -= 1
        }
        return this.stock
    }
}

const vehiculo1 = new Vehiculo("Chevrolet", "Onix" , 15000000, 20, true);
const vehiculo2 = new Vehiculo("Ford", "Fiesta", 18000000 , 26, false)
const vehiculo3 = new Vehiculo("Peugeot", "208", 20000000, 30, true)

console.log("Bienvenido a la concesionaria JS")

// Primero mostraba por console.log cada propiedad del objeto 

// console.log(`LLevate tu ${vehiculo1.marca} ${vehiculo1.modelo} por un precio total de ${vehiculo1.precio}`)
// vehiculo1.cuotas()
// console.log(`El stock actual es de ${vehiculo1.actualizarStock()} autos del ${vehiculo1.marca}`)

// console.log(`LLevate tu ${vehiculo2.marca} ${vehiculo2.modelo} por un precio total de ${vehiculo2.precio}`)
// vehiculo2.cuotas()
// console.log(`El stock actual es de ${vehiculo2.actualizarStock()} autos del ${vehiculo2.marca}`)

// console.log(`LLevate tu ${vehiculo3.marca} ${vehiculo3.modelo} por un precio total de ${vehiculo3.precio}`)
// vehiculo3.cuotas()
// console.log(`El stock actual es de ${vehiculo3.actualizarStock()} autos del ${vehiculo3.marca}`)

//Luego preferi almacenar los objetos en variables
const arrayVehiculos = [vehiculo1, vehiculo2, vehiculo3];

// Al final, crear una funcion que itere en ese array de objetos y me muestre la informacion de cada objeto asi no repetia codigo
function mostrarInfo(vehiculos) {
    for (const vehiculo of vehiculos) {
        console.log(`Llevate tu ${vehiculo.marca} ${vehiculo.modelo} por un precio total de ${vehiculo.precio}` );
        vehiculo.cuotas();
        console.log(`El stock actual es de ${vehiculo.actualizarStock()} autos de ${vehiculo.marca}`);
    }
}

mostrarInfo(arrayVehiculos)