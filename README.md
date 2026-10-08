# Gestor de Stock de Vehículos

Software de gestión de stock de vehículos para concesionarias. Permite buscar, administrar y preparar vehículos para la entrega, gestionar el área de entrega con sus compradores y contar con un conversor de dólares para clientes que abonan en esa moneda.

## Características

- **Buscador de vehículos**: busca en el stock a través del input por marca o modelo (se dispara con `Enter` y el resultado se limpia a los 5 segundos).
- **Stock de vehículos**: se muestra el stock disponible de cada vehículo en cards con imagen, marca, modelo, precio, stock y el botón **Preparar para Entregar**.
- **Agregar vehículo**: al completar los inputs correctamente se puede agregar un nuevo vehículo al stock, o bien modificar el precio y sumar stock de un vehículo existente (si ya existe, se le suman las unidades en vez de duplicarlo).
- **Validación de formulario**: los campos se validan antes de agregar (vacíos, números negativos o no numéricos) y se muestran mensajes de error.
- **Área de entrega**: al presionar **Preparar para Entregar** se descuenta una unidad del stock y se genera una nueva card en el área de entrega. Allí se visualizan el vehículo, su imagen, precio total, valor en cuotas (plan de 84 cuotas) y el botón **Entregar**.
- **Flujo de compra**: al presionar **Entregar** aparece un input para cargar los datos del comprador, y se puede confirmar o cancelar la compra. El botón **Limpiar Entregas** borra las entregas del momento devolviendo el stock restado al stock original.
- **Contador de entregas**: un contador muestra cuántos vehículos hay preparados para entregar.
- **Conversor de dólares**: cotización en tiempo real del dólar (USD → ARS) para que la concesionaria pueda consultar cuánto equivale un monto en pesos cuando el cliente abona en dólares.
- **Persistencia con `localStorage`**: el stock y las entregas se guardan en el navegador y se mantienen al recargar la página.
- **Mensajes de retroalimentación**: notificaciones toast de éxito/error (SweetAlert2) al realizar cada acción.

## Tecnologías

- HTML5, CSS3 y JavaScript vanilla (ES6+, `async/await`, `fetch`)
- [Bootstrap 5.3.3](https://getbootstrap.com/) (CSS)
- [SweetAlert2](https://sweetalert2.github.io/) para alertas y mensajes
- Google Fonts: Archivo, DM Sans, JetBrains Mono
- API pública [Frankfurter](https://www.frankfurter.app/) para cotización de divisas

## Estructura del proyecto

```
.
├── index.html                  # Página principal (stock, buscador, alta, conversor)
├── pages/
│   └── entregas.html           # Área de entrega
├── js/
│   ├── funciones-generales.js  # Helpers globales (storage, mensajes, contador)
│   ├── main.js                 # Lógica principal (index)
│   └── entregas.js             # Lógica del área de entrega
├── css/
│   └── style.css
├── data/
│   └── vehiculos.json          # Datos iniciales del stock
├── assets/                     # Imágenes de vehículos
└── README.md
```

## Datos y persistencia

### Esquema del vehículo

```json
{
  "id": 1,
  "marca": "Chevrolet",
  "modelo": "Onix",
  "stock": 20,
  "valor": 15000000,
  "imagen": "./assets/chevrolet-onix.png"
}
```

El stock inicial (5 vehículos) se carga desde `data/vehiculos.json` en el primer arranque. Los vehículos nuevos usan `imagen: "./assets/default.png"`.

### `localStorage`

| Clave | Contenido |
|---|---|
| `autos` | Array completo de vehículos (stock) |
| `entregas` | Vehículos preparados para entregar |

## API externa

- **Frankfurter** — `https://api.frankfurter.dev/v2/rate/usd/ars`: cotización del dólar (USD → ARS) usada por el conversor. Si la consulta falla, se muestra un botón *Reintentar*.
