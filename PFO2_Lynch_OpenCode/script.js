const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const header = document.querySelector(".header");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 80) {
    header.style.background = "rgba(13, 27, 62, 0.97)";
  } else {
    header.style.background = "rgba(13, 27, 62, 0.85)";
  }
  lastScroll = currentScroll;
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

const stats = document.querySelectorAll(".stat strong");
let statsStarted = false;

function animateStats() {
  if (statsStarted) return;

  const statsSection = document.querySelector(".stats");
  const sectionPosition = statsSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight - 120;

  if (sectionPosition < screenPosition) {
    statsStarted = true;

    stats.forEach(stat => {
      const target = Number(stat.dataset.target);
      let current = 0;
      const duration = 1800;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.round(eased * target);

        stat.textContent = current.toLocaleString("es-AR");

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target.toLocaleString("es-AR");
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }
}

window.addEventListener("scroll", animateStats);

document.querySelectorAll(".faq-item button").forEach(button => {
  button.addEventListener("click", () => {
    button.parentElement.classList.toggle("active");
  });
});

const form = document.querySelector(".contact-form");

form.addEventListener("submit", event => {
  event.preventDefault();
  alert("Gracias por tu consulta. Este formulario es demostrativo.");
  form.reset();
});