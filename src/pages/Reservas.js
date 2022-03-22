const Reservas = () => {
    const Reserva = {
      id,
      nombre_cliente,
      mail_cliente,
      telefono_cliente,
      id_barbero,
      fecha_hora
    }
    const view = /*html*/ `
    <form id="form_reservas" class="form_reservas" autocomplete="off">
      <input type="text" id="nombre_cliente">
      <label for="nombre_cliente">Su nombre</label>

      <input type="email" id="mail_cliente">
      <label for="mail_cliente">Su mail</label>

      <input type="text" id="telefono_cliente">
      <label for="telefono_cliente">Su telefono</label>
      
      <input type="text" id="barbero_seleccionado">
      <label for="barbero_seleccionado">Barbero de preferencia</label>

      
      <input type="datetime" id="datetime_seleccionado">
      <label for="datetime_seleccionado">fehca y hora</label>

    </form>
    

`;
    return view, Reserva;
  };

  class Reserva{
    constructor(id, nombre_cliente, mail_cliente, telefono_cliente, id_barbero, fecha_hora){
      
        this.id = id;
        this.nombre_cliente = nombre_cliente;
        this.mail_cliente = mail_cliente;
        this.telefono_cliente = telefono_cliente;
        this.id_barbero = id_barbero;
        this.fecha_hora = fecha_hora;

      }


  }

  
  export default Reservas;

{/* <input type="time" class="datepicker" id="datepicker"> */}

{/* <div class="form-section">
<h1 class="form-title">Play with the form!</h1>
<p>(Or read how this demo was made <a href="https://www.silocreativo.com/en/progressive-disclosure-with-css/" target="_blank">here</a>)</p>
<form id="form" class="form" autocomplete="off">
    <input id="name" placeholder="Name *" name="name" type="text" value="" pattern="^[^0-9]+$" size="30" maxlength="245" autocomplete="nope" required>
    <label for="name">Name</label>
    <input id="surname" placeholder="Surname *" name="surname" type="text" value="" size="30" maxlength="245" autocomplete="nope" required>
    <label for="surname">Surname</label>
    <input id="email" placeholder="Email *" name="email" type="email" value="" size="30" maxlength="100" aria-describedby="email-notes" autocomplete="nope" required>
    <label for="email">Email</label>
    <input id="surname" placeholder="Surname *" name="surname" type="text" value="" size="30" maxlength="245" autocomplete="nope" required>
    <label for="surname">Surname</label>
    <input name="submit" type="button" id="aa" class="aa" value="Post Comment">
</form>
</div> */}

