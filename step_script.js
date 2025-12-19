// script.js
// في هذه المرحلة لا يوجد منطق تفاعلي معقد. يمكن استخدام هذا الملف لاحقًا
// لإضافة وظائف مثل جلب بيانات الدورات من قاعدة بيانات أو التحكم في تسجيل الدخول.

console.log('مرحبا بكم في أكاديمية عايد لاختبار STEP');

// Function to parse query parameters
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Populate signup page dynamically based on selected course
function initSignupPage() {
  const courseKey = getQueryParam('course');
  if (!courseKey) return;
  const courses = {
    basic: {
      title: 'التسجيل في دورة ستيب الأساسية',
      desc: '129 محاضرة مسجلة – 120 يوم اشتراك – 16 اختبار محاكي – 37 ملف قابل للتحميل – السعر: 399 ر.س'
    },
    premium: {
      title: 'التسجيل في دورة ستيب المميزة',
      desc: '12 محاضرة مباشرة – مجموعات صغيرة – 90 يوم اشتراك – 50 نموذج محاكي – السعر: 599 ر.س'
    },
    private: {
      title: 'التسجيل في دورة ستيب البرايفت (Premium)',
      desc: 'جلسات فردية عبر Zoom – 12 محاضرة – 120 يوم اشتراك – 50 نموذج تدريبي – السعر: 1,499 ر.س'
    }
  };
  const selected = courses[courseKey] || {};
  const courseTitleEl = document.getElementById('courseTitle');
  const courseDescEl = document.getElementById('courseDesc');
  if (courseTitleEl) courseTitleEl.textContent = selected.title || 'التسجيل في الدورة';
  if (courseDescEl) courseDescEl.textContent = selected.desc || '';

  const form = document.getElementById('signupForm');
  const confirmation = document.getElementById('confirmationMessage');
  if (form && confirmation) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Display confirmation message; in future, integrate with backend/Firestore
      confirmation.textContent = 'شكرًا لك، تم استلام طلبك وسيتم التواصل معك قريبًا لتأكيد الاشتراك.';
      confirmation.classList.remove('hidden');
      // Optionally hide the form
      form.style.display = 'none';
    });
  }
}

// Initialize pages based on path
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('step_signup.html')) {
    initSignupPage();
  }
  // Cookie banner logic
  initCookieBanner();
});

// Utility functions for cookies
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Initialize cookie banner logic
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('acceptCookies');
  if (!banner || !acceptBtn) return;
  // Show banner if consent not yet given
  if (!getCookie('cookieConsent')) {
    banner.classList.remove('hidden');
  }
  acceptBtn.addEventListener('click', function() {
    setCookie('cookieConsent', 'true', 365);
    banner.classList.add('hidden');
  });
}