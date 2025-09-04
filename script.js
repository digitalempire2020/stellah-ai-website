
// DOM Elements
const calendarGrid = document.querySelector('.calendar-grid');
const currentMonthElement = document.querySelector('.current-month');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const searchInput = document.querySelector('#search');
const exportBtn = document.querySelector('.export-btn');
const viewToggleButtons = document.querySelectorAll('.view-toggle button');

// Calendar state
let currentDate = new Date();
let currentView = 'month';

// Sample appointment data
const appointments = {
    '2024-01-15': [
        { time: '09:00', patient: 'John Doe', type: 'Consultation', urgent: false },
        { time: '10:30', patient: 'Jane Smith', type: 'Follow-up', urgent: false },
        { time: '14:00', patient: 'Mike Johnson', type: 'Emergency', urgent: true }
    ],
    '2024-01-16': [
        { time: '11:00', patient: 'Sarah Wilson', type: 'Check-up', urgent: false },
        { time: '15:30', patient: 'David Brown', type: 'Consultation', urgent: false }
    ],
    '2024-01-17': [
        { time: '08:30', patient: 'Lisa Davis', type: 'Follow-up', urgent: false },
        { time: '13:00', patient: 'Robert Miller', type: 'Emergency', urgent: true },
        { time: '16:00', patient: 'Emily Taylor', type: 'Consultation', urgent: false }
    ],
    '2024-01-22': [
        { time: '10:00', patient: 'Chris Anderson', type: 'Check-up', urgent: false },
        { time: '14:30', patient: 'Amanda White', type: 'Consultation', urgent: false }
    ],
    '2024-01-23': [
        { time: '09:30', patient: 'Kevin Martinez', type: 'Follow-up', urgent: false },
        { time: '11:30', patient: 'Jessica Garcia', type: 'Emergency', urgent: true }
    ]
};

// Month names
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Day names
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    renderCalendar();
    setupEventListeners();
    updateStats();
});

// Initialize animations for page load
function initializeAnimations() {
    // Add animation classes to elements
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-in');
    const blurElements = document.querySelectorAll('.blur-in');
    
    // Trigger animations after a short delay
    setTimeout(() => {
        fadeElements.forEach(el => el.style.animationPlayState = 'running');
        slideElements.forEach(el => el.style.animationPlayState = 'running');
        blurElements.forEach(el => el.style.animationPlayState = 'running');
    }, 100);
    
    // Animate calendar events
    setTimeout(() => {
        animateCalendarEvents();
    }, 500);
}

// Animate calendar events with staggered timing
function animateCalendarEvents() {
    const events = document.querySelectorAll('.calendar-event');
    events.forEach((event, index) => {
        setTimeout(() => {
            event.style.opacity = '1';
            event.style.transform = 'scale(1)';
        }, index * 100);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Calendar navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Export functionality
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExport);
    }
    
    // View toggle
    viewToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewToggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentView = button.textContent.toLowerCase();
            renderCalendar();
        });
    });
}

// Render the calendar
function renderCalendar() {
    if (!calendarGrid) return;
    
    // Update current month display
    if (currentMonthElement) {
        currentMonthElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
    
    // Clear existing calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Generate calendar days
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = createDayElement(date, currentDate.getMonth());
        calendarGrid.appendChild(dayElement);
    }
    
    // Re-animate events
    setTimeout(animateCalendarEvents, 100);
}

// Create a day element
function createDayElement(date, currentMonth) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (date.getMonth() !== currentMonth) {
        dayElement.classList.add('other-month');
    }
    
    // Day number
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.getDate();
    dayElement.appendChild(dayNumber);
    
    // Add appointments for this day
    const dateString = formatDate(date);
    if (appointments[dateString]) {
        appointments[dateString].forEach(appointment => {
            const eventElement = createEventElement(appointment);
            dayElement.appendChild(eventElement);
        });
    }
    
    return dayElement;
}

