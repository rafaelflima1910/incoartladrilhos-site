// =============================================
// INCOART — interações
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initMobileMenu();
  initCurrentYear();
  initRevealOnScroll();
});

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("active");
    hamburger.classList.toggle("active", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    hamburger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Abrir menu");
    });
  });
}

function initCurrentYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function initRevealOnScroll() {
  const blocks = document.querySelectorAll(".geo-reveal");
  if (!blocks.length) return;

  if (!("IntersectionObserver" in window)) {
    blocks.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  blocks.forEach((el) => observer.observe(el));
}
