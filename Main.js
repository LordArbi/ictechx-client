// =============================================
//  ICTECHX — main.js
// =============================================

// ---------- NAVBAR SCROLL EFFECT ----------
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 10 ? '#222' : '#111';
});

// ---------- BURGER MENU (MOBILE) ----------
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---------- ACTIVE NAV LINK ON SCROLL ----------
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));

// ---------- CONTACT FORM ----------
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-submit');
  btn.textContent = 'SENT ✓';
  btn.style.background = '#2ec45a';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'SUBMIT';
    btn.style.background = '#3ddc6a';
    btn.disabled = false;
    contactForm.reset();
  }, 3000);
});

// ---------- SCROLL REVEAL ----------
const revealEls = document.querySelectorAll(
  '.service-card, .work-card, .team-card, .about-text, .contact-form-box, .contact-info-box'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(el);
});

// =============================================
//  TEAM MODALS
// =============================================

const previewOverlay = document.getElementById('preview-overlay');
const bookOverlay    = document.getElementById('book-overlay');

function getMemberData(btn) {
  const card = btn.closest('.team-card');
  return {
    name: card.dataset.name,
    role: card.dataset.role,
    spec: card.dataset.spec,
    exp:  card.dataset.exp,
    bio:  card.dataset.bio,
    img:  card.dataset.img,
  };
}

function openPreview(data) {
  document.getElementById('preview-img').src              = data.img;
  document.getElementById('preview-img').alt              = data.name;
  document.getElementById('preview-name').textContent     = data.name;
  document.getElementById('preview-role').textContent     = data.role;
  document.getElementById('preview-spec').textContent     = data.spec;
  document.getElementById('preview-exp').textContent      = data.exp;
  document.getElementById('preview-bio').textContent      = data.bio;
  previewOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  previewOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function openBook(data) {
  document.getElementById('book-img').src              = data.img;
  document.getElementById('book-img').alt              = data.name;
  document.getElementById('book-name').textContent     = data.name;
  document.getElementById('book-role').textContent     = data.role;
  document.getElementById('book-spec').textContent     = data.spec;
  document.getElementById('book-exp').textContent      = data.exp;
  document.getElementById('book-form').reset();
  bookOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBook() {
  bookOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.btn-preview').forEach(btn => {
  btn.addEventListener('click', () => openPreview(getMemberData(btn)));
});

document.querySelectorAll('.btn-book').forEach(btn => {
  btn.addEventListener('click', () => openBook(getMemberData(btn)));
});

// "Book Now" inside preview modal switches to book modal
document.getElementById('preview-book-btn').addEventListener('click', () => {
  const data = {
    name: document.getElementById('preview-name').textContent,
    role: document.getElementById('preview-role').textContent,
    spec: document.getElementById('preview-spec').textContent,
    exp:  document.getElementById('preview-exp').textContent,
    bio:  document.getElementById('preview-bio').textContent,
    img:  document.getElementById('preview-img').src,
  };
  closePreview();
  openBook(data);
});

document.getElementById('preview-close').addEventListener('click', closePreview);
document.getElementById('book-close').addEventListener('click', closeBook);

previewOverlay.addEventListener('click', e => { if (e.target === previewOverlay) closePreview(); });
bookOverlay.addEventListener('click',    e => { if (e.target === bookOverlay)    closeBook(); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closePreview(); closeBook(); }
});

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = 'BOOKED ✓';
  btn.style.background = '#2ec45a';
  btn.disabled = true;
  setTimeout(() => {
    closeBook();
    btn.textContent = 'SUBMIT BOOKING';
    btn.style.background = '#3ddc6a';
    btn.disabled = false;
  }, 2000);
});