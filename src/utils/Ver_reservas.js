import { getFetch } from "./fetch.js"

async function get_reservas_del_dia(){
    let reservas_del_dia_url = 'barberos/dia'
    let reservas_del_dia = await getFetch(reservas_del_dia_url)
    
    let eventos = []
     Object.entries(reservas_del_dia).forEach(([key, value]) => {
        let datos_reserva = {}
        datos_reserva.reserva_telefono_cliente = reservas_del_dia[key][0].reserva_telefono_cliente
        datos_reserva.reserva_nombre_cliente = reservas_del_dia[key][0].reserva_nombre_cliente

        let evento = {}
        evento.title = reservas_del_dia[key][0].barbero_nombre
        evento.description = datos_reserva
        evento.start = reservas_del_dia[key][0].reserva_date.split("T")[0] + "T" + reservas_del_dia[key][0].reserva_time
        evento.color = 'orange';
        eventos.push(evento)

     })
        
    

return eventos;
}



async function cargarCalendarioPrivado(calendarEl) {
    let eventos = await get_reservas_del_dia()
    const calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'esLocale', // Idioma en español
        defaultTimedEventDuration: "00:30", //Duracion de todos los eventos
        contentHeight: 600,
        allDaySlot: false, // no muestra arriba del todo una seccion para eventos de todo el dia
        slotDuration: '00:15', // cantidad de minutos para los eventos entre hora y hora
        slotMinTime: '09:00:00', // Hora de comienzo de la agenda de la barbería
        slotMaxTime: '21:00:00', // Hora de fin de la agenda de la barbería
        initialView: 'timeGridDay',// A name of any of the available views, such as 'dayGridWeek', 'timeGridDay', 'listWeek'
        events: eventos,
        eventClick: function (info) {
                console.log(info.event.extendedProps.description)
        }
    })
    calendar.render()

}

export default cargarCalendarioPrivado;