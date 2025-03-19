document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });

    document.addEventListener('click', (e) => {
        let sound = document.getElementById('click-sound');
        if (sound) sound.play();

        let clickEffect = document.createElement('div');
        clickEffect.classList.add('click-effect');
        clickEffect.style.left = `${e.pageX - 25}px`;
        clickEffect.style.top = `${e.pageY - 25}px`;
        document.body.appendChild(clickEffect);

        setTimeout(() => clickEffect.remove(), 500);
    });
});
