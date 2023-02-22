import Header from '../templates/Header.js';
import Home from '../pages/Home.js';
import About from '../pages/About.js';
import Error404 from '../pages/Error404.js';
import getHash from '../utils/getHash.js';
import { Reservas, crear_reserva } from '../pages/Reservas.js';
import { getFetch } from '../utils/fetch.js';
import Galeria from '../pages/Galeria.js';
import { barberos, barbers_basic_info } from '../utils/barber_variables.js';
// import { barbers_basic_info } from '../utils/barber_variables.js';
// const mysql = require('mysql')

const router = async () => {

    const hash = getHash()
    let route;
    let logica;

    switch (hash) {
        case "/":
            route = Home
            break;
        case "about":
            route = About
            break;
        case "home":
            route = Home
            break;
        case "reservas":
            route = Reservas
            logica = "Class_Reservar"
            break;
        case "galeria":
            route = Galeria
            break;
        default:
            route = Error404
            break;
    }
    // stablishing templates to dom
    const header = null || document.getElementById('Header');
    const content = null || document.getElementById('content');


    header.innerHTML = Header();
    let render = route
    async function render_content() {
        content.innerHTML = render();
    }
    render_content()

//  console.log(await barbers_basic_info)

    let url_horario_laboral_barberos = 'http://localhost:3000/barberos'
    async function horas(endpoint){
        return axios
        .get(endpoint)
        .then(response => response.data)
    }

    let arr_horas_inicioAfin_por_barbero = await horas(url_horario_laboral_barberos);


    let horas_a_mostrar_en_calendario = []
    function crearJson(start){
      start[0][1].forEach((element) => {
      let eljson = {};
      eljson.title = barberos[start[0][0]];
      eljson.description=start[0][0]
      eljson.color= 'green';

        eljson.start=`2023-02-19T${element}`;
        horas_a_mostrar_en_calendario.push(eljson)
      })
    }
    arr_horas_inicioAfin_por_barbero.forEach((element) => {
      crearJson(Object.entries(element))
    })

    console.group("Array de los eventos de dia disponible => horas_a_mostrar_en_calendario");
        console.log(horas_a_mostrar_en_calendario)
    console.groupEnd();
    


    function cargarCalendario(){
        const calendar = new FullCalendar.Calendar(calendarEl, {
            locale: 'esLocale', // Idioma en español
            defaultTimedEventDuration: "00:30", //Duracion de todos los eventos
            contentHeight: 600,
            allDaySlot: false, // no muestra arriba del todo una seccion para eventos de todo el dia
            slotDuration: '00:15', // cantidad de minutos para los eventos entre hora y hora
            slotMinTime: '09:00:00', // Hora de comienzo de la agenda de la barbería
            slotMaxTime: '21:00:00', // Hora de fin de la agenda de la barbería
            initialView: 'timeGridWeek',// A name of any of the available views, such as 'dayGridWeek', 'timeGridDay', 'listWeek'
            events: horas_a_mostrar_en_calendario,
      eventClick:  function(info) {
        
        $('#exampleModal').modal()
            console.log(info.event)
        modal.innerHTML = ` <p>Para el ${info.event.startStr.split("T")[0]}</p>
                            <p>A las ${info.event.startStr.split("T")[1].split("-")[0]}</p>`
        modalTitle.innerHTML = `<h3>Reservar hora con:  ${info.event.title}</h3>`
      }
          }       )
          calendar.render()
        
    }
    const calendarEl = document.getElementById('calendar');
    const modal = document.getElementById('modalBody')
    const modalTitle = document.getElementById("modal-header")
    calendarEl.onload = cargarCalendario();

      
    
    if (logica == "Class_Reservar") {
        // let barberos = getFetch('barberos/reservas')
        // barberos.then((barberos)=>{
        //     console.log(barberos)
        // })
        let form_reservas = document.getElementById("form_reservas_button");
        form_reservas.addEventListener("click", crear_reserva);
        // form_reservas.addEventListener("click", async (e) => {
        //     e.preventDefault()
        //     const response = await fetch('http://localhost:3000/reserva/datetimes');
        //     const data = await response.json();
        //     console.log(data)
        // })

    };

} //cierra router


//ROUTER
export default router;


//  INSERT       
//===============     
// form_reservas.addEventListener("click", async (e) => {
//     e.preventDefault()
//     const response = await fetch('http://localhost:3000/reserva', {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             //   'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(['43','fran','fran@gmail.com','099123123','2002-02-25','17:00:00','Y3U0MWE5MjI=']) // body data type must match "Content-Type" header
//     });
//     const data = await response.json();
//     console.log(data)
// })
