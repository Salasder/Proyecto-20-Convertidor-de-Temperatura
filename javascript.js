// SELECCIONAR ELEMENTOS DEL HTML

const formulario = document.getElementById("formulario-conversion");

const campoTemperatura = document.getElementById("temperatura");

const unidadOrigen = document.getElementById("unidad-origen");

const unidadDestino = document.getElementById("unidad-destino");

const botonConvertir = document.getElementById("boton-convertir");

const resultado = document.getElementById("valor-convertido");


// SÍMBOLOS DE LAS UNIDADES

const simbolos = {
    celsius: "°C",
    fahrenheit: "°F",
    kelvin: "K"
};


// VALIDAR LOS CAMPOS DEL FORMULARIO

function validarFormulario() {

    const temperaturaIngresada = campoTemperatura.value.trim();

    const origenSeleccionado = unidadOrigen.value;

    const destinoSeleccionado = unidadDestino.value;

    const temperaturaValida =
        temperaturaIngresada !== "" &&
        Number.isFinite(Number(temperaturaIngresada));

    botonConvertir.disabled = !(
        temperaturaValida &&
        origenSeleccionado !== "" &&
        destinoSeleccionado !== ""
    );
}


// CONVERTIR LA TEMPERATURA A CELSIUS

function convertirACelsius(temperatura, unidad) {

    switch (unidad) {

        case "celsius":
            return temperatura;

        case "fahrenheit":
            return (temperatura - 32) * 5 / 9;

        case "kelvin":
            return temperatura - 273.15;

        default:
            return null;
    }
}


// CONVERTIR DESDE CELSIUS A LA UNIDAD DE DESTINO

function convertirDesdeCelsius(temperatura, unidad) {

    switch (unidad) {

        case "celsius":
            return temperatura;

        case "fahrenheit":
            return (temperatura * 9 / 5) + 32;

        case "kelvin":
            return temperatura + 273.15;

        default:
            return null;
    }
}


// REALIZAR LA CONVERSIÓN

function convertirTemperatura(evento) {

    evento.preventDefault();

    const temperatura = Number(campoTemperatura.value);

    const origen = unidadOrigen.value;

    const destino = unidadDestino.value;

    // VALIDAR QUE LA TEMPERATURA SEA FÍSICAMENTE POSIBLE

    const temperaturaEnCelsius = convertirACelsius(
        temperatura,
        origen
    );

    if (temperaturaEnCelsius < -273.15) {

        resultado.textContent =
            "Error: la temperatura no puede ser inferior al cero absoluto.";

        return;
    }

    // REALIZAR LA CONVERSIÓN

    const temperaturaConvertida = convertirDesdeCelsius(
        temperaturaEnCelsius,
        destino
    );

    // FORMATEAR EL RESULTADO

    const valorFormateado = Number(
        temperaturaConvertida.toFixed(2)
    ).toLocaleString("es-CO", {
        maximumFractionDigits: 2
    });

    // MOSTRAR EL RESULTADO

    resultado.textContent =
        `${valorFormateado} ${simbolos[destino]}`;

}


// ESCUCHAR LOS CAMBIOS EN LOS CAMPOS

campoTemperatura.addEventListener("input", validarFormulario);

unidadOrigen.addEventListener("change", validarFormulario);

unidadDestino.addEventListener("change", validarFormulario);


// ESCUCHAR EL ENVÍO DEL FORMULARIO

formulario.addEventListener("submit", convertirTemperatura);