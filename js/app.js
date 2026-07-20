/* MIDGO Interactive App Controller */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Scroll Tracking
  initScrollNav();
  
  // Staggered reveals
  initScrollReveals();
  
  // Interactive elements
  initInteractiveElements();
  
  // Language Switcher
  initLanguageSwitcher();
});

/* --- Scroll & Navigation --- */
function initScrollNav() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  // Header shrink on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.paddingBlock = 'var(--space-xs)';
      header.style.backgroundColor = 'rgba(250, 247, 244, 0.95)';
    } else {
      header.style.paddingBlock = '0';
      header.style.backgroundColor = 'rgba(250, 247, 244, 0.85)';
    }
    
    // Highlight current section in nav
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

/* --- Scroll-triggered Reveals --- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .staggered-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Trigger specific section animations if needed
        if (entry.target.id === 'section-04') {
          animatePersonalityBars();
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => observer.observe(el));
}

function animatePersonalityBars() {
  const bars = document.querySelectorAll('.personality-bar');
  bars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-width');
    bar.style.width = targetWidth;
  });
}

/* --- Interactive Elements (Colors, Accordions, Motion) --- */
function initInteractiveElements() {
  // Click to copy color codes
  const colorCards = document.querySelectorAll('.color-swatch-card');
  colorCards.forEach(card => {
    card.addEventListener('click', () => {
      const hex = card.getAttribute('data-hex');
      navigator.clipboard.writeText(hex).then(() => {
        showToast(`Copied ${hex} to clipboard`);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });
  
  // Pain Points Accordion
  const painPointItems = document.querySelectorAll('.pain-point-item');
  painPointItems.forEach(item => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      painPointItems.forEach(i => i.classList.remove('active'));
      // Open selected
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // Spacing Grid Toggle (Swiss Grid Visualizer)
  const gridToggle = document.createElement('div');
  gridToggle.className = 'grid-toggle-btn';
  gridToggle.innerHTML = 'Grid View';
  gridToggle.style.cssText = `
    position: fixed;
    bottom: var(--space-lg);
    left: var(--space-lg);
    background: var(--plum);
    color: var(--cream);
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-pill);
    font-family: var(--font-mono);
    font-size: 10px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: var(--shadow-md);
    border: none;
    transition: all var(--transition-fast);
  `;
  document.body.appendChild(gridToggle);
  
  const gridOverlay = document.querySelector('.grid-overlay');
  gridToggle.addEventListener('click', () => {
    gridOverlay.classList.toggle('active');
    gridToggle.classList.toggle('active');
    if (gridOverlay.classList.contains('active')) {
      gridToggle.style.backgroundColor = 'var(--bronze)';
      gridToggle.style.color = 'var(--charcoal)';
    } else {
      gridToggle.style.backgroundColor = 'var(--plum)';
      gridToggle.style.color = 'var(--cream)';
    }
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* --- Translation / Localization System --- */
const translations = {
  en: {
    // Navigation
    'nav-about': 'About',
    'nav-positioning': 'Positioning',
    'nav-personality': 'Personality',
    'nav-design-system': 'Design System',
    'nav-ui': 'Components',
    'nav-products': 'Future Products',
    
    // Hero
    'hero-tagline': 'Your First Destination to Understand Your Skin.',
    'hero-sub': 'Saudi Arabia • Digital Dermatology Education',
    
    // About
    'about-num': '02',
    'about-title': 'Education First. Treatment Second.',
    'about-desc': 'MIDGO is a digital dermatology education platform founded by a dermatologist. We empower people to understand their skin before starting any treatment. We do not sell treatments; we build understanding.',
    'mission-title': 'Our Mission',
    'mission-desc': 'To democratize dermatological education by providing evidence-based, culturally nuanced, and scientifically rigorous guides that empower individuals in Saudi Arabia and the wider region.',
    'vision-title': 'Our Vision',
    'vision-desc': 'To become the leading digital authority on skin wellness in the Middle East, transforming the way people approach skincare through research and interactive educational tools.',
    
    // Positioning
    'pos-num': '03',
    'pos-title': 'Brand Positioning',
    'pos-subtitle': 'Bridging the gap between medical expertise and daily skincare practices.',
    'target-title': 'Target Audience',
    'target-desc': 'Skincare enthusiasts, wellness seekers, and patients struggling with chronic skin conditions in Saudi Arabia who are overwhelmed by online misinformation and desire clinical clarity.',
    'promise-title': 'Brand Promise',
    'promise-desc': 'We promise evidence-based, scientifically accurate dermatology knowledge translated into clear, actionable, and culturally relevant digital learning experiences.',
    
    // Pain Points
    'pain-1-title': 'Information Overload & Misinformation',
    'pain-1-desc': 'Users are overwhelmed by beauty influencers promoting complex, unverified 10-step routines that often irritate the skin barrier.',
    'pain-2-title': 'Lack of Culturally Relevant Advice',
    'pain-2-desc': 'Most dermatology literature is in English and calibrated for European/Western climates and skin types, ignoring regional heat, UV index, and specific local skin concerns.',
    'pain-3-title': 'High Cost of Trial-and-Error',
    'pain-3-desc': 'Buying high-end skincare products blindly without knowing one\'s true skin barrier type leads to empty wallets and damaged skin.',
    
    // Personality
    'pers-num': '04',
    'pers-title': 'Brand Personality',
    'pers-doctor': 'Doctor (70%)',
    'pers-doctor-desc': 'Authoritative, precise, scientific, and evidence-based. The foundation of MIDGO lies in medical expertise and clinical truth.',
    'pers-mentor': 'Mentor (20%)',
    'pers-mentor-desc': 'Guiding, encouraging, educational, and patient. Translating complex pathological concepts into clear, structured lessons.',
    'pers-friend': 'Friend (10%)',
    'pers-friend-desc': 'Empathetic, approachable, calm, and supportive. A trusted partner who listens without judgment and validates personal skin struggles.',
    
    // Logo
    'logo-num': '05',
    'logo-title': 'Logo & Symbology',
    'logo-subtitle': 'The visual anchor of our identity representing a guided skin journey.',
    'logo-concept-title': 'The Flow of Knowledge',
    'logo-concept-desc': 'The MIDGO logo mark is a continuous line tracing the letter \'M\', representing a guided journey. The copper dot signifies the starting point: MIDGO is the "first destination" of skin understanding. The soft rounded geometry reflects biological structures.',
    'logo-guide': 'The Guide',
    'logo-guide-desc': 'A path that guides you through skincare complexity.',
    'logo-journey': 'The Journey',
    'logo-journey-desc': 'A continuous process of healing and learning.',
    'logo-knowledge': 'Knowledge',
    'logo-knowledge-desc': 'Grounded in absolute clinical dermatological science.',
    'logo-trust': 'Trust',
    'logo-trust-desc': 'Built by medical professionals, for the community.',
    
    // Color
    'color-num': '06',
    'color-title': 'Color Palette',
    'color-subtitle': 'A sophisticated palette designed to feel like a luxury medical brand, avoiding pharmacy blues and greens.',
    
    // Typography
    'type-num': '07',
    'type-title': 'Typography System',
    'type-subtitle': 'Elegant serif for editorial hierarchy matched with structured sans-serif for clear readability.',
    
    // Spacing
    'space-num': '08',
    'space-title': 'Spacing Grid',
    'space-subtitle': 'A strict layout system built around the 8pt grid, ensuring consistency across all viewports.',
    
    // UI Components
    'ui-num': '09',
    'ui-title': 'UI Component Library',
    'ui-subtitle': 'Production-ready responsive components designed to align with MIDGO\'s minimal brand layout.',
    
    // Iconography
    'icon-num': '10',
    'icon-title': 'Iconography Direction',
    'icon-subtitle': 'Consistent 1.5px stroke width with soft rounded corners and medical editorial precision.',
    
    // Photography
    'photo-num': '11',
    'photo-title': 'Photography Direction',
    'photo-subtitle': 'Warm natural light, authentic Saudi lifestyle, and real, healthy skin textures. Editorial and authentic.',
    
    // Illustration
    'illus-num': '12',
    'illus-title': 'Illustration Style',
    'illus-subtitle': 'Minimal line art that visualizes biological and anatomical structures with clinical elegance.',
    
    // Social
    'social-num': '13',
    'social-title': 'Social Media System',
    'social-subtitle': 'Instagram templates showing high-end educational carousels, stories, and post grids.',
    
    // E-book
    'ebook-num': '14',
    'ebook-title': 'E-book Design System',
    'ebook-subtitle': 'A standardized editorial layout for digital guides, scaling perfectly across Arabic & English.',
    
    // Landing Page
    'landing-num': '15',
    'landing-title': 'Landing Page Mockup',
    'landing-subtitle': 'How the MIDGO landing page adapts across desktop, tablet, and mobile browsers.',
    
    // Mobile App UI
    'app-num': '16',
    'app-title': 'Mobile App UI',
    'app-subtitle': 'Five primary app screens demonstrating daily skincare routine tracking, library, guides, and profiles.',
    
    // Packaging
    'pack-num': '17',
    'pack-title': 'Packaging Direction',
    'pack-subtitle': 'Future-proof product system featuring tactile ceramic textures and clean layout typography.',
    
    // Motion
    'motion-num': '18',
    'motion-title': 'Brand Motion',
    'motion-subtitle': 'Visualizing transition speeds, motion physics, and user micro-interactions.',
    
    // Tone of Voice
    'tone-num': '19',
    'tone-title': 'Tone of Voice',
    'tone-subtitle': 'Scientific yet human, doctor yet friend. Exemplified copy styles across Arabic & English.',
    
    // Showcase
    'showcase-num': '20',
    'showcase-title': 'Final Brand Showcase',
    'showcase-subtitle': 'The MIDGO visual identity brought together in a premium design layout.'
  },
  
  ar: {
    // Navigation
    'nav-about': 'من نحن',
    'nav-positioning': 'التموضع',
    'nav-personality': 'الشخصية',
    'nav-design-system': 'هوية التصميم',
    'nav-ui': 'العناصر',
    'nav-products': 'منتجاتنا المستقبلية',
    
    // Hero
    'hero-tagline': 'وجهتك الأولى لفهم طبيعة بشرتك.',
    'hero-sub': 'المملكة العربية السعودية • منصة رقمية تثقيفية في مجال الجلدية',
    
    // About
    'about-num': '٠٢',
    'about-title': 'التعليم أولاً. العلاج ثانياً.',
    'about-desc': 'ميدجو هي منصة رقمية رائدة للتثقيف في مجال طب الجلدية، أسستها طبيبة جلدية. نهدف إلى تمكين الأفراد من فهم طبيعة بشرتهم واحتياجاتها قبل البدء في أي علاج. لا نبيع الأدوية؛ بل نبني المعرفة.',
    'mission-title': 'رسالتنا',
    'mission-desc': 'نشر الوعي الصحي الجلدي وتقديمه بصورة سهلة الفهم ومبنية على أسس علمية رصينة، مع مراعاة الجوانب الثقافية والبيئية لمنطقتنا لتمكين المجتمع السعودي والعربي.',
    'vision-title': 'رؤيتنا',
    'vision-desc': 'أن نصبح المرجع الرقمي الأول لصحة ونضارة البشرة في الشرق الأوسط، وتغيير الطريقة التي يتعامل بها الأفراد مع العناية ببشرتهم من خلال المعرفة العميقة والأدوات التفاعلية.',
    
    // Positioning
    'pos-num': '٠٣',
    'pos-title': 'تموضع العلامة التجارية',
    'pos-subtitle': 'جسر الهوة بين الخبرة الطبية السريرية والممارسات اليومية للعناية بالبشرة.',
    'target-title': 'الجمهور المستهدف',
    'target-desc': 'المهتمون بصحة البشرة والجمال الطبيعي، وكل من يبحث عن حلول لمشاكل البشرة المزمنة في السعودية، والذين يعانون من التشتت بسبب كثرة المعلومات التجارية الخاطئة ويرغبون بوضوح علمي.',
    'promise-title': 'وعد العلامة التجارية',
    'promise-desc': 'نعد بتقديم معرفة طبية موثوقة ومثبتة علمياً، مترجمة بأسلوب بصري مبسط وواضح، يراعي نمط الحياة والبيئة المحلية.',
    
    // Pain Points
    'pain-1-title': 'تشتت المعلومات والشائعات',
    'pain-1-desc': 'يواجه المستخدمون هجوماً مستمراً من المؤثرين الذين يروجون لخطوات معقدة وغير مثبتة علمياً، مما يضر بحاجز البشرة الطبيعي.',
    'pain-2-title': 'غياب النصائح الملائمة لبيئتنا',
    'pain-2-desc': 'غالبية المراجع الطبية المتاحة باللغة الإنجليزية وموجهة للمناخات الغربية، متجاهلة درجات الحرارة المرتفعة، ومستويات الأشعة فوق البنفسجية، والجينات الخاصة بسكان المنطقة.',
    'pain-3-title': 'التكلفة المرتفعة للتجربة والخطأ',
    'pain-3-desc': 'شراء المنتجات الباهظة عشوائياً دون فهم نوع البشرة وحاجزها الواقي يستنزف الأموال ويؤدي إلى نتائج عكسية.',
    
    // Personality
    'pers-num': '٠٤',
    'pers-title': 'شخصية العلامة التجارية',
    'pers-doctor': 'الطبيب (٧٠٪)',
    'pers-doctor-desc': 'موثوق، دقيق، مبني على البراهين العلمية والتجربة الطبية. المعرفة السريرية هي جوهر ميدجو.',
    'pers-mentor': 'المرشد (٢٠٪)',
    'pers-mentor-desc': 'داعم، ملهم، صبور وموجه. يبسط المفاهيم الطبية المعقدة إلى خطوات واضحة ومفهومة.',
    'pers-friend': 'الصديق (١٠٪)',
    'pers-friend-desc': 'متعاطف، قريب من القلب، هادئ. يستمع دون إطلاق أحكام ويشجع على تقبل الطبيعة الحقيقية للبشرة.',
    
    // Logo
    'logo-num': '٠٥',
    'logo-title': 'شعار ميدجو ومعناه',
    'logo-subtitle': 'الركيزة البصرية لهويتنا والتي ترمز إلى رحلة واعية لفهم البشرة.',
    'logo-concept-title': 'تدفق المعرفة والرحلة',
    'logo-concept-desc': 'يتكون شعار ميدجو من خط انسيابي مستمر يرسم حرف الـ M، مرمزاً لرحلة الفهم والوعي. تمثل النقطة البرونزية الدافئة نقطة الانطلاق: ميدجو هي الوجهة الأولى. الهندسة الناعمة والزوايا المستديرة تعكس الهياكل الخلوية الحيوية للبشرة.',
    'logo-guide': 'المرشد',
    'logo-guide-desc': 'مسار يقودك عبر تعقيدات العناية بالبشرة.',
    'logo-journey': 'الرحلة',
    'logo-journey-desc': 'عملية مستمرة من التعلم، الشفاء، والاستكشاف.',
    'logo-knowledge': 'المعرفة',
    'logo-knowledge-desc': 'مستندة إلى دراسات علمية وخبرات طبية دقيقة.',
    'logo-trust': 'الثقة',
    'logo-trust-desc': 'هوية مبنية بأيدي أطباء ومتخصصين لنشر الوعي.',
    
    // Color
    'color-num': '٠٦',
    'color-title': 'نظام الألوان',
    'color-subtitle': 'لوحة ألوان فاخرة ومريحة، مصممة لتجنب اللون الأزرق الطبي المعتاد والأخضر الدوائي التقليدي.',
    
    // Typography
    'type-num': '٠٧',
    'type-title': 'الخطوط والكتابة',
    'type-subtitle': 'خط سيريف أنيق للعناوين Editorial، متكامل مع خط سان-سيريف حديث وسلس للنصوص الطويلة.',
    
    // Spacing
    'space-num': '٠٨',
    'space-title': 'شبكة المسافات والخطوط',
    'space-subtitle': 'نظام شبكي صارم مبني على مضاعفات الرقم 8، يضمن التناسق التام والشعور بالفراغ المريح على مختلف الأجهزة.',
    
    // UI Components
    'ui-num': '٠٩',
    'ui-title': 'مكتبة عناصر الواجهة',
    'ui-subtitle': 'عناصر واجهة تفاعلية جاهزة للبرمجة والمواءمة مع روح التصميم المينيمالي لـ ميدجو.',
    
    // Iconography
    'icon-num': '١٠',
    'icon-title': 'نظام الأيقونات',
    'icon-subtitle': 'خطوط رفيعة بسمك 1.5 بكسل، زوايا دائرية ناعمة، ودقة علمية خالية من الزخرفة.',
    
    // Photography
    'photo-num': '١١',
    'photo-title': 'التوجه التصويري',
    'photo-subtitle': 'إضاءة طبيعية دافئة، تفاصيل ونمط حياة سعودي معاصر، وإظهار الملمس الحقيقي والصحي للبشرة.',
    
    // Illustration
    'illus-num': '١٢',
    'illus-title': 'الرسومات التوضيحية',
    'illus-subtitle': 'رسومات خطية بسيطة ومدروسة، توضح الجوانب الحيوية والتشريحية للبشرة برقي علمي.',
    
    // Social
    'social-num': '١٣',
    'social-title': 'هوية قنوات التواصل',
    'social-subtitle': 'قوالب إنستغرام فاخرة للمنشورات، القصص اليومية، والأغلفة التعليمية.',
    
    // E-book
    'ebook-num': '١٤',
    'ebook-title': 'تصميم الكتب الرقمية',
    'ebook-subtitle': 'هيكل تصميمي مرن للأدلة التعليمية والكتب الإلكترونية، يتكيف مع العربية والإنجليزية.',
    
    // Landing Page
    'landing-num': '١٥',
    'landing-title': 'نموذج صفحة الهبوط',
    'landing-subtitle': 'كيف تتكيف صفحة هبوط ميدجو على الشاشات الكبيرة، الأجهزة اللوحية، والهواتف.',
    
    // Mobile App UI
    'app-num': '١٦',
    'app-title': 'واجهة التطبيق الذكي',
    'app-subtitle': 'خمس شاشات رئيسية توضح تتبع الروتين اليومي، مكتبة المعرفة، الدليل الذكي للمستخدم، والملف الشخصي.',
    
    // Packaging
    'pack-num': '١٧',
    'pack-title': 'تصميم العبوات والمنتجات',
    'pack-subtitle': 'نظرة مستقبلية لمنتجات ميدجو تركز على الخامات السيراميكية اللمسية والخطوط البسيطة.',
    
    // Motion
    'motion-num': '١٨',
    'motion-title': 'الحركة والأنيميشن',
    'motion-subtitle': 'تحديد سرعات الحركة، منحنيات الانتقال الفيزيائية، وتفاعل العناصر متناهية الصغر.',
    
    // Tone of Voice
    'tone-num': '١٩',
    'tone-title': 'نبرة الصوت وأسلوب التعبير',
    'tone-subtitle': 'علمي ولكن إنساني، بوقار الطبيب ودفء الصديق. أمثلة حية للكتابة باللغتين.',
    
    // Showcase
    'showcase-num': '٢٠',
    'showcase-title': 'معرض الهوية الختامي',
    'showcase-subtitle': 'استعراض شامل ومنسق لكافة عناصر الهوية البصرية لـ ميدجو.'
  }
};

/* --- Language Switcher Implementation --- */
function initLanguageSwitcher() {
  const btnEn = document.getElementById('btn-lang-en');
  const btnAr = document.getElementById('btn-lang-ar');
  const htmlNode = document.documentElement;
  
  if (!btnEn || !btnAr) return;
  
  btnEn.addEventListener('click', () => setLanguage('en'));
  btnAr.addEventListener('click', () => setLanguage('ar'));
  
  // Set default based on document direction or browser preference
  const currentLang = htmlNode.getAttribute('lang') || 'en';
  setLanguage(currentLang);
}

function setLanguage(lang) {
  const htmlNode = document.documentElement;
  htmlNode.setAttribute('lang', lang);
  htmlNode.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  // Update switcher UI
  const btnEn = document.getElementById('btn-lang-en');
  const btnAr = document.getElementById('btn-lang-ar');
  if (lang === 'ar') {
    btnAr.classList.add('active');
    btnEn.classList.remove('active');
  } else {
    btnEn.classList.add('active');
    btnAr.classList.remove('active');
  }
  
  // Translate nodes
  const translatableNodes = document.querySelectorAll('[data-translate-key]');
  translatableNodes.forEach(node => {
    const key = node.getAttribute('data-translate-key');
    if (translations[lang] && translations[lang][key]) {
      // Check if node contains other structured children or if we should just insert text
      if (node.children.length === 0) {
        node.textContent = translations[lang][key];
      } else {
        // If it has children, we might only want to replace text node or use innerHTML with caution
        // For simplicity in this experience, we replace textContent if it matches, otherwise we manage custom elements manually.
        // We will make sure translatable elements are clean text tags (p, h1, h2, span, etc.)
        node.innerHTML = translations[lang][key];
      }
    }
  });
  
  // Reposition personality bars if animated
  if (document.querySelector('.reveal-on-scroll.revealed#section-04')) {
    animatePersonalityBars();
  }
}
