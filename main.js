const empleado = prompt("Ingrese el nombre del empleado:")//Nombre del empleado
let ocupacion = prompt("Cual es su ocupacion:") //Ocupacion del empleado
let salario = prompt("Salario mensual:") //Salario bruto mensual del empleado
let añosTrabajados = prompt("Cuantos años ha trabajado en la empresa:") //Años trabajados en la empresa

salario = parseInt(salario) // Convierto string a numero
añosTrabajados = parseInt(añosTrabajados)// Convierto string a numero

//Se muestran dos mensajes con los prompts requeridos
alert("Bienvenido " + empleado + " a la empresa como " + ocupacion)
console.log("El empleado "+ empleado + " gana mensualmente " + salario)


let indemnizacion = salario * añosTrabajados //Calculo la Indemnizacion

//Muestro dos mensajes con operaciones matematicas 
alert("El empleado " + empleado + " ha trabajado " + añosTrabajados + " años y su indemnización sera de: " + indemnizacion)
console.log("El salario anual del empleado " + empleado + " es: " + (salario * 12))