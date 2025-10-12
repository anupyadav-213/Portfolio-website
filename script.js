// Mobile nav toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("show"));

// Typing effect
const texts = ["Full Stack Developer", "MERN Stack", "Problem Solver"];
let count = 0, index = 0, currentText = "", letter = "";

(function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  document.querySelector(".typing").textContent = letter;
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1500);
  } else setTimeout(type, 100);
})();

// Scroll reveal animations
ScrollReveal().reveal(".section-title", { delay: 200, origin: "top", distance: "50px" });
ScrollReveal().reveal(".about-content", { delay: 300, origin: "bottom", distance: "60px" });
ScrollReveal().reveal(".skill-card", { interval: 100, origin: "bottom", distance: "40px" });
ScrollReveal().reveal(".projects-container", { delay: 300, origin: "bottom", distance: "60px" });
ScrollReveal().reveal(".contact-form", { delay: 300, origin: "bottom", distance: "60px" });

// Particles background
const particles = document.createElement('script');
particles.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
particles.onload = () => {
  particlesJS('particles-js', {
    particles: {
      number: { value: 60 },
      color: { value: "#00fff5" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      move: { enable: true, speed: 1 }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 100, duration: 0.4 } }
    }
  });
};
document.body.appendChild(particles);
