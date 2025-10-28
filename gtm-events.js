/**
 * Stellah AI - GTM Conversion Funnel Tracking
 *
 * Tracks user journey AFTER initial form submission:
 * Step 1: Form Submit (tracked in main GTM container)
 * Step 2: Quiz Page → Arrival
 * Step 3: Calendar Page → Arrival
 * Step 4: Thank You Page → CONVERSION
 *
 * This identifies drop-off points between funnel stages.
 * Container ID: GTM-PNJW4X5S
 */

(function() {
    'use strict';

    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];

    /**
     * Helper function to push events to GTM dataLayer
     */
    function pushEvent(eventName, eventData = {}) {
        window.dataLayer.push({
            'event': eventName,
            ...eventData
        });
        console.log('🎯 GTM Funnel Event:', eventName, eventData);
    }

    /**
     * Track funnel step arrival
     */
    function trackFunnelStep(stepNumber, stepName, pagePath) {
        pushEvent('funnel_step', {
            'funnel_name': 'Demo Booking Funnel',
            'step_number': stepNumber,
            'step_name': stepName,
            'page_path': pagePath || window.location.pathname
        });
    }

    /**
     * Track conversion (final funnel step)
     */
    function trackConversion(conversionType) {
        pushEvent('conversion', {
            'conversion_type': conversionType,
            'conversion_value': 1,
            'funnel_name': 'Demo Booking Funnel'
        });
    }

    // ==============================================
    // AUTO-DETECT PAGE AND TRACK FUNNEL STEP
    // ==============================================

    window.addEventListener('load', function() {
        const path = window.location.pathname;

        // Step 2: Quiz Page
        if (path.includes('/quiz-before-demo') || path.includes('/quiz')) {
            trackFunnelStep(2, 'Quiz Started', path);
            console.log('✅ Funnel: Quiz page loaded');
        }

        // Step 3: Calendar Page
        else if (path.includes('/calendar')) {
            trackFunnelStep(3, 'Calendar Opened', path);
            console.log('✅ Funnel: Calendar page loaded');
        }

        // Step 4: Thank You Page - CONVERSION
        else if (path.includes('/booking-successful') || path.includes('/thank-you')) {
            trackFunnelStep(4, 'Booking Completed', path);
            trackConversion('demo_booked');
            console.log('✅ Funnel: Conversion - Thank you page reached!');
        }
    });

    // ============================================
    // 1. PAGE VIEW TRACKING
    // ============================================

    // Track virtual pageview for SPA-style navigation
    function trackPageView(pagePath, pageTitle) {
        pushEvent('virtual_pageview', {
            'page_path': pagePath,
            'page_title': pageTitle
        });
    }

    // ============================================
    // 2. CTA BUTTON TRACKING
    // ============================================

    /**
     * Track "Book Demo" CTA clicks
     */
    window.trackBookDemoClick = function(location) {
        pushEvent('cta_click', {
            'cta_name': 'Book Demo',
            'cta_location': location, // 'hero', 'middle', 'bottom', 'nav'
            'cta_type': 'primary'
        });
    };

    /**
     * Track Dashboard view clicks
     */
    window.trackDashboardClick = function() {
        pushEvent('cta_click', {
            'cta_name': 'View Dashboard',
            'cta_location': 'hero_credibility',
            'cta_type': 'secondary'
        });
    };

    // ============================================
    // 3. USER ENGAGEMENT TRACKING
    // ============================================

    /**
     * Track progressive card expansions
     */
    window.trackCardExpansion = function(cardTitle) {
        pushEvent('card_interaction', {
            'interaction_type': 'expand',
            'card_title': cardTitle
        });
    };

    /**
     * Track FAQ accordion opens
     */
    window.trackAccordionOpen = function(questionText) {
        pushEvent('faq_interaction', {
            'interaction_type': 'expand',
            'question': questionText.substring(0, 100) // First 100 chars
        });
    };

    /**
     * Track modal opens/closes
     */
    window.trackModalInteraction = function(modalName, action) {
        pushEvent('modal_interaction', {
            'modal_name': modalName,
            'action': action // 'open' or 'close'
        });
    };

    // ============================================
    // 4. SCROLL DEPTH TRACKING
    // ============================================

    let scrollDepthTracked = {
        '25': false,
        '50': false,
        '75': false,
        '100': false
    };

    function trackScrollDepth() {
        const scrollPercent = Math.round(
            ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
        );

        ['25', '50', '75', '100'].forEach(depth => {
            if (scrollPercent >= parseInt(depth) && !scrollDepthTracked[depth]) {
                scrollDepthTracked[depth] = true;
                pushEvent('scroll_depth', {
                    'depth_percentage': depth,
                    'page_path': window.location.pathname
                });
            }
        });
    }

    // Throttle scroll events (max once per 500ms)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(trackScrollDepth, 500);
    }, { passive: true });

    // ============================================
    // 5. FORM TRACKING
    // ============================================

    /**
     * Track form iframe load (demo form opened)
     */
    window.trackFormLoad = function() {
        pushEvent('form_interaction', {
            'form_name': 'Stellah AI Demo Form',
            'interaction_type': 'form_loaded'
        });
    };

    /**
     * Track form submission (thank you page)
     */
    window.trackFormSubmission = function(formName) {
        pushEvent('form_submit', {
            'form_name': formName || 'Stellah AI Demo Form'
        });

        // Also push conversion event
        pushEvent('conversion', {
            'conversion_type': 'demo_booked',
            'conversion_value': 1
        });
    };

    // ============================================
    // 6. CALENDAR INTERACTIONS
    // ============================================

    /**
     * Track calendar date selection
     */
    window.trackCalendarDateSelect = function(date) {
        pushEvent('calendar_interaction', {
            'interaction_type': 'date_selected',
            'selected_date': date
        });
    };

    /**
     * Track calendar time slot selection
     */
    window.trackCalendarTimeSelect = function(time) {
        pushEvent('calendar_interaction', {
            'interaction_type': 'time_selected',
            'selected_time': time
        });
    };

    /**
     * Track calendar booking completion
     */
    window.trackCalendarBooking = function() {
        pushEvent('calendar_interaction', {
            'interaction_type': 'booking_completed'
        });

        // Also track as conversion
        pushEvent('conversion', {
            'conversion_type': 'appointment_booked',
            'conversion_value': 1
        });
    };

    // ============================================
    // 7. QUIZ INTERACTIONS
    // ============================================

    /**
     * Track quiz question answered
     */
    window.trackQuizAnswer = function(questionNumber, answer) {
        pushEvent('quiz_interaction', {
            'interaction_type': 'question_answered',
            'question_number': questionNumber,
            'answer': answer
        });
    };

    /**
     * Track quiz completion
     */
    window.trackQuizCompletion = function(totalQuestions) {
        pushEvent('quiz_interaction', {
            'interaction_type': 'quiz_completed',
            'total_questions': totalQuestions
        });
    };

    // ============================================
    // 8. NAVIGATION TRACKING
    // ============================================

    /**
     * Track navigation menu clicks
     */
    window.trackNavClick = function(linkText, linkUrl) {
        pushEvent('navigation_click', {
            'link_text': linkText,
            'link_url': linkUrl,
            'click_type': 'nav_menu'
        });
    };

    /**
     * Track outbound link clicks
     */
    function trackOutboundLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            // Skip own domain
            if (link.href.includes(window.location.hostname)) return;

            link.addEventListener('click', function(e) {
                pushEvent('outbound_click', {
                    'link_url': this.href,
                    'link_text': this.textContent.trim().substring(0, 50)
                });
            });
        });
    }

    // ============================================
    // 9. ERROR TRACKING
    // ============================================

    /**
     * Track JavaScript errors
     */
    window.addEventListener('error', function(e) {
        pushEvent('javascript_error', {
            'error_message': e.message,
            'error_file': e.filename,
            'error_line': e.lineno,
            'error_column': e.colno
        });
    });

    // ============================================
    // 10. PAGE PERFORMANCE
    // ============================================

    /**
     * Track page load performance
     */
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (window.performance && window.performance.timing) {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;

                pushEvent('page_performance', {
                    'page_load_time': pageLoadTime,
                    'dom_ready_time': domReadyTime,
                    'page_path': window.location.pathname
                });
            }
        }, 0);
    });

    // ============================================
    // INITIALIZATION
    // ============================================

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            trackOutboundLinks();
        });
    } else {
        trackOutboundLinks();
    }

    console.log('✅ Stellah AI GTM Event Tracking Initialized');

})();
