// Carrusel de imágenes
let currentIndex = 0;
let isAnimating = false;

const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const totalImages = images.length;

const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

function updateCarousel() {
    const offset = -currentIndex * (images[0].clientWidth + 20);
    carousel.style.transition = 'transform 0.5s ease';
    carousel.style.transform = `translateX(${offset}px)`;

    if (currentIndex === totalImages - 1) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            carousel.style.transform = 'translateX(0)';
            currentIndex = 0;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease';
                isAnimating = false;
            }, 50);
        }, 500);
    } else {
        isAnimating = false;
    }
}

function nextImage() {
    if (!isAnimating) {
        isAnimating = true;
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }
}

function prevImage() {
    if (!isAnimating) {
        isAnimating = true;
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    }
}

prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

setInterval(nextImage, 3000);

// Abrir modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Cerrar modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// Mostrar mensaje de agradecimiento
function showThanksMessage() {
    document.getElementById('thanks-message').style.display = 'flex';
}

// Ocultar mensaje de agradecimiento
function hideThanksMessage() {
    document.getElementById('thanks-message').style.display = 'none';
}

// Abrir video o enlace al hacer clic en una imagen del carrusel
document.querySelectorAll('.carousel img').forEach(function(image) {
    image.addEventListener('click', function() {
        const videoUrl = image.getAttribute('data-video');
        window.open(videoUrl, '_blank');
    });
});
