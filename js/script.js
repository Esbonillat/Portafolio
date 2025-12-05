/* Codigo javascript para portafolio de desarrollador
nombre: Eric Santiago Bonilla Torres
Cel: 3106666848
correo:ericsantibonilla@gmail-com
*/

// 1. Define tu nombre y el elemento donde se escribirá
const nombre = "Eric Santiago Bonilla Torres";
const elemento = document.getElementById('nombre-escrito');
let indice = 0; // Índice para recorrer el nombre
const velocidad = 90; // Milisegundos entre cada letra

// 2. Función para escribir el texto
function escribirNombre() {
    // Si aún hay letras por escribir
    if (indice < nombre.length) {
        // Agrega la siguiente letra al contenido del elemento
        elemento.textContent += nombre.charAt(indice);
        indice++;
        // Llama a la función de nuevo después de 'velocidad' milisegundos
        setTimeout(escribirNombre, velocidad);
    } else {
        // Cuando termina de escribir, remueve la clase del cursor
        elemento.classList.remove('cursor-parpadeante');
    }
}

// 3. Inicia el efecto:
// Agrega la clase para que el cursor parpadee ANTES de empezar a escribir
elemento.classList.add('cursor-parpadeante');

// Comienza la función de escritura
escribirNombre()



// 1. Define la función que realiza el copiado
function copiarTexto(elementoBoton) {
    // Obtener el texto a copiar del atributo 'data-texto'
    const textoACopiar = elementoBoton.getAttribute('data-texto');

    if (!textoACopiar) {
        console.error('El atributo data-texto no está definido en el botón.');
        return;
    }

    // Usar la API del Portapapeles
    navigator.clipboard.writeText(textoACopiar)
        .then(() => {
            // Opcional: Feedback visual
            const textoOriginal = elementoBoton.textContent;
            elementoBoton.textContent = '¡Copiado!';
            
            // Restablecer el texto después de 2 segundos
            setTimeout(() => {
                elementoBoton.textContent = textoOriginal;
            }, 2000);
            
            console.log(`Texto copiado: ${textoACopiar}`);
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
            alert('No se pudo copiar el texto. Inténtalo manualmente.');
        });
}

document.addEventListener('DOMContentLoaded', () => {
    // 2. Selecciona todos los botones que tienen la clase 'btn-copiar'
    const botonesCopiar = document.querySelectorAll('.btn-copiar');

    // 3. Itera sobre cada botón para agregar un event listener
    botonesCopiar.forEach(boton => {
        // Ignorar el botón "Enlace" del CV (los que son etiquetas <a>)
        if (boton.tagName === 'A') {
            return;
        }

        boton.addEventListener('click', function() {
            // 4. Llama a la función 'copiarTexto' al hacer clic, 
            //    pasando 'this' (el botón que fue clicado) como argumento.
            copiarTexto(this);
        });
    });
});

/**
 * ----------------------------------------Inicializa y automatiza el carrusel de imágenes. --------------------------
 * @param {string} containerSelector El selector CSS del contenedor principal del carrusel (ej: '.carousel-container').
 */
function initCarousel(containerElement) { 
  // Y ASIGNA ESE ELEMENTO A LA VARIABLE INTERNA 'container'
  const container = containerElement; 
  if (!container) {
    console.error(`Elemento contenedor no válido.`);
    return;
  }
  
  const track = container.querySelector('.carousel-track');
  const slides = container.querySelectorAll('.slide');
  const nextButton = container.querySelector('.next-button');
  const prevButton = container.querySelector('.prev-button');
  
  let currentSlide = 0;
  const slideCount = slides.length;
  // Obtiene el ancho del slide (necesario para el desplazamiento)
  // Usamos offsetWidth ya que clientWidth puede no incluir bordes/scrollbars.
  const slideWidth = slides[0].offsetWidth; 

  /**
   * Mueve el track del carrusel a la diapositiva actual.
   */
  function moveToSlide() {
    // Calcula la distancia de desplazamiento en píxeles.
    // Usamos 'px' directamente, aunque 'translateX(-${currentSlide * 100}%)' también es común.
    const moveDistance = -currentSlide * slideWidth;
    track.style.transform = `translateX(${moveDistance}px)`;
  }

  /**
   * Avanza a la siguiente diapositiva.
   */
  function nextSlide() {
    currentSlide = (currentSlide < slideCount - 1) ? currentSlide + 1 : 0;
    moveToSlide();
  }

  /**
   * Retrocede a la diapositiva anterior.
   */
  function prevSlide() {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slideCount - 1;
    moveToSlide();
  }

  // 2. Manejar eventos de navegación manual (Opcional, pero útil)
  if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
  }
  if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
  }

  // 3. Automatización (El loop principal)
  const intervalTime = 3000; // 3 segundos
  
  // Guardamos el ID del intervalo para poder detenerlo si es necesario
  const autoSlide = setInterval(nextSlide, intervalTime);
  
  // Opcional: Pausar el carrusel al pasar el ratón por encima
  container.addEventListener('mouseenter', () => {
      clearInterval(autoSlide);
  });
  
  // Reanudar el carrusel al quitar el ratón
  container.addEventListener('mouseleave', () => {
      // Usamos setInterval dentro de addEventListener para reanudar la animación
      setInterval(nextSlide, intervalTime); 
  });
}

// 4. Llamar a la función para inicializar el carrusel
document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtiene TODOS los contenedores con la clase 'carousel-container'
    const allCarousels = document.querySelectorAll('.carousel-container');
    
    // 2. Itera sobre cada uno de ellos (usando forEach)
    allCarousels.forEach(container => {
        // 3. Llama a la función initCarousel, pasándole el elemento contenedor DIRECTAMENTE.
      
        initCarousel(container);
    });
});


// Echo por: Eric Santiago Bonilla Torres