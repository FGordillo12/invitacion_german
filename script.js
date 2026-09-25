/* =====================================================
   FECHA DEL EVENTO
===================================================== */
const EVENT_DATE = new Date(
    "2026-10-24T13:00:00-05:00"
);

/* =====================================================
   CONTADOR
===================================================== */
function updateCountdown() {
    const now = new Date();
    const difference =
        EVENT_DATE.getTime() -
        now.getTime();

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference /
            (1000 * 60 * 60)) %
        24
    );

    const minutes = Math.floor(
        (difference /
            (1000 * 60)) %
        60
    );

    const seconds = Math.floor(
        (difference /
            1000) %
        60
    );

    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(
    updateCountdown,
    1000
);

/* =====================================================
   MÚSICA DE LA INVITACIÓN
===================================================== */
const song = document.getElementById("invitation-song");
const musicToggle = document.getElementById("music-toggle");
const musicStatus = document.getElementById("music-status");

musicToggle.addEventListener("click", async function() {
    if (!song.paused) {
        song.pause();
        return;
    }

    try {
        // La canción comienza en el segundo 16, también al volver a reproducirla.
        if (song.currentTime < 16 || song.ended) {
            song.currentTime = 16;
        }
        await song.play();
    } catch (error) {
        musicStatus.textContent = "No se pudo cargar la canción";
    }
});

song.addEventListener("play", function() {
    musicToggle.setAttribute("aria-pressed", "true");
    musicToggle.setAttribute("aria-label", "Pausar canción");
    musicToggle.classList.add("is-playing");
    musicToggle.querySelector(".music-play-icon").textContent = "Ⅱ";
    musicStatus.textContent = "Reproduciendo";
});

song.addEventListener("pause", function() {
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Reproducir canción");
    musicToggle.classList.remove("is-playing");
    musicToggle.querySelector(".music-play-icon").textContent = "▶";
    if (!song.ended) musicStatus.textContent = "En pausa";
});

song.addEventListener("ended", function() {
    musicStatus.textContent = "La canción terminó · toca para repetir";
});

/* =====================================================
   ANIMACIONES AL HACER SCROLL
===================================================== */
const animatedElements =
    document.querySelectorAll(
        ".time-box, .event-card, .location-grid, .dress-container"
    );

const observer =
    new IntersectionObserver(
        function(entries) {
            entries.forEach(
                function(entry) {
                    if (
                        entry.isIntersecting
                    ) {
                        entry.target
                            .classList
                            .add("show");

                        observer.unobserve(
                            entry.target
                        );
                    }
                }
            );
        },
        {
            threshold: 0.12
        }
    );

animatedElements.forEach(
    function(element) {
        observer.observe(element);
    }
);

