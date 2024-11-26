const welcomeBtn = document.getElementById('welcome-btn');
const camera = document.createElement('video'); // Création de l'élément vidéo
const canvas = document.createElement('canvas'); // Création du canvas
const app = document.getElementById('app');

// Ajout des éléments au DOM
camera.setAttribute('autoplay', true);
camera.style.width = '100%';
camera.style.maxWidth = '400px';
camera.style.marginTop = '20px';
canvas.style.display = 'none'; // Le canvas reste caché au début
app.appendChild(camera);
app.appendChild(canvas);

welcomeBtn.addEventListener('click', async () => {
    try {
        // Demande d'accès à la caméra
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        camera.srcObject = stream; // Affiche la vidéo en direct
        camera.style.display = 'block';

        // Capture de la photo après 3 secondes (par exemple)
        setTimeout(() => {
            const context = canvas.getContext('2d');
            canvas.width = camera.videoWidth;
            canvas.height = camera.videoHeight;
            context.drawImage(camera, 0, 0, canvas.width, canvas.height);

            // Arrête la caméra et cache la vidéo
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            camera.style.display = 'none';

            // Affiche la photo capturée
            canvas.style.display = 'block';
        }, 3000);
    } catch (err) {
        alert('Impossible d’accéder à la caméra : ' + err.message);
    }
});
