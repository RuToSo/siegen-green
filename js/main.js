/* ─── Navbar scroll effect ──────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── Hamburger menu ────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ─── Scroll-triggered animations ──────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

/* ─── Counter animation ─────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

/* ─── Leaf particle generator ───────────────────────────────── */
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const leafPaths = [
    '<svg width="20" height="28" viewBox="0 0 20 28"><ellipse cx="10" cy="14" rx="9" ry="13" fill="currentColor"/></svg>',
    '<svg width="24" height="16" viewBox="0 0 24 16"><ellipse cx="12" cy="8" rx="11" ry="7" fill="currentColor"/></svg>',
    '<svg width="14" height="22" viewBox="0 0 14 22"><ellipse cx="7" cy="11" rx="6" ry="10" fill="currentColor"/></svg>',
  ];

  for (let i = 0; i < 18; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const leaf = document.createElement('div');
    leaf.innerHTML = leafPaths[i % leafPaths.length];
    leaf.style.color = `rgba(168, 224, 99, ${0.15 + Math.random() * 0.25})`;
    particle.appendChild(leaf);

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${8 + Math.random() * 14}s`;
    particle.style.animationDelay = `${Math.random() * 12}s`;

    const scale = 0.6 + Math.random() * 1.2;
    leaf.style.transform = `scale(${scale})`;

    container.appendChild(particle);
  }
}

createParticles();

/* ─── Contact form submission ───────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"] span');
    btn.textContent = 'Wird gesendet…';

    setTimeout(() => {
      contactForm.reset();
      btn.textContent = 'Nachricht senden';
      showToast();
    }, 1200);
  });
}

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ─── FAQ Accordion ─────────────────────────────────────────── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ─── Cookie Consent ────────────────────────────────────────── */
(function () {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => banner.classList.add('show'), 800);
  }
  function dismiss(value) {
    localStorage.setItem('cookieConsent', value);
    banner.classList.remove('show');
  }
  document.getElementById('cookieAccept').addEventListener('click', () => dismiss('all'));
  document.getElementById('cookieDecline').addEventListener('click', () => dismiss('necessary'));
})();

/* ─── Back to Top ───────────────────────────────────────────── */
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Active nav link on scroll ────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));
