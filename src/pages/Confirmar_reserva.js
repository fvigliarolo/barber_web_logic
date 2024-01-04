const Confirmar_reserva = () => {
    const view = /*html*/ `
    <h2>Confimacion de reservas</h2>
      `
      const urlParams = new URLSearchParams(window.location.search.split('?')[1]);
      const codigo = urlParams.get('codigo');
      const reserva_id = urlParams.get('reserva_id');
      const mail = urlParams.get('mail');

      hacer_reserva(codigo, reserva_id, mail);
    return view;
    
    
 
  };


  async function hacer_reserva(codigo, reserva_id, mail) {
    let datos_de_reserva = [codigo, reserva_id, mail]

    const response = await fetch('http://localhost:3000/reserva/confirmar_reserva', { // esta es de test para confirmar la reserva

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
  
  export default Confirmar_reserva;