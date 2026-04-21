(function CosmosEngine() {
  const canvas = document.getElementById('cosmos-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const R   = (a, b) => a + Math.random() * (b - a);
  const RI  = (a, b) => Math.floor(R(a, b));

  let W, H, stars = [], shooters = [], dust = [];
  let shootTimer = 0;

  /* Resize */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    makeStars(); makeDust();
  }

  
  const STAR_COLORS = [
    '#ffffff','#ffffff','#ffffff','#ffffff',
    '#c8dcff','#ffeebb','#ffcce8','#d4c8ff'
  ];
  function makeStars() {
    stars = [];
    const n = Math.min(Math.floor(W * H / 2600), 420);
    for (let i = 0; i < n; i++) {
      stars.push({
        x: R(0, W), y: R(0, H),
        r: R(0.2, 1.9),
        a: R(0.1, 0.92),
        phase: R(0, Math.PI * 2),
        spd: R(0.3, 1.8),
        col: STAR_COLORS[RI(0, STAR_COLORS.length)],
        cross: Math.random() < 0.035
      });
    }
  }
  function drawStars(t) {
    ctx.save();
    for (const s of stars) {
      const alpha = s.a * (0.3 + 0.7 * Math.abs(Math.sin(t * s.spd * 0.001 + s.phase)));
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = s.col;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.cross && s.r > 1.1) {
        ctx.globalAlpha = alpha * 0.45;
        ctx.strokeStyle = s.col;
        ctx.lineWidth   = 0.5;
        const a = s.r * 4.5;
        ctx.beginPath();
        ctx.moveTo(s.x - a, s.y); ctx.lineTo(s.x + a, s.y);
        ctx.moveTo(s.x, s.y - a); ctx.lineTo(s.x, s.y + a);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  
  function spawnShooter() {
    const ang   = R(-62, -18) * Math.PI / 180;
    const speed = R(8, 20);
    const type  = Math.random();
    shooters.push({
      x: R(W * 0.05, W),
      y: R(-60, H * 0.52),
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed,
      len: R(90, 260),
      width: R(0.7, 2.1),
      life: 0,
      max: RI(45, 105),
    
      kind: type < 0.45 ? 0 : type < 0.72 ? 1 : 2
    });
  }
  function drawShooters() {
    ctx.save();
    shooters = shooters.filter(s => s.life < s.max);
    for (const s of shooters) {
      s.x += s.vx; s.y += s.vy; s.life++;
      const t     = s.life / s.max;
      const alpha = t < 0.1 ? t / 0.1 : 1 - (t - 0.1) / 0.9;
      const tx    = s.x - s.vx * s.len / 7;
      const ty    = s.y - s.vy * s.len / 7;
      const g     = ctx.createLinearGradient(s.x, s.y, tx, ty);
      const heads = [[255,255,255],[100,200,255],[255,140,210]];
      const tails = [[200,220,255],[60,140,255],[200,80,160]];
      const [hr,hg,hb] = heads[s.kind];
      const [tr2,tg,tb2] = tails[s.kind];
      g.addColorStop(0,   `rgba(${hr},${hg},${hb},${alpha})`);
      g.addColorStop(0.45,`rgba(${tr2},${tg},${tb2},${alpha * 0.38})`);
      g.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tx, ty);
      ctx.strokeStyle = g; ctx.lineWidth = s.width; ctx.lineCap = 'round'; ctx.stroke();
      // head glow
      const rg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.width * 4.5);
      rg.addColorStop(0, `rgba(255,255,255,${alpha * 0.85})`);
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rg;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.width * 4.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  
  const NEBS = [
    { cx: 0.82, cy: 0.14, r: 310, rgb: [61,142,255],  a: 0.048 },
    { cx: 0.07, cy: 0.55, r: 270, rgb: [232,121,168], a: 0.038 },
    { cx: 0.5,  cy: 0.92, r: 230, rgb: [0,212,255],   a: 0.030 },
    { cx: 0.35, cy: 0.2,  r: 195, rgb: [155,111,255], a: 0.028 },
  ];
  function drawNebulas(t) {
    ctx.save();
    for (const n of NEBS) {
      const pulse = 0.72 + 0.28 * Math.sin(t * 0.00028 + n.cx * 9);
      const x = n.cx * W, y = n.cy * H, r = n.r * pulse;
      const [ri, gi, bi] = n.rgb;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0,   `rgba(${ri},${gi},${bi},${n.a})`);
      grd.addColorStop(0.55,`rgba(${ri},${gi},${bi},${n.a * 0.38})`);
      grd.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  
  const AURS = [
    { y: 0.10, amp: 50, spd: 0.00045, ph: 0.0,  a: 0.022, hue: 195 },
    { y: 0.22, amp: 38, spd: 0.00062, ph: 1.8,  a: 0.016, hue: 315 },
    { y: 0.32, amp: 28, spd: 0.00038, ph: 3.5,  a: 0.014, hue: 265 },
  ];
  function drawAuroras(t) {
    ctx.save();
    for (const a of AURS) {
      const yc  = a.y * H + a.amp * Math.sin(t * a.spd + a.ph);
      const grd = ctx.createLinearGradient(0, yc - 55, 0, yc + 55);
      grd.addColorStop(0,   'rgba(0,0,0,0)');
      grd.addColorStop(0.5, `hsla(${a.hue},75%,68%,${a.a})`);
      grd.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, yc - 55, W, 110);
    }
    ctx.restore();
  }

  
  function makeDust() {
    dust = [];
    const n = Math.floor(W / 7);
    for (let i = 0; i < n; i++) {
      dust.push({ x: R(0, W), y: R(0, H), vy: R(-.06, -.16), vx: R(-.04, .04), r: R(.2,.8), a: R(.04,.18) });
    }
  }
  function drawDust() {
    ctx.save(); ctx.fillStyle = 'rgba(180,210,255,1)';
    for (const p of dust) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -4) { p.y = H + 4; p.x = R(0, W); }
      ctx.globalAlpha = p.a;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  
  function loop(ts) {
    const t = ts || 0;
    ctx.clearRect(0, 0, W, H);
    drawNebulas(t); drawAuroras(t); drawStars(t); drawDust();
    shootTimer++;
    if (shootTimer >= RI(75, 190)) {
      spawnShooter();
      if (Math.random() < 0.22) setTimeout(spawnShooter, RI(200, 700));
      shootTimer = 0;
    }
    drawShooters();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(loop);
})();



(function Navbar() {
  const nav  = document.querySelector('nav');
  const hbg  = document.querySelector('.nav-hamburger');
  const list = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav && nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  hbg && hbg.addEventListener('click', () => {
    const open = list && list.classList.toggle('open');
    const spans = hbg.querySelectorAll('span');
    if (open) {
      spans[0].style.cssText = 'transform:translateY(6.5px) rotate(45deg)';
      spans[1].style.cssText = 'opacity:0;transform:scaleX(0)';
      spans[2].style.cssText = 'transform:translateY(-6.5px) rotate(-45deg)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });

  list && list.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      list.classList.remove('open');
      hbg && hbg.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });


  const pg = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-join-btn)').forEach(a => {
    if (a.getAttribute('href') === pg) a.classList.add('active');
  });
})();



(function ScrollReveal() {
  function init() {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (!entry.isIntersecting) return;
        const delay = +(entry.target.dataset.delay || 0) + idx * 75;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.07 });
    els.forEach(el => io.observe(el));
  }
  init();
  window.__scrollReveal = init;
})();



