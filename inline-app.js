function toggleAccordion(button) {
 const content = button.nextElementSibling;
 const chevron = button.querySelector('[data-lucide="chevron-down"]');
 if (content.classList.contains('hidden')) {
 content.classList.remove('hidden');
 chevron.style.transform = 'rotate(180deg)';
 } else {
 content.classList.add('hidden');
 chevron.style.transform = 'rotate(0deg)';
 }
}

function toggleMoreFAQs() {
 const moreFAQs = document.getElementById('moreFAQs');
 const button = document.getElementById('showMoreFAQs');
 const chevron = document.getElementById('moreFAQsChevron');
 const buttonText = button.querySelector('span');

 if (moreFAQs.classList.contains('hidden')) {
  // Show more FAQs
  moreFAQs.classList.remove('hidden');
  buttonText.textContent = 'Show Less FAQs';
  chevron.style.transform = 'rotate(180deg)';

  // Animate in the FAQ items with stagger
  const faqItems = moreFAQs.querySelectorAll('.accordion-item');
  faqItems.forEach((item, index) => {
   setTimeout(() => {
    item.classList.remove('opacity-0', 'translate-y-4');
   }, index * 100); // 100ms stagger
  });
 } else {
  // Hide FAQs
  const faqItems = moreFAQs.querySelectorAll('.accordion-item');
  faqItems.forEach(item => {
   item.classList.add('opacity-0', 'translate-y-4');
  });

  // Wait for animation to complete before hiding
  setTimeout(() => {
   moreFAQs.classList.add('hidden');
   buttonText.textContent = 'Show More FAQs';
   chevron.style.transform = 'rotate(0deg)';
  }, 300);
 }
}

function showDashboard() {
 document.getElementById('dashboard-modal').classList.remove('hidden');
 document.body.style.overflow = 'hidden';
}
function hideDashboard() {
 document.getElementById('dashboard-modal').classList.add('hidden');
 document.body.style.overflow = 'auto';
}
// Close modal when clicking outside
document.getElementById('dashboard-modal').addEventListener('click', function(e) {
 if (e.target === this) {
 hideDashboard();
 }
});
// Counter Animation Function
function animateCounter(element) {
 const target = parseInt(element.dataset.target);
 const prefix = element.dataset.prefix || '';
 const suffix = element.dataset.suffix || '';
 const duration = 2000; // 2 seconds
 let start = 0;
 const increment = target / (duration / 16); // 60fps
 const timer = setInterval(() => {
 start += increment;
 if (start >= target) {
 start = target;
 clearInterval(timer);
 }
 if (target >= 1000) {
 // For large numbers, use toLocaleString for formatting
 element.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
 } else {
 element.textContent = prefix + Math.floor(start) + suffix;
 }
 }, 16);
}
// Intersection Observer for counter animations
const counterObserver = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting && !entry.target.dataset.animated) {
 entry.target.dataset.animated = 'true';
 animateCounter(entry.target);
 }
 });
}, {
 threshold: 0.5
});
// Helper function to format time in 12-hour format
function formatTime12Hr(hour) {
    if (hour === 12) return '12pm';
    if (hour > 12) return `${hour - 12}pm`;
    return `${hour}am`;
}

