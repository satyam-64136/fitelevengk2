/* ============================================================
   FIT ELEVEN GK2 — animations.js  (enhanced)
   GSAP + ScrollTrigger — premium motion system
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  /* ── Shared easing tokens ────────────────────────────────── */
  const E = {
    out   : 'power3.out',
    outX  : 'expo.out',
    inOut : 'power3.inOut',
    soft  : 'power2.out',
    spring: 'elastic.out(1, 0.55)',
    back  : 'back.out(1.6)',
  };


  /* ══════════════════════════════════════════════════════════
     1. PAGE LOADER  (homepage only)
  ══════════════════════════════════════════════════════════ */
  const loader     = document.querySelector('.loader');
  const loaderBar  = document.querySelector('.loader-bar');
  const loaderLogo = document.querySelector('.loader-logo');

  if (loader) {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loader, {
          yPercent : -100,
          duration : 0.75,
          ease     : E.inOut,
          onComplete: () => loader.remove()
        });
        heroEntrance();
      }
    });

    tl.to(loaderBar,  { width: '100%', duration: 1.6, ease: 'power2.inOut' })
      .to(loaderLogo, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' }, '-=0.2');

  } else {
    /* Inner pages — wait for curtain retract (0.65s) then init */
    gsap.delayedCall(0.55, initAllAnimations);
  }


  /* ══════════════════════════════════════════════════════════
     2. HERO ENTRANCE  (homepage)
  ══════════════════════════════════════════════════════════ */
  function heroEntrance() {
    const hero = document.querySelector('#hero');
    if (!hero) { initAllAnimations(); return; }

    const tl = gsap.timeline({ onComplete: initAllAnimations });

    /* Eyebrow slides in from left with skew */
    tl.fromTo('.hero-eyebrow',
      { opacity: 0, x: -32, skewX: -5 },
      { opacity: 1, x: 0,  skewX: 0,  duration: 0.75, ease: E.out }
    )

    /* Headline lines clip-up with scale */
    .fromTo('.hero-headline .h-line',
      { yPercent: 115, opacity: 0, scale: 0.96 },
      { yPercent: 0,   opacity: 1, scale: 1,
        duration : 1.05,
        stagger  : 0.12,
        ease     : 'expo.out'
      }, '-=0.45'
    )

    /* Sub-text floats up */
    .fromTo('.hero-sub',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0,  duration: 0.7, ease: E.soft }, '-=0.55'
    )

    /* Buttons scale-in with back easing */
    .fromTo('.hero-actions .btn',
      { opacity: 0, y: 22, scale: 0.92 },
      { opacity: 1, y: 0,  scale: 1,
        stagger : 0.1,
        duration: 0.65,
        ease    : E.back
      }, '-=0.5'
    )

    /* Scroll hint + orb together */
    .fromTo(['.hero-scroll-hint', '.hero-orb'],
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1,
        stagger : 0.12,
        duration: 0.9,
        ease    : E.soft
      }, '-=0.6'
    );
  }


  /* ══════════════════════════════════════════════════════════
     3. ALL SCROLL-DRIVEN ANIMATIONS
  ══════════════════════════════════════════════════════════ */
  function initAllAnimations() {

    /* ── 3A. Generic directional reveals ───────────────────── */
    gsap.utils.toArray('.g-fade-up').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 56 },
        {
          opacity: 1, y: 0,
          duration: 0.95,
          delay   : el.dataset.delay ? parseFloat(el.dataset.delay) : 0,
          ease    : E.out,
          scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
        }
      );
    });

    gsap.utils.toArray('.g-fade-left').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -56 },
        {
          opacity: 1, x: 0,
          duration: 0.95,
          delay   : el.dataset.delay ? parseFloat(el.dataset.delay) : 0,
          ease    : E.out,
          scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
        }
      );
    });

    gsap.utils.toArray('.g-fade-right').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 56 },
        {
          opacity: 1, x: 0,
          duration: 0.95,
          delay   : el.dataset.delay ? parseFloat(el.dataset.delay) : 0,
          ease    : E.out,
          scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none none' }
        }
      );
    });

    gsap.utils.toArray('.g-scale-in').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.88 },
        {
          opacity: 1, scale: 1,
          duration: 0.85,
          delay   : el.dataset.delay ? parseFloat(el.dataset.delay) : 0,
          ease    : E.back,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      );
    });


    /* ── 3B. Section labels — clip + slide ─────────────────── */
    gsap.utils.toArray('.section-label').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -24, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)',
          duration: 0.7, ease: E.out,
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
    });


    /* ── 3C. Section titles ─────────────────────────────────── */
    gsap.utils.toArray('.section-title').forEach(title => {
      if (title.closest('#hero')) return;
      gsap.fromTo(title,
        { opacity: 0, y: 48, skewY: 1.5 },
        {
          opacity: 1, y: 0, skewY: 0,
          duration: 1, ease: E.out,
          scrollTrigger: { trigger: title, start: 'top 88%', toggleActions: 'play none none none' }
        }
      );
    });


    /* ── 3D. Stagger card groups ────────────────────────────── */
    gsap.utils.toArray('.stagger-group').forEach(group => {
      const cards = group.querySelectorAll(':scope > *');
      gsap.fromTo(cards,
        { opacity: 0, y: 52, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger : 0.12,
          duration: 0.85,
          ease    : E.out,
          scrollTrigger: { trigger: group, start: 'top 82%', toggleActions: 'play none none none' }
        }
      );
    });


    /* ── 3E. Stats — entrance + count-up ───────────────────── */
    gsap.utils.toArray('.stat-item').forEach((item, i) => {
      const numEl = item.querySelector('.stat-num');
      if (!numEl) return;

      gsap.fromTo(item,
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.75, delay: i * 0.1,
          ease: E.out,
          scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' }
        }
      );

      const match = numEl.innerText.match(/(\d+)/);
      if (!match) return;
      const endVal  = parseInt(match[1]);
      const sup     = numEl.querySelector('sup');
      const supHTML = sup ? sup.outerHTML : '';
      const obj     = { val: 0 };

      gsap.to(obj, {
        val     : endVal,
        duration: 1.8,
        ease    : 'power2.out',
        snap    : { val: 1 },
        scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' },
        onUpdate: () => { numEl.innerHTML = Math.round(obj.val) + supHTML; }
      });
    });


    /* ── 3F. Hero parallax ──────────────────────────────────── */
    initHeroParallax();


    /* ── 3G. Experience split ───────────────────────────────── */
    initExperienceSplit();


    /* ── 3H. About visual ───────────────────────────────────── */
    const aboutVisual = document.querySelector('.about-visual-wrap');
    if (aboutVisual) {
      gsap.fromTo(aboutVisual,
        { opacity: 0, x: -64, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 1.1, ease: E.out,
          scrollTrigger: { trigger: aboutVisual, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
      gsap.fromTo('.about-float-card',
        { opacity: 0, scale: 0.78, y: 24 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.8, ease: E.back, delay: 0.45,
          scrollTrigger: { trigger: aboutVisual, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }


    /* ── 3I. Value items ────────────────────────────────────── */
    const valueItems = document.querySelectorAll('.value-item');
    if (valueItems.length) {
      gsap.fromTo(valueItems,
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger : 0.1,
          duration: 0.8, ease: E.out,
          scrollTrigger: { trigger: '.about-values', start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }


    /* ── 3J. Trainer cards — alternating sides ──────────────── */
    document.querySelectorAll('.trainer-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 },
        {
          opacity: 1, x: 0, y: 0,
          duration: 0.9, delay: i * 0.14,
          ease: E.out,
          scrollTrigger: { trigger: '.trainers-grid', start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    });


    /* ── 3K. CTA section ────────────────────────────────────── */
    const ctaTitle = document.querySelector('.cta-title');
    if (ctaTitle) {
      gsap.fromTo(ctaTitle,
        { opacity: 0, y: 70, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.15, ease: 'expo.out',
          scrollTrigger: { trigger: ctaTitle, start: 'top 82%', toggleActions: 'play none none none' }
        }
      );
    }
    const ctaGlow = document.querySelector('.cta-bg-glow');
    if (ctaGlow) {
      gsap.to(ctaGlow, { scale: 1.25, opacity: 0.75, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }


    /* ── 3L. Footer stagger ─────────────────────────────────── */
    const footerCols = document.querySelectorAll('.footer-grid > *');
    if (footerCols.length) {
      gsap.fromTo(footerCols,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0,
          stagger : 0.1, duration: 0.75, ease: E.soft,
          scrollTrigger: { trigger: '.footer', start: 'top 92%', toggleActions: 'play none none none' }
        }
      );
    }


    /* ── 3M. Services page cards — alternating entry ──────────── */
    const spGrid = document.querySelector('.services-page-grid');
    if (spGrid) {
      const spCards = spGrid.querySelectorAll('.card');
      spCards.forEach((card, i) => {
        const row    = Math.floor(i / 2);
        const isLeft = i % 2 === 0;
        gsap.fromTo(card,
          { opacity: 0, x: isLeft ? -44 : 44, y: 32, scale: 0.96 },
          {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: 0.9,
            delay   : (row * 0.12) + (isLeft ? 0 : 0.06),
            ease    : E.out,
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
          }
        );
      });
    }


    /* ── 3N. Contact form ───────────────────────────────────── */
    const formWrap = document.querySelector('.contact-form-wrap');
    if (formWrap) {
      gsap.fromTo(formWrap,
        { opacity: 0, x: -52, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 0.95, ease: E.out, delay: 0.15 }
      );
      gsap.fromTo('.contact-info',
        { opacity: 0, x: 52, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 0.95, ease: E.out, delay: 0.25 }
      );
    }


    /* ── 3O. Inner page hero ────────────────────────────────── */
    if (document.querySelector('.page-hero')) {
      gsap.timeline({ delay: 0.15 })
        .fromTo('.page-hero .section-label',
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.65, ease: E.out }
        )
        .fromTo('.page-hero .section-title',
          { opacity: 0, y: 52, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1, ease: E.out }, '-=0.3'
        )
        .fromTo('.page-hero .section-subtitle',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: E.soft }, '-=0.55'
        );
    }


    /* ── 3P. Schedule table rows ────────────────────────────── */
    const tableRows = document.querySelectorAll('.schedule-table tr');
    if (tableRows.length) {
      gsap.fromTo(tableRows,
        { opacity: 0, x: -22 },
        {
          opacity: 1, x: 0,
          stagger : 0.055, duration: 0.5, ease: E.soft,
          scrollTrigger: { trigger: '.schedule-table', start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }

    /* ── 3P2. Service feature items stagger ─────────────────── */
    document.querySelectorAll('.service-page-card').forEach(card => {
      const featureItems = card.querySelectorAll('.service-feature-item');
      if (!featureItems.length) return;
      gsap.fromTo(featureItems,
        { opacity: 0, x: -16 },
        {
          opacity: 1, x: 0,
          stagger : 0.07, duration: 0.5, ease: E.soft,
          scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' }
        }
      );
    });


    /* ── 3Q. Ticker hover pause ─────────────────────────────── */
    document.querySelectorAll('.ticker-track').forEach(track => {
      const band = track.parentElement;
      band.addEventListener('mouseenter', () => (track.style.animationPlayState = 'paused'));
      band.addEventListener('mouseleave', () => (track.style.animationPlayState = 'running'));
    });


    /* ── 3R. Orb ambient float ──────────────────────────────── */
    const orb = document.querySelector('.hero-orb');
    if (orb) {
      gsap.to(orb, { y: '-=28', duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    }

    ScrollTrigger.refresh();
  }


  /* ══════════════════════════════════════════════════════════
     4. HERO PARALLAX  (scrub-based depth layers)
  ══════════════════════════════════════════════════════════ */
  function initHeroParallax() {
    const hero = document.querySelector('#hero');
    if (!hero) return;

    /* Headline — slowest (foreground feels heavy) */
    gsap.to('.hero-headline', {
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.4 },
      y: -90, ease: 'none',
    });

    /* Eyebrow + sub + actions — mid layer */
    gsap.to(['.hero-eyebrow', '.hero-sub', '.hero-actions'], {
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.1 },
      y: -52, ease: 'none',
    });

    /* Orb — fastest foreground element */
    gsap.to('.hero-orb', {
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.9 },
      y: -130, ease: 'none',
    });

    /* Grid lines — atmospheric back drift */
    gsap.to('.hero-grid-lines', {
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 2 },
      y: 60, ease: 'none',
    });

    /* Background — slow scale zoom */
    gsap.to('.hero-bg', {
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
      scale: 1.07, ease: 'none',
    });
  }


  /* ══════════════════════════════════════════════════════════
     5. EXPERIENCE SPLIT
        LEFT  — sticky logo with slow parallax drift
        RIGHT — scroll-driven accordion (down = next, up = prev)
  ══════════════════════════════════════════════════════════ */
  function initExperienceSplit() {
    const section  = document.querySelector('.experience-split');
    if (!section) return;

    const logoImg   = section.querySelector('.experience-logo-img');
    const accItems  = section.querySelectorAll('.experience-accordion-item');
    if (!accItems.length) return;

    /* ── Logo entrance + slow drift while sticky ─────────── */
    if (logoImg) {
      gsap.fromTo(logoImg,
        { opacity: 0, x: -48, scale: 0.92 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 1.1, ease: E.out,
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' }
        }
      );

      gsap.to(logoImg, {
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 1.8 },
        y: -40, ease: 'none',
      });
    }

    /* ── Scroll-driven accordion ─────────────────────────── */
    const n = accItems.length;

    /* Animate opening of one item */
    function openItem(item, direction) {
      if (item.classList.contains('open')) return;
      item.classList.add('open');
      const body = item.querySelector('.experience-accordion-body');
      if (!body) return;

      const targetH = body.scrollHeight;

      gsap.fromTo(body,
        { height: 0, opacity: 0 },
        { height: targetH, opacity: 1, duration: 0.48, ease: E.out,
          onComplete: () => { body.style.height = 'auto'; }
        }
      );

      /* Title nudge from scroll direction */
      const titleEl = item.querySelector('.experience-accordion-title');
      if (titleEl) {
        gsap.fromTo(titleEl,
          { x: direction >= 0 ? 16 : -16, opacity: 0.3 },
          { x: 0, opacity: 1, duration: 0.38, ease: E.out }
        );
      }
    }

    /* Animate closing of one item */
    function closeItem(item) {
      if (!item.classList.contains('open')) return;
      item.classList.remove('open');
      const body = item.querySelector('.experience-accordion-body');
      if (!body) return;

      const currentH = body.offsetHeight || body.scrollHeight;
      body.style.height = currentH + 'px';

      gsap.to(body, {
        height: 0, opacity: 0,
        duration: 0.38, ease: 'power2.in',
        onComplete: () => { body.style.height = '0px'; }
      });
    }

    /* Open first item immediately (no animation needed) */
    const firstItem = accItems[0];
    firstItem.classList.add('open');
    const firstBody = firstItem.querySelector('.experience-accordion-body');
    if (firstBody) { firstBody.style.height = 'auto'; firstBody.style.opacity = '1'; }

    let lastActive = 0;

    ScrollTrigger.create({
      trigger  : section,
      start    : 'top top',
      end      : 'bottom bottom',
      onUpdate : (self) => {
        /* Each item gets an equal share of the scroll progress */
        const rawIdx    = Math.floor(self.progress * n);
        const activeIdx = Math.min(rawIdx, n - 1);

        if (activeIdx === lastActive) return;

        const dir = self.direction; /* 1 = scrolling down, -1 = up */

        accItems.forEach((item, i) => {
          if (i === activeIdx) openItem(item, dir);
          else                 closeItem(item);
        });

        lastActive = activeIdx;
      }
    });
  }


  /* ══════════════════════════════════════════════════════════
     6. MICRO-INTERACTIONS  (pointer: fine only — desktop)
  ══════════════════════════════════════════════════════════ */
  if (window.matchMedia('(pointer: fine)').matches) {

    /* Button 3-D tilt */
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(btn, { rotationY: x * 9, rotationX: -y * 9, duration: 0.35, ease: E.soft, transformPerspective: 700 });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.6, ease: E.spring });
      });
    });

    /* Nav CTA magnetic pull */
    const navCta = document.querySelector('.nav-cta');
    if (navCta) {
      navCta.addEventListener('mousemove', (e) => {
        const r  = navCta.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        gsap.to(navCta, { x: (e.clientX - cx) * 0.28, y: (e.clientY - cy) * 0.28, duration: 0.38, ease: E.soft });
      });
      navCta.addEventListener('mouseleave', () => {
        gsap.to(navCta, { x: 0, y: 0, duration: 0.65, ease: E.spring });
      });
    }

    /* Card 3-D tilt */
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        gsap.to(card, { rotationY: x * 7, rotationX: -y * 7, duration: 0.45, ease: E.soft, transformPerspective: 900 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.65, ease: E.spring });
      });
    });

    /* Trainer card lift */
    document.querySelectorAll('.trainer-card').forEach(card => {
      card.addEventListener('mouseenter', () => gsap.to(card, { y: -8, scale: 1.02, duration: 0.4, ease: E.soft }));
      card.addEventListener('mouseleave', () => gsap.to(card, { y:  0, scale: 1,    duration: 0.5, ease: E.spring }));
    });

    /* Value item + icon rotation */
    document.querySelectorAll('.value-item').forEach(item => {
      const icon = item.querySelector('.value-icon svg');
      item.addEventListener('mouseenter', () => {
        gsap.to(item, { y: -5, scale: 1.015, duration: 0.35, ease: E.soft });
        if (icon) gsap.to(icon, { rotate: 8, scale: 1.15, duration: 0.35, ease: E.soft });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(item, { y: 0, scale: 1, duration: 0.5, ease: E.spring });
        if (icon) gsap.to(icon, { rotate: 0, scale: 1, duration: 0.5, ease: E.spring });
      });
    });

    /* Accordion header dot pulse */
    document.querySelectorAll('.experience-accordion-header').forEach(header => {
      const dot = header.querySelector('.acc-dot');
      if (!dot) return;
      header.addEventListener('mouseenter', () => gsap.to(dot, { scale: 1.7, duration: 0.3, ease: E.soft }));
      header.addEventListener('mouseleave', () => gsap.to(dot, { scale: 1,   duration: 0.4, ease: E.spring }));
    });

    /* Social link bounce */
    document.querySelectorAll('.social-link').forEach(link => {
      link.addEventListener('mouseenter', () => gsap.to(link, { scale: 1.15, duration: 0.3, ease: E.back }));
      link.addEventListener('mouseleave', () => gsap.to(link, { scale: 1,    duration: 0.4, ease: E.spring }));
    });

    /* Stat item hover scale */
    document.querySelectorAll('.stat-item').forEach(item => {
      item.addEventListener('mouseenter', () => gsap.to(item, { scale: 1.02, duration: 0.35, ease: E.soft }));
      item.addEventListener('mouseleave', () => gsap.to(item, { scale: 1,    duration: 0.45, ease: E.spring }));
    });

    /* Schedule table row hover highlight */
    document.querySelectorAll('.schedule-table tbody tr').forEach(row => {
      row.addEventListener('mouseenter', () => {
        gsap.to(row, { x: 6, duration: 0.28, ease: E.soft });
      });
      row.addEventListener('mouseleave', () => {
        gsap.to(row, { x: 0, duration: 0.38, ease: E.spring });
      });
    });

    /* Service page card — feature items nudge on card hover */
    document.querySelectorAll('.service-page-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const items = card.querySelectorAll('.service-feature-item');
        gsap.to(items, { x: 4, stagger: 0.04, duration: 0.3, ease: E.soft });
      });
      card.addEventListener('mouseleave', () => {
        const items = card.querySelectorAll('.service-feature-item');
        gsap.to(items, { x: 0, stagger: 0.02, duration: 0.4, ease: E.spring });
      });
    });

  } /* end pointer:fine */

}); /* End DOMContentLoaded */
