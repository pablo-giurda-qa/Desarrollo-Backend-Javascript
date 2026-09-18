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


function iniciarDelLocalStorage(nombre, array){
    try {
        const datos = localStorage.getItem(nombre);
        return datos ? JSON.parse(datos) : array
    } catch (error) {
        console.error(`Error al leer ${nombre}`, error)
        return array;
    }
}

const autosEnLocalStorage = iniciarDelLocalStorage("autos", vehiculos);
const entregasStorage = iniciarDelLocalStorage("entregas", []);

//Crear contenedores para los vehiculos y el area de entrega
const itemsContainer = document.getElementById("vehiculos");
const entregaContainer = document.getElementById("entrega");

//Funcion para actualizar vehiculos en localStorage ahora con try y catch
function actualizarAutosEnLS(){
    try {
        localStorage.setItem("autos",JSON.stringify(autosEnLocalStorage));
    }catch (error){
        console.error("No se pudo guardar la lista de autos (almacenamiento lleno o deshabilitado):", error);
        mostrarMensaje("No se pudo guardar el cambio en el almacenamiento", "error");
    } finally {
        console.log("Lista de vehículos actualizada");
    }
};

//Funcion para actualizar entregas en localStorage ahora con try y catch
function actualizarEntregasEnLS(){
    try {
        localStorage.setItem("entregas", JSON.stringify(entregasStorage));
    } catch (error) {
        console.error("No se pudo guardar la lista de entregas:", error);
        mostrarMensaje("No se pudo guardar el cambio en el almacenamiento", "error");
    } finally {
        console.log("Lista de entregas actualizada");
    }
}

//Funcion para mostrar los vehiculos en el contenedor
function mostrarVehiculos() {
    itemsContainer.innerHTML = "";
    autosEnLocalStorage.forEach((v) => {
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
                const indice = autosEnLocalStorage.indexOf(v);
                autosEnLocalStorage.splice(indice, 1);
                actualizarAutosEnLS();
                mostrarVehiculos();
                mostrarMensaje(`<p>No hay stock disponible para el vehiculo ${v.marca} ${v.modelo}</p>`, "error");
                return;
            }
            //Si hay stock, le resto una unidad al stock, actualizo el stock en el contenedor y muestro un mensaje de exito
            v.stock--;
            card.querySelector(".stock").textContent = `Stock: ${v.stock}`;
            mostrarMensaje(`El vehiculo ${v.marca} ${v.modelo} ha sido preparado para entregar`, "exito");
            
            actualizarAutosEnLS();
            function entrega(){
            const { id, marca, modelo, valor } = v;
            const entregaStorage = { id, marca, modelo, valor };
            entregasStorage.push(entregaStorage);
            actualizarEntregasEnLS();
            mostrarEntrega(entregasStorage);
        }
        entrega();;
        })
    })
};
mostrarVehiculos();
mostrarEntrega(entregasStorage);
eliminarEntregas();

function mostrarEntrega(array){
    entregaContainer.innerHTML = "";
    
    array.forEach(e => {
        const cardEntrega = document.createElement("article");
        cardEntrega.classList.add("itemEntrega")
        cardEntrega.innerHTML += `
            <h4>${e.marca} ${e.modelo}</h4>
            <p>Valor: $${e.valor}</p>
            <p>Valor cuota con plan 84 cuotas: $${(e.valor / 84).toFixed(2)}</p>
            <button>Entregar</button>`
        entregaContainer.appendChild(cardEntrega);
        const botonEntregar = cardEntrega.querySelector("button");
        botonEntregar.addEventListener("click", () => {
            mostrarMensaje(`El vehiculo ${e.marca} ${e.modelo} ha sido entregado`, "exito");
            cardEntrega.remove();
            const indice = entregasStorage.findIndex(i => i.id === e.id);
            entregasStorage.splice(indice, 1);
            actualizarEntregasEnLS()
        });
    })
}

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
        const existe = autosEnLocalStorage.find(v =>
            v.marca.toLowerCase() === marca.toLowerCase() &&
            v.modelo.toLowerCase() === modelo.toLowerCase()
        );
        //Si el vehiculo existe, le suma el stock, si no existe, lo agrega al array
        if (existe) {
            existe.stock += stock;
            existe.valor = valor; // Actualiza el valor del vehículo existente
            actualizarAutosEnLS();
            mostrarMensaje(`<p>Se agregaron ${stock} unidades a ${existe.marca} ${existe.modelo}. Stock: ${existe.stock}</p>`, "exito");
        } else {
            const nuevoId = Math.max(...autosEnLocalStorage.map(v => v.id)) + 1;
            autosEnLocalStorage.push({
                id: nuevoId,
                marca: marca,
                modelo: modelo,
                stock: stock,
                valor: valor
            });
            actualizarAutosEnLS();            
            mostrarMensaje(`<p>Vehículo ${marca} ${modelo} agregado con ${stock} unidades</p>`, "exito");
        }
        mostrarVehiculos();
        document.getElementById("marca").value = "";
        document.getElementById("modelo").value = "";
        document.getElementById("stock").value = "";
        document.getElementById("valor").value = "";
    })
};
agregarVehiculo();

//En lugar de utilizar alert, muestro un mensaje en el contenedor de mensajes con setTImeout()
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

            const autoFiltrado = autosEnLocalStorage.find(v =>
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
            inputBuscar.value = "";
            //Hace que la busqueda quede vacia despues de 5 segundos
            setTimeout(() => {
            resultadoDiv.innerHTML = "";
            }, 5000);
        }
    });
}
buscarVehiculo();

function eliminarEntregas (){
    const btnEliminarEntregas = document.getElementById("eliminar-entregas");
    btnEliminarEntregas.addEventListener("click", () => {
            localStorage.removeItem("entregas")
            entregasStorage.length = 0;
            mostrarEntrega(entregasStorage);
            mostrarMensaje("Entregas eliminadas correctamente", "exito");
    })
}

setTimeout(() => {
    const avisoBienvenida = document.createElement("aside");
    avisoBienvenida.id = "aviso-bienvenida";

    if (entregasStorage.length > 0) {
        avisoBienvenida.textContent =
            `Bienvenido. Tienes ${entregasStorage.length} entrega(s) pendiente(s).`;
    } else {
        avisoBienvenida.textContent =
            "Bienvenido. No tenés entregas pendientes.";
    }
    document.body.prepend(avisoBienvenida);
    setTimeout(() => {
        avisoBienvenida.remove();
    }, 5000);
}, 1000);