

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];


const ASTRO_EVENTS = [
  
  { d:'2025-01-03', type:'shower',  icon:'🌠', name:'Quadrantid Meteor Shower Peak', desc:'Best viewed after midnight. Fast, bright meteors. ZHR ~120.' },
  { d:'2025-01-13', type:'moon',    icon:'🌕', name:'Full Moon (Wolf Moon)',          desc:'January full moon named after howling wolves. Great for photography.' },
  { d:'2025-01-21', type:'moon',    icon:'🌑', name:'New Moon',                       desc:'Ideal night for deep-sky observation and astrophotography.' },
  { d:'2025-01-29', type:'planet',  icon:'🪐', name:'Venus at Greatest Elongation',   desc:'Venus is visible as the brilliant "Evening Star" after sunset.' },
  { d:'2025-02-12', type:'moon',    icon:'🌕', name:'Full Moon (Snow Moon)',           desc:'February full moon. Historically named for heavy snowfall.' },
  { d:'2025-02-20', type:'moon',    icon:'🌑', name:'New Moon',                       desc:'Dark skies — perfect for viewing galaxies and nebulae.' },
  { d:'2025-03-14', type:'eclipse', icon:'🌑', name:'Total Lunar Eclipse',             desc:'Moon passes completely into Earth\'s shadow. Blood-red moon visible.' },
  { d:'2025-03-20', type:'planet',  icon:'☀️', name:'March Equinox',                  desc:'Equal day and night. Sun crosses celestial equator northward.' },
  { d:'2025-03-29', type:'eclipse', icon:'🌑', name:'Partial Solar Eclipse',           desc:'Moon blocks part of the Sun. Use eclipse glasses to observe.' },
  { d:'2025-04-13', type:'moon',    icon:'🌕', name:'Full Moon (Pink Moon)',           desc:'Named for spring phlox flowers. Bright pink-tinted moonrise.' },
  { d:'2025-04-22', type:'shower',  icon:'🌠', name:'Lyrid Meteor Shower Peak',       desc:'Annual shower from Comet Thatcher debris. ZHR ~20, some fireballs.' },
  { d:'2025-04-27', type:'moon',    icon:'🌑', name:'New Moon',                       desc:'Best dark skies of April — try Virgo cluster galaxies.' },
  { d:'2025-05-06', type:'shower',  icon:'🌠', name:'Eta Aquariid Meteor Shower Peak',desc:'Halley\'s Comet debris. ZHR ~40–85, best from southern hemisphere.' },
  { d:'2025-05-12', type:'moon',    icon:'🌕', name:'Full Moon (Flower Moon)',        desc:'May full moon. Best time to observe moonlit landscapes.' },
  { d:'2025-06-11', type:'moon',    icon:'🌕', name:'Full Moon (Strawberry Moon)',    desc:'Low on horizon — take advantage of moon illusion effect.' },
  { d:'2025-06-21', type:'planet',  icon:'☀️', name:'June Solstice',                  desc:'Longest day of the year. Sun at its northernmost point.' },
  { d:'2025-07-04', type:'planet',  icon:'🌍', name:'Earth at Aphelion',              desc:'Earth is farthest from the Sun today at ~152.1 million km.' },
  { d:'2025-07-10', type:'moon',    icon:'🌕', name:'Full Moon (Buck Moon)',          desc:'Named for male deer growing new antlers. Warm summer moonrise.' },
  { d:'2025-07-28', type:'shower',  icon:'🌠', name:'Delta Aquariid Meteor Shower',   desc:'Consistent shower. ZHR ~25, best before dawn. Long meteors.' },
  { d:'2025-08-09', type:'moon',    icon:'🌕', name:'Full Moon (Sturgeon Moon)',      desc:'Named for Great Lakes sturgeon. Often appears orange near horizon.' },
  { d:'2025-08-12', type:'shower',  icon:'🌠', name:'Perseid Meteor Shower Peak',     desc:'Most popular shower. ZHR ~100. Swift bright streaks. All-night event.' },
  { d:'2025-09-07', type:'eclipse', icon:'🌑', name:'Total Lunar Eclipse',            desc:'Second total lunar eclipse of 2025. Red-orange blood moon visible.' },
  { d:'2025-09-08', type:'moon',    icon:'🌕', name:'Full Moon (Harvest Moon)',       desc:'Closest full moon to autumnal equinox. Rises at sunset for several nights.' },
  { d:'2025-09-22', type:'planet',  icon:'☀️', name:'September Equinox',              desc:'Astronomical start of autumn. Equal day and night worldwide.' },
  { d:'2025-10-07', type:'moon',    icon:'🌕', name:'Full Moon (Hunter\'s Moon)',     desc:'Named for hunting season. Second full moon after Harvest Moon.' },
  { d:'2025-10-21', type:'shower',  icon:'🌠', name:'Orionid Meteor Shower Peak',    desc:'Halley\'s Comet debris. ZHR ~20, fast and bright. Mid-October skies.' },
  { d:'2025-11-05', type:'moon',    icon:'🌕', name:'Full Moon (Beaver Moon)',        desc:'Named for trapping beavers before freeze. Often near Pleiades.' },
  { d:'2025-11-17', type:'shower',  icon:'🌠', name:'Leonid Meteor Shower Peak',     desc:'ZHR ~15, occasional storms. Swift meteors from Comet Tempel-Tuttle.' },
  { d:'2025-12-04', type:'moon',    icon:'🌕', name:'Full Moon (Cold Moon)',          desc:'Longest nights of the year. Moon stays high in the sky.' },
  { d:'2025-12-13', type:'shower',  icon:'🌠', name:'Geminid Meteor Shower Peak',    desc:'Best annual shower. ZHR ~150. Multi-colored meteors. All-night event!' },
  { d:'2025-12-21', type:'planet',  icon:'☀️', name:'December Solstice',             desc:'Longest night of the year. Sun at its southernmost point.' },
  { d:'2025-12-22', type:'shower',  icon:'🌠', name:'Ursid Meteor Shower Peak',      desc:'Modest shower. ZHR ~10. Good because Geminids are past.' },

  /* ══ 2026 ══ */
  { d:'2026-01-02', type:'shower',  icon:'🌠', name:'Quadrantid Meteor Shower Peak', desc:'Start of year meteor shower. ZHR ~120. Best after 3 AM local time.' },
  { d:'2026-01-13', type:'planet',  icon:'♂️', name:'Mars at Opposition',            desc:'Mars is brightest and visible all night. Red planet at closest approach.' },
  { d:'2026-01-17', type:'moon',    icon:'🌕', name:'Full Moon (Wolf Moon)',          desc:'January\'s full moon rises with a golden hue.' },
  { d:'2026-02-16', type:'moon',    icon:'🌕', name:'Full Moon (Snow Moon)',          desc:'Named for heavy snowfall. Winter full moon at its highest.' },
  { d:'2026-02-21', type:'moon',    icon:'🌑', name:'New Moon',                      desc:'Moonless dark skies. Ideal for Andromeda Galaxy viewing.' },
  { d:'2026-03-20', type:'planet',  icon:'☀️', name:'March Equinox',                 desc:'Spring begins in northern hemisphere. 12 hours of day and night.' },
  { d:'2026-03-23', type:'eclipse', icon:'🌑', name:'Partial Solar Eclipse',          desc:'Partial eclipse visible from eastern Europe and Asia.' },
  { d:'2026-04-08', type:'moon',    icon:'🌕', name:'Full Moon (Pink Moon)',          desc:'April\'s full moon. Closest full moon of 2026.' },
  { d:'2026-04-16', type:'moon',    icon:'🌑', name:'New Moon',                      desc:'Dark skies — try Coma Berenices star cluster.' },
  { d:'2026-04-22', type:'shower',  icon:'🌠', name:'Lyrid Meteor Shower Peak',      desc:'Spring\'s first major meteor shower. ZHR ~15–20. Best near midnight.' },
  { d:'2026-05-06', type:'shower',  icon:'🌠', name:'Eta Aquariid Meteor Shower Peak',desc:'Debris from Halley\'s Comet. Swift meteors low in south before dawn.' },
  { d:'2026-05-22', type:'moon',    icon:'🌑', name:'New Moon',                      desc:'Deep-sky targets: M81, M82 galaxies in Ursa Major.' },
  { d:'2026-06-17', type:'planet',  icon:'🪐', name:'Saturn at Opposition',          desc:'Saturn is brightest and rings maximally tilted. Best viewing of year.' },
  { d:'2026-06-21', type:'planet',  icon:'☀️', name:'June Solstice',                 desc:'Summer solstice. Shortest night — use it for noctilucent clouds.' },
  { d:'2026-07-13', type:'moon',    icon:'🌕', name:'Full Moon (Buck Moon)',         desc:'Summer full moon at its lowest altitude. Long moonrise display.' },
  { d:'2026-07-28', type:'shower',  icon:'🌠', name:'Delta Aquariid Meteor Shower',  desc:'Southern shower. ZHR ~25. Best for observers south of latitude 20°N.' },
  { d:'2026-08-11', type:'eclipse', icon:'🌑', name:'Total Solar Eclipse',            desc:'Path crosses Russia and Arctic. Totality lasts up to 2 min 18 sec.' },
  { d:'2026-08-12', type:'shower',  icon:'🌠', name:'Perseid Meteor Shower Peak',    desc:'Summer\'s best! ZHR ~100. Bright fast streaks. Watch from 10 PM onward.' },
  { d:'2026-08-12', type:'moon',    icon:'🌕', name:'Full Moon (Sturgeon Moon)',     desc:'Coincides with Perseids — moonlight will interfere somewhat.' },
  { d:'2026-09-21', type:'planet',  icon:'☀️', name:'September Equinox',             desc:'Equal day and night. Last chance to observe summer Milky Way.' },
  { d:'2026-10-10', type:'moon',    icon:'🌕', name:'Full Moon (Hunter\'s Moon)',    desc:'Harvest season moon. Rises near sunset for consecutive nights.' },
  { d:'2026-10-21', type:'shower',  icon:'🌠', name:'Orionid Meteor Shower Peak',   desc:'ZHR ~20. Best after midnight. Meteors appear to radiate from Orion.' },
  { d:'2026-11-08', type:'moon',    icon:'🌕', name:'Full Moon (Beaver Moon)',       desc:'Near Pleiades star cluster. Try binocular views together.' },
  { d:'2026-11-17', type:'shower',  icon:'🌠', name:'Leonid Meteor Shower Peak',    desc:'ZHR ~15. Watch for Leonid storm if cycle repeats.' },
  { d:'2026-12-07', type:'moon',    icon:'🌕', name:'Full Moon (Cold Moon)',         desc:'Longest lunar visibility of the year — up to 15 hours above horizon.' },
  { d:'2026-12-14', type:'shower',  icon:'🌠', name:'Geminid Meteor Shower Peak',   desc:'Best shower of the year! ZHR ~150. Colorful multi-second fireballs.' },
  { d:'2026-12-21', type:'planet',  icon:'☀️', name:'December Solstice',            desc:'Shortest day. Winter begins. Ideal for all-night telescoping.' },

  /* ══ 2027 ══ */
  { d:'2027-01-03', type:'shower',  icon:'🌠', name:'Quadrantid Meteor Shower Peak', desc:'ZHR ~120. Narrow peak of just a few hours. Watch after midnight.' },
  { d:'2027-02-08', type:'planet',  icon:'♀️', name:'Venus at Greatest Brilliancy', desc:'Venus shines at magnitude −4.9, the brightest it ever gets.' },
  { d:'2027-03-20', type:'planet',  icon:'☀️', name:'March Equinox',                desc:'Spring equinox. Day and night are equal length worldwide.' },
  { d:'2027-06-21', type:'eclipse', icon:'🌑', name:'Total Solar Eclipse',           desc:'Path crosses North Africa and Saudi Arabia. Up to 6 min 23 sec totality.' },
  { d:'2027-06-21', type:'planet',  icon:'☀️', name:'June Solstice',                desc:'Summer solstice coincides with total solar eclipse — rare event.' },
  { d:'2027-08-12', type:'shower',  icon:'🌠', name:'Perseid Meteor Shower Peak',   desc:'ZHR ~100. New moon this year = spectacular dark-sky Perseids.' },
  { d:'2027-08-18', type:'planet',  icon:'♂️', name:'Mars at Opposition',           desc:'Mars close approach. Diameter nearly 25 arcseconds. Best view in years.' },
  { d:'2027-09-23', type:'planet',  icon:'☀️', name:'September Equinox',            desc:'Astronomical autumn begins. Milky Way moves toward the west.' },
  { d:'2027-10-21', type:'shower',  icon:'🌠', name:'Orionid Meteor Shower Peak',  desc:'ZHR ~20. Halley\'s Comet debris. Swift and bright meteors.' },
  { d:'2027-12-14', type:'shower',  icon:'🌠', name:'Geminid Meteor Shower Peak',  desc:'ZHR ~150. Asteroid 3200 Phaethon debris. Best under dark skies.' },
  { d:'2027-12-22', type:'planet',  icon:'☀️', name:'December Solstice',           desc:'Longest night of 2027. Ideal for extended star party.' },

  /* ══ 2028 ══ */
  { d:'2028-01-02', type:'shower',  icon:'🌠', name:'Quadrantid Meteor Shower Peak', desc:'ZHR ~120. Best winter shower. Watch from midnight onward.' },
  { d:'2028-02-14', type:'planet',  icon:'♃', name:'Jupiter at Opposition',         desc:'Jupiter at its closest. Giant planet fills a small telescope eyepiece.' },
  { d:'2028-04-20', type:'shower',  icon:'🌠', name:'Lyrid Meteor Shower Peak',     desc:'Spring shower from Comet Thatcher. ZHR ~15. Some fireballs.' },
  { d:'2028-05-06', type:'shower',  icon:'🌠', name:'Eta Aquariid Meteor Shower Peak',desc:'ZHR ~50. Low in southern sky before dawn. Swift bright meteors.' },
  { d:'2028-06-20', type:'planet',  icon:'☀️', name:'June Solstice',               desc:'Summer begins. Longest day of 2028.' },
  { d:'2028-07-22', type:'eclipse', icon:'🌑', name:'Total Solar Eclipse',          desc:'Path across Australia and New Zealand. Up to 5 min totality.' },
  { d:'2028-08-12', type:'shower',  icon:'🌠', name:'Perseid Meteor Shower Peak',  desc:'ZHR ~100. Watch for earthgrazer meteors just after dark.' },
  { d:'2028-09-22', type:'planet',  icon:'☀️', name:'September Equinox',           desc:'Autumnal equinox. Great time for open cluster season.' },
  { d:'2028-10-12', type:'planet',  icon:'♄', name:'Saturn at Opposition',         desc:'Saturn at its largest. Ring tilt favorable for northern observers.' },
  { d:'2028-11-17', type:'shower',  icon:'🌠', name:'Leonid Meteor Shower Peak',   desc:'ZHR ~15. Pre-dawn watch. Fast meteors with glowing trains.' },
  { d:'2028-12-13', type:'shower',  icon:'🌠', name:'Geminid Meteor Shower Peak',  desc:'Top shower of 2028. ZHR ~150. Start watching from 9 PM local.' },
  { d:'2028-12-21', type:'planet',  icon:'☀️', name:'December Solstice',           desc:'Winter solstice. Sun at its southernmost declination.' },

  /* ══ 2029 ══ */
  { d:'2029-01-03', type:'shower',  icon:'🌠', name:'Quadrantid Meteor Shower Peak', desc:'ZHR ~120 from Boötes. Best in first hours after midnight.' },
  { d:'2029-04-13', type:'planet',  icon:'☄️', name:'Apophis Asteroid Close Approach',desc:'Asteroid 99942 Apophis passes closer than geostationary satellites — visible to naked eye!' },
  { d:'2029-04-22', type:'shower',  icon:'🌠', name:'Lyrid Meteor Shower Peak',     desc:'ZHR ~15. Watch from Vega\'s direction after midnight.' },
  { d:'2029-05-06', type:'shower',  icon:'🌠', name:'Eta Aquariid Meteor Shower Peak',desc:'Swift meteors from Halley\'s Comet. Pre-dawn southern sky.' },
  { d:'2029-06-21', type:'planet',  icon:'☀️', name:'June Solstice',               desc:'Longest day. Midnight twilight visible at high northern latitudes.' },
  { d:'2029-08-12', type:'shower',  icon:'🌠', name:'Perseid Meteor Shower Peak',  desc:'ZHR ~100. One of the finest Perseid returns. Clear skies expected.' },
  { d:'2029-09-10', type:'planet',  icon:'♂️', name:'Mars at Opposition',          desc:'Mars at very close approach, best since 2018. Dramatic red planet.' },
  { d:'2029-09-22', type:'planet',  icon:'☀️', name:'September Equinox',           desc:'Equal day and night marks beginning of astronomical autumn.' },
  { d:'2029-10-21', type:'shower',  icon:'🌠', name:'Orionid Meteor Shower Peak',  desc:'ZHR ~20. Radiant in Orion. Best after 1 AM local time.' },
  { d:'2029-11-17', type:'shower',  icon:'🌠', name:'Leonid Meteor Shower Peak',   desc:'ZHR ~15–20. Possible minor outburst — watch after midnight.' },
  { d:'2029-12-13', type:'shower',  icon:'🌠', name:'Geminid Meteor Shower Peak',  desc:'ZHR ~150. Multicolored meteors from asteroid Phaethon. Best annual!' },
  { d:'2029-12-21', type:'planet',  icon:'☀️', name:'December Solstice',           desc:'Winter begins in northern hemisphere. Longest night of 2029.' },

  /* ══ 2030 ══ */
  { d:'2030-01-03', type:'shower',  icon:'🌠', name:'Quadrantid Meteor Shower Peak', desc:'ZHR ~120. First major astronomical event of the new decade.' },
  { d:'2030-03-25', type:'eclipse', icon:'🌑', name:'Total Lunar Eclipse',           desc:'Visible from Americas, Europe and Africa. Blood moon for ~1 hour 10 min.' },
  { d:'2030-04-23', type:'shower',  icon:'🌠', name:'Lyrid Meteor Shower Peak',     desc:'Spring shower. ZHR ~20. Comet Thatcher returns to inner solar system.' },
  { d:'2030-05-06', type:'shower',  icon:'🌠', name:'Eta Aquariid Meteor Shower Peak',desc:'ZHR ~50. Halley\'s Comet debris — steady and reliable shower.' },
  { d:'2030-06-01', type:'eclipse', icon:'🌑', name:'Annular Solar Eclipse',         desc:'Ring of fire eclipse across South America. Duration up to 11 min.' },
  { d:'2030-06-21', type:'planet',  icon:'☀️', name:'June Solstice',               desc:'First summer solstice of the new decade.' },
  { d:'2030-08-12', type:'shower',  icon:'🌠', name:'Perseid Meteor Shower Peak',  desc:'ZHR ~100. New moon in 2030 means exceptional dark-sky Perseids.' },
  { d:'2030-09-23', type:'planet',  icon:'☀️', name:'September Equinox',           desc:'Autumnal equinox. Day and night equal length worldwide.' },
  { d:'2030-10-21', type:'shower',  icon:'🌠', name:'Orionid Meteor Shower Peak',  desc:'ZHR ~20. Comet Halley remnants produce swift glowing meteors.' },
  { d:'2030-11-25', type:'eclipse', icon:'🌑', name:'Partial Solar Eclipse',        desc:'Partial eclipse visible across central Africa and Indian Ocean.' },
  { d:'2030-12-14', type:'shower',  icon:'🌠', name:'Geminid Meteor Shower Peak',  desc:'ZHR ~150. Closing the decade with the year\'s best meteor shower.' },
  { d:'2030-12-21', type:'planet',  icon:'☀️', name:'December Solstice',           desc:'Winter solstice. Longest night marks astronomical year end of 2030.' },

  // ── Additional Moon phases 2026 (sample) ──
  { d:'2026-01-10', type:'moon', icon:'🌗', name:'First Quarter Moon',   desc:'Half-lit moon. Great for crater observation along the terminator.' },
  { d:'2026-01-17', type:'moon', icon:'🌕', name:'Full Moon (Wolf Moon)', desc:'Fully illuminated. Great for lunar photography and earthshine.' },
  { d:'2026-01-25', type:'moon', icon:'🌑', name:'New Moon',              desc:'Dark skies. Best time for deep sky objects and galaxies.' },
  { d:'2026-02-02', type:'moon', icon:'🌓', name:'First Quarter Moon',   desc:'Moon at 90° from Sun. Shadows on craters are dramatic.' },
  { d:'2026-03-10', type:'moon', icon:'🌗', name:'Last Quarter Moon',    desc:'Moon rises around midnight. Good for early-morning observers.' },
  { d:'2026-04-01', type:'moon', icon:'🌓', name:'First Quarter Moon',   desc:'Lunar terminator highlights Apennine mountains beautifully.' },
  { d:'2026-05-01', type:'moon', icon:'🌕', name:'Full Moon (Flower Moon)',desc:'Second full moon in May 2026. Larger-than-average supermoon.' },
  { d:'2026-05-31', type:'moon', icon:'🌕', name:'Blue Moon',            desc:'Second full moon in a calendar month — a rare occurrence.' },
  { d:'2026-07-04', type:'planet',icon:'🌍','name':'Earth at Aphelion',   desc:'Earth at farthest point from Sun: ~152.1 million km.' },
];

