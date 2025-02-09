document.addEventListener("DOMContentLoaded", function() {
    fetch("./SRC/JSON/info.json")
        .then(response => response.json())
        .then(info => {
            document.getElementById("infoName").textContent = info.nom;
            document.getElementById("infoProfession").textContent = info.profession;
            document.getElementById("infoDisponibilite").textContent = info.disponibilite;
            document.getElementById("infoExperience").textContent = info.experience;
            document.getElementById("infoContact").textContent = info.contact;
        })
        .catch(error => console.error("Erreur lors du chargement des informations :", error));
});

document.addEventListener("DOMContentLoaded", function() {
    const infoBox = document.getElementById("infoBox");
    const toggleBtn = document.getElementById("toggleInfo");

    // L'infoBox est cachée par défaut, on s'assure qu'elle le soit au départ
    infoBox.style.display = 'none';  // Assurez-vous qu'elle est cachée dès le départ

    // Lorsque l'utilisateur clique sur le bouton
    toggleBtn.addEventListener("click", function() {
        // Toggle l'affichage de la box
        if (infoBox.style.display === "none" || infoBox.style.display === "") {
            infoBox.style.display = "block";  // Affiche la box
        } else {
            infoBox.style.display = "none";  // Cache la box
        }
    });
});



