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

//Funcion para actualizar el array en el Storage
function actualizarArrayEnLS(nombre, array){
    try{
        localStorage.setItem(nombre, JSON.stringify(array))
    } catch (error) {
        console.error(`No se puede guardar la lista de ${nombre}`, error)
    } finally {
        console.log(`Lista de ${nombre} actualizada`)
    }
}

//Funcion para mostrar un mensaje en el contenedor de mensajes, con un tipo de mensaje (exito o error) y que desaparece luego de 3 segundos
function mostrarMensaje(texto, tipo) {
    const mensajesDiv = document.getElementById("mensajes");
    mensajesDiv.innerHTML = texto;
    mensajesDiv.className = tipo; // 'exito' o 'error'
    mensajesDiv.style.display = "block";
    setTimeout(() => {
        mensajesDiv.style.display = "none";
    }, 3000);
}

//Funcion que actualiza el contador de entregas pendientes en el boton de navegacion
function actualizarContadorEntregas() {
    const contador = document.getElementById("contador-entregas");
    //La pagina de entregas no tiene contador, asi que sale sin hacer nada
    if (!contador) {
        return;
    }
    const cantidad = entregasStorage.length;
    contador.textContent = cantidad;
    //Sin entregas pendientes el contador se muestra apagado
    contador.classList.toggle("vacio", cantidad === 0);
}

//Funcion que muestra un mensaje de SweetAlert con la cantidad de entregas pendientes
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
