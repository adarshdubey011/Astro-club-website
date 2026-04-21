(function GravityEasterEgg() {
  'use strict';

  
  const GRAVITY      = 0.55;   
  const BOUNCE       = 0.38;   
  const FRICTION     = 0.985;  
  const FLOOR_Y      = window.innerHeight + 120; 
  const PARTICLE_COUNT = 90;   
  const LETTER_DELAY   = 28;   

  
  let isOn       = false;
  let rafId      = null;
  let bodies     = [];         
  let domClones  = [];         
  let titleShown = false;

  /* ── BUILD UI ── */
  function buildButton() {
    const btn = document.createElement('div');
    btn.id        = 'gravity-btn';
    btn.className = 'gravity-btn';
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-label', 'Toggle gravity');
    btn.setAttribute('title', 'Toggle Gravity — Easter Egg 🪐');
    btn.innerHTML = `
      <div class="gravity-btn-icon">🪐</div>
      <span class="gravity-btn-label">Gravity</span>
      <div class="gravity-slider-track">
        <div class="gravity-slider-thumb"></div>
      </div>`;

    
    const nav = document.querySelector('nav');
    if (!nav) return;
    nav.insertBefore(btn, nav.lastElementChild);

    btn.addEventListener('click', toggle);
  }

  function buildOverlay() {
    if (document.getElementById('gravity-overlay')) return;
    const ov = document.createElement('div');
    ov.id = 'gravity-overlay';
    ov.innerHTML = `
      <div id="gravity-bg"></div>

      <!-- Nebula clouds -->
      <div class="grav-nebula" style="
        width:500px;height:500px;left:5%;top:10%;
        background:radial-gradient(circle,rgba(155,111,255,0.07),transparent 65%);
        animation-duration:9s;"></div>
      <div class="grav-nebula" style="
        width:380px;height:380px;right:8%;top:30%;
        background:radial-gradient(circle,rgba(232,121,168,0.06),transparent 65%);
        animation-duration:11s;animation-delay:2s;"></div>
      <div class="grav-nebula" style="
        width:300px;height:300px;left:40%;bottom:15%;
        background:radial-gradient(circle,rgba(61,142,255,0.05),transparent 65%);
        animation-duration:7s;animation-delay:4s;"></div>

      <!-- Rings behind title -->
      <div class="gravity-title-ring"></div>
      <div class="gravity-title-ring"></div>
      <div class="gravity-title-ring"></div>

      <!-- Central title -->
      <div id="gravity-title">
        <div class="gravity-title-main">The Astro Club</div>
        <span class="gravity-title-sub"><H>THE ASTRO CLUB </H></span>
      </div>

      <!-- Hint to dismiss -->
      <div id="gravity-hint">click ESC</div>`;

    document.body.appendChild(ov);

  
    ov.addEventListener('click', () => { if (isOn) toggle(); });
  }

  
  function toggle() {
    const btn = document.getElementById('gravity-btn');
    isOn = !isOn;
    btn && btn.classList.toggle('gravity-active', isOn);

  
    if (btn) {
      if (isOn) btn.classList.add('gravity-on');
      else      btn.classList.remove('gravity-on');
    }

    if (isOn) activateGravity();
    else      deactivateGravity();
  }

  
  function activateGravity() {
    document.body.classList.add('gravity-active');
    buildOverlay();

    const ov = document.getElementById('gravity-overlay');
    const bg = document.getElementById('gravity-bg');
    ov.classList.add('active');
    bodies     = [];
    domClones  = [];
    titleShown = false;

    
    spawnParticles(ov);

  
    const targets = collectFallTargets();
    spawnDOMBodies(targets, ov);

    
    let startTime = null;
    function physicsLoop(ts) {
      if (!isOn) return;
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      updateBodies();

      
      if (elapsed > 1400 && !titleShown) {
        showTitle();
        titleShown = true;
      }

      rafId = requestAnimationFrame(physicsLoop);
    }
    rafId = requestAnimationFrame(physicsLoop);
  }

  
  function deactivateGravity() {
    cancelAnimationFrame(rafId);
    rafId = null;
    isOn  = false;

    const ov = document.getElementById('gravity-overlay');
    const gt = document.getElementById('gravity-title');
    const gh = document.getElementById('gravity-hint');
    const bg = document.getElementById('gravity-bg');

    // Fade everything out
    if (ov)  { ov.style.transition = 'opacity 0.7s ease'; ov.style.opacity = '0'; }
    if (gt)  { gt.style.opacity = '0'; }
    if (gh)  { gh.style.opacity = '0'; }

    // Clean up clones
    domClones.forEach(c => c.el && c.el.remove());
    domClones = [];
    bodies    = [];

    setTimeout(() => {
      if (ov)  { ov.classList.remove('active'); ov.style.opacity = ''; ov.style.transition = ''; }
      if (bg)  { /* bg handled by class removal */ }
      // Clear particles
      ov && ov.querySelectorAll('.grav-particle').forEach(p => p.remove());
      document.body.classList.remove('gravity-active');
    }, 750);
  }

  
  function collectFallTargets() {
    // Grab visible text/card elements to clone and throw
    const selectors = [
      'nav .nav-logo',
      '.hero-badge', '.hero-title', '.hero-sub', '.hero-desc',
      '.hero-actions .btn-primary', '.hero-actions .btn-ghost',
      '.stat-item',
      '.section-label', '.section-title', '.section-desc',
      '.activity-card', '.event-mini', '.chip',
      '.aayam-title', '.aayam-desc',
      '.explore-card',
      '.tl-item',
      '.quote-text', '.quote-author',
      '.footer-bottom p',
    ];

    const collected = [];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 &&
            rect.top < window.innerHeight && rect.bottom > 0) {
          collected.push({ el, rect });
        }
      });
    });
    return collected;
  }

  
  function spawnDOMBodies(targets, container) {
    targets.forEach(({ el, rect }, i) => {
      setTimeout(() => {
        if (!isOn) return;

        const clone = el.cloneNode(true);
        clone.className = clone.className + ' grav-particle';
        clone.style.cssText = `
          position: fixed;
          left: ${rect.left}px;
          top: ${rect.top}px;
          width: ${rect.width}px;
          margin: 0; padding: ${getComputedStyle(el).padding};
          z-index: 9001;
          pointer-events: none;
          box-sizing: border-box;
          font-size: ${getComputedStyle(el).fontSize};
          opacity: 1;
        `;

        container.appendChild(clone);

        
        const body = {
          el:    clone,
          x:     rect.left,
          y:     rect.top,
          w:     rect.width,
          h:     rect.height,
          vx:    (Math.random() - 0.5) * 3.5,
          vy:    Math.random() * -2,       
          rot:   0,
          vrot:  (Math.random() - 0.5) * 4,
          mass:  0.8 + Math.random() * 0.6,
          bounced: 0,
          alive: true,
          type: 'dom'
        };

        bodies.push(body);
        domClones.push({ el: clone });

      }, i * 45 + Math.random() * 120);
    });
  }

  
  function spawnParticles(container) {
    const W = window.innerWidth, H = window.innerHeight;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      setTimeout(() => {
        if (!isOn) return;

        const types = ['star', 'star', 'star', 'dot', 'glyph'];
        const type  = types[Math.floor(Math.random() * types.length)];
        const el    = document.createElement('div');
        el.className = 'grav-particle';

        const x = Math.random() * W;
        const y = Math.random() * H * 0.6;  

        const glyphs  = ['✦','★','⋆','·','✧','◆','♦','⬟','✺','⊹'];
        const colors  = ['#ffffff','#c8dcff','#9b6fff','#e879a8','#00d4ff','#ffd97d'];
        const col     = colors[Math.floor(Math.random() * colors.length)];
        const size    = type === 'glyph' ? 10 + Math.random() * 16 :
                        type === 'dot'   ? 2  + Math.random() * 4  :
                                           1  + Math.random() * 3;

        if (type === 'glyph') {
          el.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
          el.style.cssText = `
            position:fixed;font-size:${size}px;color:${col};
            left:${x}px;top:${y}px;z-index:9002;
            text-shadow:0 0 8px ${col};
          `;
        } else {
          el.style.cssText = `
            position:fixed;width:${size}px;height:${size}px;
            border-radius:50%;background:${col};
            left:${x}px;top:${y}px;z-index:9002;
            box-shadow:0 0 ${size*2}px ${col};
          `;
        }

        container.appendChild(el);

        bodies.push({
          el,
          x, y,
          w: size, h: size,
          vx: (Math.random() - 0.5) * 2,
          vy: -1 + Math.random() * 2,
          rot: 0,
          vrot: (Math.random() - 0.5) * 8,
          mass: 0.3 + Math.random() * 0.5,
          bounced: 0,
          alive: true,
          type: 'particle'
        });

      }, Math.random() * 800);
    }
  }

  
  function updateBodies() {
    bodies.forEach(b => {
      if (!b.alive || !b.el) return;

      
      b.vy += GRAVITY * b.mass;
      b.vx *= FRICTION;
      b.vrot *= 0.99;

      b.x += b.vx;
      b.y += b.vy;
      b.rot += b.vrot;

      
      if (b.y + b.h >= FLOOR_Y) {
        b.y = FLOOR_Y - b.h;
        b.vy = -Math.abs(b.vy) * BOUNCE;
        b.vx *= 0.75;
        b.vrot *= 0.5;
        b.bounced++;

        
        if (b.bounced >= 2 || Math.abs(b.vy) < 1) {
          b.vy = 0; b.vx *= 0.3;
          b.alive = (b.bounced < 3);
        }
      }

      
      if (b.x < -200 || b.x > window.innerWidth + 200) {
        b.vx *= -0.3;
        b.x = b.x < 0 ? -199 : window.innerWidth + 199;
      }

      
      b.el.style.left      = b.x + 'px';
      b.el.style.top       = b.y + 'px';
      b.el.style.transform = `rotate(${b.rot}deg)`;

      
      if (b.y > FLOOR_Y + 50) {
        b.el.style.opacity = '0';
        b.el.style.transition = 'opacity 0.4s ease';
      }
    });

    
    bodies = bodies.filter(b => {
      if (!b.alive) {
        
        if (b.el) {
          b.el.style.transform = `rotate(${b.rot}deg)`;
        }
        return false;
      }
      return true;
    });
  }

  
  function showTitle() {
    const titleEl = document.getElementById('gravity-title');
    const hintEl  = document.getElementById('gravity-hint');
    if (!titleEl) return;

    
    const mainEl = titleEl.querySelector('.gravity-title-main');
    if (mainEl) {
      const text   = mainEl.textContent;
      mainEl.innerHTML = text.split('').map((ch, i) =>
        ch === ' '
          ? `<span style="display:inline-block;width:0.3em;">&nbsp;</span>`
          : `<span class="gtl" style="
               display:inline-block;
               opacity:0;
               transform:translateY(-60px) rotate(${(Math.random()-0.5)*25}deg);
               transition: opacity 0.5s ease ${i*LETTER_DELAY}ms,
                           transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i*LETTER_DELAY}ms;
             ">${ch}</span>`
      ).join('');
    }

    
    titleEl.style.animation = 'none';
    titleEl.style.opacity   = '1';
    titleEl.style.transform = 'translate(-50%, -50%)';
    titleEl.style.transition = 'opacity 0.5s ease';

  
    setTimeout(() => {
      titleEl.querySelectorAll('.gtl').forEach(span => {
        span.style.opacity   = '1';
        span.style.transform = 'translateY(0) rotate(0deg)';
      });

      
      const sub = titleEl.querySelector('.gravity-title-sub');
      if (sub) {
        sub.style.transition = 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s';
        sub.style.opacity    = '0';
        sub.style.transform  = 'translateY(10px)';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          sub.style.opacity   = '1';
          sub.style.transform = 'translateY(0)';
        }));
      }
    }, 80);

    
    if (hintEl) {
      setTimeout(() => {
        hintEl.style.animation = 'gravHintReveal 0.6s ease forwards';
        hintEl.style.opacity   = '1';
      }, 2500);
    }

  
    const rings = document.querySelectorAll('.gravity-title-ring');
    rings.forEach((r, i) => {
      r.style.opacity    = '0';
      r.style.transition = `opacity 0.8s ease ${i * 200}ms`;
      setTimeout(() => r.style.opacity = '1', 100);
    });
  }

  
  document.addEventListener('keydown', e => {
    if (e.key === 'g' || e.key === 'G') {
      
      if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
      toggle();
    }
    
    if (e.key === 'Escape' && isOn) toggle();
  });


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildButton);
  } else {
    buildButton();
  }

})();
