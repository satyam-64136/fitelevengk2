/* ============================================================
   FIT ELEVEN GK2 — main.js
   Core site functionality: nav, cursor, scroll, UI interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. CUSTOM CURSOR ──────────────────────────────────────── */
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursor-trail');

  if (cursor && cursorTrail && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    /* Update cursor dot position immediately */
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    /* Smooth trail with lerp */
    function animateTrail() {
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;
      cursorTrail.style.left = trailX + 'px';
      cursorTrail.style.top  = trailY + 'px';
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    /* Hover state on interactive elements */
    const interactives = document.querySelectorAll(
      'a, button, .card, .pillar, .trainer-card, .social-link, [data-hover]'
    );
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    /* Hide cursor when leaving window */
    document.addEventListener('mouseleave', () => {
      gsap.to([cursor, cursorTrail], { opacity: 0, duration: 0.3 });
    });
    document.addEventListener('mouseenter', () => {
      gsap.to([cursor, cursorTrail], { opacity: 1, duration: 0.3 });
    });
  }


  /* ── 2. SCROLL PROGRESS BAR ────────────────────────────────── */
  const progressBar = document.querySelector('.scroll-progress');

  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop   = window.scrollY;
      const docHeight   = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct   = Math.min((scrollTop / docHeight) * 100, 100);
      progressBar.style.width = scrollPct + '%';
    }, { passive: true });
  }


  /* ── 3. STICKY NAVIGATION ──────────────────────────────────── */
  const nav = document.querySelector('.nav');

  if (nav) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      /* Scrolled class for glass effect */
      nav.classList.toggle('scrolled', currentScroll > 60);

      /* Hide nav on scroll down, reveal on scroll up */
      if (currentScroll > lastScroll && currentScroll > 120) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }

      lastScroll = Math.max(currentScroll, 0);
    }, { passive: true });

    nav.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s, backdrop-filter 0.5s, border-color 0.5s';
  }


  /* ── 4. ACTIVE NAV LINK ────────────────────────────────────── */
  (function setActiveNav() {
    const path     = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (path === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();


  /* ── 5. MOBILE DRAWER ──────────────────────────────────────── */
  const burger      = document.querySelector('.nav-burger');
  const drawer      = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer a');

  if (burger && drawer) {
    let isOpen = false;

    function openDrawer() {
      isOpen = true;
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      /* Stagger-animate drawer links */
      gsap.from(drawerLinks, {
        opacity: 0,
        y: 32,
        stagger: 0.07,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.1
      });
      /* Animate burger to X */
      const spans = burger.querySelectorAll('span');
      gsap.to(spans[0], { rotation: 45, y: 6.5,  duration: 0.3 });
      gsap.to(spans[1], { opacity: 0,             duration: 0.3 });
      gsap.to(spans[2], { rotation: -45, y: -6.5, duration: 0.3 });
    }

    function closeDrawer() {
      isOpen = false;
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      const spans = burger.querySelectorAll('span');
      gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(spans[1], { opacity: 1,         duration: 0.3 });
      gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
    }

    burger.addEventListener('click', () => isOpen ? closeDrawer() : openDrawer());

    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

    /* Close on Escape */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeDrawer();
    });
  }


  /* ── 6. SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH   = nav ? nav.offsetHeight : 0;
      const offset = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });


  /* ── 7. FLOATING CTA VISIBILITY ────────────────────────────── */
  const floatCta = document.querySelector('.float-cta');

  if (floatCta) {
    window.addEventListener('scroll', () => {
      floatCta.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
  }


  /* ── 8. CONTACT FORM INTERACTION ───────────────────────────── */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn     = contactForm.querySelector('.form-submit');
      const origTxt = btn.textContent;

      /* Loading state */
      btn.textContent = 'Sending...';
      btn.disabled    = true;

      /* Simulate async (replace with real fetch/API call) */
      setTimeout(() => {
        btn.textContent = '✓ Message Sent';
        btn.style.background = '#16a34a';

        gsap.from(btn, {
          scale: 0.95,
          duration: 0.4,
          ease: 'back.out(2)'
        });

        /* Reset after 3s */
        setTimeout(() => {
          btn.textContent = origTxt;
          btn.disabled    = false;
          btn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 1200);
    });

    /* Input focus micro-interaction */
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, { scale: 1.01, duration: 0.25, ease: 'power2.out' });
      });
      input.addEventListener('blur', () => {
        gsap.to(input, { scale: 1, duration: 0.25, ease: 'power2.out' });
      });
    });
  }


  /* ── 9. TESTIMONIAL SLIDER ─────────────────────────────────── */
  const sliderTrack = document.getElementById('slider-track');
  const prevBtn     = document.getElementById('slider-prev');
  const nextBtn     = document.getElementById('slider-next');
  const dots        = document.querySelectorAll('.slider-dot');

  if (sliderTrack && prevBtn && nextBtn) {
    let current   = 0;
    const slides  = sliderTrack.querySelectorAll('.testimonial-slide');
    const total   = slides.length;

    function goTo(idx) {
      const outgoing = slides[current];
      current = (idx + total) % total;
      const incoming = slides[current];

      /* GSAP crossfade transition */
      gsap.to(outgoing, {
        opacity: 0,
        x: -40,
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => {
          outgoing.style.display = 'none';
          incoming.style.display = 'block';
          gsap.fromTo(incoming,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.55, ease: 'power3.out' }
          );
        }
      });

      /* Update dots */
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    /* Hide all but first */
    slides.forEach((s, i) => { if (i > 0) s.style.display = 'none'; });

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    /* Auto-advance every 5s */
    let autoplay = setInterval(() => goTo(current + 1), 5000);

    sliderTrack.addEventListener('mouseenter', () => clearInterval(autoplay));
    sliderTrack.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(current + 1), 5000);
    });
  }


  /* ── 10. PAGE TRANSITION ───────────────────────────────────── */
  const transitionEl = document.querySelector('.page-transition');

  if (transitionEl) {
    /* Reveal transition on page load */
    gsap.from(transitionEl, {
      scaleX: 1,
      duration: 0.6,
      ease: 'power3.inOut',
      transformOrigin: 'right',
      clearProps: 'all'
    });

    /* Animate out on internal link clicks */
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      /* Only intercept same-origin, non-hash, non-external links */
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('tel') || href.startsWith('mailto')) return;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to(transitionEl, {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => { window.location.href = href; }
        });
      });
    });
  }


  /* ── 11. HERO STATS COUNT-UP (fallback if no GSAP ScrollTrigger) ── */
  /* Handled in animations.js — this is the fallback for when the
     stat is already in view on load */


  /* ── 12. ACCORDION (Services page) ────────────────────────── */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const header  = item.querySelector('.accordion-header');
    const body    = item.querySelector('.accordion-body');
    const icon    = item.querySelector('.accordion-icon');
    if (!header || !body) return;

    gsap.set(body, { height: 0, overflow: 'hidden' });

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      /* Close all */
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        gsap.to(openItem.querySelector('.accordion-body'), {
          height: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        });
        if (openItem.querySelector('.accordion-icon')) {
          gsap.to(openItem.querySelector('.accordion-icon'), { rotation: 0, duration: 0.3 });
        }
      });

      /* Open clicked if it was closed */
      if (!isOpen) {
        item.classList.add('open');
        gsap.to(body, {
          height: 'auto',
          duration: 0.5,
          ease: 'power2.out'
        });
        if (icon) gsap.to(icon, { rotation: 45, duration: 0.3 });
      }
    });
  });

  /* ── 13. EXPERIENCE ACCORDION ──────────────────────────────── */
  const expAccordionItems = document.querySelectorAll('.experience-accordion-item');

  if (expAccordionItems.length) {
    expAccordionItems.forEach(item => {
      const header = item.querySelector('.experience-accordion-header');
      const body   = item.querySelector('.experience-accordion-body');
      if (!header || !body) return;

      /* Set initial heights */
      if (!item.classList.contains('open')) {
        body.style.height = '0px';
        body.style.overflow = 'hidden';
      } else {
        body.style.height = 'auto';
        body.style.overflow = 'hidden';
      }

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        /* Close all */
        expAccordionItems.forEach(i => {
          i.classList.remove('open');
          const b = i.querySelector('.experience-accordion-body');
          if (b) {
            b.style.height = b.scrollHeight + 'px';
            requestAnimationFrame(() => {
              b.style.transition = 'height 0.38s cubic-bezier(0.16,1,0.3,1)';
              b.style.height = '0px';
            });
          }
        });

        /* Open clicked if was closed */
        if (!isOpen) {
          item.classList.add('open');
          body.style.height = '0px';
          body.style.transition = 'height 0.42s cubic-bezier(0.16,1,0.3,1)';
          requestAnimationFrame(() => {
            body.style.height = body.scrollHeight + 'px';
          });
          /* After transition, set auto so content can resize */
          body.addEventListener('transitionend', () => {
            if (item.classList.contains('open')) body.style.height = 'auto';
          }, { once: true });
        }
      });
    });
  }

}); /* End DOMContentLoaded */
