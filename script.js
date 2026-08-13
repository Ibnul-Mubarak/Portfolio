// ═══════════════════════════════════════════════════════════════
// Ibnul Mubarak — Portfolio · Interactions
// ═══════════════════════════════════════════════════════════════

// ═══ 🔗 LIENS DES PROJETS ═══
// Quand chaque site sera en ligne sur Cloudflare, remplace le lien
// relatif par son URL de production (ex: https://mon-resto.pages.dev).
// Le lien local (../...) reste valide pour tester sur ton ordinateur.
const PROJECT_URLS = {
  be: '../Resto_Projrct/index.html',
  ts: '../Resto_Project%202/index.html',
  st: '../Sahel_travel%20Project/index.html',
  bs: '../Coiffure%20Project/index.html',
  ah: '../Alh_husseini%20Project/index.html',
  ms: '../Landing_monter%20Project/index.html',
  ai: '../Goni_Albani%20Project/index.html',
  lc: '../Learn%20to%20Code/index.html',
  pf: '#accueil'
};

document.querySelectorAll('[data-project]').forEach((link) => {
  const key = link.dataset.project;
  if (PROJECT_URLS[key]) link.href = PROJECT_URLS[key];
});

// ═══ Langue FR / EN ═══
const typewriterPhrases = {
  fr: ['des sites vitrines professionnels.', 'des boutiques en ligne qui vendent.', 'des landing pages qui convertissent.', 'des identités visuelles marquantes.'],
  en: ['professional showcase websites.', 'online stores that sell.', 'landing pages that convert.', 'memorable brand identities.']
};

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

let currentLang = localStorage.getItem('im-lang') || 'fr';
const langSpans = document.querySelectorAll('.lang-toggle [data-lang]');
const metaDesc = document.querySelector('meta[name="description"]');
const typeEl = document.getElementById('typewriter');

function applyLanguage(lang) {
  const dict = I18N[lang];
  document.documentElement.lang = lang;
  currentLang = lang;
  localStorage.setItem('im-lang', lang);

  document.title = dict['meta.title'];
  if (metaDesc) metaDesc.setAttribute('content', dict['meta.desc']);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });
  document.querySelectorAll('[data-i18n-ar]').forEach((el) => {
    const key = el.getAttribute('data-i18n-ar');
    if (dict[key]) el.setAttribute('aria-label', dict[key]);
  });

  langSpans.forEach((s) => s.classList.toggle('active', s.dataset.lang === lang));
  restartTypewriter();
}

function restartTypewriter() {
  charIndex = 0;
  deleting = false;
  phraseIndex = 0;
  if (typeEl) typeEl.textContent = '';
  typeLoop();
}

langSpans.forEach((span) =>
  span.addEventListener('click', () => applyLanguage(span.dataset.lang))
);

applyLanguage(currentLang);

// ═══ Preloader ═══
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 500);
});

// ═══ Navbar ═══
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('toTop').classList.toggle('show', window.scrollY > 600);
});

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach((link) =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

document.getElementById('toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ═══ Typewriter ═══
function typeLoop() {
  const phrases = typewriterPhrases[currentLang];
  const current = phrases[phraseIndex];
  typeEl.textContent = current.slice(0, charIndex);
  if (!deleting) {
    charIndex++;
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 70);
  } else {
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 35);
  }
}

// ═══ Reveal au scroll ═══
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ═══ Compteurs ═══
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          countObserver.unobserve(el);
        } else {
          el.textContent = current;
          requestAnimationFrame(tick);
        }
      };
      tick();
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

// ═══ Barres de compétences ═══
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const fill = e.target;
      fill.style.width = fill.dataset.width;
      skillObserver.unobserve(fill);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.skill-fill').forEach((el) => skillObserver.observe(el));

// ═══ Filtres réalisations ═══
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hide', !show);
    });
  });
});

// ═══ Formulaire de devis → WhatsApp ═══
const devisForm = document.getElementById('devisForm');
devisForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  const service = document.getElementById('fService').value;
  const budget = document.getElementById('fBudget').value;
  const message = document.getElementById('fMessage').value.trim();

  if (!name || !phone || !service || !budget || !message) return;

  const isFr = currentLang === 'fr';
  const subject = isFr
    ? 'Bonjour Ibnul Mubarak 👋%0A%0AJe veux demander un devis :%0A'
    : 'Hello Ibnul Mubarak 👋%0A%0AI would like to request a quote:%0A';
  const labels = isFr
    ? { name: 'Nom', phone: 'WhatsApp', service: 'Service', budget: 'Budget', project: 'Projet' }
    : { name: 'Name', phone: 'WhatsApp', service: 'Service', budget: 'Budget', project: 'Project' };

  const text =
    `${subject}` +
    `- ${labels.name} : ${encodeURIComponent(name)}%0A` +
    `- ${labels.phone} : ${encodeURIComponent(phone)}%0A` +
    `- ${labels.service} : ${encodeURIComponent(service)}%0A` +
    `- ${labels.budget} : ${encodeURIComponent(budget)}%0A` +
    `- ${labels.project} : ${encodeURIComponent(message)}`;

  window.open(`https://wa.me/237691996899?text=${text}`, '_blank');

  const btn = devisForm.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = isFr
    ? '<i class="fas fa-check"></i> Demande prête !'
    : '<i class="fas fa-check"></i> Request ready!';
  setTimeout(() => {
    btn.innerHTML = original;
    devisForm.reset();
  }, 3000);
});
