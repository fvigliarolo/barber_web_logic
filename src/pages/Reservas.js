import sanitizator from '../utils/sanitizator.js';
import { barbers_basic_info } from '../utils/barber_variables.js';
import { myFetch, postFetch } from '../utils/fetch.js';
// import postFetch from '../utils/fetch.js';


const Reservas = () => {
    const view = /*html*/ `
    <div id='calendar'></div>
    <div class="modal" id="exampleModal"  tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header" id="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modalBody">
            </div>

            <!--Este es el pie del modal aqui puedes agregar mas botones-->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary">Reservar</button>
            </div>
        </div>
    </div>
</div>
  <form id="form_reservas" class="form_reservas" autocomplete="off">
  <label for="nombre_cliente">Su nombre</label>
    <br>
    <input type="text" id="nombre_cliente">
    <br>
    <label for="mail_cliente">Su mail</label>
    <br>
    <input type="email" id="mail_cliente">
    <br>
    <label for="telefono_cliente">Su telefono</label>
    <br>
    <input type="text" id="telefono_cliente">
    <br>
    <label for="radio_button1">barbero especifico</label>
    <br>
    <input type="radio" id="radio_button1" name="clase_radio_button">
    <br>
    <label for="radio_button2">Cualquier dia</label>
    <br>
    <input type="radio" id="radio_button2" name="clase_radio_button">
    <br>
    <label for="barbero_seleccionado">Barbero de preferencia</label>
    <br>
    <input type="text" id="barbero_seleccionado">
    <br>
    <label for="date_seleccionado">fecha</label>
    <br>
    <input type="date" id="date_seleccionado">
    <br>
    <label for="time_seleccionado">hora</label>
    <br>
    <input type="time" id="time_seleccionado">
    <br>
    <br>
    <input type="submit" id="form_reservas_button" class="form_reservas_button" value="confirmar"> 

  </form>

    

  
</body>
</html>

  
`;
    return view;
};

class Class_Reservar {
    constructor({ __id, nombre_cliente, mail_cliente, telefono_cliente, date_seleccionado, time_seleccionado, barbero_seleccionado }) {
        this.id = __id;
        this.nombre_cliente = nombre_cliente;
        this.mail_cliente = mail_cliente;
        this.telefono_cliente = telefono_cliente;
        this.date_seleccionado = date_seleccionado;
        this.time_seleccionado = time_seleccionado;
        this.barbero_seleccionado = barbero_seleccionado;
    }

    get id() {
        return this.__id
    }

    set id(a) {
        this.__id = Math.random().toString(16).slice(2)
    }

}


let errors = []
let error = {
    1: "El nombre no puede ser vacio",
    2: "No se permite numeros en el nombre",
    3: "Verifique formato de mail",
    4: "Ingrese algun contacto",
    5: "Error con barbero seleccionado",
    6: "No se permiten letras en el telefono",
    7: "Verifique la fecha ingresada",
    8: "Verifique la hora seleccionada",
    9: "La fecha debe ser vigente"
}


function crear_reserva(e) {
    e.preventDefault()
    let radioButton_CualquierDia = document.getElementById("radio_button2").checked 


    if(radioButton_CualquierDia){
        alert("reserva rapida")
    }else{
        alert("reserva lenta")
    }
    // let nombre_cliente = sanitizator(document.getElementById("nombre_cliente").value)
    // let mail_cliente = sanitizator(document.getElementById("mail_cliente").value)
    // let telefono_cliente = sanitizator(document.getElementById("telefono_cliente").value)
    // let barbero_seleccionado = sanitizator(document.getElementById("barbero_seleccionado").value)
    // let date_seleccionado = sanitizator(document.getElementById("date_seleccionado").value)
    // let time_seleccionado = sanitizator(document.getElementById("time_seleccionado").value)

    // let obj_Reserva = {
    //     nombre_cliente: nombre_cliente,
    //     mail_cliente: mail_cliente,
    //     telefono_cliente: telefono_cliente,
    //     date_seleccionado: date_seleccionado,
    //     time_seleccionado: time_seleccionado,
    //     barbero_seleccionado: 'Y3U0MWE5MjI='
    //     // barbero_seleccionado: barberos[barbero_seleccionado]
    // }



    function validateEmail(mail) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
    }

    function isDate(date) {
        var re = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        return re.test(date);
    }

    function isValidDate(date) {
        var GivenDate = date;
        var CurrentDate = new Date();
        GivenDate = new Date(GivenDate);

        if (GivenDate >= CurrentDate) {
            return true
        } else {
            return false;
        }
    }

    function isTime(time) {
        var re = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        return re.test(time);
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
    if ((mail_cliente == "" || mail_cliente == null) && (telefono_cliente == null || telefono_cliente == "")) {
        errors.push(error[4])
    }
    ////      VERIFICA BARBERO 
    if (barbers_basic_info.hasOwnProperty(barbero_seleccionado) == false) {
        errors.push(error[5])
    }
    ////      VERIFICA TELEFONO
    if (isNaN(telefono_cliente) == true) {
        errors.push(error[6])
    }
    ////      VERIFICA FECHA
    if (isDate(date_seleccionado) == false) {
        errors.push(error[7])
    }
    ////      VERIFICA HORA
    if (isTime(time_seleccionado) == false) {
        errors.push(error[8])
    }
    ////      VERIFICA FECHA VIGENTE
    if (isValidDate(date_seleccionado) == false) {
        errors.push(error[9])
    }

    ////      VERIFICA SI HAY ERRORES
    if (errors.length > 0) {
        console.log("No se puede crear la reserva: " + errors)
    } else {
        console.log("Formulario valido.")
        let nueva_reserva = new Class_Reservar(obj_Reserva);
       nueva_reserva =  Object.values(nueva_reserva)
       console.log(nueva_reserva)
       let request = postFetch('reserva', nueva_reserva)

    }


    // GET
    // function getFetch(endpoint) {
    //     return new Promise((resolve, reject) => {
    //         const data = myFetch.get(endpoint)
    //         resolve(data)
    //     })
    // }
    // let data = getFetch('reserva/datetimes')
    // data.then(console.log)

}
// errors = []
// }

export { Reservas, crear_reserva };

