/* Nutzer, die weniger Bewegung wünschen (Systemeinstellung) */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Navbar scroll effect ──────────────────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── Hamburger menu ────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.setAttribute('aria-expanded', 'false');
hamburger.setAttribute('aria-controls', 'navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
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
  if (reduceMotion) { el.textContent = target + suffix; return; }
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
  if (!container || reduceMotion) return;

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

/* ─── Contact form: fertige E-Mail im Mailprogramm ──────────── */
/* Die Seite liegt auf GitHub Pages und hat keinen Server – die Anfrage
   geht deshalb direkt aus dem Mailprogramm des Besuchers raus. */
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const MAIL = 'siegen-green@rutoso.de';

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(contactForm);
    const typ = contactForm.querySelector('#type');
    const typText = typ && typ.value ? typ.options[typ.selectedIndex].text : '';
    const body = [
      f.get('message') || '',
      '',
      '—',
      'Name / Unternehmen: ' + f.get('name'),
      'E-Mail: ' + f.get('email'),
      typText ? 'Ich bin: ' + typText : null,
    ].filter(z => z !== null).join('\n');
    window.location.href = 'mailto:' + MAIL +
      '?subject=' + encodeURIComponent('Anfrage über die Webseite – ' + f.get('name')) +
      '&body=' + encodeURIComponent(body);
    showToast();
  });
}

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 6000);
}

/* „Anfragen“ an einer Produktkarte: Nachricht vorausfüllen */
document.querySelectorAll('[data-produkt]').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = document.getElementById('message');
    if (!msg) return;
    const satz = 'Ich interessiere mich für: ' + btn.dataset.produkt + '.';
    if (!msg.value.includes(satz)) msg.value = (satz + '\n' + msg.value).trim() + '\n';
    setTimeout(() => msg.focus({ preventScroll: true }), 600);
  });
});

/* Karte erst nach Klick laden (keine Verbindung zu OpenStreetMap vorher) */
const mapBtn = document.getElementById('mapLoad');
if (mapBtn) {
  mapBtn.addEventListener('click', () => {
    const wrap = document.getElementById('mapWrap');
    const frame = document.createElement('iframe');
    frame.title = 'Liefergebiet SiegenGreen – Siegen-Wittgenstein & Kreis Olpe';
    frame.src = wrap.dataset.src;
    frame.loading = 'lazy';
    frame.referrerPolicy = 'no-referrer';
    wrap.replaceChildren(frame);
    wrap.classList.remove('map-consent');
  });
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

/* ─── Back to Top ───────────────────────────────────────────── */
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
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
