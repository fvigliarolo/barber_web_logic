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
prev.style.visibility = "hidden"

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

  const firstDay = new Date(year, month, 1); // primer dia del mes actual
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";
  let anio = year
  if(month == 1)
    anio = year - 1 
    // el problema esta en que day queda = 4.  
  for (let x = day; x > 0; x--) {
    let event = false;
    let diaPrevio = prevLastDay.getDate() - x + 1

    eventsArr.forEach((eventObj) => {
      if (eventObj.day === diaPrevio && eventObj.month === month && eventObj.year === anio) {
          event = true
      }
    });
    if (event)
      days += `<div class="day prev-date event">${prevDays - x + 1}</div>`;
    else
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
        event = true;
      }
    });
    if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
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
    let event = false;
    let anio = year
    if(month == 12)
      anio = year + 1 
    eventsArr.forEach((eventObj) => {
      if (eventObj.day === j && eventObj.month === month + 2 && eventObj.year === anio) {
          event = true
      }
    });
    if (event)
      days += `<div class="day next-date event">${j}</div>`;
    else
      days += `<div class="day next-date">${j}</div>`;
    }
  daysContainer.innerHTML = days;


// quitamos estilos a los dias pasados
  const elemntDays = document.querySelector(".days");
  const hoy = new Date().getDate();
  elemntDays.childNodes.forEach((elementDay) => {
    if (!elementDay.className.includes("event")) {
      elementDay.style.pointerEvents = "none"
      elementDay.style.backgroundColor = "#7a6e6e54"
    }
  })

  addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
  if ((month - 1) < today.getMonth())
    prev.style.visibility = "hidden"
  else {
    prev.style.visibility = "visible"
    month--;
    if ((month - 1) < today.getMonth()) // si vamos atras en el mes siguiente al actual, que desaparezca la flecha al llegar al mes actual 
      prev.style.visibility = "hidden"
    if (month < 0) {
      month = 11;
      year--;
    }
    initCalendar();
  }
}

function nextMonth() {
  prev.style.visibility = "visible"
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
            if (!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML) {
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
            if (!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
    });
  });
}

function setToday() {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  console.log(`todaybtn ${today}`)
  initCalendar();
}

todayBtn.addEventListener("click", () => {
  setToday()
});

// verificamos que no se puedan ingresar formatos de fechas extranos
dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

  if (dateInput.value.length === 2 && dateInput.value.charAt(1) !== "/") {
    dateInput.value = dateInput.value.slice(0, 2) + "/" + dateInput.value.slice(2);
  } else if (dateInput.value.length === 1 && dateInput.value > 1) {
    dateInput.value = "0" + dateInput.value;
  } else if (dateInput.value.length === 3 && dateInput.value.charAt(2) !== "/") {
    dateInput.value = dateInput.value.slice(0, 2) + "/" + dateInput.value.slice(2);
  }

  if (dateInput.value.length > 5) {
    dateInput.value = dateInput.value.slice(0, 5);
  }

  if (e.inputType === "deleteContentBackward" && dateInput.value.length === 3 && dateInput.value.charAt(2) === "/") {
    dateInput.value = dateInput.value.slice(0, 2);
  }

  // Verificar si el primer número antes de "/" es mayor a 12
  const parts = dateInput.value.split("/");
  const month = parseInt(parts[0], 10);
  if (month > 12) {
    dateInput.value = "12/" + parts[1];
  }
});

// controlamos que no se pueda ingresar un numero de dia mayor al del mes que ingresamos
dateInput.addEventListener("input", (e) => {
  const inputValue = e.target.value.replace(/[^0-9/]/g, "");
  const parts = inputValue.split("/");
  const month = parts[0];
  const day = parts[1];

  if (month.length === 2 && day && day.length > 1 && day > getDaysInMonth(month)) {
    e.target.value = `${month}/${getDaysInMonth(month)}`;
  } else if (month.length > 2) {
    e.target.value = month.slice(0, 2);
  }
});

function getDaysInMonth(month) {
  const monthNumber = parseInt(month, 10);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return new Date(year, monthNumber, 0).getDate();
}


dateInput.addEventListener("blur", () => {
  const dateArr = dateInput.value.split("/");

  if (dateArr[1] < 10) {
    dateArr[1] = "0" + dateArr[1]
    dateInput.value = dateArr[0] + "/" + dateArr[1]
  }

})

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  function setActiveDay(dia) {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      if (day.innerHTML == Number(dia)) {
        day.classList.add("active");
        getActiveDay(dia)
      } else {
        day.classList.remove("active")
      }
    })
  }

  const dateArr = dateInput.value.split("/");
  if (dateArr.length == 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length < 3 && dateArr[1] > 0 && dateArr[1] < 32) {
      setToday()
      if ((dateArr[0] - 1) < month)
        alert("mes erroneo")
      else if ((dateArr[1] < today.getDate()) && (dateArr[0] - 1) == month) {
        alert('dia anterior')
      } else {
        if (dateArr[0] > month) {
          let i = dateArr[0] - month - 1
          for (i; i > 0; i--) {
            nextMonth()
          }
        }
        setActiveDay(dateArr[1])


      }
      return;
    }
    alert("Invalid Date");
  }
}

// function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toLocaleDateString('es-ES', { weekday: 'long' }).split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}




//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (date === event.day && month + 1 === event.month && year === event.year) {
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
  function purificarDate(fecha) {
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
  datosReserva.push(NombreCliente, eventEmailCliente, eventTelefonoCliente, purificarDate(eventoDate), formatoHora(hora), barberId)

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
