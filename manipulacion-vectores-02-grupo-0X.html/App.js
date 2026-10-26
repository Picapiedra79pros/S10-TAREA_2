
// ========================================
// TAREA 02 - MANIPULACION DE VECTORES
// ========================================

// Vector global
let vector = [];

// Elementos del HTML
const dimension = document.getElementById("select-dimension-arreglo");
const respuesta = document.getElementById("id-txt-respuesta");
const tabla = document.getElementById("id-table-vector-numerico");

// Mostrar resultados
function mostrarResultado(mensaje) {
    respuesta.value = mensaje;
}

// Validar que existan elementos
function validarVector() {
    if (vector.length === 0) {
        mostrarResultado("Error: primero debe cargar un vector.");
        return false;
    }
    return true;
}

// Actualizar tabla del vector
function mostrarVector() {
    const encabezado = tabla.querySelector("thead tr");
    const posiciones = document.getElementById("fila-posiciones");
    const valores = document.getElementById("fila-valores");

    encabezado.innerHTML = "";
    posiciones.innerHTML = "";
    valores.innerHTML = "";

    const titulo = document.createElement("td");
    titulo.colSpan = Math.max(vector.length, 1);
    titulo.textContent = "Vector numerico de " + vector.length + " elementos";
    encabezado.appendChild(titulo);

    if (vector.length === 0) {
        const celda = document.createElement("td");
        celda.textContent = "Vector vacio";
        valores.appendChild(celda);
        return;
    }

    for (let i = 0; i < vector.length; i++) {
        const tdPosicion = document.createElement("td");
        tdPosicion.textContent = i;
        posiciones.appendChild(tdPosicion);

        const tdValor = document.createElement("td");
        tdValor.textContent = vector[i];
        valores.appendChild(tdValor);
    }
}

// ========================================
// CARGAR Y VACIAR VECTOR
// ========================================

function cargarVector() {
    const cantidad = Number(dimension.value);

    if (!Number.isInteger(cantidad) || cantidad < 4 || cantidad > 30) {
        mostrarResultado("La dimension debe estar entre 4 y 30.");
        return;
    }

    vector = [];

    for (let i = 0; i < cantidad; i++) {
        vector.push(Math.floor(Math.random() * 100) + 1);
    }

    mostrarVector();
    mostrarResultado("Vector cargado: [" + vector.join(", ") + "]");
}

function vaciarVector() {
    vector = [];
    mostrarVector();
    mostrarResultado("El vector fue vaciado.");
}

// ========================================
// OPERACIONES ORIGINALES
// ========================================

// Numero mayor
function numeroMayor() {
    if (!validarVector()) return;

    let mayor = vector[0];

    for (let i = 1; i < vector.length; i++) {
        if (vector[i] > mayor) {
            mayor = vector[i];
        }
    }

    const posiciones = [];

    for (let i = 0; i < vector.length; i++) {
        if (vector[i] === mayor) posiciones.push(i);
    }

    mostrarResultado(
        "Numero Mayor: " + mayor +
        " (posicion(es): " + posiciones.join(", ") + ")"
    );
}

// Numero menor
function numeroMenor() {
    if (!validarVector()) return;

    let menor = vector[0];

    for (let i = 1; i < vector.length; i++) {
        if (vector[i] < menor) {
            menor = vector[i];
        }
    }

    const posiciones = [];

    for (let i = 0; i < vector.length; i++) {
        if (vector[i] === menor) posiciones.push(i);
    }

    mostrarResultado(
        "Numero Menor: " + menor +
        " (posicion(es): " + posiciones.join(", ") + ")"
    );
}

// Suma de valores
function sumarValores() {
    if (!validarVector()) return;

    let suma = 0;

    for (let i = 0; i < vector.length; i++) {
        suma += vector[i];
    }

    mostrarResultado("Suma de Valores: " + suma);
}

// Producto de valores
function productoValores() {
    if (!validarVector()) return;

    let producto = 1;

    for (let i = 0; i < vector.length; i++) {
        producto *= vector[i];
    }

    mostrarResultado("Producto de Valores: " + producto);
}

