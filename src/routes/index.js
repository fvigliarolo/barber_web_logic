import Header from '../templates/Header.js';
import Home from '../pages/Home.js';
import About from '../pages/About.js';
import Error404 from '../pages/Error404.js';
import getHash from '../utils/getHash.js';
import Reservas from '../pages/Reservas.js';
import Galeria from '../pages/Galeria.js';

const router = () => {

    const hash = getHash()
    let route;
    
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
            break;
        case "galeria":
            route = Galeria
            break;
        default:
           route = Error404
            break;
    }
    // stablishing templates to dom
    const header  = null || document.getElementById('Header');
    const content = null || document.getElementById('content');

    
    header.innerHTML = Header();
    let render = route
    async function  algo() {
          content.innerHTML = render();
        }
    algo()
    
    $(document).ready(function(){
        M.Datepicker.init($('.datepicker'),{})
    });

    $("#aa").click(function(){
        alert(123)
    })
    
    
    
        
    




};

//ROUTER

export default router;

