// Carrusel de imágenes
let currentIndex = 0;
let isAnimating = false; // Variable para evitar animaciones simultáneas

// Seleccionamos el contenedor del carrusel y las imágenes
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img'); // Selecciona todas las imágenes dentro del carrusel
const totalImages = images.length; // El número total de imágenes

// Botones de navegación
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

// Event listeners para los botones
prevButton.addEventListener('click', () => {
    if (!isAnimating) {
        isAnimating = true;
        currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1; // Retroceder a la última imagen si estamos en la primera
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if (!isAnimating) {
        isAnimating = true;
        currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1; // Avanzar a la primera imagen si estamos en la última
        updateCarousel();
    }
});

// Función para actualizar el carrusel
function updateCarousel() {
    const offset = -currentIndex * (images[0].clientWidth + 20); 
    carousel.style.transition = 'transform 0.5s ease'; // Aplicamos la transición para el movimiento suave
    carousel.style.transform = `translateX(${offset}px)`; // Aplicamos el desplazamiento

    // Si llegamos a la última imagen, volvemos al principio de forma continua
    if (currentIndex === totalImages - 1) {
        setTimeout(() => {
            // Reiniciar la posición sin transición, para que no sea visible
            carousel.style.transition = 'none'; 
            carousel.style.transform = 'translateX(0)';
            currentIndex = 0; // Volver al principio
            setTimeout(() => {
                // Reactivar la transición de nuevo después de un pequeño retraso
                carousel.style.transition = 'transform 0.5s ease';
                isAnimating = false; // Habilitar nuevamente las animaciones
            }, 50); // Un pequeño retraso para que el cambio no sea brusco
        }, 500); // Esperar 500 ms para que la transición termine antes de reiniciar
    } else {
        isAnimating = false; // Si no estamos al final, habilitamos nuevamente la animación
    }
}

// Función para ir a la siguiente imagen
function nextImage() {
    if (!isAnimating) {
        isAnimating = true;
        currentIndex = (currentIndex + 1) % totalImages;  // Si llegamos al final, volvemos al inicio
        updateCarousel();
    }
}

// Función para ir a la imagen anterior
function prevImage() {
    if (!isAnimating) {
        isAnimating = true;
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;  // Si estamos al principio, vamos al final
        updateCarousel();
    }
}

// Configuración de los botones
nextButton.addEventListener('click', nextImage);
prevButton.addEventListener('click', prevImage);

// Configuración para que el carrusel se mueva automáticamente cada 3 segundos
setInterval(nextImage, 3000); // Avanza cada 3 segundos

// Configuración de arrastre del carrusel con el cursor
const carouselInner = document.querySelector('.carousel-inner');
let isMouseDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carouselInner.scrollLeft;
    carousel.classList.add('dragging'); // Añade la clase cuando el mouse está presionado
});

carousel.addEventListener('mouseleave', () => {
    isMouseDown = false;
    carousel.classList.remove('dragging'); // Elimina la clase cuando el mouse sale del contenedor
});

carousel.addEventListener('mouseup', () => {
    isMouseDown = false;
    carousel.classList.remove('dragging'); // Elimina la clase cuando el mouse es soltado
});

carousel.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return; // Si no está presionado el mouse, no hacer nada
    e.preventDefault(); // Prevenir el comportamiento por defecto (selección de texto)
    const x = e.pageX - carousel.offsetLeft;
    const scroll = (x - startX) * 2; // Ajusta la velocidad del arrastre multiplicando por un valor
    carouselInner.scrollLeft = scrollLeft - scroll; // Mueve el carrusel
});

// Función para abrir un modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Función para cerrar un modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Cierra el modal si el usuario hace clic fuera del contenido
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
// Función para mostrar el mensaje
function showThanksMessage() {
    document.getElementById('thanks-message').style.display = 'block';  // Mostrar el mensaje
}

// Función para ocultar el mensaje cuando se haga clic en el fondo
function hideThanksMessage() {
    document.getElementById('thanks-message').style.display = 'none';  // Ocultar el mensaje
}
// JavaScript para abrir los enlaces de los videos al hacer clic en las imágenes del carrusel
document.querySelectorAll('.carousel img').forEach(function(image) {
    image.addEventListener('click', function() {
        const videoUrl = image.getAttribute('data-video');  // Obtener URL del atributo 'data-video'
        window.open(videoUrl, '_blank');  // Abrir el enlace en una nueva pestaña
    });
});
