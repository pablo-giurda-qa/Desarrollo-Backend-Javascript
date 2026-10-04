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
            <p>Valor: $${vehiculoAEntregar.valor}</p>
            <p>Valor cuota con plan 84 cuotas: $${(vehiculoAEntregar.valor / 84).toFixed(2)}</p>
            <button>Entregar</button>`
        entregaContainer.appendChild(cardEntrega);
        const botonEntregar = cardEntrega.querySelector("button");
        botonEntregar.addEventListener("click", () => {
            mostrarMensaje(`El vehiculo ${vehiculoAEntregar.marca} ${vehiculoAEntregar.modelo} ha sido entregado`, "exito");
            cardEntrega.remove();
            const indice = entregasStorage.findIndex(index => index.id === vehiculoAEntregar.id);
            entregasStorage.splice(indice, 1);
            actualizarArrayEnLS("entregas", entregasStorage);
            mostrarMensajeSweetAlert();
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