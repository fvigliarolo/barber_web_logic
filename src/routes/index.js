import Header from '../templates/Header.js';
import Home from '../pages/Home.js';
import Error404 from '../pages/Error404.js';
import Confirmar_reserva from '../pages/Confirmar_reserva.js';
import getHash from '../utils/getHash.js';
import { Reservas } from '../pages/Reservas.js';
import  cargarCalendario from '../utils/cargar_calendario.js';
import cargarCalendarioPrivado from '../utils/Ver_reservas.js'
// const mysql = require('mysql')

const router = async () => {

    let hash = getHash()
    let route;

    if (hash.startsWith('/confirmar_reservas')) {
        route = Confirmar_reserva;
   
    } else {

        switch (hash) {
            case "/":
                route = Home
                break;
            case "/home":
                route = Home
                break;
            case "":
                route = Home
                break;
            case "/reservas":
                route = Reservas
                break;
            case "/confirmar_reserva":
                route = Confirmar_reserva
                break;
            case "/ver_reservas":
                route = Reservas
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

    if(hash == '/reservas'){
        const calendarEl =  document.getElementById('calendar')
        cargarCalendario(calendarEl)
    }
    else if(hash == "/ver_reservas" )
    {
        const calendarEl =  document.getElementById('calendar')
        cargarCalendarioPrivado(calendarEl)
    }
} //cierra router


//ROUTER
export default router;