function pad(n) { return String(n).padStart(2, '0'); }
function dateStr(y, m, d) { return `${y}-${pad(m+1)}-${pad(d)}`; }
function getEventsFor(str) { return ASTRO_EVENTS.filter(e => e.d === str); }

let viewYear  = new Date().getFullYear();
let viewMonth = new Date().getMonth();
const todayStr = dateStr(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

const calDaysEl    = document.getElementById('cal-days');
const monthLabelEl = document.getElementById('cal-month-label');
const prevBtn      = document.getElementById('cal-prev');
const nextBtn      = document.getElementById('cal-next');
const upcomingEl   = document.getElementById('upcoming-list');
const yearTabsEl   = document.getElementById('year-tabs');


function buildYearTabs() {
  if (!yearTabsEl) return;
  yearTabsEl.innerHTML = '';
  for (let y = 2025; y <= 2030; y++) {
    const btn = document.createElement('button');
    btn.className = 'year-tab' + (y === viewYear ? ' active' : '');
    btn.textContent = y;
    btn.addEventListener('click', () => {
      viewYear = y;
      viewMonth = 0;
      render();
      yearTabsEl.querySelectorAll('.year-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    yearTabsEl.appendChild(btn);
  }
}


function render() {
  if (!calDaysEl) return;
  monthLabelEl && (monthLabelEl.textContent = `${MONTHS[viewMonth]} ${viewYear}`);

  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevDays    = new Date(viewYear, viewMonth, 0).getDate();
  let html = '';


  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="cal-day other-month"><span class="cal-day-num">${prevDays - i}</span></div>`;
  }


  for (let d = 1; d <= daysInMonth; d++) {
    const ds  = dateStr(viewYear, viewMonth, d);
    const evs = getEventsFor(ds);
    const isTd = ds === todayStr;
    const evPills = evs.map(e =>
      `<div class="cal-event ${e.type}" data-date="${ds}" data-name="${e.name}" data-desc="${e.desc}" data-icon="${e.icon}">
         ${e.icon} ${e.name}
       </div>`
    ).join('');
    html += `<div class="cal-day${isTd ? ' today' : ''}${evs.length ? ' has-event' : ''}">
               <span class="cal-day-num">${d}</span>
               ${evPills}
             </div>`;
  }

  
  const total = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (let i = 1; i <= total - firstDay - daysInMonth; i++) {
    html += `<div class="cal-day other-month"><span class="cal-day-num">${i}</span></div>`;
  }

  calDaysEl.innerHTML = html;
  attachTooltips();
  renderUpcoming();
}

let tooltipEl = null;
function attachTooltips() {
  tooltipEl && tooltipEl.remove();
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'cal-tooltip';
  tooltipEl.style.display = 'none';
  document.body.appendChild(tooltipEl);

  document.querySelectorAll('.cal-event').forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      tooltipEl.innerHTML = `<div class="cal-tooltip-title">${el.dataset.icon} ${el.dataset.name}</div>
                             <div class="cal-tooltip-desc">${el.dataset.desc}</div>`;
      tooltipEl.style.display = 'block';
      moveTooltip(e);
    });
    el.addEventListener('mousemove', moveTooltip);
    el.addEventListener('mouseleave', () => { tooltipEl.style.display = 'none'; });
  });
}
function moveTooltip(e) {
  if (!tooltipEl) return;
  const x = e.clientX + 14, y = e.clientY + 14;
  const tw = tooltipEl.offsetWidth  || 220;
  const th = tooltipEl.offsetHeight || 80;
  tooltipEl.style.left = (x + tw > window.innerWidth  ? e.clientX - tw - 10 : x) + 'px';
  tooltipEl.style.top  = (y + th > window.innerHeight ? e.clientY - th - 10 : y) + 'px';
}


function renderUpcoming() {
  if (!upcomingEl) return;
  const now     = new Date(); now.setHours(0,0,0,0);
  const future  = ASTRO_EVENTS
    .filter(e => new Date(e.d) >= now)
    .sort((a,b) => new Date(a.d) - new Date(b.d))
    .slice(0, 8);

  if (!future.length) {
    upcomingEl.innerHTML = '<p style="color:var(--star-faint);font-size:0.85rem;">No upcoming events.</p>';
    return;
  }

  upcomingEl.innerHTML = future.map(ev => {
    const dt = new Date(ev.d);
    const dy = dt.getDate();
    const mo = MONTHS[dt.getMonth()].slice(0,3).toUpperCase();
    const typeLabel = { meteor:'Meteor Shower', moon:'Moon Phase', planet:'Planetary', eclipse:'Eclipse', shower:'Meteor Shower' }[ev.type] || ev.type;
    return `<div class="upcoming-event glass-card hover-glow">
      <div class="upcoming-date"><div class="d">${dy}</div><div class="m">${mo}</div></div>
      <div class="upcoming-info">
        <div class="t">${ev.icon} ${ev.name}</div>
        <div class="s">${typeLabel} · ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}</div>
      </div>
    </div>`;
  }).join('');
}


prevBtn && prevBtn.addEventListener('click', () => {
  viewMonth--;
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  render();
  yearTabsEl && yearTabsEl.querySelectorAll('.year-tab').forEach(b => {
    b.classList.toggle('active', +b.textContent === viewYear);
  });
});
nextBtn && nextBtn.addEventListener('click', () => {
  viewMonth++;
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  render();
  yearTabsEl && yearTabsEl.querySelectorAll('.year-tab').forEach(b => {
    b.classList.toggle('active', +b.textContent === viewYear);
  });
});


buildYearTabs();
render();
