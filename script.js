/* -------------------------------------------------------------------
   ANUSHA N - DEVOPS PORTFOLIO INTERACTIVE SCRIPT
   Includes: Carousel Sliders, Theme Switcher, Smooth Scroll, Form Handler
------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initNavbar();
  initCarouselSlider('skills-slider', 'skills-prev', 'skills-next', 'skills-dots');
  initCarouselSlider('projects-slider', 'projects-prev', 'projects-next', 'projects-dots');
});

/* Light / Dark Theme Switcher */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  const savedTheme = localStorage.getItem('anusha-portfolio-theme') || 'dark';

  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    if (themeIcon) themeIcon.className = 'fa-regular fa-lightbulb';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('anusha-portfolio-theme', 'light');
      } else {
        body.classList.replace('light-theme', 'dark-theme');
        if (themeIcon) themeIcon.className = 'fa-regular fa-lightbulb';
        localStorage.setItem('anusha-portfolio-theme', 'dark');
      }
    });
  }
}

/* Navbar Scroll & Mobile Menu */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      if (mobileToggle) {
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  });
}

/* Robust Carousel Slider Logic */
function initCarouselSlider(sliderId, prevBtnId, nextBtnId, dotsContainerId) {
  const sliderContainer = document.getElementById(sliderId);
  if (!sliderContainer) return;

  const track = sliderContainer.querySelector('.slider-track');
  if (!track) return;

  const cards = track.children;
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const dotsContainer = document.getElementById(dotsContainerId);

  if (!cards || !cards.length) return;

  let currentIndex = 0;

  function getCardsPerView() {
    const w = window.innerWidth;
    if (w <= 768) return 1;
    if (w <= 992) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getCardsPerView());
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxIndex();
    for (let i = 0; i <= maxIdx; i++) {
      const dot = document.createElement('div');
      dot.className = `dot-indicator ${i === currentIndex ? 'active' : ''}`;
      dot.onclick = () => updateSlide(i);
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlide(index) {
    const maxIdx = getMaxIndex();
    if (index < 0) index = maxIdx;
    if (index > maxIdx) index = 0;
    currentIndex = index;

    const firstCard = cards[0];
    const cardWidth = firstCard.offsetWidth + 20; // 20px flex gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    renderDots();
  }

  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.preventDefault();
      updateSlide(currentIndex - 1);
    };
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.preventDefault();
      updateSlide(currentIndex + 1);
    };
  }

  window.addEventListener('resize', () => {
    updateSlide(currentIndex);
  });

  renderDots();
}

/* Contact Form Feedback */
function handleFormSubmit() {
  const feedback = document.getElementById('form-feedback');
  if (feedback) {
    feedback.style.color = '#4ade80';
    feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.';
    document.getElementById('contact-form').reset();
  }
}
