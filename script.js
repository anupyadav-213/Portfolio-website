const EMAILJS_SERVICE_ID  = "service_tu6sxtd";
const EMAILJS_TEMPLATE_ID = "template_dbmipio";
const EMAILJS_PUBLIC_KEY  = "mKW0Wsn_BO1QhtfbN";

(function () {
  if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

const cursorDot     = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {
  let mouseX = 0, mouseY = 0, outX = 0, outY = 0;
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
  });
  function animateCursor() {
    outX += (mouseX - outX) * 0.12;
    outY += (mouseY - outY) * 0.12;
    cursorOutline.style.transform = `translate(${outX - 16}px, ${outY - 16}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll("a, button, .skill-card, .project-card, .tab-btn").forEach((el) => {
    el.addEventListener("mouseenter", () => cursorOutline.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursorOutline.classList.remove("hover"));
  });
}

const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((s) => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  document.querySelectorAll(".nav-links li a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
});

const menuToggle = document.getElementById("menuToggle");
const navLinks   = document.getElementById("navLinks");
menuToggle?.addEventListener("click", () => navLinks.classList.toggle("show"));
document.querySelectorAll(".nav-links li a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("show"))
);

const texts = ["Full Stack Developer", "MERN Stack Developer", "Software Developer", "ECE Engineer"];
let tCount = 0, tIndex = 0;
const typingEl = document.querySelector(".typing");
function type() {
  if (!typingEl) return;
  if (tCount === texts.length) tCount = 0;
  const current = texts[tCount];
  typingEl.textContent = current.slice(0, ++tIndex);
  if (tIndex === current.length) { tCount++; tIndex = 0; setTimeout(type, 1800); }
  else setTimeout(type, 90);
}
type();

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); revealObserver.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const tab = btn.dataset.tab;
    document.querySelectorAll(".skill-card").forEach((card) => {
      card.classList.toggle("hidden", card.dataset.tab !== tab);
    });
  });
});

const contactForm = document.getElementById("contactForm");
const submitBtn   = document.getElementById("submitBtn");
const formStatus  = document.getElementById("formStatus");

function setLoading(on) {
  submitBtn.querySelector(".btn-text").classList.toggle("hidden", on);
  submitBtn.querySelector(".btn-loading").classList.toggle("hidden", !on);
  submitBtn.disabled = on;
}
function showStatus(type, msg) {
  formStatus.textContent = msg;
  formStatus.className = `form-status ${type}`;
  setTimeout(() => { formStatus.className = "form-status"; }, 5000);
}

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const useMailtoFallback = typeof emailjs === "undefined" || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY;

  if (useMailtoFallback) {
    const name    = document.getElementById("contactName").value.trim();
    const email   = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim() || "Portfolio enquiry";
    const message = document.getElementById("contactMessage").value.trim();
    const body    = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:anupyadav1302@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showStatus("success", "✅ Opening your email app...");
    return;
  }

  setLoading(true);
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:  document.getElementById("contactName").value.trim(),
      from_email: document.getElementById("contactEmail").value.trim(),
      subject:    document.getElementById("contactSubject").value.trim() || "Portfolio Message",
      message:    document.getElementById("contactMessage").value.trim(),
    });
    showStatus("success", "✅ Message sent! I'll get back to you soon.");
    contactForm.reset();
  } catch (err) {
    console.error(err);
    showStatus("error", "❌ Failed to send. Email me at anupyadav1302@gmail.com");
  } finally {
    setLoading(false);
  }
});