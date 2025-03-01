// Optional JavaScript for future enhancements or interactivity
// For now, it keeps everything smooth with basic functionality
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.animation = `fadeInUp 0.7s ease-out ${index * 0.2}s forwards`;
    });
});

// Animation keyframes for section fade-in
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`, styleSheet.cssRules.length);