(function Parallax() {
  let last = 0, raf = false;
  const items = [
    { sel: '.hero-nebula',    f: 0.09 },
    { sel: '.orbit-ring-1',   f: 0.06 },
    { sel: '.orbit-ring-2',   f: 0.04 },
    { sel: '.orbit-ring-3',   f: 0.025 },
    { sel: '.moon-container', f: 0.13 },
  ];
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 0.5) {
        items.forEach(({ sel, f }) => {
          const el = document.querySelector(sel);
          if (el) el.style.transform = `translateY(${y * f}px)`;
        });
        last = y;
      }
      raf = false;
    });
  }, { passive: true });
})();



(function PlanetMouseMove() {
  const visual = document.querySelector('.hero-visual');
  const moon   = document.querySelector('.moon-container');
  if (!visual || !moon) return;

  let tx = 0, ty = 0, cx = 0, cy = 0;
  let rafId = null;

  document.addEventListener('mousemove', (e) => {
    const vr   = visual.getBoundingClientRect();
    const relX = (e.clientX - vr.left  - vr.width  / 2) / vr.width;
    const relY = (e.clientY - vr.top   - vr.height / 2) / vr.height;
    tx = relX * 18;
    ty = relY * 12;
    if (!rafId) rafId = requestAnimationFrame(smoothMove);
  });

  function smoothMove() {
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    moon.style.transform = `translate(${cx}px, ${cy}px)`;
    const orbs = document.querySelectorAll('.orbit-ring');
    orbs.forEach((o, i) => { o.style.transform = `translate(${cx * 0.3 * (i+1) * 0.4}px, ${cy * 0.3 * (i+1) * 0.4}px)`; });
    rafId = requestAnimationFrame(smoothMove);
  }

  
  document.addEventListener('touchmove', (e) => {
    const t    = e.touches[0];
    const vr   = visual.getBoundingClientRect();
    const relX = (t.clientX - vr.left  - vr.width  / 2) / vr.width;
    const relY = (t.clientY - vr.top   - vr.height / 2) / vr.height;
    tx = relX * 14; ty = relY * 9;
  }, { passive: true });
})();



