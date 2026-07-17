// =============================================
// INCOART — interações
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initMobileMenu();
  initCurrentYear();
  initRevealOnScroll();
  initPaletaSelecao();
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

const WHATSAPP_BASE = "https://wa.me/551239524244?text=";

function buildOrcamentoMessage(produto, cor) {
  let message = `Olá! Gostaria de solicitar orçamento de: ${produto}.`;
  if (cor) {
    message += ` Cor selecionada: ${cor}.`;
  }
  return message;
}

function initPaletaSelecao() {
  const blocks = document.querySelectorAll(".produto-catalogo-item, .produtos-ref[data-produto]");

  blocks.forEach((block) => {
    const produto =
      block.dataset.produto || block.querySelector("h2, h3")?.textContent.trim();
    const palette = block.querySelector(".paleta-cores");
    const btn = block.querySelector(".btn-orcamento");

    if (!produto || !palette || !btn) return;

    let selectedCor = "";

    const status = document.createElement("p");
    status.className = "produto-catalogo-item__cor-selecionada";
    status.hidden = true;
    status.innerHTML = 'Cor selecionada: <strong></strong>';
    btn.before(status);

    const strong = status.querySelector("strong");

    function updateSelection(item, cor) {
      palette.querySelectorAll(".paleta-cores__item").forEach((entry) => {
        entry.classList.remove("is-selected");
        entry.setAttribute("aria-pressed", "false");
      });

      item.classList.add("is-selected");
      item.setAttribute("aria-pressed", "true");
      selectedCor = cor;
      strong.textContent = cor;
      status.hidden = false;
      btn.href =
        WHATSAPP_BASE + encodeURIComponent(buildOrcamentoMessage(produto, cor));
    }

    palette.querySelectorAll(".paleta-cores__item").forEach((item) => {
      const cor = item.querySelector(".paleta-cores__nome")?.textContent.trim();
      if (!cor) return;

      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.setAttribute("aria-pressed", "false");
      item.setAttribute("aria-label", `Selecionar cor ${cor}`);

      item.addEventListener("click", () => updateSelection(item, cor));
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          updateSelection(item, cor);
        }
      });
    });

    btn.href =
      WHATSAPP_BASE + encodeURIComponent(buildOrcamentoMessage(produto, ""));
  });
}
