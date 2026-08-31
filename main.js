
class Vehiculo{
    constructor(marca, modelo, precio, stock, color){
        this.marca = marca
        this.modelo = modelo
        this.precio = precio
        this.stock = stock
        this.color = color
    }
    cuotas(){
        return Math.floor(this.precio/84)
    }
}
const vehiculos = [];

function agregarVehiculo(marca, modelo, precio, stock, color) {
    const nuevoVehiculo = new Vehiculo(marca, modelo, precio, stock, color);
    vehiculos.push(nuevoVehiculo);
}
agregarVehiculo("Chevrolet", "Onix" , 15000000, 20, "Negro");
agregarVehiculo("Ford", "Fiesta", 18000000 , 26, "Rojo");
agregarVehiculo("Peugeot", "208", 20000000, 30, "Negro");
agregarVehiculo("Volswagen", "Gol", 17000000, 10, "Azul");
agregarVehiculo("Nissan", "Sentra", 24000000, 8, "Rojo");
//console.log(vehiculos)

alert("Bienvenido al sistema de gestion de la concesionaria JS")
let salir = false;
do{
    let primerMenu = prompt("Elige una opcion\n 1. Consultar inventario\n 2. Buscar por color\n 3. Suma total por marca\n 4. Suma total del inventario general\n 5. Salir")
switch(primerMenu){
    case "1": 
        const inventario = vehiculos.map((v) => {return{marca:v.marca, modelo:v.modelo, stock:v.stock, valorCuota: v.cuotas()}})
        console.table(inventario)
        break;
    case "2":
        let menu2;
        let autoPorColor;
        do {
            menu2 = prompt("Elija un color:\n Rojo\n Negro\n Azul").toLowerCase();
            autoPorColor = vehiculos.filter(v => v.color.toLowerCase() === menu2);
            if (autoPorColor.length === 0) {
                alert("Ingrese un color valido");
            }
        } while (autoPorColor.length === 0);
        autoPorColor.forEach(v => {
            console.log(`El vehiculo ${v.marca} ${v.modelo} está cotizado en ${v.precio}`)
            console.log(`Y cada cuota en 84 meses es de: $${v.cuotas()}`)})
        break;
    case "3":
        const totalPorMarca = vehiculos.reduce((acum, v) => {
            acum[v.marca] = (acum[v.marca] || 0) + v.precio * v.stock;
            return acum;
        }, {});
        for (let marca in totalPorMarca) {
            console.log(`Marca ${marca}: $${totalPorMarca[marca]}`);
        }
        break;
    case "4":
        const totalGeneral = vehiculos.reduce((total, v) => total + v.precio * v.stock, 0);
        console.log(`Total general: $${totalGeneral}`);
        break;
    case "5":
    case null:
        salir = true;
        break
    default:
        console.log("Opcion Invalida. Ingrese nuevamente")
    }
} while (!salir) {
}