(function Counters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  function run(el) {
    const target = +el.dataset.count;
    const suf    = el.dataset.suffix || '';
    const dur    = 1700;
    let   cur    = 0;
    const step   = target / (dur / 16);
    const iv     = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(iv); }
      el.textContent = Math.floor(cur) + suf;
    }, 16);
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.55 });
  els.forEach(el => io.observe(el));
})();



(function CursorGlow() {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  const dot = Object.assign(document.createElement('div'), {});
  dot.style.cssText = `
    position:fixed; width:22px; height:22px; border-radius:50%;
    pointer-events:none; z-index:9999;
    background:radial-gradient(circle, rgba(61,142,255,0.45), transparent 70%);
    mix-blend-mode:screen;
    transform:translate(-50%,-50%);
    will-change:left,top;
  `;
  document.body.appendChild(dot);
  let mx=0, my=0, cx=0, cy=0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive:true });
  (function track() {
    cx += (mx - cx) * 0.11; cy += (my - cy) * 0.11;
    dot.style.left = cx + 'px'; dot.style.top = cy + 'px';
    requestAnimationFrame(track);
  })();
  document.addEventListener('mousedown', () => dot.style.transform='translate(-50%,-50%) scale(2.2)');
  document.addEventListener('mouseup',   () => dot.style.transform='translate(-50%,-50%) scale(1)');
})();



(function Ripple() {
  const style = document.createElement('style');
  style.textContent = '@keyframes rpl{to{transform:translate(-50%,-50%) scale(38);opacity:0}}';
  document.head.appendChild(style);

  document.addEventListener('click', e => {
    const card = e.target.closest('.glass-card, .btn-primary, .explore-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    const s = document.createElement('span');
    s.style.cssText = `position:absolute;border-radius:50%;width:5px;height:5px;
      background:rgba(61,142,255,0.35);
      left:${e.clientX-r.left}px;top:${e.clientY-r.top}px;
      transform:translate(-50%,-50%) scale(0);
      animation:rpl 0.6s ease-out forwards;pointer-events:none;`;
    if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
    card.appendChild(s);
    setTimeout(() => s.remove(), 650);
  });
})();



(function SectionNav() {
  const secs = document.querySelectorAll('section[id]');
  if (!secs.length) return;
  const links = document.querySelectorAll('.nav-links a:not(.nav-join-btn)');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  secs.forEach(s => io.observe(s));
})();
