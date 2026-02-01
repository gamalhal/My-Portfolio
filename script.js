/* 
    ========================================
    ملف JavaScript الرئيسي - موقع جمال حال الشخصي
    ========================================
    
    هذا الملف يحتوي على:
    1. تبديل الوضع الداكن/الفاتح
    2. شاشة التحميل
    3. قائمة الموبايل
    4. التنقل السلس
    5. تصفية المشاريع
    6. نموذج التواصل
    7. تأثيرات حركية
    8. التصميم المتجاوب
    
    المميزات:
    - تفاعل ديناميكي
    - تأثيرات بصرية
    - حفظ التفضيلات
    - تحقق من صحة البيانات
*/

/* 
    ========================================
    تهيئة EmailJS
    ========================================
    التحقق من تحميل SDK وتهيئتها
*/
// الانتظار قليلاً للتأكد من تحميل SDK
setTimeout(() => {
  if (window.emailjs) {
    console.log("✅ EmailJS SDK loaded successfully");
  } else {
    console.warn("⚠️ EmailJS SDK not loaded. Check CDN link.");
  }
}, 100);

/* 
    ========================================
    تبديل الوضع الداكن/الفاتح
    ========================================
    يسمح للمستخدم بالتبديل بين الوضعين وحفظ تفضيله
*/
const themeToggle = document.getElementById("theme-toggle"); // زر التبديل
const html = document.documentElement; // عنصر HTML الرئيسي
const sunIcon = '<i class="fas fa-sun"></i>'; // أيقونة الشمس للوضع الداكن
const moonIcon = '<i class="fas fa-moon"></i>'; // أيقونة القمر للوضع الفاتح

// التحقق من الوضع المحفوظ أو استخدام الوضع الداكن افتراضياً
const currentTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", currentTheme); // تطبيق الوضع
updateThemeIcon(currentTheme); // تحديث الأيقونة

// إضافة مستمع الحدث لزر التبديل
themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme"); // الوضع الحالي
  const newTheme = currentTheme === "dark" ? "light" : "dark"; // الوضع الجديد

  html.setAttribute("data-theme", newTheme); // تطبيق الوضع الجديد
  localStorage.setItem("theme", newTheme); // حفظ التفضيل
  updateThemeIcon(newTheme); // تحديث الأيقونة
});

// دالة تحديث أيقونة الوضع
function updateThemeIcon(theme) {
  themeToggle.innerHTML = theme === "dark" ? sunIcon : moonIcon;
}

/* 
    ========================================
    شاشة التحميل
    ========================================
    تظهر عند بدء تحميل الموقع وتختفي تلقائياً
*/
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen"); // شاشة التحميل

  // إخفاء شاشة التحميل بعد 1.5 ثانية
  setTimeout(() => {
    loadingScreen.style.opacity = "0"; // جعلها شفافة

    // إخفاءها تماماً بعد انتهاء الانتقال
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1500);
});

/* 
    ========================================
    قائمة الموبايل (Hamburger Menu)
    ========================================
    تظهر على الشاشات الصغيرة وتختفي على الشاشات الكبيرة
*/
const hamburger = document.querySelector(".hamburger"); // زر القائمة
const navMenu = document.querySelector(".nav-menu"); // قائمة التنقل

// إضافة مستمع الحدث لزر القائمة
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active"); // تبديل حالة الزر
  navMenu.classList.toggle("active"); // إظهار/إخفاء القائمة
});

// إغلاق القائمة عند النقر على أي رابط
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active"); // إزالة حالة النشاط من الزر
    navMenu.classList.remove("active"); // إخفاء القائمة
  }),
);