// Calendar simulation
document.addEventListener('DOMContentLoaded', function() {
 // Initialize counter animations
 const counters = document.querySelectorAll('.counter-animate');
 counters.forEach(counter => {
 counterObserver.observe(counter);
 });
 const capacity = 40; // target bookings for today
 const days = 5; // columns (Mon-Fri)
 const rows = 12; // 8am - 8pm (12 blocks = 1h increments)
 const eventsLayer = document.getElementById('eventsLayer');
 if (!eventsLayer) return; // Exit if calendar elements don't exist
 const bookedEl = document.getElementById('bookedToday');
 const barEl = document.getElementById('capacityBar');
 const pctEl = document.getElementById('capacityPct');
 const showRateEl = document.getElementById('showRate');
 const dayHeaders = Array.from({ length: 5 }, (_, i) => document.getElementById('dayHeader' + i));
 const todayHighlight = document.getElementById('todayColumnHighlight');
 const currentTimeLine = document.getElementById('currentTimeLine');
 const currentTimeDot = document.getElementById('currentTimeDot');
 const calendarGrid = document.getElementById('calendarGrid');
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
 let showRate = 38; // Start at initial display value
 function layoutEvents() {
 const rect = eventsLayer.getBoundingClientRect();
 const colW = rect.width / days;
 const rowH = rect.height / rows;
 [...eventsLayer.children].forEach(node => {
 if (!node._data) return; // skip non-event nodes
 const e = node._data;
 node.style.left = `${e.day * colW + 2}px`;
 node.style.top = `${e.start * rowH + 2}px`;
 node.style.width = `${colW - 4}px`;
 node.style.height = `${e.dur * rowH - 4}px`;
 });
 positionTodayHighlight();
 positionCurrentTime();
 }
 function addEvent(e, delay) {
 setTimeout(() => {
 const node = document.createElement('div');
 node.className = "absolute rounded-lg shadow-sm ring-1 ring-black/5 overflow-hidden bg-gradient-to-br from-indigo-500/90 via-sky-500/90 to-emerald-500/90 text-white hover:shadow-md transition-shadow";
 node.style.opacity = '0';
 node.style.transform = 'scale(.98)';
 node._data = e;
 node.innerHTML = `
 <div class="h-full w-full p-1.5 sm:p-2.5 flex flex-col justify-between touch-manipulation">
 <div class="flex items-center gap-1 sm:gap-1.5">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0"><path d="M2 6h20l-2 12H4z"/><path d="M8 14 2 8"/><path d="m16 14 6-6"/></svg>
 <p class="text-[10px] sm:text-xs font-medium leading-tight tracking-tight line-clamp-1">${e.name}</p>
 </div>
 <div class="flex items-center justify-between text-[9px] sm:text-[11px] gap-1">
 <span class="inline-flex items-center gap-0.5 sm:gap-1 opacity-90">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
 <span class="hidden sm:inline">${formatTime12Hr(8 + e.start)}</span>
 <span class="sm:hidden">${formatTime12Hr(8 + e.start)}</span>
 </span>
 <span class="inline-flex items-center gap-0.5 sm:gap-1 opacity-90">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
 <span class="hidden sm:inline">Room ${1 + (e.id % 6)}</span>
 <span class="sm:hidden">R${1 + (e.id % 6)}</span>
 </span>
 </div>
 <span class="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 inline-flex items-center gap-0.5 sm:gap-1 rounded-full bg-white/90 text-neutral-800 px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-[10px] ring-1 ring-black/5">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-2.5 sm:w-3 h-2.5 sm:h-3 text-indigo-600"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
 <span class="hidden sm:inline">Stellah AI</span>
 <span class="sm:hidden">AI</span>
 </span>
 </div>
 `;
 eventsLayer.appendChild(node);
 layoutEvents();
 // Optimized animation
 node.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
 node.style.willChange = 'opacity, transform';
 requestAnimationFrame(() => {
 node.style.opacity = '1';
 node.style.transform = 'scale(1)';
 // Clean up will-change after animation
 setTimeout(() => {
 node.style.willChange = 'auto';
 }, 400);
 });
 placed++;
 bookedEl.textContent = placed;
 const pct = Math.min(100, Math.round((placed / capacity) * 100));
 barEl.style.width = pct + '%';
 pctEl.textContent = pct + '%';
 const targetShow = 80; // Target show-up rate %
 if (showRate < targetShow) {
 showRate = Math.min(targetShow, showRate + (Math.random() * 2));
 showRateEl.textContent = Math.round(showRate) + '%';
 }
 }, delay);
 }
 // Today mapping and visuals
 function getTodayIndex() {
 const d = new Date().getDay(); // 0 Sun - 6 Sat
 if (d === 0 || d === 6) return -1; // Weekend - no highlight
 return d - 1; // Mon=0, Tue=1, Wed=2, Thu=3, Fri=4
 }
 function highlightDayHeader() {
 const idx = getTodayIndex();
 dayHeaders.forEach((el, i) => {
 if (!el) return;
 el.classList.remove('bg-indigo-50');
 el.classList.remove('ring-1','ring-inset','ring-indigo-200');
 const badge = el.querySelector('.today-badge');
 if (badge) badge.remove();
 if (i === idx) {
 el.classList.add('bg-indigo-50','ring-1','ring-inset','ring-indigo-200');
 const b = document.createElement('div');
 b.className = "today-badge mx-auto mt-1 w-fit rounded-full bg-indigo-600/90 text-white px-2 py-0.5 text-[10px]";
 b.textContent = "Today";
 el.appendChild(b);
 }
 });
 }
 function positionTodayHighlight() {
 const rect = calendarGrid.getBoundingClientRect();
 const colW = rect.width / days;
 const idx = getTodayIndex();
 todayHighlight.style.left = `${idx * colW}px`;
 todayHighlight.style.width = `${colW}px`;
 }
 function positionCurrentTime() {
 // only visible during operating hours 8:00 - 20:00
 const now = new Date();
 const h = now.getHours();
 const m = now.getMinutes();
 const totalMinutes = (h * 60 + m);
 const startMinutes = 8 * 60;
 const endMinutes = 20 * 60;
 const within = totalMinutes >= startMinutes && totalMinutes <= endMinutes;
 const rect = eventsLayer.getBoundingClientRect();
 const colW = rect.width / days;
 const rowH = rect.height / rows;
 if (!within) {
 currentTimeLine.style.display = 'none';
 currentTimeDot.style.display = 'none';
 return;
 }
 currentTimeLine.style.display = 'block';
 currentTimeDot.style.display = 'block';
 const minutesIntoGrid = totalMinutes - startMinutes;
 const y = (minutesIntoGrid / (endMinutes - startMinutes)) * rect.height;
 const idx = getTodayIndex();
 const left = idx * colW;
 currentTimeLine.style.left = `${left}px`;
 currentTimeLine.style.right = `calc(100% - ${left + colW}px)`;
 currentTimeLine.style.top = `${y}px`;
 currentTimeDot.style.left = `${left - 5}px`;
 currentTimeDot.style.top = `${y - 4}px`;
 }
 const ro = new ResizeObserver(layoutEvents);
 ro.observe(eventsLayer);
 // Start simulation: shows "slots" filling automatically
 let t = 400;
 const step = 250;
 events.forEach((e) => {
 addEvent(e, t);
 t += step + Math.round(Math.random() * 200);
 });
 // Initial calendar cosmetics
 highlightDayHeader();
 positionTodayHighlight();
 positionCurrentTime();
 // keep current time line in sync
 setInterval(positionCurrentTime, 60 * 1000);
 window.addEventListener('resize', () => {
 positionTodayHighlight();
 positionCurrentTime();
 });
});
// Interactive Graph Animation
document.addEventListener('DOMContentLoaded', function() {
 const graphElement = document.getElementById('main-graph');
 if (!graphElement) return; // Exit if graph element doesn't exist
 const waterEffect = document.getElementById('water-effect');
 const capacityLine = document.getElementById('capacity-line');
 const workloadLine = document.getElementById('workload-line');
 const gapFill = document.getElementById('gap-fill');
 const dataPoints = document.getElementById('data-points');
 const crisisText = document.getElementById('crisis-text');
 const counterTeam = document.getElementById('counter-team');
 const counterOverflow = document.getElementById('counter-overflow');
 const counterCost = document.getElementById('counter-cost');
 // Intersection Observer for scroll trigger
 const observer = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 // Start animations when graph becomes visible
 if (entry.target.id === 'main-graph') {
 startGraphAnimation();
 }
 }
 });
 }, { threshold: 0.3 });
 observer.observe(graphElement);
 function startGraphAnimation() {
 // Start line animations
 setTimeout(() => {
 if (capacityLine) capacityLine.classList.add('animate');
 }, 250);
 setTimeout(() => {
 if (workloadLine) workloadLine.classList.add('animate');
 }, 500);
 // Show graph elements
 setTimeout(() => {
 if (gapFill) gapFill.classList.add('show');
 if (dataPoints) dataPoints.classList.add('show');
 }, 1000);
 setTimeout(() => {
 if (crisisText) crisisText.classList.add('show');
 }, 1250);
 // Start water effect
 setTimeout(() => {
 if (waterEffect) waterEffect.classList.add('animate');
 }, 1500);
 // Animate counters
 setTimeout(() => {
 animateCounters();
 }, 1000);
 }
 function animateCounters() {
 // Team size stays at 3
 // Animate overflow
 animateCounter(counterOverflow, 0, 2875, 1200, (value) => {
 return value.toLocaleString();
 });
 // Animate cost
 animateCounter(counterCost, 0, 21000, 1200, (value) => {
 return '$' + value.toLocaleString();
 });
 }
 // Optimized counter animation with early termination
 function animateCounter(element, start, end, duration, formatter) {
 if (!element) return;
 const startTime = performance.now();
 const range = end - start;
 let animationId;
 function update(currentTime) {
 const elapsed = currentTime - startTime;
 const progress = Math.min(elapsed / duration, 1);
 // Optimized easing calculation
 const easeOut = 1 - Math.pow(1 - progress, 3);
 const current = start + range * easeOut;
 const rounded = Math.round(current);
 element.textContent = formatter ? formatter(rounded) : rounded;
 if (progress < 1) {
 animationId = requestAnimationFrame(update);
 }
 }
 animationId = requestAnimationFrame(update);
 // Return cleanup function
 return () => {
 if (animationId) {
 cancelAnimationFrame(animationId);
 }
 };
 }
});
// Progressive Card Toggle Function
function toggleCard(card) {
 if (window.innerWidth < 1024) { // Only for mobile/tablet
 card.classList.toggle('expanded');
 }
}
// Optimized scroll trigger observer
document.addEventListener('DOMContentLoaded', function() {
 const scrollTriggers = document.querySelectorAll('.scroll-trigger');
 const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
 const scrollObserver = new IntersectionObserver((entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 const index = Array.from(scrollTriggers).indexOf(entry.target);
 entry.target.style.transitionDelay = `${index * 100}ms`;
 entry.target.classList.add('visible');
 scrollObserver.unobserve(entry.target); // Stop observing once animated
 }
 });
 }, { threshold: 0.2, rootMargin: '50px' });
 const animateObserver = new IntersectionObserver((entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 // Animate time allocation bars if they exist
 const timeBars = entry.target.querySelectorAll('.time-allocation-bar');
 timeBars.forEach(bar => {
 setTimeout(() => {
 bar.style.width = bar.dataset.width;
 }, 300);
 });
 animateObserver.unobserve(entry.target);
 }
 });
 }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
 scrollTriggers.forEach(trigger => {
 scrollObserver.observe(trigger);
 });
 animateOnScrollElements.forEach(element => {
 animateObserver.observe(element);
 });
 // Counter Animation for Results Section
 function animateCounter(element) {
 const target = parseInt(element.dataset.target);
 const prefix = element.dataset.prefix || '';
 const duration = 2000;
 let start = 0;
 const increment = target / (duration / 16);
 const timer = setInterval(() => {
 start += increment;
 if (start >= target) {
 start = target;
 clearInterval(timer);
 }
 if (target >= 1000) {
 element.textContent = prefix + Math.floor(start).toLocaleString();
 } else {
 element.textContent = prefix + Math.floor(start);
 }
 }, 16);
 }
 // Initialize counters when they come into view
 const counterObserver = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if (entry.isIntersecting && !entry.target.dataset.animated) {
 entry.target.dataset.animated = 'true';
 animateCounter(entry.target);
 }
 });
 }, { threshold: 0.5 });
 const counters = document.querySelectorAll('.counter-animate');
 counters.forEach(counter => {
 counterObserver.observe(counter);
 });
});

