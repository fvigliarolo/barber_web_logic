import Header from '../templates/Header.js';
import Home from '../pages/Home.js';
import About from '../pages/About.js';
import Error404 from '../pages/Error404.js';
import getHash from '../utils/getHash.js';
import {Reservas, crear_reserva} from '../pages/Reservas.js';
import Galeria from '../pages/Galeria.js';

const router = () => {

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

    if (logica == "Class_Reservar") {
        let form_reservas = document.getElementById("form_reservas_button");
        form_reservas.addEventListener("click", crear_reserva);

    };

} //cierra router




//ROUTER

export default router;
