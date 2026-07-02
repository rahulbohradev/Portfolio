/* ============================================================
   RAHUL BOHRA PORTFOLIO — script.js
   ============================================================ */

'use strict';

/* ── LOADER ── */
window.addEventListener('load', () => {
  document.body.classList.add('loading');
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    initAOS();
    animateHero();
  }, 1700);
});

/* ── AOS ── */
function initAOS() {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });
}

/* ── SCROLL PROGRESS ── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}, { passive: true });

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── BACK TO TOP ── */
const btt = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  btt.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── ACTIVE NAV SCROLL SPY ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

// Smooth follower
(function follow() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(follow);
})();

// Cursor hover
document.querySelectorAll('a, button, .skill-card, .project-card, .repo-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
});

/* ── TYPED TEXT ── */
const roles = ['Frontend Developer', 'Flutter Developer', 'Web Developer', 'BSc IT Student'];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  if (!typedEl) return;
  const current = roles[roleIdx];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { isDeleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  }
  setTimeout(typeLoop, isDeleting ? 60 : 100);
}

function animateHero() {
  typeLoop();
}

/* ── PARTICLE CANVAS ── */
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r  = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Create particles
  const COUNT = Math.min(80, Math.floor(W / 20));
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  // Connect nearby
  function connect() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  }

  // Check reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animate();
  }
}

/* ── COUNTER ANIMATION ── */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(interval);
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ── GSAP SCROLL ANIMATIONS (if available) ── */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Hero name entrance
  gsap.from('.hero-name', {
    y: 60, opacity: 0, duration: 1,
    ease: 'power3.out', delay: 1.8
  });

  // Skill cards stagger on scroll
  gsap.utils.toArray('.skill-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.5,
      delay: (i % 4) * 0.07,
      ease: 'power2.out'
    });
  });
}

/* ── THEME TOGGLE ── */
const themeBtn    = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const savedTheme  = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') applyLight();

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
});

function applyLight() {
  document.body.classList.add('light');
  themeIcon.className = 'fas fa-moon';
}

/* ── CONTACT FORM ── */
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Construct mailto link as fallback
    const subject = form.subject.value || 'Portfolio Inquiry';
    const mailto = `mailto:rahul.bohra.5575381@ves.ac.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;

    // Show success
    form.style.display = 'none';
    formSuccess.style.display = 'block';
  });
}

/* ── FOOTER YEAR ── */
const fyEl = document.getElementById('footer-year');
if (fyEl) fyEl.textContent = new Date().getFullYear();

/* ── CARD TILT (subtle) ── */
document.querySelectorAll('.project-card, .achievement-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
