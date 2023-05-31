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


// import { barberos } from './barber_variables.js';

// let servicios_por_barbero = 'http://localhost:3000/barberos'
// async function horas(endpoint) {
//     return axios
//         .get(endpoint)
//         .then(response => response.data)
// }

// let arr_horas_inicioAfin_por_barbero = await horas(servicios_por_barbero);
// console.log(arr_horas_inicioAfin_por_barbero)

// function convertirFormatoHora(hora24) {
//     // Separar la hora, minutos y segundos
//     var partes = hora24.split(":");
//     var hora = parseInt(partes[0]);
//     var minutos = partes[1];
//     var segundos = partes[2];
  
//     // Convertir la hora al formato de 12 horas
//     var hora12 = (hora % 12) || 12; // Si es 0, se convierte a 12
//     var ampm = hora < 12 ? "AM" : "PM";
  
//     // Construir la hora en formato de 12 horas
//     var hora12formato = hora12 + ":" + minutos + ":" + segundos + " " + ampm;
  
//     return hora12formato;
//   }

// let horas_disponibles_por_barbero = []
// function crearJson(fechasHoras, barberoID) {
//     fechasHoras[1][1].forEach((element) => {
//         let anio = element.split("-")[0]
//         let mes = element.split("-")[1].replace("0", "")
//         let dia = element.split("-")[2].split("T")[0]
//         let hora = convertirFormatoHora(element.split("-")[2].split("T")[1])

//         let eljson = {};
//         let eljson2 = {}
//         eljson2.title = barberos[fechasHoras[0][1]];
//         eljson2.time = hora;
//         eljson2.description = barberoID;
//         eljson.day = parseInt(dia);
//         eljson.month = parseInt(mes);
//         eljson.year = parseInt(anio);
//         eljson2.date = `${dia}-${mes}-${anio}`;
//         eljson.events = [eljson2]
   
//         horas_disponibles_por_barbero.push(eljson)
//     })
// }
// // horas_disponibles_por_barbero = arr_horas_inicioAfin_por_barbero


//     Object.entries(arr_horas_inicioAfin_por_barbero).forEach((element) => {
//         crearJson(Object.entries(element), element[0])
//     })

// export default horas_disponibles_por_barbero;
// // [
// //     {
// //       day: 17,
// //       month: 5,
// //       year: 2023,
// //       events: [
// //         {
// //           title: "Event 1 ",
// //           time: "10:00 AM",
// //           description: "barberoid"
// //         },
// //         {
// //           title: "Event 2",
// //           time: "11:00 AM",
// //         },
// //       ],
// //     },  
// //   ]