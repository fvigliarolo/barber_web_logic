import sanitizator from '../utils/sanitizator.js';
import { barberos } from '../utils/barber_variables.js';

const Reservas = () => {
    const view = /*html*/ `
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
  
`;
    return view;
};

class Class_Reservar {
    constructor({ __id, nombre_cliente, mail_cliente, telefono_cliente, barbero_seleccionado, date_seleccionado, time_seleccionado }) {
        this.id = __id;
        this.nombre_cliente = nombre_cliente;
        this.mail_cliente = mail_cliente;
        this.telefono_cliente = telefono_cliente;
        this.barbero_seleccionado = barbero_seleccionado;
        this.date_seleccionado = date_seleccionado;
        this.time_seleccionado = time_seleccionado;
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
    let nombre_cliente = sanitizator(document.getElementById("nombre_cliente").value)
    let mail_cliente = sanitizator(document.getElementById("mail_cliente").value)
    let telefono_cliente = sanitizator(document.getElementById("telefono_cliente").value)
    let barbero_seleccionado = sanitizator(document.getElementById("barbero_seleccionado").value)
    let date_seleccionado = sanitizator(document.getElementById("date_seleccionado").value)
    let time_seleccionado = sanitizator(document.getElementById("time_seleccionado").value)

    let obj_Reserva = {
        nombre_cliente: nombre_cliente,
        mail_cliente: mail_cliente,
        telefono_cliente: telefono_cliente,
        barbero_seleccionado: barbero_seleccionado,
        date_seleccionado: date_seleccionado,
        time_seleccionado: time_seleccionado,
    }


    if (isNaN(nombre_cliente) == false) {
        if (nombre_cliente == "" || nombre_cliente == null) {
            errors.push(error[1])
        } else {
            errors.push(error[2])
        }
    }

    function validateEmail(mail) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
    }

    function isDate(date) {
        var re = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        return re.test(date);
    }

    if (validateEmail(mail_cliente) == false) {
        if (mail_cliente != "") {
            errors.push(error[3])
        }
    }

    if ((mail_cliente == "" || mail_cliente == null) && (telefono_cliente == null || telefono_cliente == "")) {
        errors.push(error[4])
    }


    if (barberos.includes(barbero_seleccionado) == false) {
        errors.push(error[5])
    }

    if (isNaN(telefono_cliente) == true) {
        errors.push(error[6])
    }

    if (isDate(date_seleccionado) == false) {
        errors.push(error[7])
    }

    function isTime(time) {
        var re = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        return re.test(time);
    }

    if (isTime(time_seleccionado) == false) {
        errors.push(error[8])
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

    if (isValidDate(date_seleccionado) == false) {
        errors.push(error[9])
        // console.log("fecha erronea")
    }

    if (errors.length > 0) {
        for (let i = 0; i < errors.length; i++) {
            // console.log(errors[i])
        }
        console.log("No se puede crear la reserva: " + errors)
    } else {
        console.log("Formulario valido.")
        let nueva_reserva = new Class_Reservar(obj_Reserva);
    }
    errors = []
}

export { Reservas, crear_reserva };