/* 
    ========================================
    التنقل السلس (Smooth Scrolling)
    ========================================
    انتقال سلس بين أقسام الموقع عند النقر على روابط التنقل
*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // منع السلوك الافتراضي

    const target = document.querySelector(this.getAttribute("href")); // العنصر المستهدف

    if (target) {
      // التمرير السلس إلى العنصر المستهدف
      target.scrollIntoView({
        behavior: "smooth", // تمرير سلس
        block: "start", // بداية العنصر
      });
    }
  });
});

/* 
    ========================================
    تمييز رابط التنقل النشط
    ========================================
    يحدد الرابط النشط بناءً على القسم المرئي حالياً
*/
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]"); // جميع الأقسام
  const navLinks = document.querySelectorAll(".nav-link"); // جميع روابط التنقل

  let current = ""; // القسم الحالي

  // تحديد القسم المرئي حالياً
  sections.forEach((section) => {
    const sectionTop = section.offsetTop; // موقع القسم من الأعلى
    const sectionHeight = section.clientHeight; // ارتفاع القسم

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id"); // تحديث القسم الحالي
    }
  });

  // إزالة التمييز من جميع الروابط وإضافته للرابط النشط
  navLinks.forEach((link) => {
    link.classList.remove("active"); // إزالة التمييز

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active"); // إضافة التمييز
    }
  });
});

/* 
    ========================================
    تصفية المشاريع
    ========================================
    يسمح بتصفية المشاريع حسب النوع (الكل، Native، Framework)
*/
const filterButtons = document.querySelectorAll(".filter-btn"); // أزرار التصفية
const projectCards = document.querySelectorAll(".project-card"); // بطاقات المشاريع

// إضافة مستمعي الأحداث لأزرار التصفية
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // إزالة التمييز من جميع الأزرار
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // إضافة التمييز للزر المحدد
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter"); // قيمة التصفية

    // تصفية المشاريع
    projectCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category"); // فئة المشروع

      if (filterValue === "all" || cardCategory === filterValue) {
        card.style.display = "block"; // إظهار المشروع
        card.style.animation = "fadeIn 0.5s ease"; // تأثير الظهور
      } else {
        card.style.display = "none"; // إخفاء المشروع
      }
    });
  });
});

/* 
    ========================================
    تأثير الظهور للمشاريع
    ========================================
    إضافة تأثير حركي عند ظهور المشاريع
*/
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

/* 
    ========================================
    نموذج التواصل
    ========================================
    معالجة إرسال الرسائل والتحقق من صحة البيانات
*/
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // منع الإرسال الافتراضي

    // الحصول على بيانات النموذج
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value; // الاسم
    const email = this.querySelector('input[type="email"]').value; // البريد الإلكتروني
    const message = this.querySelector("textarea").value; // الرسالة

    // التحقق من ملء جميع الحقول
    if (!name || !email || !message) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    // تحضير واجهة زر الإرسال
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent; // النص الأصلي
    submitButton.textContent = "جاري الإرسال..."; // نص التحميل
    submitButton.disabled = true; // تعطيل الزر

    // قراءة إعدادات EmailJS من خصائص النموذج (ضع القيم الحقيقية في index.html)
    const formEl = this;
    const serviceID = formEl.dataset.emailjsService || "YOUR_SERVICE_ID";
    const templateID = formEl.dataset.emailjsTemplate || "YOUR_TEMPLATE_ID";
    const publicKey = formEl.dataset.emailjsUser || "YOUR_PUBLIC_KEY";

    // إذا كانت مكتبة EmailJS متاحة ومُعدّة، استخدمها لإرسال الرسالة فعلياً
    if (window.emailjs && publicKey !== "YOUR_PUBLIC_KEY") {
      try {
        // تهيئة EmailJS (قد تكون مُهيّأة مسبقاً فنتجاهل الخطأ)
        emailjs.init(publicKey);
        console.log("✅ EmailJS initialized with public key");
      } catch (e) {
        console.log(
          "ℹ️ EmailJS already initialized or init error (safe to ignore):",
          e.message,
        );
      }

      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
      };

      console.log("📤 Attempting to send email...");
      console.log("Service ID:", serviceID);
      console.log("Template ID:", templateID);
      console.log("Params:", templateParams);

      emailjs.send(serviceID, templateID, templateParams).then(
        () => {
          console.log("✅ Email sent successfully!");
          alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
          formEl.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        },
        (err) => {
          console.error("❌ EmailJS error:", err);
          console.error("Error status:", err.status);
          console.error("Error text:", err.text);
          const errorMsg =
            err.text || err.message || "تحقق من أسماء المتغيرات في القالب";
          alert("❌ خطأ في الإرسال:\n" + errorMsg);
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        },
      );
    } else {
      // إذا لم تُعدّ EmailJS بعد، نرجع للمحاكاة القديمة مع تحذير للمطور
      console.warn("⚠️ EmailJS not configured:");
      console.warn("- window.emailjs exists?", !!window.emailjs);
      console.warn("- publicKey configured?", publicKey !== "YOUR_PUBLIC_KEY");
      console.warn("- serviceID:", serviceID);
      console.warn("- templateID:", templateID);
      console.warn("- publicKey:", publicKey);

      setTimeout(() => {
        alert("تم إرسال رسالتك بنجاح! (محاكاة - لم تُعدّ EmailJS)");
        formEl.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    }
  });
}

