const entregasStorage = iniciarDelLocalStorage("entregas", [])

const entregaContainer = document.getElementById("entrega");

//Esta funcion crea una nueva card en el area de entrega con la informacion del storage
function mostrarEntrega(array) {
    entregaContainer.innerHTML = "";

    array.forEach(vehiculoAEntregar => {
        const cardEntrega = document.createElement("article");
        cardEntrega.classList.add("itemEntrega")
        cardEntrega.innerHTML += `
            <h4>${vehiculoAEntregar.marca} ${vehiculoAEntregar.modelo}</h4>
            <img src="${vehiculoAEntregar.imagen.replace("./assets/", "../assets/")}" alt="${vehiculoAEntregar.marca} ${vehiculoAEntregar.modelo}">
            <p>Valor: $${vehiculoAEntregar.valor}</p>
            <p>Valor cuota con plan 84 cuotas: $${(vehiculoAEntregar.valor / 84).toFixed(2)}</p>
            <button>Entregar</button>`
        entregaContainer.appendChild(cardEntrega);
        const botonEntregar = cardEntrega.querySelector("button");
        botonEntregar.addEventListener("click", async () => {
            const resultado = await Swal.fire({
                input: "textarea",
                inputLabel: "¿A quién se entrega el vehículo?",
                inputPlaceholder: "Ingrese los datos del cliente...",
                inputAttributes: { "aria-label": "Datos del cliente" },
                showCancelButton: true,
                inputValidator: (valor) => {
                    if (!valor.trim()) {
                        return "Ingresá los datos del cliente";
                    }
                }
            });
            if (!resultado.isConfirmed) return;
            const cliente = resultado.value.trim(); Swal.fire(`EL vehiculo ${vehiculoAEntregar.marca} ${vehiculoAEntregar.modelo} ha sido entregado a ${cliente}`, "");
            mostrarMensaje(`El vehiculo ${vehiculoAEntregar.marca} ${vehiculoAEntregar.modelo} ha sido entregado`, "exito");
            cardEntrega.remove();
            const indice = entregasStorage.findIndex(index => index.id === vehiculoAEntregar.id);
            entregasStorage.splice(indice, 1);
            actualizarArrayEnLS("entregas", entregasStorage);
        });
    })
};

function eliminarEntregas() {
    const btnEliminarEntregas = document.getElementById("eliminar-entregas");
    btnEliminarEntregas.addEventListener("click", () => {
        //Utilizo SweetAlert para confirmar si se desea Limpiar las entregas
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "¿Eliminar todas las entregas?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, borrar todas",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                const autosEnLocalStorage = iniciarDelLocalStorage("autos", []);
                entregasStorage.forEach(entrega => {
                    const auto = autosEnLocalStorage.find(auto => auto.id === entrega.id);
                    if (auto) {
                        auto.stock++;
                    }
                    actualizarArrayEnLS("autos", autosEnLocalStorage);
                });
                entregasStorage.length = 0;
                actualizarArrayEnLS("entregas", entregasStorage);
                mostrarEntrega(entregasStorage);
                swalWithBootstrapButtons.fire({
                    title: "Entregas eliminadas",
                    text: "Las entregas fueron borradas correctamente",
                    icon: "success"
                });
            }
        });
    })
}

mostrarEntrega(entregasStorage);
eliminarEntregas();