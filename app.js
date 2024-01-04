// Agregar un listener a cada enlace del navbar
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
    });
  });
  
  // Obtener todos los enlaces del menú de navegación
const menuLinks = document.querySelectorAll('.nav-link');

// Iterar sobre cada enlace y agregar un evento de clic
menuLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Evitar el comportamiento predeterminado de redirigir

    // Obtener el destino al que se debe desplazar (usando el atributo href)
    const targetId = this.getAttribute('href').substring(1); // Eliminar el '#'

    // Encontrar el elemento destino
    const targetElement = document.getElementById(targetId);

    // Desplazamiento suave a la sección correspondiente
    targetElement.scrollIntoView({ behavior: 'smooth' });
  });
});