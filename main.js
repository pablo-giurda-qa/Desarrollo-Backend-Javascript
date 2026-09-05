const vehiculos = [
    {
        id: 1,
        marca: 'Chevrolet',
        modelo: 'Onix',
        stock: 20,
        valor: 15000000
    },
    {
        id: 2,
        marca: 'Ford',
        modelo: 'Fiesta',
        stock: 26,
        valor: 18000000
    },
    {
        id: 3,
        marca: 'Peugeot',
        modelo: '208',
        stock: 30,
        valor: 20000000
    },
    {
        id: 4,
        marca: 'Volswagen',
        modelo: 'Gol',
        stock: 10,
        valor: 17000000
    },
    {
        id: 5,
        marca: 'Nissan',
        modelo: 'Sentra',
        stock: 8,
        valor: 24000000
    }
];

//Crear contenedores para los vehiculos y el area de entrega
const itemsContainer = document.getElementById("vehiculos");
const entregaContainer = document.getElementById("entrega");
entregaContainer.innerHTML = "";

//Funcion para mostrar los vehiculos en el contenedor
function mostrarVehiculos() {
    itemsContainer.innerHTML = "";
    vehiculos.forEach((v) => {
        const card = document.createElement("article");
        card.classList.add("item")
        card.innerHTML += `
        <h4>${v.marca} ${v.modelo}</h4>
        <p class="precio">Valor: $${v.valor}</p>
        <p class="stock">Stock: ${v.stock}</p>
        <button id="agregar-${v.id}">Preparar para entregar</button>`
        itemsContainer.appendChild(card)
            ;
        //Boton para preparar el vehiculo para entregar
        const botonAgregar = document.getElementById(`agregar-${v.id}`);
        botonAgregar.addEventListener("click", () => {
            //Verifico con el if si hay stock disponible, si no hay stock, elimino el vehiculo del contenedor y muestro un mensaje de error
            if (v.stock <= 0) {
                const indice = vehiculos.indexOf(v);
                vehiculos.splice(indice, 1);
                mostrarVehiculos();
                mostrarMensaje(`<p>No hay stock disponible para el vehiculo ${v.marca} ${v.modelo}</p>`, "error");
                return;
            }
            //Si hay stock, le resto una unidad al stock, actualizo el stock en el contenedor y muestro un mensaje de exito
            v.stock--;
            card.querySelector(".stock").textContent = `Stock: ${v.stock}`;
            mostrarMensaje(`El vehiculo ${v.marca} ${v.modelo} ha sido preparado para entregar`, "exito");
            
            const cardEntrega = document.createElement("article");
            cardEntrega.classList.add("itemEntrega")
            cardEntrega.innerHTML += `
                <h4>${v.marca} ${v.modelo}</h4>
                <p>Valor: $${v.valor}</p>
                <p>Valor cuota con plan 84 cuotas: $${(v.valor / 84).toFixed(2)}</p>
                <button>Entregar</button>`
            entregaContainer.appendChild(cardEntrega);
            const botonEntregar = cardEntrega.querySelector("button");
            botonEntregar.addEventListener("click", () => {
                mostrarMensaje(`El vehiculo ${v.marca} ${v.modelo} ha sido entregado`, "exito");
                cardEntrega.remove();
            });
        })
    })
};
mostrarVehiculos();


//Esta funcion agrega un vehiculo al array de vehiculos, si el vehiculo ya existe, le suma el stock, si no existe, lo agrega al array
function agregarVehiculo() {
    const botonAgregar = document.getElementById("btn-agregar");
    botonAgregar.addEventListener("click", () => {
        const marca = document.getElementById("marca").value.trim();
        const modelo = document.getElementById("modelo").value.trim();
        const stock = parseInt(document.getElementById("stock").value);
        const valor = parseInt(document.getElementById("valor").value);
        //Valida que los campos no esten vacios y que el stock y valor sean numeros positivos
        if (!marca || !modelo || isNaN(stock) || isNaN(valor) || stock < 0 || valor < 0) {
            mostrarMensaje("Completa todos los campos con valores válidos (sin negativos ni vacíos)", "error");
            return;
        }
        //Valida si los campos coinciden con algun vehiculo existente
        const existe = vehiculos.find(v =>
            v.marca.toLowerCase() === marca.toLowerCase() &&
            v.modelo.toLowerCase() === modelo.toLowerCase()
        );
        //Si el vehiculo existe, le suma el stock, si no existe, lo agrega al array
        if (existe) {
            existe.stock += stock;
            existe.valor = valor; // Actualiza el valor del vehículo existente
            mostrarMensaje(`<p>Se agregaron ${stock} unidades a ${existe.marca} ${existe.modelo}. Stock: ${existe.stock}</p>`, "exito");
        } else {
            const nuevoId = Math.max(...vehiculos.map(v => v.id)) + 1;
            vehiculos.push({
                id: nuevoId,
                marca: marca,
                modelo: modelo,
                stock: stock,
                valor: valor
            });
            mostrarMensaje(`<p>Vehículo ${marca} ${modelo} agregado con ${stock} unidades</p>`, "exito");
        }
        mostrarVehiculos();
    })
};
agregarVehiculo();

//En lugar de utilizar alert, muestro un mensaje en el contenedor de mensajes
function mostrarMensaje(texto, tipo) {
    const mensajesDiv = document.getElementById("mensajes");
    mensajesDiv.innerHTML = texto;
    mensajesDiv.className = tipo; // 'exito' o 'error'
    mensajesDiv.style.display = "block";
    setTimeout(() => {
        mensajesDiv.style.display = "none";
    }, 3000);
}

function buscarVehiculo() {
    const inputBuscar = document.getElementById("buscar");
    const resultadoDiv = document.getElementById("resultado-busqueda");

    inputBuscar.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const busqueda = inputBuscar.value.trim().toLowerCase();

            if (!busqueda) {
                resultadoDiv.innerHTML = "";
                return;
            }

            const autoFiltrado = vehiculos.find(v =>
                v.marca.toLowerCase().includes(busqueda) ||
                v.modelo.toLowerCase().includes(busqueda)
            );

            if (!autoFiltrado) {
                mostrarMensaje("No se encontraron vehículos con ese criterio", "error");
                resultadoDiv.innerHTML = "";
                return;
            }

            resultadoDiv.innerHTML = `
                <article class="item">
                    <h4>${autoFiltrado.marca} ${autoFiltrado.modelo}</h4>
                    <p class="precio">Valor: $${autoFiltrado.valor}</p>
                    <p class="stock">Stock: ${autoFiltrado.stock}</p>
                </article>
            `;
        }
    });
}
buscarVehiculo();
