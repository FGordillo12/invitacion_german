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
let songStarted = false;

async function startSongOnFirstScroll() {
    if (songStarted) return;

    try {
        // La canción comienza en el segundo 16 tras el primer desplazamiento.
        if (song.currentTime < 16) song.currentTime = 16;
        await song.play();
        songStarted = true;
        window.removeEventListener("scroll", startSongOnFirstScroll);
        window.removeEventListener("wheel", startSongOnFirstScroll);
        window.removeEventListener("touchmove", startSongOnFirstScroll);
    } catch (error) {
        // Algunos navegadores no consideran el scroll una acción que habilite audio.
        // Se conserva el intento para el siguiente gesto de desplazamiento.
    }
}

window.addEventListener("scroll", startSongOnFirstScroll, { passive: true });
window.addEventListener("wheel", startSongOnFirstScroll, { passive: true });
window.addEventListener("touchmove", startSongOnFirstScroll, { passive: true });

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

