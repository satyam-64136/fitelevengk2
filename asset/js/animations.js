/* ============================================================
   FIT ELEVEN GK2 — animations.js
   All GSAP-powered animations, scroll triggers, micro-interactions
   ============================================================ */

/* ── Wait for DOM ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Register GSAP plugins */
  gsap.registerPlugin(ScrollTrigger);

  /* ── 1. PAGE LOADER ────────────────────────────────────────── */
  const loader     = document.querySelector('.loader');
  const loaderBar  = document.querySelector('.loader-bar');
  const loaderLogo = document.querySelector('.loader-logo');

  if (loader) {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.7,
          ease: 'power3.inOut',
          onComplete: () => loader.remove()
        });
        /* Trigger hero entrance after loader exits */
        heroEntrance();
      }
    });

    tl.to(loaderBar, {
      width: '100%',
      duration: 1.6,
      ease: 'power2.inOut'
    })
    .to(loaderLogo, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.2');
  } else {
    /* No loader on inner pages — run a quick fade-in */
    gsap.from('body', { opacity: 0, duration: 0.4 });
    initAllAnimations();
  }

  /* ── 2. HERO ENTRANCE ──────────────────────────────────────── */
  function heroEntrance() {
    const hero = document.querySelector('#hero');
    if (!hero) { initAllAnimations(); return; }

    const tl = gsap.timeline({ onComplete: initAllAnimations });

    tl.from('.hero-eyebrow', {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: 'power3.out'
    })
    .from('.hero-headline .h-line', {
      yPercent: 110,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power4.out'
    }, '-=0.4')
    .from('.hero-sub', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-actions .btn', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.4')
    .from(['.hero-stats', '.hero-scroll-hint'], {
      opacity: 0,
      y: 16,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.4')
    .from('.hero-orb', {
      opacity: 0,
      scale: 0.85,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=1');
  }

  /* ── 3. ALL SCROLL ANIMATIONS ──────────────────────────────── */
  function initAllAnimations() {

    /* Generic fade-up elements */
    gsap.utils.toArray('.g-fade-up').forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        delay: el.dataset.delay ? parseFloat(el.dataset.delay) : 0
      });
    });

    /* Fade from left */
    gsap.utils.toArray('.g-fade-left').forEach(el => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: el.dataset.delay ? parseFloat(el.dataset.delay) : 0
      });
    });

    /* Fade from right */
    gsap.utils.toArray('.g-fade-right').forEach(el => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: el.dataset.delay ? parseFloat(el.dataset.delay) : 0
      });
    });

    /* Scale in */
    gsap.utils.toArray('.g-scale-in').forEach(el => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.3)',
        delay: el.dataset.delay ? parseFloat(el.dataset.delay) : 0
      });
    });

    /* ── Stagger card reveals ─────────────────────────────────── */
    gsap.utils.toArray('.stagger-group').forEach(group => {
      const cards = group.querySelectorAll(':scope > *');
      gsap.from(cards, {
        scrollTrigger: {
          trigger: group,
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 48,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      });
    });

    /* ── Section labels clip reveal ──────────────────────────── */
    gsap.utils.toArray('.section-label').forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power2.out'
      });
    });

    /* ── Section titles word split ───────────────────────────── */
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out'
      });
    });

    /* ── Parallax backgrounds ────────────────────────────────── */
    gsap.utils.toArray('.parallax-bg').forEach(el => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        yPercent: 25,
        ease: 'none'
      });
    });

    /* ── Stats counter animation ─────────────────────────────── */
    gsap.utils.toArray('.stat-num').forEach(el => {
      const finalText = el.textContent;
      const match = finalText.match(/(\d+)/);
      if (!match) return;

      const endVal = parseInt(match[1]);
      const prefix = finalText.split(match[1])[0] || '';
      const suffix = el.querySelector('sup') ? `<sup>${el.querySelector('sup').textContent}</sup>` : '';

      gsap.from({ val: 0 }, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        val: endVal,
        duration: 1.8,
        ease: 'power2.out',
        snap: { val: 1 },
        onUpdate: function () {
          el.innerHTML = prefix + Math.round(this.targets()[0].val) + (suffix || '');
        }
      });
    });

    /* ── Horizontal marquee pause on hover ───────────────────── */
    document.querySelectorAll('.ticker-track').forEach(track => {
      track.parentElement.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
      });
      track.parentElement.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
      });
    });

    /* ── Experience visual parallax ──────────────────────────── */
    const expVisual = document.querySelector('.experience-visual-inner');
    if (expVisual) {
      gsap.to(expVisual, {
        scrollTrigger: {
          trigger: '.experience-split',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        },
        yPercent: -10,
        ease: 'none'
      });
    }

    /* ── CTA title large text split ──────────────────────────── */
    const ctaTitle = document.querySelector('.cta-title');
    if (ctaTitle) {
      gsap.from(ctaTitle, {
        scrollTrigger: {
          trigger: ctaTitle,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: 'power4.out'
      });
    }

    /* ── Footer stagger ──────────────────────────────────────── */
    const footerCols = document.querySelectorAll('.footer-grid > *');
    if (footerCols.length) {
      gsap.from(footerCols, {
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 32,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out'
      });
    }

    /* ── Pillar list items ────────────────────────────────────── */
    const pillars = document.querySelectorAll('.pillar');
    if (pillars.length) {
      gsap.from(pillars, {
        scrollTrigger: {
          trigger: '.experience-pillars',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -24,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out'
      });
    }

    /* ── Page hero (inner pages) ─────────────────────────────── */
    const pageHeroTitle = document.querySelector('.page-hero .section-title');
    if (pageHeroTitle) {
      gsap.from(pageHeroTitle, {
        opacity: 0,
        y: 48,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.page-hero .section-label', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out'
      });
      gsap.from('.page-hero .section-subtitle', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.35
      });
    }

    /* ── About visual entrance ───────────────────────────────── */
    const aboutVisual = document.querySelector('.about-visual-wrap');
    if (aboutVisual) {
      gsap.from(aboutVisual, {
        scrollTrigger: {
          trigger: aboutVisual,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -60,
        duration: 1,
        ease: 'power3.out'
      });
      gsap.from('.about-float-card', {
        scrollTrigger: {
          trigger: aboutVisual,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.7,
        ease: 'back.out(1.5)',
        delay: 0.4
      });
    }

    /* ── Trainers stagger ────────────────────────────────────── */
    const trainers = document.querySelectorAll('.trainer-card');
    if (trainers.length) {
      gsap.from(trainers, {
        scrollTrigger: {
          trigger: '.trainers-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 48,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out'
      });
    }

    /* ── Contact form ────────────────────────────────────────── */
    const formWrap = document.querySelector('.contact-form-wrap');
    if (formWrap) {
      gsap.from(formWrap, {
        opacity: 0,
        x: -48,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.contact-info', {
        opacity: 0,
        x: 48,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.3
      });
    }

    /* ── Schedule table rows ─────────────────────────────────── */
    const tableRows = document.querySelectorAll('.schedule-table tr');
    if (tableRows.length) {
      gsap.from(tableRows, {
        scrollTrigger: {
          trigger: '.schedule-table',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -20,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out'
      });
    }

    /* ── Hero orb float ─────────────────────────────────────── */
    const orb = document.querySelector('.hero-orb');
    if (orb) {
      gsap.to(orb, {
        y: '-=24',
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    /* ── CTA glow pulse ─────────────────────────────────────── */
    const ctaGlow = document.querySelector('.cta-bg-glow');
    if (ctaGlow) {
      gsap.to(ctaGlow, {
        scale: 1.2,
        opacity: 0.7,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    /* Refresh ScrollTrigger after everything sets up */
    ScrollTrigger.refresh();
  }

}); /* End DOMContentLoaded */


/* ── BUTTON HOVER DEPTH (applied globally after load) ─────── */
document.addEventListener('DOMContentLoaded', () => {

  /* 3D tilt on primary buttons */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      gsap.to(btn, {
        rotationY: x * 10,
        rotationX: -y * 10,
        scale: 1.04,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 600
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });

  /* Magnetic pull on nav CTA */
  const navCta = document.querySelector('.nav-cta');
  if (navCta) {
    navCta.addEventListener('mousemove', (e) => {
      const rect = navCta.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      gsap.to(navCta, {
        x: (e.clientX - cx) * 0.25,
        y: (e.clientY - cy) * 0.25,
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    navCta.addEventListener('mouseleave', () => {
      gsap.to(navCta, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  }

  /* Card tilt effect */
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      gsap.to(card, {
        rotationY: x * 6,
        rotationX: -y * 6,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 800
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });

});
