function sanitizator(dato) {
    dato = dato.toLowerCase().replace(/ /g, "");
    return dato
}

export default sanitizator;