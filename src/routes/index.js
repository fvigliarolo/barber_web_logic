import Header from '../templates/Header.js';
import Home from '../pages/Home.js';
import About from '../pages/About.js';
import Error404 from '../pages/Error404.js';
import getHash from '../utils/getHash.js';
import { Reservas, crear_reserva } from '../pages/Reservas.js';
import { getFetch } from '../utils/fetch.js';
import Galeria from '../pages/Galeria.js';
import { barberos } from '../utils/barber_variables.js';
// const mysql = require('mysql')

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

    // barberos.then(barberos => console.log(barberos.map(function(barbero){
    //     return barbero.barbero_jornada_inicio
    // }).includes('11:00:00')))
    // barberos.then(barberos => (barberos.map(function(barbero){
    //     return barbero.barbero_jornada_inicio
    // }).forEach(hora => {
    //     console.log(hora)
    //     if ("09:00:00" <= hora ){
    //         console.log("hora valida")
    // }else{
    //     console.log("todavia no abrio")
    // }
    // })))
    let reservas = ["08:00:00", "09:00:00", "09:30:00", "10:00:00"]
    let horas_disponibles =[];


    function calcular_horas_libres(barberos){
        let jornada_inicio = barberos[0].barbero_jornada_inicio.split(":");
        let jornada_fin = barberos[0].barbero_jornada_fin.split(":");
        let hora_inicio = new Date()
        let hora_fin = new Date()
        hora_inicio.setHours(jornada_inicio[0], jornada_inicio[1], jornada_inicio[2])
        hora_fin.setHours(jornada_fin[0], jornada_fin[1], jornada_fin[2])

        for (hora_inicio.toLocaleTimeString(); hora_inicio.toLocaleTimeString() <= hora_fin.toLocaleTimeString(); hora_inicio.setMinutes(hora_inicio.getMinutes() + 30)) {

            if (reservas.includes(hora_inicio.toLocaleTimeString())) {
                
            } else {
                horas_disponibles.push(hora_inicio.toLocaleTimeString())
            }
        }
        console.log(horas_disponibles)
    }
    barberos.then(barberos => 
        // {
        calcular_horas_libres(barberos) 
        // for (let hora_inicio = barberos[0].barbero_jornada_inicio; hora_inicio <= barberos[0].barbero_jornada_fin; hora_inicio += "00:30:00") {
        //     if (reservas.includes(hora_inicio)) {
        //         console.log("la hora " + hora_inicio + " esta reservada")
        //     } else {
        //         horas_disponibles.push(hora_inicio)
        //     }
        // }
        // console.log("las horas disponibles son" + horas_disponibles)
    // }
    );




    if (logica == "Class_Reservar") {
        // let barberos = getFetch('barberos/reservas')
        // barberos.then((barberos)=>{
        //     console.log(barberos)
        // })
        let form_reservas = document.getElementById("form_reservas_button");
        // form_reservas.addEventListener("click", crear_reserva);
        // form_reservas.addEventListener("click", async (e) => {
        //     e.preventDefault()
        //     const response = await fetch('http://localhost:3000/reserva/datetimes');
        //     const data = await response.json();
        //     console.log(data)
        // })

    };

} //cierra router




//ROUTER

export default router;


//  INSERT       
//===============     
// form_reservas.addEventListener("click", async (e) => {
//     e.preventDefault()
//     const response = await fetch('http://localhost:3000/reserva', {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             //   'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(['43','fran','fran@gmail.com','099123123','2002-02-25','17:00:00','Y3U0MWE5MjI=']) // body data type must match "Content-Type" header
//     });
//     const data = await response.json();
//     console.log(data)
// })


//  SELECT       
//===============     
// form_reservas.addEventListener("click", async (e) =>{
//     e.preventDefault()
//     const response = await fetch('http://localhost:3000/reserva');
//     const data = await response.json();
//     console.log(data)
// })

//// SELECT ID 
//     ////==============
//     form_reservas.addEventListener("click", async (e) =>{
//         e.preventDefault()
//         const response = await fetch('http://localhost:3000/reserva/datetimes/2');
//         const data = await response.json();
//         console.log(data)
//     })


//  SELECT BARBEROS 
//=====================
//         form_reservas.addEventListener("click", async (e) =>{
//     e.preventDefault()
//     const response = await fetch('http://localhost:3000/barberos');
//     const data = await response.json();
//     console.log(data)
// })