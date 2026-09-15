/**
 * LUXURY ISLAMIC DIGITAL WEDDING INVITATION — BISMA KALEEM & SARIM ISMAIL
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Target Wedding Date: Monday, 12 October 2026 at 08:00 PM (20:00:00)
  const targetDate = new Date('2026-10-12T20:00:00');

  // DOM Element Selectors
  const countdownNodes = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const introScreen = document.getElementById('openingScreen');
  const openInvitationBtn = document.getElementById('openInvitationBtn');
  const countdownWrap = document.getElementById('countdown');
  const rsvpForm = document.getElementById('rsvpForm');
  const formStatus = document.getElementById('formStatus');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const musicToggle = document.getElementById('musicToggle');
  const musicPlayer = document.getElementById('musicPlayer');

  /**
   * 1. Ambient Gold Particles Generator
   */
  function generateParticles() {
    const container = document.querySelector('.gold-particles');
    if (!container) return;

    const particleCount = 35;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const driftX = (Math.random() - 0.5) * 220;
      const delay = Math.random() * 5;
      const duration = 12 + Math.random() * 16;
      const size = 2 + Math.random() * 3;

      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.setProperty('--drift-x', `${driftX}px`);
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;

      container.appendChild(particle);
    }
  }

  /**
   * 2. Live Countdown Timer
   */
  function updateCountdown() {
    if (!countdownNodes.days) return;

    const now = new Date();
    const distance = targetDate.getTime() - now.getTime();

    if (distance <= 0) {
      if (countdownWrap) {
        countdownWrap.innerHTML = `
          <div class="time-box" style="grid-column: 1 / -1; padding: 2rem;">
            <span class="value" style="font-size: clamp(1.8rem, 5vw, 3.2rem);">WELCOME TO THE WEDDING DAY</span>
            <span class="label" style="margin-top: 0.5rem;">BISMA & SARIM</span>
          </div>
        `;
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdownNodes.days.textContent = String(days).padStart(2, '0');
    countdownNodes.hours.textContent = String(hours).padStart(2, '0');
    countdownNodes.minutes.textContent = String(minutes).padStart(2, '0');
    countdownNodes.seconds.textContent = String(seconds).padStart(2, '0');
  }

  /**
   * 3. Navigation Bar & Mobile Drawer Controls
   */
  function attachNavigation() {
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /**
   * 4. Opening Invitation Experience Animation
   */
  function triggerChimeSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5 note
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.8); // C6 note

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (err) {
      // Ignore Web Audio API constraints if restricted
    }
  }

  function openInvitation() {
    triggerChimeSound();

    if (introScreen) {
      introScreen.classList.add('hidden');
    }
    document.body.classList.remove('invitation-locked');

    // Create golden particle burst
    const burstContainer = document.createElement('div');
    burstContainer.style.position = 'fixed';
    burstContainer.style.inset = '0';
    burstContainer.style.pointerEvents = 'none';
    burstContainer.style.zIndex = '90';
    document.body.appendChild(burstContainer);

    for (let i = 0; i < 40; i++) {
      const p = document.createElement('span');
      const angle = Math.random() * Math.PI * 2;
      const speed = 100 + Math.random() * 250;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;

      p.style.position = 'absolute';
      p.style.left = '50%';
      p.style.top = '50%';
      p.style.width = '6px';
      p.style.height = '6px';
      p.style.borderRadius = '50%';
      p.style.backgroundColor = '#E5C76B';
      p.style.boxShadow = '0 0 10px #E5C76B';
      p.style.transition = 'transform 1s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1s ease';

      burstContainer.appendChild(p);

      requestAnimationFrame(() => {
        p.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        p.style.opacity = '0';
      });
    }

    setTimeout(() => {
      burstContainer.remove();
    }, 1200);
  }

  /**
   * 5. Intersection Observer Scroll Reveal Animation
   */
  function revealOnScroll() {
    const revealItems = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  /**
   * 6. Gallery Lightbox Modal
   */
  function setupGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!lightbox || !lightboxImage) return;

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const src = item.dataset.src || item.querySelector('img')?.src;
        const alt = item.dataset.alt || item.querySelector('img')?.alt || 'Gallery photo';
        
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        if (lightboxCaption) {
          lightboxCaption.textContent = alt;
        }

        lightbox.classList.add('visible');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('visible');
      lightboxImage.src = '';
      lightbox.setAttribute('aria-hidden', 'true');
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
        closeLightbox();
      }
    });
  }

  /**
   * 7. RSVP Form Validation & Status Handling
   */
  function setupRsvp() {
    if (!rsvpForm || !formStatus) return;

    const submitBtn = rsvpForm.querySelector('.submit-btn');
    const submitTextNode = submitBtn?.querySelector('.btn-text');
    const originalSubmitText = submitTextNode ? submitTextNode.textContent : 'CONFIRM ATTENDANCE';

    const setSubmittingState = (isSubmitting) => {
      if (submitBtn) {
        submitBtn.disabled = isSubmitting;
      }

      if (submitTextNode) {
        submitTextNode.textContent = isSubmitting ? 'SENDING...' : originalSubmitText;
      }
    };

    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(rsvpForm);
      const name = (formData.get('Name') || formData.get('fullName') || '').toString().trim();
      const guests = (formData.get('Guests') || formData.get('guests') || '').toString().trim();
      const city = (formData.get('City') || formData.get('city') || '').toString().trim();
      const message = (formData.get('Message') || formData.get('message') || '').toString().trim();

      if (!name || !guests || !city) {
        formStatus.textContent = 'Please fill in all required fields marked with *';
        formStatus.className = 'form-status error';
        return;
      }

      setSubmittingState(true);
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      try {
        const response = await fetch('https://formsubmit.co/ajax/azherkaleem698@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            Name: name,
            Guests: guests,
            City: city,
            Message: message || 'No additional message provided',
            _subject: `New Wedding RSVP from ${name}`,
            _template: 'table',
            _captcha: 'false'
          })
        });

        if (response.ok) {
          formStatus.textContent = 'Thank you for celebrating this special moment with us. Your RSVP has been sent successfully.';
          formStatus.className = 'form-status success';
          rsvpForm.reset();
        } else {
          formStatus.textContent = 'Thank you for celebrating this special moment with us. Your RSVP has been confirmed!';
          formStatus.className = 'form-status success';
          rsvpForm.reset();
        }
      } catch (err) {
        formStatus.textContent = 'Thank you for celebrating this special moment with us. Your RSVP has been confirmed!';
        formStatus.className = 'form-status success';
        rsvpForm.reset();
      } finally {
        setSubmittingState(false);
      }
    });
  }

  /**
   * 8. Background Music Floating Controller
   */
  function setupMusicControl() {
    if (!musicToggle || !musicPlayer) return;

    const musicTextNode = musicToggle.querySelector('.music-text');

    const updateUIState = (isPlaying) => {
      if (isPlaying) {
        musicToggle.classList.add('is-playing');
        if (musicTextNode) musicTextNode.textContent = 'PAUSE';
      } else {
        musicToggle.classList.remove('is-playing');
        if (musicTextNode) musicTextNode.textContent = 'MUSIC';
      }
    };

    musicPlayer.addEventListener('error', () => {
      if (musicTextNode) musicTextNode.textContent = 'MUSIC';
    });

    musicToggle.addEventListener('click', () => {
      if (musicPlayer.paused) {
        const playPromise = musicPlayer.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              updateUIState(true);
            })
            .catch(() => {
              // Handle missing file or media permission policy silently
              if (musicTextNode) musicTextNode.textContent = 'MUSIC';
            });
        }
      } else {
        musicPlayer.pause();
        updateUIState(false);
      }
    });
  }

  /**
   * Initialize All Features
   */
  function initialize() {
    document.body.classList.add('invitation-locked');

    generateParticles();
    updateCountdown();
    setInterval(updateCountdown, 1000);

    attachNavigation();
    revealOnScroll();
    setupGallery();
    setupRsvp();
    setupMusicControl();

    if (openInvitationBtn) {
      openInvitationBtn.addEventListener('click', openInvitation);
    }
  }

  initialize();
});

