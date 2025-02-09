const audio = document.querySelector("audio");
const equalizerCanvas = document.getElementById("equalizerCanvas");
const ctx = equalizerCanvas.getContext("2d");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);

// Connectez le source à l'analyseur et à la destination audio (les haut-parleurs)
source.connect(analyser);
analyser.connect(audioContext.destination);

// Paramètres de l'analyseur
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Fonction de dessin de l'égaliseur
function draw() {
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, equalizerCanvas.width, equalizerCanvas.height); // Efface l'écran à chaque dessin

    const barWidth = 5; // Largeur des barres (réduite pour espacer les traits)
    const margin = 2; // Marge entre les barres
    const centerX = equalizerCanvas.width / 2; // Centre du canvas

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];

        // Dessiner l'ombre
        ctx.shadowBlur = 20; // Flou de l'ombre
        ctx.shadowColor = 'rgba(255, 255, 255, 0.7)'; // Couleur de l'ombre

        // Barre de gauche (vers le centre)
        const leftX = centerX - (i + 1) * (barWidth + margin); // Prend en compte la marge
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // Couleur de la barre
        ctx.fillRect(leftX, equalizerCanvas.height - barHeight, barWidth, barHeight);

        // Barre de droite (vers le centre)
        const rightX = centerX + i * (barWidth + margin); // Prend en compte la marge
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // Couleur de la barre
        ctx.fillRect(rightX, equalizerCanvas.height - barHeight, barWidth, barHeight);

        // Réinitialiser les propriétés d'ombre
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
    }

    requestAnimationFrame(draw); // Re-dessine en boucle
}

// Démarre l'égaliseur dès que l'audio est prêt
audio.addEventListener("play", function() {
    audioContext.resume().then(() => {
        draw();
    });
});