// Moda
function calcularModa() {
    if (!validarVector()) return;

    const frecuencias = new Map();
    let mayorFrecuencia = 0;

    for (const numero of vector) {
        const cantidad = (frecuencias.get(numero) || 0) + 1;
        frecuencias.set(numero, cantidad);

        if (cantidad > mayorFrecuencia) {
            mayorFrecuencia = cantidad;
        }
    }

    if (mayorFrecuencia === 1) {
        mostrarResultado("No existe moda: ningun valor se repite.");
        return;
    }

    const modas = [];

    for (const [numero, cantidad] of frecuencias) {
        if (cantidad === mayorFrecuencia) {
            modas.push(numero);
        }
    }

    mostrarResultado(
        "Moda(s): " + modas.join(", ") +
        " | Frecuencia: " + mayorFrecuencia
    );
}

// Media
function calcularMedia() {
    if (!validarVector()) return;

    let suma = 0;

    for (const numero of vector) {
        suma += numero;
    }

    const media = suma / vector.length;

    mostrarResultado("Media: " + media.toFixed(2));
}

// Mediana
function calcularMediana() {
    if (!validarVector()) return;

    const copia = [...vector].sort((a, b) => a - b);
    const mitad = Math.floor(copia.length / 2);

    let mediana;

    if (copia.length % 2 === 0) {
        mediana = (copia[mitad - 1] + copia[mitad]) / 2;
    } else {
        mediana = copia[mitad];
    }

    mostrarResultado("Mediana: " + mediana);
}

// ========================================
// 1. ALGORITMOS DE ORDENAMIENTO
// ========================================

// Obtener tipo de orden
function esAscendente() {
    return document.getElementById("tipo-orden").value === "ASC";
}

// Comparar segun orden seleccionado
function comparar(a, b) {
    return esAscendente() ? a < b : a > b;
}

// Ordenamiento por seleccion
function ordenarSeleccion() {
    if (!validarVector()) return;

    for (let i = 0; i < vector.length - 1; i++) {
        let indice = i;

        for (let j = i + 1; j < vector.length; j++) {
            if (comparar(vector[j], vector[indice])) {
                indice = j;
            }
        }

        const temporal = vector[i];
        vector[i] = vector[indice];
        vector[indice] = temporal;
    }

    mostrarVector();
    mostrarResultado(
        "Ordenamiento por Seleccion: [" + vector.join(", ") + "]"
    );
}

// Ordenamiento burbuja
function ordenarBurbuja() {
    if (!validarVector()) return;

    for (let i = 0; i < vector.length - 1; i++) {
        for (let j = 0; j < vector.length - 1 - i; j++) {
            if (comparar(vector[j + 1], vector[j])) {
                const temporal = vector[j];
                vector[j] = vector[j + 1];
                vector[j + 1] = temporal;
            }
        }
    }

    mostrarVector();
    mostrarResultado(
        "Ordenamiento Burbuja: [" + vector.join(", ") + "]"
    );
}

// Ordenamiento por insercion
function ordenarInsercion() {
    if (!validarVector()) return;

    for (let i = 1; i < vector.length; i++) {
        const actual = vector[i];
        let j = i - 1;

        while (j >= 0 && comparar(actual, vector[j])) {
            vector[j + 1] = vector[j];
            j--;
        }

        vector[j + 1] = actual;
    }

    mostrarVector();
    mostrarResultado(
        "Ordenamiento por Insercion: [" + vector.join(", ") + "]"
    );
}

// Ordenamiento por fusion
function fusionar(izquierda, derecha) {
    const resultado = [];
    let i = 0;
    let j = 0;

    while (i < izquierda.length && j < derecha.length) {
        if (
            comparar(izquierda[i], derecha[j]) ||
            izquierda[i] === derecha[j]
        ) {
            resultado.push(izquierda[i]);
            i++;
        } else {
            resultado.push(derecha[j]);
            j++;
        }
    }

    return resultado.concat(
        izquierda.slice(i),
        derecha.slice(j)
    );
}

function fusionRecursiva(datos) {
    if (datos.length <= 1) return datos;

    const mitad = Math.floor(datos.length / 2);

    const izquierda = fusionRecursiva(datos.slice(0, mitad));
    const derecha = fusionRecursiva(datos.slice(mitad));

    return fusionar(izquierda, derecha);
}

