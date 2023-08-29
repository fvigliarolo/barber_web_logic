import  horas_disponibles_por_barbero  from '../utils/Horas_disponibles_por_barbero.js'
import { crear_reserva } from '../pages/Reservas.js';

async function hacer_reserva(datos_de_reserva) {
    const response = await fetch('http://192.168.1.20:3000/reserva', { // esta es la posta para hacer reserva
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


function refrescarModal(eventData) {
    const label_datosBarbero_nombre = document.getElementById("datosBarbero_nombre")
    const label_datosBarbero_dia = document.getElementById("datosBarbero_dia")
    const label_datosBarbero_hora = document.getElementById("datosBarbero_hora")

    label_datosBarbero_nombre.innerHTML = `<p>Barbero: ${eventData.title}</p>`
    label_datosBarbero_dia.innerHTML = ` <p>Para el: ${eventData.startStr.split("T")[0]}</p>`
    label_datosBarbero_hora.innerHTML = `<p>A las: ${eventData.startStr.split("T")[1].split("-")[0]}</p>`
}

function cargarCalendario(calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'esLocale', // Idioma en español
        defaultTimedEventDuration: "00:30", //Duracion de todos los eventos
        contentHeight: 600,
        allDaySlot: false, // no muestra arriba del todo una seccion para eventos de todo el dia
        slotDuration: '00:15', // cantidad de minutos para los eventos entre hora y hora
        slotMinTime: '09:00:00', // Hora de comienzo de la agenda de la barbería
        slotMaxTime: '21:00:00', // Hora de fin de la agenda de la barbería
        initialView: 'timeGridWeek',// A name of any of the available views, such as 'dayGridWeek', 'timeGridDay', 'listWeek'
        events: horas_disponibles_por_barbero,
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
        }
    })
    calendar.render()

}

export default cargarCalendario;