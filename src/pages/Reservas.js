import sanitizator from '../utils/sanitizator.js';

const Reservas = () => {
    const view = /*html*/ `
    <div id='calendar'></div>
<div class="container">
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="modalHeaderH5">Agendar mi hora</h5> 
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  <div id="smartwizard">
                      <ul>
                          <li><a href="#step-1">Paso 1<br /><small>Datos del servicio</small></a></li>
                          <li><a href="#step-2">Paso 2<br /><small>Contacto</small></a></li>
                          <li><a href="#step-3">Paso 3<br /><small>Confirmacion</small></a></li>
                      </ul>
                      <div>
                          <div id="step-1">
                              <div class="row">
                                  <div class="col-md-6" id="datosBarbero_nombre"> <p>Barbero: Alex</p>  </div>
                                  <div class="col-md-6" id="datosBarbero_dia"> <p>Dia: 28/2/2023</p></div>
                                  <div class="col-md-6" id="datosBarbero_hora"> <p>Hora: 17:30 </p></div>
                              </div>
                          </div>
                          <div id="step-2">
                              <div class="row">
                                  <div class="col-md-3"> <input type="text" id="input_nombre" class="form-control" placeholder="Tu nombre" required> </div>
                                  <div class="col-md-3"> <input type="text" id="input_mail" class="form-control" placeholder="Tu mail" required> </div>
                                  <div class="col-md-3"> <input type="text" id="input_telefono" class="form-control" placeholder="Tu telefono" required> </div>
                              </div>
                          </div>
                          <div id="step-3" class="">
                              <div class="row mt-9">
                                <br>
                                <div class="col-md-9"> <input type="text" class="form-control" placeholder="Te hemos enviado un token de validacion a tu mail. Ingresalo aquí" required> </div>
                              </div>
                              <div class="row mt-9">
                                <br>
                                <button type="button" id="modalBtn" data-dismiss="modal"><span aria-hidden="true">Confirmar</span></button>
                             </div>
                          </div>
                        
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>
</body>
</html>

`;


    return view;
};

class Class_Reservar {
    constructor({ nombre_cliente, mail_cliente, telefono_cliente, date_seleccionado, time_seleccionado, barbero_seleccionado }) {

        this.nombre_cliente = nombre_cliente;
        this.mail_cliente = mail_cliente;
        this.telefono_cliente = telefono_cliente;
        this.date_seleccionado = date_seleccionado;
        this.time_seleccionado = time_seleccionado;
        this.barbero_seleccionado = barbero_seleccionado;
    }

}




function crear_reserva(barbero_seleccionado, date_seleccionado, time_seleccionado) {
    event.preventDefault()

    let errors = []
    let error = {
        1: "El nombre no puede ser vacio",
        2: "No se permite numeros en el nombre",
        3: "Verifique formato de mail",
        4: "Ingrese ambos contactos",
        5: "Error con barbero seleccionado",
        6: "No se permiten letras en el telefono",
        7: "Verifique la fecha ingresada",
        8: "Verifique la hora seleccionada",
        9: "La fecha debe ser vigente"
    }

    const nombre_cliente = sanitizator(document.getElementById("input_nombre").value)
    const mail_cliente = sanitizator(document.getElementById("input_mail").value)
    const telefono_cliente = sanitizator(document.getElementById("input_telefono").value)


    let obj_Reserva = {
        nombre_cliente: nombre_cliente,
        mail_cliente: mail_cliente,
        telefono_cliente: telefono_cliente,
        date_seleccionado: date_seleccionado,
        time_seleccionado: time_seleccionado,
        barbero_seleccionado: barbero_seleccionado
    }



    function validateEmail(mail) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
    }

    ////      VERIFICA NOMBRE
    if (isNaN(nombre_cliente) == false) {
        if (nombre_cliente == "" || nombre_cliente == null) {
            errors.push(error[1])
        } else {
            errors.push(error[2])
        }
    }
    ////      VERIFICA EMAIL
    if (validateEmail(mail_cliente) == false) {
        if (mail_cliente != "") {
            errors.push(error[3])
        }
    }
    ////      VERIFICA CONTACTO
    if ((mail_cliente == "" || mail_cliente == null) || (telefono_cliente == null || telefono_cliente == "")) {
        errors.push(error[4])
    }

    ////      VERIFICA TELEFONO
    if (isNaN(telefono_cliente) == true) {
        errors.push(error[6])
    }

    ////      VERIFICA SI HAY ERRORES
    let retorno;
    if (errors.length > 0) {
        console.log("No se puede crear la reserva: " + errors)
        retorno = "ERROR"
    } else {
        console.log("Formulario valido.")
        let nueva_reserva = new Class_Reservar(obj_Reserva);
        nueva_reserva = Object.values(nueva_reserva)
        retorno = nueva_reserva
    }
    return retorno
}

export { Reservas, crear_reserva };
// import sanitizator from '../utils/sanitizator.js';

// const Reservas = () => {
//     const view = /*html*/ `
    
