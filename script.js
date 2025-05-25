var lagu = [
    ['Tarot', '.Feast', 4000, 8000, 'feast.jpg', 'audio/tarot.mp3'],
    ['Dua Sedjoli', 'Dewa 19', 1500, 2300, 'dewa.jpg', 'audio/dewa.mp3'],
    ['Rumah ke rumah', 'Hindia', 2440, 5400, 'hindia.jpg', 'audio/hindia.mp3'],
    ['Anugerah Terindah Yang Pernah Kumiliki', 'Sheila On 7', 12000, 25000, 'so7.jpg', 'audio/so7.mp3'],
    ['La La Lost You', 'Niki', 9500, 20000, 'niki.jpg', 'audio/niki.mp3'],
    ['To The Bone', 'Pamungkas', 9500, 20000, 'pamungkas.jpg', 'audio/pamungkas.mp3'],
    ['Iris', 'Goo Goo Dolls', 9500, 20000, 'iris.jpg', 'audio/iris.mp3'],
];

var element = "";

lagu.forEach(function (musik) {
    const songId = musik[0].toLowerCase().replace(/\s/g, '-');
    element += `
    <div class="lagu">
        <h2>${musik[0]}</h2>
        <small><i>Oleh ${musik[1]}</i></small>
        <img src="img/${musik[4]}" alt="${musik[0]}">
        <audio id="audio-${songId}" src="${musik[5]}"></audio>
        <button onclick="playPause('${songId}', this)">
            ▶️ Putar
        </button>
        <input type="range" class="progress" value="0" min="0" max="100" step="0.1" 
               oninput="seekAudio('${songId}', this.value)">
        <div class="stats">
            <span>❤️ ${musik[2]}</span>
            <span>▶️ ${musik[3]}</span>
        </div>
    </div>`;
});


function playPause(songId, btn) {
    const audio = document.getElementById(`audio-${songId}`);
    if (!audio) return console.error("Audio tidak ditemukan");

    if (audio.paused) {
        // Pause semua audio lain
        document.querySelectorAll('audio').forEach(a => {
            if (a !== audio) {
                a.pause();
                const otherBtn = a.parentElement.querySelector('button');
                if (otherBtn) otherBtn.textContent = '▶️ Putar';
            }
        });

        audio.play()
            .then(() => btn.textContent = '⏸️ Jeda')
            .catch(e => console.error("Gagal memutar:", e));
    } else {
        audio.pause();
        btn.textContent = '▶️ Putar';
    }

    // Bar lagu progres
    setInterval(() => {
        if (!audio.paused) {
            const progressBar = document.querySelector(`.progress`);
            if (audio.duration > 0) {
                progressBar.value = (audio.currentTime / audio.duration) * 100;
            }
        }
    }, 500);
}

// Fungsi untuk mengatur posisi lagu saat slider digeser
function seekAudio(songId, value) {
    const audio = document.getElementById(`audio-${songId}`);
    if (audio && !isNaN(audio.duration)) {
        audio.currentTime = (value / 100) * audio.duration;
    }
}

document.getElementById("container")
    .innerHTML = element;