const qrReaderContainer = document.getElementById("qr-reader-container");
const qrReader = document.getElementById("qr-reader");
const qrResult = document.getElementById("qr-result");
const stopScanButton = document.getElementById("stop-scan");

// Fonction pour démarrer le scanner QR code
function startQrScanner() {
    qrReaderContainer.style.display = "block"; // Affiche le scanner
    qrResult.textContent = ""; // Réinitialise les résultats précédents

    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.start(
        { facingMode: "environment" }, // Utilise la caméra arrière
        {
            fps: 10, // Fréquence d'analyse (images par seconde)
            qrbox: { width: 50, height: 50 }, // Taille de la zone de scan
        },
        (decodedText) => {
            // Lorsqu'un QR code est détecté
            qrResult.textContent = `Contenu détecté : ${decodedText}`;
            console.log("QR code détecté :", decodedText);

            try {
                // Vérifie si le contenu est un JSON
                const qrData = JSON.parse(decodedText);
                const serialNumber = qrData.serial_number;
                const token = qrData.token;

                if (serialNumber && token) {
                    // Enregistre le numéro de série dans le localStorage
                    localStorage.setItem("serial_number", serialNumber);
                    qrResult.textContent = `Numéro de série détecté : ${serialNumber}`;
                    alert(`Numéro de série enregistré : ${serialNumber}`);
                } else {
                    qrResult.textContent = "QR code invalide.";
                }
            } catch (error) {
                qrResult.textContent = "Erreur : Le contenu n’est pas un JSON valide.";
            }
        },
        (errorMessage) => {
            // Gestion des erreurs de scan
            console.log("Erreur de détection :", errorMessage);
        }
    );

    // Arrêter le scanner
    stopScanButton.addEventListener("click", () => {
        html5QrCode.stop().then(() => {
            qrReaderContainer.style.display = "none"; // Cache le scanner
        }).catch(err => console.error("Erreur lors de l'arrêt du scanner :", err));
    });
}

// Lancer le scanner lorsqu'on clique sur l'engrenage
document.getElementById("settings-btn").addEventListener("click", startQrScanner);