/* 
    ========================================
    تأثير الظهور عند التمرير
    ========================================
    إظهار العناصر تدريجياً عند التمرير إليها
*/
const observerOptions = {
  threshold: 0.1, // نسبة العنصر المرئية
  rootMargin: "0px 0px -50px 0px", // هامش إضافي
};

// إنشاء مراقب للعناصر
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"; // إظهار العنصر
      entry.target.style.transform = "translateY(0)"; // إعادة موضعه
    }
  });
}, observerOptions);

// مراقبة جميع الأقسام
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"; // إخفاء القسم
  section.style.transform = "translateY(30px)"; // تحريكه للأسفل
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"; // انتقال سلس
  observer.observe(section); // بدء المراقبة
});

/* 
    ========================================
    تأثير الكتابة للعنوان الرئيسي
    ========================================
    محاكاة الكتابة التدريجية للعنوان
*/
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = ""; // مسح النص

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i); // إضافة حرف واحد
      i++;
      setTimeout(type, speed); // تأخير قبل الحرف التالي
    }
  }

  type(); // بدء الكتابة
}

// بدء تأثير الكتابة عند تحميل الصفحة
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent; // النص الأصلي
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 150); // بدء الكتابة
    }, 2000);
  }
});

/* 
    ========================================
    تأثير Parallax للقسم الرئيسي
    ========================================
    حركة بطيئة للعناصر عند التمرير
*/
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset; // مقدار التمرير
  const heroSection = document.querySelector(".hero-section");
  const profileCircle = document.querySelector(".profile-circle");

  if (heroSection && profileCircle) {
    const rate = scrolled * -0.5; // معدل الحركة
    profileCircle.style.transform = `translateY(${rate}px)`; // تطبيق الحركة
  }
});

/* 
    ========================================
    تأثيرات التمرير لبطاقات المشاريع
    ========================================
    تأثيرات بصرية عند التمرير على المشاريع
*/
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"; // رفع وتكبير البطاقة
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"; // إعادة البطاقة لحجمها الطبيعي
  });
});

/* 
    ========================================
    ظهور تدريجي للمهارات
    ========================================
    إظهار بطاقات المهارات بتأخير متدرج
*/
const skillTags = document.querySelectorAll(".skill-tag");
skillTags.forEach((tag, index) => {
  tag.style.opacity = "0"; // إخفاء المهارة
  tag.style.transform = "translateY(20px)"; // تحريكها للأسفل
  tag.style.transition = "opacity 0.5s ease, transform 0.5s ease"; // انتقال سلس

  // إظهار المهارة بتأخير متدرج
  setTimeout(
    () => {
      tag.style.opacity = "1"; // إظهار المهارة
      tag.style.transform = "translateY(0)"; // إعادة موضعها
    },
    1000 + index * 100,
  ); // تأخير متدرج
});