// ===================================
// Book Demo Modal Functions
// ===================================

// Global timeout reference for loading state
let loadingTimeout = null;

// Open modal function
function openBookDemoModal() {
  const modal = document.getElementById('bookDemoModal');
  if (!modal) return;

  document.body.classList.add('modal-active');
  modal.classList.remove('hidden');
  modal.classList.add('modal-open');

  // Reset loading state
  const loadingState = document.getElementById('formLoadingState');
  if (loadingState) {
    loadingState.classList.remove('hidden');
  }

  // Clear any existing timeout
  if (loadingTimeout) {
    clearTimeout(loadingTimeout);
  }

  // Fallback: Hide loading state after 1.5 seconds if iframe doesn't load
  loadingTimeout = setTimeout(() => {
    hideFormLoading();
  }, 1500);

  // Load form embed script if not already loaded
  if (!window.formEmbedLoaded) {
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    window.formEmbedLoaded = true;
  }

  // Focus close button for accessibility
  setTimeout(() => {
    modal.querySelector('button[onclick*="close"]')?.focus();
  }, 100);
}

// Close modal function
function closeBookDemoModal() {
  const modal = document.getElementById('bookDemoModal');
  if (!modal) return;

  modal.classList.remove('modal-open');
  modal.classList.add('hidden');
  document.body.classList.remove('modal-active');

  // Clear loading timeout if modal is closed
  if (loadingTimeout) {
    clearTimeout(loadingTimeout);
    loadingTimeout = null;
  }
}

