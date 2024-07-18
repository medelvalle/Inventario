const URL = "https://medelvalle81.pythonanywhere.com/"

// Variables de estado para controlar la visibilidad y los datos del formulario
let codigo = '';
let descripcion = '';
let cantidad = '';
let precio = '';
let proveedor = '';
let imagen_url = '';
let imagenSeleccionada = null;
let imagenUrlTemp = null;
let mostrarDatosProducto = false;
document.getElementById('form-obtener-producto').addEventListener('submit', obtenerProducto);
document.getElementById('form-guardar-cambios').addEventListener('submit', guardarCambios);
document.getElementById('nuevaImagen').addEventListener('change', seleccionarImagen);

// Se ejecuta cuando se envía el formulario de consulta. Realiza una solicitud GET a la API
// y obtiene los datos del producto correspondiente al código ingresado.
function obtenerProducto(event) {
    event.preventDefault();
    codigo = document.getElementById('codigo').value;
    fetch(URL + 'productos/' + codigo)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Error al obtener los datos del producto.')
            }
        })
        .then(data => {
            descripcion = data.descripcion;
            cantidad = data.cantidad;
            precio = data.precio;
            proveedor = data.proveedor;
            imagen_url = data.imagen_url;
            mostrarDatosProducto = true; //Activa la vista del segundo formulario
            
            mostrarFormulario();
        })
        .catch(error => {
            alert('Código no encontrado.');
        });
}
// Muestra el formulario con los datos del producto
function mostrarFormulario() {
    if (mostrarDatosProducto) {
        document.getElementById('descripcionModificar').value = descripcion;
        document.getElementById('cantidadModificar').value = cantidad;
        document.getElementById('precioModificar').value = precio;
        document.getElementById('proveModificar').value = proveedor;

        const imagenActual = document.getElementById('imagen-actual');
        if (imagen_url && !imagenSeleccionada) { // Verifica si 
//imagen_url no está vacía y no se ha seleccionado una imagen
            imagenActual.src = 'https://www.pythonanywhere.com/user/medelvalle81/files/home/medelvalle81/WebProducto/static/imagenes/' + imagen_url;
            imagenActual.style.display = 'block'; // Muestra la imagen actual
        } else {
            imagenActual.style.display = 'none'; // Oculta la imagen si no hay URL
        }
        document.getElementById('datos-producto').style.display = 'block';
    } else {
        document.getElementById('datos-producto').style.display = 'none';
    }
}
    // Se activa cuando el usuario selecciona una imagen para cargar.
    function seleccionarImagen(event) {
        const file = event.target.files[0];
        imagenSeleccionada = file;
        imagenUrlTemp = URL.createObjectURL(file); // Crea una URL temporal para la vista previa
        const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
        imagenVistaPrevia.src = imagenUrlTemp;
        imagenVistaPrevia.style.display = 'block';
    }

    // Se usa para enviar los datos modificados del producto al servidor.
function guardarCambios(event) {
event.preventDefault();
    const formData = new FormData();
    formData.append('codigo', codigo);
    formData.append('descripcion',
document.getElementById('descripcionModificar').value);
    formData.append('cantidad',
document.getElementById('cantidadModificar').value);
    formData.append('proveedor',
document.getElementById('proveModificar').value);
    formData.append('precio',
document.getElementById('precioModificar').value);

// Si se ha seleccionado una imagen nueva, la añade al formData. 

    if (imagenSeleccionada) {
        formData.append('imagen', imagenSeleccionada, imagenSeleccionada.name);
    }
    fetch(URL + 'productos/' + codigo, {
        method: 'PUT',
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Error al guardar los cambios del producto.')
            }
        })
        .then(data => {
            alert('Producto actualizado correctamente.');
            limpiarFormulario();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el producto.');
        });
}

// Restablece todas las variables relacionadas con el formulario a sus valores iniciales, lo que efectivamente "limpia" el formulario.
function limpiarFormulario() {
    document.getElementById('codigo').value = '';
    document.getElementById('descripcionModificar').value = '';
    document.getElementById('cantidadModificar').value = '';
    document.getElementById('precioModificar').value = '';
    document.getElementById('proveModificar').value = '';
    document.getElementById('nuevaImagen').value = '';
    const imagenActual = document.getElementById('imagen-actual');
    imagenActual.style.display = 'none';

    const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
    imagenVistaPrevia.style.display = 'none';
    codigo = '';
    descripcion = '';
    cantidad = '';
    precio = '';
    proveedor = '';
    imagen_url = '';
    imagenSeleccionada = null;
    imagenUrlTemp = null;
    mostrarDatosProducto = false;
    document.getElementById('datos-producto').style.display = 'none';
}
