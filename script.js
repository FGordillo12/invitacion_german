/* =====================================================
   FECHA DEL EVENTO
===================================================== */
const EVENT_DATE = new Date(
    "2026-10-24T19:00:00-05:00"
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
   ANIMACIONES AL HACER SCROLL
===================================================== */
const animatedElements =
    document.querySelectorAll(
        ".time-box, .event-card, .video-container, .location-grid, .dress-container"
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

/* =====================================================
   VIDEO
===================================================== */
const video =
    document.querySelector(
        ".video-container video"
    );

const videoMessage =
    document.querySelector(
        ".video-message"
    );

if (video) {
    video.addEventListener(
        "loadeddata",
        function() {
            videoMessage.style.display =
                "none";
        }
    );
}