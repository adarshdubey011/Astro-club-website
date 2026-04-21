const grid = document.getElementById('gallery-events-grid');


const DEMO = [
  {
    id: '1',
    title: 'Aayam 2024',
    category: 'Annual Fest',
    date: 'November 2024',
    count: 12,
    cover: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80'
  },
  {
    id: '2',
    title: 'Stargazing Night',
    category: 'Observation',
    date: 'October 2024',
    count: 6,
    cover: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&q=80'
  },
  {
    id: '3',
    title: 'Telescope Workshop',
    category: 'Workshop',
    date: 'September 2024',
    count: 6,
    cover: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=600&q=80'
  },
  {
    id: '4',
    title: 'School Outreach Program',
    category: 'Outreach',
    date: 'August 2024',
    count: 20,
    cover: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80'
  },
  {
    id: '5',
    title: 'Guest Lecture — ISRO',
    category: 'Lecture',
    date: 'July 2024',
    count: 14,
    cover: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&q=80'
  },
  {
    id: '6',
    title: 'Aayam 2023',
    category: 'Annual Fest',
    date: 'November 2023',
    count: 55,
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'
  },
];


function makeCard(ev) {
  return `
    <a href="event.html?id=${ev.id}" class="event-collection glass-card reveal hover-glow">
      <div class="event-collection-thumb">
        <img src="${ev.cover || ev.coverImage || ''}"
             alt="${ev.title}"
             loading="lazy"
             onerror="this.parentElement.innerHTML='<div style=\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;background:linear-gradient(135deg,rgba(8,15,30,1),rgba(21,45,82,0.6))\'>🌌</div>'">
        <div class="event-collection-overlay"></div>
        <span class="img-count-badge">${ev.count || ev.imageCount || '?'} photos</span>
      </div>
      <div class="event-collection-info">
        <div class="event-collection-tag">${ev.category || 'Event'}</div>
        <h3 class="event-collection-title">${ev.title}</h3>
        <p class="event-collection-meta">${ev.date || ''}</p>
      </div>
    </a>`;
}


async function loadGallery() {
  // Try Firebase first
  try {
    const { db }      = await import('./firebase.js');
    const { collection, getDocs, query, orderBy } =
      await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

    const q    = query(collection(db, 'gallery_events'), orderBy('date', 'desc'));
    const snap = await getDocs(q);

    if (!snap.empty) {
      grid.innerHTML = '';
      snap.forEach(doc => {
        const ev = { id: doc.id, ...doc.data() };
        grid.innerHTML += makeCard(ev);
      });
      if (window.__scrollReveal) window.__scrollReveal();
      return;
    }
  } catch (e) {
    console.warn('Firebase not configured — showing demo gallery.', e.message);
  }


  grid.innerHTML = DEMO.map(makeCard).join('');
  if (window.__scrollReveal) window.__scrollReveal();
}

loadGallery();
