import Header from '../templates/Header.js';
import Home from '../pages/Home.js';
import About from '../pages/About.js';
import Error404 from '../pages/Error404.js';
import Confirmar_reserva from '../pages/Confirmar_reserva.js';
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

    if (hash.startsWith('/confirmar_reservas')) {
        route = Confirmar_reserva;
    } else {

        switch (hash) {
            case "/":
                route = Home
                break;
            case "/about":
                route = About
                break;
            case "/home":
                route = Home
                break;
            case "/reservas":
                route = Reservas
                break;
            case "/galeria":
                route = Galeria
                break;
            case "/confirmar_reserva":
                route = Confirmar_reserva
                const parametros = hash.split("/")[2]
                break;
            default:
                route = Error404
                break;
        }
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



    let url_horario_laboral_barberos = 'http://localhost:3000/barberos'
    async function horas(endpoint) {
        return axios
            .get(endpoint)
            .then(response => response.data)
    }

    let arr_horas_inicioAfin_por_barbero = await horas(url_horario_laboral_barberos);


    let horas_a_mostrar_en_calendario = []
    function crearJson(start, barberoID) {
        start[1][1].forEach((element) => {
            let eljson = {};
            eljson.title = barberos[start[0][1]];
            eljson.description = barberoID
            eljson.color = 'green';

            eljson.start = element;
            horas_a_mostrar_en_calendario.push(eljson)
        })
    }


    async function hacer_reserva(datos_de_reserva) {
        const response = await fetch('http://localhost:3000/reserva', { // esta es la posta para hacer reserva
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                //   'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(datos_de_reserva) // body data type must match "Content-Type" header
        });
        const data = await response.json();
        console.log(data)
    }

    // console.log(arr_horas_inicioAfin_por_barbero)
    Object.entries(arr_horas_inicioAfin_por_barbero).forEach((element) => {
        crearJson(Object.entries(element), element[0])
    })

    // console.group("Array de los eventos de dia disponible => horas_a_mostrar_en_calendario");
    //     console.log(horas_a_mostrar_en_calendario)
    // console.groupEnd();

    function refrescarModal(eventData) {
        const label_datosBarbero_nombre = document.getElementById("datosBarbero_nombre")
        const label_datosBarbero_dia = document.getElementById("datosBarbero_dia")
        const label_datosBarbero_hora = document.getElementById("datosBarbero_hora")

        label_datosBarbero_nombre.innerHTML = `<p>Barbero: ${eventData.title}</p>`
        label_datosBarbero_dia.innerHTML = ` <p>Para el: ${eventData.startStr.split("T")[0]}</p>`
        label_datosBarbero_hora.innerHTML = `<p>A las: ${eventData.startStr.split("T")[1].split("-")[0]}</p>`
    }

    function cargarCalendario() {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            locale: 'esLocale', // Idioma en español
            defaultTimedEventDuration: "00:30", //Duracion de todos los eventos
            contentHeight: 600,
            allDaySlot: false, // no muestra arriba del todo una seccion para eventos de todo el dia
            slotDuration: '00:15', // cantidad de minutos para los eventos entre hora y hora
            slotMinTime: '09:00:00', // Hora de comienzo de la agenda de la barbería
            slotMaxTime: '21:00:00', // Hora de fin de la agenda de la barbería
            initialView: 'timeGridWeek',// A name of any of the available views, such as 'dayGridWeek', 'timeGridDay', 'listWeek'
            // events: horas_a_mostrar_en_calendario,
            events: horas_a_mostrar_en_calendario,
            eventClick: function (info) {
                $('#exampleModal').modal()
                refrescarModal(info.event)

                const modalBtn = document.getElementById("modalBtn")
                modalBtn.onclick = () => {
                    event.preventDefault();

                    const array_datos_reserva = crear_reserva(info.event.extendedProps.description, info.event.startStr.split("T")[0], info.event.startStr.split("T")[1].split("-")[0])
                    if (array_datos_reserva == "ERROR") {
                        alert("verifique los datos")
                    } else {
                        hacer_reserva(array_datos_reserva)
                    }
                }

                // LEER para hacer el modal definitivo-> https://bbbootstrap.com/snippets/modal-dialog-multi-step-form-wizard-29726524
                //     $(document).ready(function(){
                //         $('#smartwizard').smartWizard({
                //                 selected: 0,
                //                 theme: 'dots',
                //                 autoAdjustHeight:true,
                //                 transitionEffect:'fade',
                //                 showStepURLhash: false,

                //         });

                //     });
            }
        })
        calendar.render()

    }


    // let url = 'http://localhost:3000/barberos/data'
    // let url_todos_los_dias = await horas(url);
    // console.log(url_todos_los_dias)

    const calendarEl = document.getElementById('calendar');
    calendarEl.onload = cargarCalendario();


} //cierra router


//ROUTER
export default router;
