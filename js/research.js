import { db } from './firebase.js';
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const container = document.getElementById('papers-grid');

const fallbackPapers = [
  {
    title: "Dark Matter Distribution in Spiral Galaxies: A Statistical Approach",
    authors: "Rahul Sharma, Priya Nair — Astro Club BIT Durg",
    abstract: "This paper investigates the statistical distribution of dark matter halos in a sample of 120 nearby spiral galaxies using rotation curve analysis. We present evidence suggesting a universal scaling relation between baryonic mass and dark matter content.",
    tags: ["Dark Matter", "Galaxy Dynamics", "Astrophysics"],
    year: "2024",
    url: "#"
  },
  {
    title: "Optical Transient Detection Using Amateur Telescopes: Methodology and Results",
    authors: "Karan Verma, Sneha Pandey — Astro Club BIT Durg",
    abstract: "We present a low-cost methodology for detecting optical transients using consumer-grade telescopes and open-source image stacking software. Our survey monitored 45 fields over 8 months, recording 12 potential transient candidates.",
    tags: ["Optical Transients", "Observational Methods", "Citizen Science"],
    year: "2023",
    url: "#"
  },
  {
    title: "The Visibility of Near-Earth Asteroids from Central India: A Predictive Study",
    authors: "Ananya Singh — Astro Club BIT Durg",
    abstract: "Using ephemeris data from the JPL Horizons system, we analyze the observational windows for selected near-Earth asteroids as seen from Durg, Chhattisgarh. Optimal observation times and required equipment specifications are tabulated for the 2024–2026 period.",
    tags: ["Asteroids", "Near-Earth Objects", "Ephemeris"],
    year: "2023",
    url: "#"
  },
  {
    title: "Radio Emission from Jovian System: Educational Observations and Analysis",
    authors: "Deepak Rao, Meera Joshi — Astro Club BIT Durg",
    abstract: "This paper documents an educational project wherein students constructed a simple radio antenna array to detect decametric radio bursts from Jupiter. We compare our recorded burst profiles against archival NASA data and analyze sources of interference.",
    tags: ["Radio Astronomy", "Jupiter", "Student Research"],
    year: "2022",
    url: "#"
  },
  {
    title: "Historical Records of Solar Eclipse Observations from the Chhattisgarh Region",
    authors: "Astro Club BIT Durg Research Team",
    abstract: "An archival study compiling newspaper accounts, administrative records, and oral histories of solar eclipse observations in Chhattisgarh from 1898 to 2020. We examine the evolution of public scientific awareness alongside each major totality event.",
    tags: ["Solar Eclipses", "History of Astronomy", "Regional Study"],
    year: "2022",
    url: "#"
  }
];

async function loadPapers() {
  try {
    const q = query(collection(db, 'research_papers'), orderBy('year', 'desc'));
    const snap = await getDocs(q);
    const papers = snap.empty ? fallbackPapers : snap.docs.map(d => d.data());
    render(papers);
  } catch {
    render(fallbackPapers);
  }
}

function render(papers) {
  container.innerHTML = papers.map(p => `
    <article class="paper-card glass-card reveal hover-pink-glow">
      <div>
        <div class="paper-badge">Research Paper</div>
        <h2 class="paper-title">${p.title}</h2>
        <p class="paper-authors">${p.authors}</p>
        <p class="paper-abstract">${p.abstract}</p>
        <div class="paper-tags">${(p.tags || []).map(t => `<span class="paper-tag">${t}</span>`).join('')}</div>
      </div>
      <div class="paper-actions">
        <a href="${p.url || '#'}" target="_blank" class="paper-read-btn">Read Paper →</a>
        <span class="paper-year">${p.year}</span>
      </div>
    </article>`).join('');
}

loadPapers();