/* 
    ========================================
    زر العودة للأعلى
    ========================================
    زر يظهر عند التمرير للأسفل للعودة للقسم الرئيسي
*/
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'; // أيقونة السهم
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--accent-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 1.2rem;
`;

document.body.appendChild(scrollToTopBtn); // إضافة الزر للصفحة

// إظهار زر العودة للأعلى فقط عند الوصول لنهاية الصفحة
window.addEventListener("scroll", () => {
  const scrollPosition = window.innerHeight + window.pageYOffset;
  const pageHeight = document.body.offsetHeight;
  if (pageHeight - scrollPosition < 50) {
    // إذا كان المستخدم قريب جداً من أسفل الصفحة
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

// العودة للأعلى عند النقر على الزر
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0, // أعلى الصفحة
    behavior: "smooth", // تمرير سلس
  });
});

/*
    ========================================
    تأثير التحميل للصور
    ========================================
    إظهار تدريجي للصور عند تحميلها
*/
const images = document.querySelectorAll("img");
images.forEach((img) => {
  // استثناء صورة القسم الرئيسي من تأثير التحميل
  if (!img.closest(".hero-image")) {
    img.addEventListener("load", function () {
      this.style.opacity = "1"; // إظهار الصورة
    });

    img.style.opacity = "0"; // إخفاء الصورة
    img.style.transition = "opacity 0.3s ease"; // انتقال سلس
  }
});

/* 
    ========================================
    تأثير الجزيئات في القسم الرئيسي
    ========================================
    إضافة جزيئات متحركة للخلفية
*/
function createParticle() {
  const particle = document.createElement("div"); // إنشاء جزيء
  particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: float-particle 6s linear infinite;
    `;

  particle.style.left = Math.random() * 100 + "%"; // موقع عشوائي أفقي
  particle.style.animationDelay = Math.random() * 6 + "s"; // تأخير عشوائي

  document.querySelector(".hero-section").appendChild(particle); // إضافة الجزيء

  // إزالة الجزيء بعد انتهاء الحركة
  setTimeout(() => {
    particle.remove();
  }, 6000);
}

// إضافة حركة الجزيئات
const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// إنشاء جزيئات بشكل دوري
setInterval(createParticle, 300);

// إنشاء جزيئات أولية عند التحميل
for (let i = 0; i < 10; i++) {
  setTimeout(createParticle, i * 200);
}

/* 
    ========================================
    تبديل اللغة (عربي/إنجليزي)
    ========================================
    يسمح للمستخدم بالتبديل بين اللغتين وحفظ تفضيله
*/
const langToggle = document.getElementById("lang-toggle");
const htmlTag = document.documentElement;

// دالة لتغيير اللغة
function setLanguage(lang) {
  // تغيير النصوص
  document.querySelectorAll("[data-ar][data-en]").forEach((el) => {
    el.textContent =
      lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
  });
  // تغيير اتجاه الصفحة
  htmlTag.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  htmlTag.setAttribute("lang", lang);
  // تغيير نص زر اللغة
  langToggle.textContent = lang === "ar" ? "English" : "عربي";
  // حفظ التفضيل
  localStorage.setItem("lang", lang);
}

// عند الضغط على زر اللغة
langToggle.addEventListener("click", () => {
  const currentLang = localStorage.getItem("lang") || "ar";
  const newLang = currentLang === "ar" ? "en" : "ar";
  setLanguage(newLang);
});

// عند تحميل الصفحة، استخدم اللغة المحفوظة أو العربية افتراضياً
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "ar";
  setLanguage(savedLang);
});

/*
    ========================================
    فتح المشروع عند الضغط على الكارت
    ========================================
    عند الضغط على كارت المشروع بالكامل، يتم فتح أول رابط live demo في نافذة جديدة
*/
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    // تجاهل الضغط إذا كان على رابط أو زر داخل الكارت
    if (e.target.closest("a, button")) return;
    // الحصول على أول رابط live demo (project-link) داخل الكارت
    const liveLink = card.querySelector(".project-links .project-link");
    if (liveLink && liveLink.href) {
      window.open(liveLink.href, "_blank");
    }
  });
});