function ordenarFusion() {
    if (!validarVector()) return;

    vector = fusionRecursiva(vector);

    mostrarVector();
    mostrarResultado(
        "Ordenamiento por Fusion: [" + vector.join(", ") + "]"
    );
}

// ========================================
// 2. ALGORITMOS DE BUSQUEDA
// ========================================

// Validar valor a buscar
function obtenerValorBusqueda() {
    const campo = document.getElementById("id-valor-busqueda");
    const texto = campo.value.trim();

    if (texto === "" || !Number.isFinite(Number(texto))) {
        mostrarResultado("Ingrese un numero valido para buscar.");
        return null;
    }

    return Number(texto);
}

// Busqueda secuencial
function busquedaSecuencial() {
    if (!validarVector()) return;

    const buscado = obtenerValorBusqueda();
    if (buscado === null) return;

    const posiciones = [];

    for (let i = 0; i < vector.length; i++) {
        if (vector[i] === buscado) {
            posiciones.push(i);
        }
    }

    if (posiciones.length > 0) {
        mostrarResultado(
            "Busqueda Secuencial: valor " + buscado +
            " encontrado en posicion(es): " + posiciones.join(", ")
        );
    } else {
        mostrarResultado(
            "Busqueda Secuencial: valor " + buscado + " no encontrado."
        );
    }
}

// Busqueda binaria
function busquedaBinaria() {
    if (!validarVector()) return;

    const buscado = obtenerValorBusqueda();
    if (buscado === null) return;

    // Ordenar automaticamente si es necesario.
    // Se utiliza orden ascendente para la busqueda.
    let estabaOrdenado = true;

    for (let i = 1; i < vector.length; i++) {
        if (vector[i - 1] > vector[i]) {
            estabaOrdenado = false;
            break;
        }
    }

    if (!estabaOrdenado) {
        vector.sort((a, b) => a - b);
        mostrarVector();
    }

    let izquierda = 0;
    let derecha = vector.length - 1;
    let encontrado = -1;

    while (izquierda <= derecha) {
        const medio = Math.floor((izquierda + derecha) / 2);

        if (vector[medio] === buscado) {
            encontrado = medio;
            break;
        } else if (vector[medio] < buscado) {
            izquierda = medio + 1;
        } else {
            derecha = medio - 1;
        }
    }

    if (encontrado !== -1) {
        // Buscar las posiciones repetidas contiguas.
        let inicio = encontrado;
        let fin = encontrado;

        while (inicio > 0 && vector[inicio - 1] === buscado) {
            inicio--;
        }

        while (
            fin < vector.length - 1 &&
            vector[fin + 1] === buscado
        ) {
            fin++;
        }

        const posiciones = [];

        for (let i = inicio; i <= fin; i++) {
            posiciones.push(i);
        }

        mostrarResultado(
            "Busqueda Binaria: valor " + buscado +
            " encontrado en posicion(es): " + posiciones.join(", ") +
            (estabaOrdenado ? "" : " (vector ordenado automaticamente)")
        );
    } else {
        mostrarResultado(
            "Busqueda Binaria: valor " + buscado + " no encontrado." +
            (estabaOrdenado ? "" : " Vector ordenado automaticamente.")
        );
    }
}

// ========================================
// 3. TRANSFORMACIONES BASICAS
// ========================================

// Invertir el vector
function invertirVector() {
    if (!validarVector()) return;

    vector.reverse();

    mostrarVector();
    mostrarResultado(
        "Vector invertido: [" + vector.join(", ") + "]"
    );
}

// Eliminar duplicados
function eliminarDuplicados() {
    if (!validarVector()) return;

    const cantidadOriginal = vector.length;

    vector = [...new Set(vector)];

    const eliminados = cantidadOriginal - vector.length;

    mostrarVector();

    mostrarResultado(
        "Duplicados eliminados: " + eliminados +
        ". Vector resultante: [" + vector.join(", ") + "]"
    );
}

// ========================================
// 4. TRANSFORMACIONES AVANZADAS
// ========================================

