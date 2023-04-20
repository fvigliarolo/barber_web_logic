import { barberos } from './barber_variables.js';

let servicios_por_barbero = 'http://localhost:3000/barberos'
async function horas(endpoint) {
    return axios
        .get(endpoint)
        .then(response => response.data)
}

let arr_horas_inicioAfin_por_barbero = await horas(servicios_por_barbero);


let horas_disponibles_por_barbero = []
function crearJson(start, barberoID) {
    start[1][1].forEach((element) => {
        let eljson = {};
        eljson.title = barberos[start[0][1]];
        eljson.description = barberoID
        eljson.color = 'green';

        eljson.start = element;
        horas_disponibles_por_barbero.push(eljson)
    })
}

    Object.entries(arr_horas_inicioAfin_por_barbero).forEach((element) => {
        crearJson(Object.entries(element), element[0])
    })

export default horas_disponibles_por_barbero;