// Hide form loading state
function hideFormLoading() {
  // Clear the fallback timeout since iframe loaded
  if (loadingTimeout) {
    clearTimeout(loadingTimeout);
    loadingTimeout = null;
  }

  const loadingState = document.getElementById('formLoadingState');
  if (loadingState && !loadingState.classList.contains('hidden')) {
    loadingState.classList.add('hidden');
  }
}

// ESC key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('bookDemoModal');
    if (modal && !modal.classList.contains('hidden')) {
      closeBookDemoModal();
    }
  }
});

// Breakthrough Section: Agents Slider functionality
const agentsSlider = document.getElementById('agentsSlider');
const prevAgentBtn = document.getElementById('prevAgent');
const nextAgentBtn = document.getElementById('nextAgent');
const sliderDots = document.querySelectorAll('.slider-dot');
const sliderStatus = document.getElementById('sliderStatus');

let currentAgentSlide = 0;
const totalAgentSlides = 3;

function updateAgentSlider() {
  if (!agentsSlider) return;

  // Update slider position
  const offset = -currentAgentSlide * 100;
  agentsSlider.style.transform = `translateX(${offset}%)`;

  // Update dots
  sliderDots.forEach((dot, index) => {
    if (index === currentAgentSlide) {
      dot.classList.remove('bg-stone-300');
      dot.classList.add('bg-orange-500');
      dot.setAttribute('aria-selected', 'true');
    } else {
      dot.classList.remove('bg-orange-500');
      dot.classList.add('bg-stone-300');
      dot.setAttribute('aria-selected', 'false');
    }
  });

  // Update screen reader announcement
  if (sliderStatus) {
    const agentNames = ['Client Care Specialist', 'Wellness Coordinator', 'Appointment Specialist'];
    sliderStatus.textContent = `Showing ${agentNames[currentAgentSlide]}, slide ${currentAgentSlide + 1} of ${totalAgentSlides}`;
  }
}

// Previous button
if (prevAgentBtn) {
  prevAgentBtn.addEventListener('click', () => {
    currentAgentSlide = (currentAgentSlide - 1 + totalAgentSlides) % totalAgentSlides;
    updateAgentSlider();
  });
}

// Next button
if (nextAgentBtn) {
  nextAgentBtn.addEventListener('click', () => {
    currentAgentSlide = (currentAgentSlide + 1) % totalAgentSlides;
    updateAgentSlider();
  });
}

// Dot navigation
sliderDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentAgentSlide = index;
    updateAgentSlider();
  });
});

// Initialize slider
updateAgentSlider();
