//Funcion para agregar el array con su nombre al Storage
function iniciarDelLocalStorage(nombre, array) {
    try {
        const datos = localStorage.getItem(nombre);
        return datos ? JSON.parse(datos) : array
    } catch (error) {
        console.error(`Error al leer ${nombre}`, error)
        return array;
    }
};

function actualizarArrayEnLS(nombre, array){
    try{
        localStorage.setItem(nombre, JSON.stringify(array))
    } catch (error) {
        console.error(`No se puede guardar la lista de ${nombre}`, error)
    } finally {
        console.log(`Lista de ${nombre} actualizada`)
    }
}

function mostrarMensaje(texto, tipo) {
    const mensajesDiv = document.getElementById("mensajes");
    mensajesDiv.innerHTML = texto;
    mensajesDiv.className = tipo; // 'exito' o 'error'
    mensajesDiv.style.display = "block";
    setTimeout(() => {
        mensajesDiv.style.display = "none";
    }, 3000);
}

function mostrarMensajeSweetAlert() {
    Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    }).fire({
        icon: "success",
        title: `Tienes ${entregasStorage.length} entrega(s) pendiente(s).`
    });
};
