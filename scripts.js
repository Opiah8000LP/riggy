document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".section");
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationDelay = `${index * 0.2}s`;
            el.classList.add("visible");
        }, index * 200);
    });
});
