document.addEventListener("DOMContentLoaded", function() {
    fetch('./SRC/JSON/iconsData.json')
        .then(response => response.json())
        .then(iconsData => {
            const iconsContainer = document.querySelector('.icons');
            const descriptionBox = document.getElementById('descriptionBox');
            
            iconsData.forEach(icon => {
                // Créer un élément <a> pour chaque icône
                const iconLink = document.createElement('a');
                iconLink.href = icon.link;
                iconLink.target = "_blank";
                iconLink.rel = "noopener noreferrer";
                
                // Créer un élément <img> pour chaque icône
                const iconImg = document.createElement('img');
                iconImg.src = icon.src;
                iconImg.alt = icon.alt;
                
                // Ajouter l'élément <img> à l'élément <a>
                iconLink.appendChild(iconImg);
                
                // Ajouter l'élément <a> au container d'icônes
                iconsContainer.appendChild(iconLink);

                // Ajouter les événements de survol pour afficher les descriptions
                iconImg.addEventListener('mouseenter', function() {
                    descriptionBox.textContent = icon.description;
                    descriptionBox.style.display = "block";
                });
                
                iconImg.addEventListener('mouseleave', function() {
                    descriptionBox.style.display = "none";
                });

                iconImg.addEventListener('mousemove', function(event) {
                    descriptionBox.style.top = event.clientY - 50 + "px";
                    descriptionBox.style.left = event.clientX + 20 + "px";
                });
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement du fichier JSON:', error);
        });
});
