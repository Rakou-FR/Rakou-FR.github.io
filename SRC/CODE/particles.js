// Obtenez le canvas pour les particules et le contexte
const particlesCanvas = document.getElementById('particlesCanvas');
const ctxParticles = particlesCanvas.getContext('2d');

// Définit la taille du canvas
particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

// Tableau des particules
let particles = [];
const maxParticles = 200; // Limite du nombre de particules à l'écran

// Fonction pour créer une particule
function createParticle(x, y) {
    const size = Math.random() * 5 + 2;
    const speedX = Math.random() * 3 - 1.5;
    const speedY = Math.random() * 3 - 1.5;
    const opacity = Math.random() * 0.5 + 0.5;
    const lifespan = Math.random() * 500 + 50; // Durée de vie aléatoire entre 50 et 150 frames

    particles.push({ x, y, size, speedX, speedY, opacity, lifespan });
}

// Fonction pour dessiner les particules
function drawParticles() {
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Dessiner la particule
        ctxParticles.beginPath();
        ctxParticles.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctxParticles.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctxParticles.fill();

        // Mise à jour de la position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Réduire la durée de vie
        particle.lifespan -= 1;

        // Si la durée de vie est terminée, supprimer la particule
        if (particle.lifespan <= 0) {
            particles.splice(i, 1);
            i--; // Réajustement de l'index après la suppression
        }
    }
}

// Fonction d'animation
function animateParticles() {
    ctxParticles.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    // Réduit la probabilité d'apparition des particules
    if (Math.random() < 0.05) { // Crée moins de particules
        createParticle(Math.random() * particlesCanvas.width, Math.random() * particlesCanvas.height);
    }

    drawParticles();

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Redimensionner le canvas lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});
