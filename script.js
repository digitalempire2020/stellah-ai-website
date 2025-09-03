// Calendar simulation for dashboard preview
const capacity = 40; // target bookings for today
const days = 7;      // columns
const rows = 12;     // 8am - 8pm (12 blocks = 1h increments)

// Generate pseudo-random bookings for FatFreeze
const firstNames = ["James","Ava","Liam","Mia","Noah","Ella","Lucas","Grace","Ethan","Zoe","Henry","Nora","Amelia","Leo","Sofia","Logan","Maya","Owen","Lily","Wyatt","Hazel","Jack","Isla","Caleb","Ruby","Ryan","Ivy"];
const services = ["FatFreeze Treatment"];
const rand = (min,max) => Math.floor(Math.random()*(max-min+1))+min;

const events = Array.from({length: capacity}, (_,i) => {
  const d = rand(0, days-1);
  const start = rand(0, rows-2);
  const dur = rand(1, Math.min(3, rows-start));
  return {
    id: i+1,
    day: d,
    start,
    dur,
    name: `${services[0]} — ${firstNames[rand(0,firstNames.length-1)]} ${String.fromCharCode(65+rand(0,25))}.`,
  }
}).sort((a,b)=> (a.day - b.day) || (a.start - b.start));

let placed = 0;
let showRate = 0;

function layoutEvents() {
  const eventsLayer = document.getElementById('eventsLayer');
  if (!eventsLayer) return;
  
  const rect = eventsLayer.getBoundingClientRect();
  const colW = rect.width / days;
  const rowH = rect.height / rows;

  [...eventsLayer.children].forEach(node => {
    const e = node._data;
    node.style.left = `${e.day * colW + 2}px`;
    node.style.top = `${e.start * rowH + 2}px`;
    node.style.width = `${colW - 4}px`;
    node.style.height = `${e.dur * rowH - 4}px`;
  });
}

function addEvent(e, delay) {
  setTimeout(() => {
    const eventsLayer = document.getElementById('eventsLayer');
    const bookedEl = document.getElementById('bookedToday');
    const barEl = document.getElementById('capacityBar');
    const pctEl = document.getElementById('capacityPct');
    const showRateEl = document.getElementById('showRate');
    
    if (!eventsLayer) return;
    
    const node = document.createElement('div');
    node.className = "absolute rounded-lg shadow-sm ring-1 ring-black/5 overflow-hidden bg-gradient-to-br from-orange-500/90 via-orange-400/90 to-orange-300/90 text-white";
    node.style.opacity = '0';
    node.style.transform = 'scale(.98)';
    node._data = e;

    node.innerHTML = `
      <div class="h-full w-full p-2.5 flex flex-col justify-between">
        <div class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-3-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          <p class="text-xs font-medium leading-tight tracking-tight line-clamp-1">${e.name}</p>
        </div>
        <div class="flex items-center justify-between text-[11px]">
          <span class="inline-flex items-center gap-1 opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>
            ${8 + e.start}:00
          </span>
          <span class="inline-flex items-center gap-1 opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            Room ${1 + (e.id % 6)}
          </span>
        </div>
        <span class="absolute top-1 right-1 inline-flex items-center gap-1 rounded-full bg-white/90 text-stone-800 px-1.5 py-0.5 text-[10px] ring-1 ring-black/5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-orange-600"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path></svg>
          Stellah AI
        </span>
      </div>
    `;

    eventsLayer.appendChild(node);
    layoutEvents();

    // Animate in
    requestAnimationFrame(() => {
      node.style.transition = 'opacity .4s ease, transform .4s ease';
      node.style.opacity = '1';
      node.style.transform = 'scale(1)';
    });

    placed++;
    if (bookedEl) bookedEl.textContent = placed;
    const pct = Math.min(100, Math.round((placed / capacity) * 100));
    if (barEl) barEl.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';

    const targetShow = 84; // %
    if (showRate < targetShow) {
      showRate = Math.min(targetShow, showRate + (Math.random() * 2));
      if (showRateEl) showRateEl.textContent = Math.round(showRate) + '%';
    }
  }, delay);
}

// Initialize calendar simulation when page loads
document.addEventListener('DOMContentLoaded', function() {
  const eventsLayer = document.getElementById('eventsLayer');
  if (!eventsLayer) return;
  
  const ro = new ResizeObserver(layoutEvents);
  ro.observe(eventsLayer);

  // Start simulation: shows "slots" filling automatically
  let t = 400;
  const step = 250;
  events.forEach((e) => {
    addEvent(e, t);
    t += step + Math.round(Math.random() * 200);
  });
});