// =============================================
// script.js - INCOART Ladrilhos
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initMobileMenu();
    initCurrentYear();
    initContactForm();
    initCelularMask();
});

// Scroll suave para links âncora
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Menu Mobile (Hamburger)
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// Ano atual no footer
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Máscara de celular (aceita apenas números + formata automaticamente)
function initCelularMask() {
    const celularInput = document.getElementById('celular');
    if (!celularInput) return;

    celularInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // remove tudo que não é número

        if (value.length > 11) value = value.slice(0, 11);

        if (value.length <= 2) {
            value = value.replace(/^(\d{0,2})/, '($1');
        } else if (value.length <= 7) {
            value = value.replace(/^(\d{2})(\d+)/, '($1) $2');
        } else {
            value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        }

        e.target.value = value;
    });
}

// Formulário de Contato (com validação básica)
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        const celular = document.getElementById('celular');
        
        if (celular) {
            const digitsOnly = celular.value.replace(/\D/g, '');
            if (digitsOnly.length !== 11) {
                e.preventDefault();
                alert('Por favor, insira um número de celular válido com 11 dígitos (DDD + número).');
                celular.focus();
            }
        }
    });
}