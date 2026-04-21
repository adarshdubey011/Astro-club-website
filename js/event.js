const params  = new URLSearchParams(window.location.search);
const eventId = params.get('id');

const titleEl    = document.getElementById('event-title');
const descEl     = document.getElementById('event-desc');
const metaEl     = document.getElementById('event-meta');
const tagEl      = document.getElementById('event-tag');
const grid       = document.getElementById('event-image-grid');
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lightbox-img');
const lbCaption  = document.getElementById('lightbox-caption');
const lbCounter  = document.getElementById('lightbox-counter');

let images = [];
let currentIdx = 0;


const DEMO_EVENTS = {
  '1': {
    title: 'Aayam 2024',
    category: 'Annual Fest',
    date: 'November 2024',
    description: 'Our flagship annual astronomy festival featuring competitions, telescope marathons, astrophotography contests, and guest lectures from across Chhattisgarh.',
    images: [
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
      'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80',
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80',
      'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=800&q=80',
      'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&q=80',
      'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=800&q=80',
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80',
    ]
  },
  '2': {
    title: 'Stargazing Night',
    category: 'Observation',
    date: 'October 2024',
    description: 'Members gathered under clear skies to observe Saturn\'s rings, Jupiter\'s moons, and the Andromeda Galaxy through our Dobsonian telescope.',
    images: [
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80',
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
      'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80',
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
      'https://images.unsplash.com/photo-1445905595283-21f8ae8a33d2?w=800&q=80',
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80',
    ]
  },
  '3': {
    title: 'Telescope Workshop',
    category: 'Workshop',
    date: 'September 2024',
    description: 'Hands-on training session covering telescope assembly, polar alignment, and eyepiece selection for beginner and intermediate members.',
    images: [
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
      'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=800&q=80',
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80',
      'https://images.unsplash.com/photo-1545156521-77bd85671d30?w=800&q=80',
    ]
  },
};


async function loadEvent() {
  
  if (!eventId) {
    showNoIdMessage();
    return;
  }

  
  if (DEMO_EVENTS[eventId]) {
    const ev = DEMO_EVENTS[eventId];
    setHeader(ev.title, ev.category, ev.date, ev.description);
    images = ev.images;
    renderGrid(images);
    return;
  }


  try {
    const fbModule = await import('./firebase.js');
    const { db }   = fbModule;
    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
    const snap = await getDoc(doc(db, 'gallery_events', eventId));

    if (!snap.exists()) {
      showNotFound();
      return;
    }

    const ev = snap.data();
    setHeader(ev.title || 'Event', ev.category || '', ev.date || '', ev.description || '');
    images = ev.images || [];
    if (images.length === 0) { showEmpty(); return; }
    renderGrid(images);

  } catch (err) {
    
    console.warn('Firebase not configured or event not found, showing placeholder.', err.message);
    showPlaceholder();
  }
}


function setHeader(title, category, date, desc) {
  if (titleEl) titleEl.textContent = title;
  if (tagEl)   tagEl.textContent   = category;
  if (metaEl)  metaEl.textContent  = date;
  if (descEl)  descEl.textContent  = desc;
  document.title = `${title} — Astro Club BIT Durg`;
}


function renderGrid(imgs) {
  grid.innerHTML = imgs.map((src, i) => `
    <div class="event-img-item reveal" data-index="${i}" style="animation-delay:${i * 0.05}s">
      <img src="${src}" alt="Photo ${i + 1}" loading="lazy"
           onerror="this.parentElement.style.display='none'">
      <div class="event-img-overlay">
        <span class="zoom-icon">⤢</span>
        <span class="img-num">${i + 1} / ${imgs.length}</span>
      </div>
    </div>`).join('');

  
  setTimeout(() => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 55);
    });
  }, 50);


  grid.querySelectorAll('.event-img-item').forEach(item => {
    item.addEventListener('click', () => openLightbox(+item.dataset.index));
  });
}


function showNoIdMessage() {
  setHeader('Event Gallery', '', '', '');
  if (metaEl) metaEl.textContent = 'Navigate from the Gallery page to view an event.';
  grid.innerHTML = `
    <div class="event-empty-state">
      <div class="empty-icon">🖼️</div>
      <h3>No Event Selected</h3>
      <p>Please go back to the Gallery and click on an event to view its photos.</p>
      <a href="gallery.html" class="btn-primary" style="margin-top:24px;display:inline-flex;">
        ← Browse Gallery
      </a>
    </div>`;
}

function showNotFound() {
  setHeader('Event Not Found', '', '', 'This event does not exist or has been removed.');
  grid.innerHTML = `
    <div class="event-empty-state">
      <div class="empty-icon">🔭</div>
      <h3>Event Not Found</h3>
      <p>The event you're looking for doesn't exist in our database.</p>
      <a href="gallery.html" class="btn-primary" style="margin-top:24px;display:inline-flex;">
        ← Back to Gallery
      </a>
    </div>`;
}

function showEmpty() {
  grid.innerHTML = `
    <div class="event-empty-state">
      <div class="empty-icon">📸</div>
      <h3>No Photos Yet</h3>
      <p>Photos for this event haven't been uploaded yet. Check back soon.</p>
    </div>`;
}

function showPlaceholder() {
  setHeader('Sample Event Gallery', 'Demo', '', 'Firebase not configured. Connect Firebase to show real event photos.');
  const placeholders = Array.from({ length: 9 }, (_, i) => `https://picsum.photos/seed/astro${i+1}/800/600`);
  images = placeholders;
  renderGrid(images);
}


function openLightbox(idx) {
  currentIdx = idx;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightbox() {
  if (!lbImg) return;
  lbImg.style.opacity = '0';
  lbImg.src = images[currentIdx];
  lbImg.onload = () => { lbImg.style.transition = 'opacity 0.3s'; lbImg.style.opacity = '1'; };
  if (lbCounter) lbCounter.textContent = `${currentIdx + 1} / ${images.length}`;
}


document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev')?.addEventListener('click', () => {
  currentIdx = (currentIdx - 1 + images.length) % images.length;
  updateLightbox();
});
document.getElementById('lightbox-next')?.addEventListener('click', () => {
  currentIdx = (currentIdx + 1) % images.length;
  updateLightbox();
});
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   { currentIdx = (currentIdx - 1 + images.length) % images.length; updateLightbox(); }
  if (e.key === 'ArrowRight')  { currentIdx = (currentIdx + 1) % images.length; updateLightbox(); }
});


let touchStartX = 0;
lightbox?.addEventListener('touchstart',  e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox?.addEventListener('touchend',    e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) { currentIdx = (currentIdx + 1) % images.length; }
    else          { currentIdx = (currentIdx - 1 + images.length) % images.length; }
    updateLightbox();
  }
});

loadEvent();
