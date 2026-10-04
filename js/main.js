
const autos = "./data/vehiculos.json";

let autosEnLocalStorage = [];

const entregasStorage = iniciarDelLocalStorage("entregas", []);

//Crear contenedores para los vehiculos y el area de entrega
const itemsContainer = document.getElementById("vehiculos");


// Funcion asincrona para cargar Vehiculos utilizando async/await/fetch
async function cargarVehiculos() {
    itemsContainer.innerHTML = "<p class='cargando'>Cargando vehiculos...</p>"
    try {
        const vehiculosJSON = await fetch(autos);
        
        if (!vehiculosJSON.ok) {
            throw new Error(`Error en la peticion ${vehiculosJSON.status}`)
        }
        const vehiculos = await vehiculosJSON.json();

        autosEnLocalStorage = iniciarDelLocalStorage("autos", vehiculos);
        mostrarVehiculos();
        agregarVehiculo()
        Swal.fire({
            icon: "success",
            title: "Vehículos cargados con éxito",
            text: "La información ya está disponible.",
            timer: 2500,
            showConfirmButton: false
        });
        setTimeout(()=>{
            mostrarMensajeSweetAlert()
        },2000)
    } catch (error) {
        console.error("Error al cargar los vehiculos", error)
        itemsContainer.innerHTML = `
            <p class="error-carga">No se pudieron cargar los vehículos. Intentá nuevamente más tarde.</p>`;
        Swal.fire({
            icon: "error",
            title: "Error al cargar vehículos",
            text: "No fue posible obtener los datos solicitados."
        });
    } finally {
        console.log("Finalizó la carga de vehiculos")
    }
};


//Funcion para actualizar vehiculos en localStorage ahora con try y catch
// function actualizarAutosEnLS() {
//     try {
//         localStorage.setItem("autos", JSON.stringify(autosEnLocalStorage));
//     } catch (error) {
//         console.error("No se pudo guardar la lista de autos (almacenamiento lleno o deshabilitado):", error);
//         mostrarMensaje("No se pudo guardar el cambio en el almacenamiento", "error");
//     } finally {
//         console.log("Lista de vehículos actualizada");
//     }
// };

//Funcion para actualizar entregas en localStorage ahora con try y catch
// function actualizarEntregasEnLS() {
//     try {
//         localStorage.setItem("entregas", JSON.stringify(entregasStorage));
//     } catch (error) {
//         console.error("No se pudo guardar la lista de entregas:", error);
//         mostrarMensaje("No se pudo guardar el cambio en el almacenamiento", "error");
//     } finally {
//         console.log("Lista de entregas actualizada");
//     }
// }

//Funcion para mostrar los vehiculos en el contenedor
function mostrarVehiculos() {
    itemsContainer.innerHTML = "";
    autosEnLocalStorage.forEach((auto) => {
        const card = document.createElement("article");
        card.classList.add("item")
        card.innerHTML += `
        <h4>${auto.marca} ${auto.modelo}</h4>
        <p class="precio">Valor: $${auto.valor}</p>
        <p class="stock">Stock: ${auto.stock}</p>
        <button id="agregar-${auto.id}">Preparar para entregar</button>`
        itemsContainer.appendChild(card)
            ;
        //Boton para preparar el vehiculo para entregar
        const botonAgregar = document.getElementById(`agregar-${auto.id}`);
        botonAgregar.addEventListener("click", () => {
            //Verifico con el if si hay stock disponible, si no hay stock, elimino el vehiculo del contenedor y muestro un mensaje de error
            if (auto.stock <= 0) {
                const indice = autosEnLocalStorage.indexOf(auto);
                autosEnLocalStorage.splice(indice, 1);
                actualizarArrayEnLS("autos", autosEnLocalStorage);
                mostrarVehiculos();
                mostrarMensaje(`<p>No hay stock disponible para el vehiculo ${auto.marca} ${auto.modelo}</p>`, "error");
                return;
            }
            //Si hay stock, le resto una unidad al stock, actualizo el stock en el contenedor y muestro un mensaje de exito
            auto.stock--;
            card.querySelector(".stock").textContent = `Stock: ${auto.stock}`;
            mostrarMensaje(`El vehiculo ${auto.marca} ${auto.modelo} ha sido preparado para entregar`, "exito");

            const { id, marca, modelo, valor } = auto;
            const entregaStorage = { id, marca, modelo, valor };
            entregasStorage.push(entregaStorage);
            actualizarArrayEnLS("entregas", entregasStorage);
            actualizarArrayEnLS("autos", autosEnLocalStorage);
            mostrarMensajeSweetAlert()
        })
    })
};


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
        const existe = autosEnLocalStorage.find(vehiculo =>
            vehiculo.marca.toLowerCase() === marca.toLowerCase() &&
            vehiculo.modelo.toLowerCase() === modelo.toLowerCase()
        );
        //Si el vehiculo existe, le suma el stock, si no existe, lo agrega al array
        if (existe) {
            existe.stock += stock;
            existe.valor = valor; // Actualiza el valor del vehículo existente
            // actualizarAutosEnLS();
            mostrarMensaje(`<p>Se agregaron ${stock} unidades a ${existe.marca} ${existe.modelo}. Stock: ${existe.stock}</p>`, "exito");
        } else {
            const nuevoId = Math.max(...autosEnLocalStorage.map(vehiculo => vehiculo.id)) + 1;
            autosEnLocalStorage.push({
                id: nuevoId,
                marca: marca,
                modelo: modelo,
                stock: stock,
                valor: valor
            });
            // actualizarAutosEnLS();
            mostrarMensaje(`<p>Vehículo ${marca} ${modelo} agregado con ${stock} unidades</p>`, "exito");
        }
        mostrarVehiculos();
        document.getElementById("marca").value = "";
        document.getElementById("modelo").value = "";
        document.getElementById("stock").value = "";
        document.getElementById("valor").value = "";
    })
};

//En lugar de utilizar alert, muestro un mensaje en el contenedor de mensajes con setTImeout()

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

//Mensaje SweetAlert que notifica si hay entregas pendientes


cargarVehiculos();
buscarVehiculo();