// Create an event element
function createEventElement(appointment) {
    const eventElement = document.createElement('div');
    eventElement.className = 'calendar-event';
    
    if (appointment.urgent) {
        eventElement.classList.add('urgent');
    } else if (appointment.type === 'Follow-up') {
        eventElement.classList.add('follow-up');
    }
    
    eventElement.textContent = `${appointment.time} ${appointment.patient}`;
    eventElement.title = `${appointment.type} - ${appointment.patient} at ${appointment.time}`;
    
    // Add click handler
    eventElement.addEventListener('click', () => {
        showAppointmentDetails(appointment);
    });
    
    return eventElement;
}

// Format date as string
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Handle search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const events = document.querySelectorAll('.calendar-event');
    
    events.forEach(event => {
        const text = event.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            event.style.display = 'block';
            event.parentElement.style.opacity = '1';
        } else {
            event.style.display = searchTerm ? 'none' : 'block';
        }
    });
    
    // Highlight matching days
    const days = document.querySelectorAll('.calendar-day');
    days.forEach(day => {
        const hasVisibleEvents = Array.from(day.querySelectorAll('.calendar-event'))
            .some(event => event.style.display !== 'none');
        
        if (searchTerm && hasVisibleEvents) {
            day.style.background = 'rgba(79, 70, 229, 0.2)';
        } else {
            day.style.background = '';
        }
    });
}

// Handle export functionality
function handleExport() {
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();
    
    // Create CSV content
    let csvContent = `Medical Appointments - ${currentMonth} ${currentYear}\n`;
    csvContent += 'Date,Time,Patient,Type,Urgent\n';
    
    Object.entries(appointments).forEach(([date, dayAppointments]) => {
        const appointmentDate = new Date(date);
        if (appointmentDate.getMonth() === currentDate.getMonth() && 
            appointmentDate.getFullYear() === currentDate.getFullYear()) {
            
            dayAppointments.forEach(appointment => {
                csvContent += `${date},${appointment.time},${appointment.patient},${appointment.type},${appointment.urgent}\n`;
            });
        }
    });
    
    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments-${currentMonth}-${currentYear}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    showNotification('Appointments exported successfully!');
}

// Show appointment details
function showAppointmentDetails(appointment) {
    const modal = createModal(`
        <h3>${appointment.type}</h3>
        <p><strong>Patient:</strong> ${appointment.patient}</p>
        <p><strong>Time:</strong> ${appointment.time}</p>
        <p><strong>Type:</strong> ${appointment.type}</p>
        <p><strong>Status:</strong> ${appointment.urgent ? 'Urgent' : 'Regular'}</p>
    `);
    
    document.body.appendChild(modal);
}

// Create a modal
function createModal(content) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    `;
    
    modal.innerHTML = content + '<button onclick="this.parentElement.parentElement.remove()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>';
    
    overlay.appendChild(modal);
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    return overlay;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update statistics
function updateStats() {
    // Calculate stats from appointments
    const today = new Date();
    const todayString = formatDate(today);
    const todayAppointments = appointments[todayString] || [];
    
    // Update booked today
    const bookedTodayElement = document.querySelector('.stats-grid .stat-card:nth-child(1) h3');
    if (bookedTodayElement) {
        bookedTodayElement.textContent = todayAppointments.length;
    }
    
    // Calculate show-up rate (mock data)
    const showUpRateElement = document.querySelector('.stats-grid .stat-card:nth-child(2) h3');
    if (showUpRateElement) {
        showUpRateElement.textContent = '89%';
    }
    
    // Calculate capacity
    const capacityElement = document.querySelector('.stats-grid .stat-card:nth-child(3) h3');
    if (capacityElement) {
        const totalSlots = 12; // Mock total daily slots
        const bookedSlots = todayAppointments.length;
        const capacity = Math.round((bookedSlots / totalSlots) * 100);
        capacityElement.textContent = `${capacity}%`;
    }
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