//     <body>
//     <div class="container">
//       <div class="left">
//         <div class="calendar">
//           <div class="month">
//             <i class="fas fa-angle-left prev"></i>
//             <div class="date">december 2015</div>
//             <i class="fas fa-angle-right next"></i>
//           </div>
//           <div class="weekdays">
//             <div>Dom</div>
//             <div>Lun</div>
//             <div>Mar</div>
//             <div>Mie</div>
//             <div>Jue</div>
//             <div>Vie</div>
//             <div>Sab</div>
//           </div>
//           <div class="days"></div>
//           <div class="goto-today">
//             <div class="goto">
//               <input type="text" placeholder="mm/yyyy" class="date-input" />
//               <button class="goto-btn">Buscar</button>
//             </div>
//             <button class="today-btn">Hoy</button>
//           </div>
//         </div>
//       </div>
//       <div class="right">
//         <div class="today-date">
//           <div class="event-day">wed</div>
//           <div class="event-date">12th december 2022</div>
//         </div>
//         <div class="events"></div>
//         <div class="add-event-wrapper">
//           <div class="add-event-header">
//             <div class="title">Add Event</div>
//             <i class="fas fa-times close"></i>
//           </div>
//           <div class="add-event-body">
//             <div class="add-event-input">
//               <input type="text" placeholder="Event Name" class="event-name" />
//             </div>
//             <div class="add-event-input">
//               <input
//                 type="text"
//                 placeholder="Event Time From"
//                 class="event-time-from"
//               />
//             </div>
//             <div class="add-event-input">
//               <input
//                 type="text"
//                 placeholder="Event Time To"
//                 class="event-time-to"
//               />
//             </div>
//           </div>
//           <div class="add-event-footer">
//             <button class="add-event-btn">Add Event</button>
//           </div>
//         </div>
//       </div>
//       <button class="add-event">
//         <i class="fas fa-plus"></i>
//       </button>
//     </div>

//     <script src="./src/assets/js/javascript.js"></script>
//   </body>
// </body>
// </html>

// `;


//     return view;
// };

// class Class_Reservar {
//     constructor({ nombre_cliente, mail_cliente, telefono_cliente, date_seleccionado, time_seleccionado, barbero_seleccionado }) {

//         this.nombre_cliente = nombre_cliente;
//         this.mail_cliente = mail_cliente;
//         this.telefono_cliente = telefono_cliente;
//         this.date_seleccionado = date_seleccionado;
//         this.time_seleccionado = time_seleccionado;
//         this.barbero_seleccionado = barbero_seleccionado;
//     }

// }




// function crear_reserva(barbero_seleccionado, date_seleccionado, time_seleccionado) {
//     event.preventDefault()

//     let errors = []
//     let error = {
//         1: "El nombre no puede ser vacio",
//         2: "No se permite numeros en el nombre",
//         3: "Verifique formato de mail",
//         4: "Ingrese ambos contactos",
//         5: "Error con barbero seleccionado",
//         6: "No se permiten letras en el telefono",
//         7: "Verifique la fecha ingresada",
//         8: "Verifique la hora seleccionada",
//         9: "La fecha debe ser vigente"
//     }

//     const nombre_cliente = sanitizator(document.getElementById("input_nombre").value)
//     const mail_cliente = sanitizator(document.getElementById("input_mail").value)
//     const telefono_cliente = sanitizator(document.getElementById("input_telefono").value)


//     let obj_Reserva = {
//         nombre_cliente: nombre_cliente,
//         mail_cliente: mail_cliente,
//         telefono_cliente: telefono_cliente,
//         date_seleccionado: date_seleccionado,
//         time_seleccionado: time_seleccionado,
//         barbero_seleccionado: barbero_seleccionado
//     }



//     function validateEmail(mail) {
//         var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         return re.test(mail);
//     }

//     ////      VERIFICA NOMBRE
//     if (isNaN(nombre_cliente) == false) {
//         if (nombre_cliente == "" || nombre_cliente == null) {
//             errors.push(error[1])
//         } else {
//             errors.push(error[2])
//         }
//     }
//     ////      VERIFICA EMAIL
//     if (validateEmail(mail_cliente) == false) {
//         if (mail_cliente != "") {
//             errors.push(error[3])
//         }
//     }
//     ////      VERIFICA CONTACTO
//     if ((mail_cliente == "" || mail_cliente == null) || (telefono_cliente == null || telefono_cliente == "")) {
//         errors.push(error[4])
//     }

//     ////      VERIFICA TELEFONO
//     if (isNaN(telefono_cliente) == true) {
//         errors.push(error[6])
//     }

//     ////      VERIFICA SI HAY ERRORES
//     let retorno;
//     if (errors.length > 0) {
//         console.log("No se puede crear la reserva: " + errors)
//         retorno = "ERROR"
//     } else {
//         console.log("Formulario valido.")
//         let nueva_reserva = new Class_Reservar(obj_Reserva);
//         nueva_reserva = Object.values(nueva_reserva)
//         retorno = nueva_reserva
//     }
//     return retorno
// }

// export { Reservas, crear_reserva };