// Rotar vector a izquierda o derecha
function rotarVector() {
    if (!validarVector()) return;

    const campo = document.getElementById("numero-rotaciones");
    const cantidad = Number(campo.value);

    if (
        campo.value.trim() === "" ||
        !Number.isInteger(cantidad) ||
        cantidad < 1 ||
        cantidad > vector.length
    ) {
        mostrarResultado(
            "Error: las rotaciones deben estar entre 1 y " +
            vector.length
        );
        return;
    }

    const direccion = document.querySelector(
        'input[name="direccion"]:checked'
    ).value;

    const pasos = cantidad % vector.length;

    if (direccion === "derecha") {
        vector = vector.slice(-pasos).concat(
            vector.slice(0, -pasos)
        );
    } else {
        vector = vector.slice(pasos).concat(
            vector.slice(0, pasos)
        );
    }

    mostrarVector();

    mostrarResultado(
        "Vector rotado " + cantidad +
        " posicion(es) a la " + direccion +
        ": [" + vector.join(", ") + "]"
    );
}

// Intercambiar dos posiciones
function intercambiarElementos() {
    if (!validarVector()) return;

    const campo1 = document.getElementById("posicion-1");
    const campo2 = document.getElementById("posicion-2");

    const p1 = Number(campo1.value);
    const p2 = Number(campo2.value);

    if (
        campo1.value.trim() === "" ||
        campo2.value.trim() === "" ||
        !Number.isInteger(p1) ||
        !Number.isInteger(p2) ||
        p1 < 0 ||
        p2 < 0 ||
        p1 >= vector.length ||
        p2 >= vector.length ||
        p1 === p2
    ) {
        mostrarResultado(
            "Error: ingrese dos posiciones diferentes entre 0 y " +
            (vector.length - 1)
        );
        return;
    }

    const valor1 = vector[p1];
    const valor2 = vector[p2];

    vector[p1] = valor2;
    vector[p2] = valor1;

    mostrarVector();

    mostrarResultado(
        "Intercambio: posicion " + p1 +
        " (" + valor1 + ") con posicion " + p2 +
        " (" + valor2 + "). Vector: [" +
        vector.join(", ") + "]"
    );
}

// ========================================
// EVENT LISTENERS DE TODOS LOS BOTONES
// ========================================

document.getElementById("btn-cargar-vector")
    .addEventListener("click", cargarVector);

document.getElementById("btn-vaciar-vector")
    .addEventListener("click", vaciarVector);

document.getElementById("btn-numero-mayor")
    .addEventListener("click", numeroMayor);

document.getElementById("btn-numero-menor")
    .addEventListener("click", numeroMenor);

document.getElementById("btn-sumar-valores")
    .addEventListener("click", sumarValores);

document.getElementById("btn-producto-vector")
    .addEventListener("click", productoValores);

document.getElementById("btn-calcular-moda")
    .addEventListener("click", calcularModa);

document.getElementById("btn-calcular-media")
    .addEventListener("click", calcularMedia);

document.getElementById("btn-calcular-mediana")
    .addEventListener("click", calcularMediana);

document.getElementById("btn-ordenar-seleccion")
    .addEventListener("click", ordenarSeleccion);

document.getElementById("btn-ordenar-burbuja")
    .addEventListener("click", ordenarBurbuja);

document.getElementById("btn-ordenar-insercion")
    .addEventListener("click", ordenarInsercion);

document.getElementById("btn-ordenar-fusion")
    .addEventListener("click", ordenarFusion);

document.getElementById("btn-busqueda-secuencial")
    .addEventListener("click", busquedaSecuencial);

document.getElementById("btn-busqueda-binaria")
    .addEventListener("click", busquedaBinaria);

document.getElementById("btn-invertir-vector")
    .addEventListener("click", invertirVector);

document.getElementById("btn-eliminar-duplicados")
    .addEventListener("click", eliminarDuplicados);

document.getElementById("btn-rotar-vector")
    .addEventListener("click", rotarVector);

document.getElementById("btn-intercambiar")
    .addEventListener("click", intercambiarElementos);

// Mostrar estado inicial.
mostrarVector();
mostrarResultado("Presione Cargar Vector para comenzar.");
