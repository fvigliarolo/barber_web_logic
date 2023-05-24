import horas_disponibles_por_barbero from '../../utils/Horas_disponibles_por_barbero.js'

const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  eventWrappNombre = document.querySelector(".nombre-cliente "),
  eventWrappEmail = document.querySelector(".email-cliente "),
  eventWrappTelefono = document.querySelector(".telefono-cliente "),
  eventWrapperTitle = document.getElementById("event-wrapper-title"),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
let barberId;
let hora;
let eventoDate;
let errors = []
const error = {
  1: "El nombre no puede ser vacio",
  2: "No se permite numeros en el nombre",
  3: "Verifique formato de mail",
  4: "Ingrese ambos contactos",
  5: "Error con barbero seleccionado",
  6: "No se permiten letras en el telefono",
  7: "Verifique la fecha ingresada",
  8: "Verifique la hora seleccionada",
  9: "La fecha debe ser vigente",
  10: "El email no puede ser vacio",
  11: "El telefono no puede ser vacio"
}

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];


const eventsArr = horas_disponibles_por_barbero;

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event" id="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
              <span class="event-time" style="visibility: hidden;">${event.description}</span>
              <span class="event-time" style="visibility: hidden;">${event.date}</span>
              </div>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
}

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

//CIERRE EL MODAL CUANDO NO SE HACE CLICK DENTRO DEL CALENDARIO NI EN LOS EVENTOS
document.addEventListener("click", (e) => {
  if (!addEventWrapper.contains(e.target) && !eventsContainer.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

//allow 50 chars in eventtitle
eventWrappNombre.addEventListener("input", (e) => {
  eventWrappNombre.value = eventWrappNombre.value.slice(0, 60);
});


//Borramos numeros en el campo nombre
eventWrappNombre.addEventListener("keyup", (e) => {
  e.target.value = e.target.value.replace(/\d/g, '');
});
//Verificar formato de mail

function validateEmail(mail) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(mail)
}



//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
  const NombreCliente = eventWrappNombre.value;
  const eventEmailCliente = eventWrappEmail.value;
  const eventTelefonoCliente = eventWrappTelefono.value;

  if (!validateEmail(eventEmailCliente))
    errors.push(error[3])
  if (isNaN(eventTelefonoCliente))
    errors.push(error[6])
  if (NombreCliente == "")
    errors.push(error[1])
  if (eventEmailCliente == "")
    errors.push(error[10])
  if (eventTelefonoCliente == "")
    errors.push(error[11])

  if (errors.length > 0) {
    errors.forEach((err) => alert(err))
    return
  }

let datosReserva = []
function purificarDate(fecha){
  let arrFecha = fecha.split("-")
  if (arrFecha[1].length == 1)
    fecha = arrFecha[2] + "-0" + arrFecha[1] + "-" + arrFecha[0] //formato aaaa/mm/dd
  return fecha
}
function formatoHora(hora12) {
  // Separar la hora, minutos, segundos y am/pm
  var partes = hora12.split(" ");
  var horaMinutos = partes[0].split(":");
  var hora = parseInt(horaMinutos[0]);
  var minutos = horaMinutos[1];
  var segundos = horaMinutos[2];
  var ampm = partes[1];
  
  // Convertir la hora al formato de 24 horas
  if (ampm.toUpperCase() === "PM" && hora !== 12) {
    hora += 12;
  } else if (ampm.toUpperCase() === "AM" && hora === 12) {
    hora = 0;
  }
  
  // Construir la hora en formato de 24 horas
  var hora24 = hora.toString().padStart(2, "0") + ":" + minutos + ":" + segundos;
  
  return hora24;
}
  datosReserva.push(NombreCliente, eventEmailCliente, eventTelefonoCliente, purificarDate(eventoDate),formatoHora(hora), barberId)

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
  if (eventsArr.length > 0) {
    hacer_reserva(datosReserva)
    alert("Verifique su email para confirmar reserva")
    location.reload()
  }


// dejamos el eventwrapp con los campos vacios
  addEventWrapper.classList.remove("active");
  eventWrappNombre.value = "";
  eventWrappEmail.value = "";
  eventWrappTelefono.value = "";
  updateEvents(activeDay);
  //select active day and add event class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});



function openEventWrap(text) {
  addEventWrapper.classList.toggle("active");
  eventWrapperTitle.innerText = text

}

eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {

    const eventBarberoID = e.target.children[1].children[1].innerHTML;
    const eventTime = e.target.children[1].children[0].innerHTML;
    const eventDate = e.target.children[1].children[2].innerHTML;
    const eventTitle = e.target.children[0].children[1].innerHTML;

    eventoDate = eventDate;
    hora = eventTime;
    barberId = eventBarberoID
    

    if (addEventWrapper.classList[1] == "active") {
      addEventWrapper.classList.remove("active");
      setTimeout(() => {
        openEventWrap(eventTitle + "  " + eventTime)

      }, 300);

    } else {
      openEventWrap(eventTitle + "  " + eventTime)
    }


    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        //if no events left in a day then remove that day from eventsArr
        if (event.events.length === 0) {
          eventsArr.splice(eventsArr.indexOf(event), 1);
          //remove event class from day
          const activeDayEl = document.querySelector(".day.active");
          if (activeDayEl.classList.contains("event")) {
            activeDayEl.classList.remove("event");
          }
        }
      }
    });
  }
});



function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}


// ejemplo de un evento
// ========================
// const eventsArr = [
//   {
//     day: 17,
//     month: 5,
//     year: 2023,
//     events: [
//       {
//         title: "Event 1 ",
//         time: "10:00 AM",
//         // dato: "a"
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//         // dato: "a"

//       },
//     ],
//   },  {
//     day: 17,
//     month: 5,
//     year: 2023,
//     events: [
//       {
//         title: "Event 3",
//         time: "12:00 AM",
//       },
//       {
//         title: "Event 4",
//         time: "13:00 PM",
//       },
//     ],
//   },
// ];
