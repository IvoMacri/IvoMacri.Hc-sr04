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

// Función para actualizar el carrusel
function updateCarousel() {
    const offset = -currentIndex * (images[0].clientWidth + 20); 
    carousel.style.transition = 'transform 0.5s ease'; // Aplicamos la transición para el movimiento suave
    carousel.style.transform = `translateX(${offset}px)`; // Aplicamos el desplazamiento

    setTimeout(() => {
        isAnimating = false; // Habilitar nuevamente las animaciones
    }, 500);
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
