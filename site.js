const menuLink = document.getElementById('tabbt');
const tab = document.getElementById('tab');

menuLink.addEventListener('click', (e) => {
    e.preventDefault();
    tab.classList.toggle('active');
});


// ===== SLIDER =====
(function () {
    const INTERVAL = 20000; // 20 saniye

    const track = document.getElementById('slider_track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev_btn');
    const nextBtn = document.getElementById('next_btn');
    const progress = document.getElementById('slider_progress');

    if (!track || slides.length === 0) return;

    let current = 0;
    let timer = null;

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        resetProgress();
    }

    function resetProgress() {
        progress.style.transition = 'none';
        progress.style.width = '0%';
        progress.offsetWidth; // force reflow
        progress.style.transition = `width ${INTERVAL}ms linear`;
        progress.style.width = '100%';
    }

    function startAuto() {
        clearInterval(timer);
        timer = setInterval(() => goTo(current + 1), INTERVAL);
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));

    // Dokunmatik destek
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
    });

    goTo(0);
    startAuto();
})();