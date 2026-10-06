const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const modal = document.getElementById('contact-modal');
const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
const contactTriggers = document.querySelectorAll('a[href="#contact"], [data-open-contact]');
let modalOpener = null;

function openContactModal() {
  modalOpener = document.activeElement;
  modal?.classList.add('is-open');
  modal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal?.querySelector('.modal-close')?.focus();
}

function closeContactModal() {
  if (!modal?.classList.contains('is-open')) return;
  modalOpener?.focus();
  modal?.classList.remove('is-open');
  modal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  modalOpener = null;
}

contactTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openContactModal();
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener('click', closeContactModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeContactModal();
  }
});

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');
    faqItems.forEach((faq) => {
      faq.classList.remove('active');
    });
    if (!isOpen) item.classList.add('active');
  });
});

const rentInput = document.getElementById('rent');
const feeInput = document.getElementById('fee');
const managementCost = document.getElementById('managementCost');
const ownerIncome = document.getElementById('ownerIncome');

function updateCalculator() {
  const rent = Number(rentInput?.value || 750);
  const fee = Number(feeInput?.value || 10);
  const management = rent * (fee / 100);
  const income = rent - management;

  if (managementCost) managementCost.textContent = `€${Math.round(management)}`;
  if (ownerIncome) ownerIncome.textContent = `€${Math.round(income)}`;
}

rentInput?.addEventListener('input', updateCalculator);
feeInput?.addEventListener('input', updateCalculator);
updateCalculator();

const form = document.querySelector('.contact-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  if (button) {
    const originalText = button.textContent;
    button.textContent = 'REQUEST SENT';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      form.reset();
    }, 1800);
  }
});
