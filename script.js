'use strict';

/* ===== Theme Toggle ===== */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const savedTheme = localStorage.getItem('theme') || 'light';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ===== Mobile Nav Toggle ===== */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const icon = navToggle.querySelector('i');
  icon.className = navMenu.classList.contains('open')
    ? 'fas fa-times'
    : 'fas fa-bars';
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.querySelector('i').className = 'fas fa-bars';
  });
});

/* ===== Active nav link on scroll ===== */
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

/* ===== Scroll-triggered fade-in ===== */
const fadeElements = document.querySelectorAll('.fade-in');

function checkFadeIn() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 60;
    if (isVisible && !el.classList.contains('visible')) {
      el.classList.add('visible');
    }
  });
}

// Trigger progress bar animation when skill becomes visible
function animateProgressBars() {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const skillEl = bar.closest('.skill-item');
    if (!skillEl) return;
    const rect = skillEl.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 60;
    if (isVisible && !bar.classList.contains('animated')) {
      bar.style.width = bar.dataset.width + '%';
      bar.classList.add('animated');
    }
  });
}

function onScroll() {
  checkFadeIn();
  animateProgressBars();
}

window.addEventListener('scroll', onScroll);
window.addEventListener('load', () => {
  // Slight delay so the page paints first
  setTimeout(onScroll, 200);
});

/* ===== Navbar shadow on scroll ===== */
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.style.boxShadow = scrollY > 20
    ? '0 2px 20px rgba(0,0,0,0.08)'
    : 'none';
});

console.log('🎉 个人介绍网站已加载完成');
