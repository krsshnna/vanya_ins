/**
 * Vanya Institute — Main Interactive JavaScript
 * Handles navigation, course search/filtering, course details modal,
 * admission fee calculation & validation, LocalStorage persistence,
 * FAQ accordions, campus gallery lightbox, contact form, and toasts.
 */

(function () {
  'use strict';

  /* ========================================================================
     1. Course Catalog Data (Fictional Demonstration Institution)
     ======================================================================== */
  const COURSES = [
    {
      id: 'bcom',
      name: 'B.Com',
      fullName: 'Bachelor of Commerce',
      level: 'UG',
      levelLabel: 'Undergraduate',
      durationYears: 3,
      durationText: '3 Years (6 Semesters)',
      annualFee: 22000,
      image: 'assets/images/course-bcom.jpg',
      alt: 'Commerce students reviewing accounting ledgers and financial statements with faculty',
      eligibility: '10+2 (Senior Secondary) pass from a recognised board in Commerce or any stream with Mathematics/Accountancy.',
      summary: 'A foundational three-year undergraduate programme covering financial accounting, business law, taxation, and corporate economics.',
      subjects: [
        'Financial & Corporate Accounting',
        'Business Economics & Statistics',
        'Direct & Indirect Taxation',
        'Company Law & Secretarial Practice',
        'Cost & Management Accounting'
      ],
      careers: [
        'Accounting & Audit Assistant Roles',
        'Taxation & Compliance Associate',
        'Banking & Financial Services Operations',
        'Preparation for CA, CS, CMA, or M.Com'
      ]
    },
    {
      id: 'bcom-hons',
      name: 'B.Com Hons.',
      fullName: 'Bachelor of Commerce (Honours)',
      level: 'UG',
      levelLabel: 'Undergraduate',
      durationYears: 3,
      durationText: '3 Years (6 Semesters)',
      annualFee: 25000,
      image: 'assets/images/course-bcom-hons.jpg',
      alt: 'Honours commerce students analyzing corporate finance and analytics charts on monitors',
      eligibility: '10+2 pass with Commerce/Mathematics and strong academic standing in Accountancy & Economics.',
      summary: 'An intensive honours track offering deeper specialization in corporate finance, financial markets, auditing, and quantitative business analysis.',
      subjects: [
        'Advanced Corporate Finance & Valuation',
        'Indian & Global Financial Markets',
        'International Business & Trade',
        'Auditing & Corporate Governance',
        'Business Research Methods & Excel Modelling'
      ],
      careers: [
        'Financial Analyst & Research Trainee',
        'Corporate Treasury & Investment Operations',
        'Management Consulting & Risk Advisory',
        'Higher Studies in Finance (MBA / M.Com)'
      ]
    },
    {
      id: 'bba',
      name: 'BBA',
      fullName: 'Bachelor of Business Administration',
      level: 'UG',
      levelLabel: 'Undergraduate',
      durationYears: 3,
      durationText: '3 Years (6 Semesters)',
      annualFee: 28000,
      image: 'assets/images/course-bba.jpg',
      alt: 'Management students collaborating around a boardroom table on a case study',
      eligibility: '10+2 pass in any stream (Arts, Commerce, or Science) from a recognised board.',
      summary: 'A practice-oriented management degree building leadership, marketing, human resource, and entrepreneurial problem-solving skills.',
      subjects: [
        'Principles of Management & Organizational Behaviour',
        'Marketing Strategy & Consumer Insights',
        'Human Resource Management',
        'Operations & Supply Chain Basics',
        'Entrepreneurship & Business Communication'
      ],
      careers: [
        'Management Trainee & Business Operations',
        'Marketing, Brand & Digital Coordinator',
        'Human Resources & Talent Acquisition',
        'Startup Operations or MBA Preparation'
      ]
    },
    {
      id: 'bca',
      name: 'BCA',
      fullName: 'Bachelor of Computer Applications',
      level: 'UG',
      levelLabel: 'Undergraduate',
      durationYears: 3,
      durationText: '3 Years (6 Semesters)',
      annualFee: 30000,
      image: 'assets/images/course-bca.jpg',
      alt: 'Students coding and building software applications in a modern computer laboratory',
      eligibility: '10+2 pass from a recognised board; Mathematics or Computer Science at 10+2 level preferred.',
      summary: 'A hands-on computing programme focused on software development, data structures, relational databases, and modern web technologies.',
      subjects: [
        'Programming in C, Python & Java',
        'Data Structures & Algorithms',
        'Database Management Systems (SQL)',
        'Web Technologies (HTML, CSS, JavaScript)',
        'Computer Networks & Operating Systems'
      ],
      careers: [
        'Junior Software & Web Developer',
        'Database & Application Support Analyst',
        'UI/UX & Frontend Engineering Trainee',
        'Higher Studies (MCA / M.Sc Computer Science)'
      ]
    },
    {
      id: 'ba',
      name: 'BA',
      fullName: 'Bachelor of Arts',
      level: 'UG',
      levelLabel: 'Undergraduate',
      durationYears: 3,
      durationText: '3 Years (6 Semesters)',
      annualFee: 20000,
      image: 'assets/images/course-ba.jpg',
      alt: 'Humanities and liberal arts students discussing literature in a sunlit library',
      eligibility: '10+2 pass in any stream from a recognised board.',
      summary: 'A multidisciplinary humanities programme nurturing critical thinking, writing, and analytical perspectives across English, Economics, History, and Political Science.',
      subjects: [
        'English Literature & Academic Writing',
        'Indian & World History',
        'Political Theory & Public Administration',
        'Micro & Macroeconomic Foundations',
        'Sociology & Contemporary Society'
      ],
      careers: [
        'Civil Services & Competitive Exam Preparation',
        'Editorial, Publishing & Content Strategy',
        'Public Policy & Social Sector Research',
        'Postgraduate Studies (MA / Mass Communication)'
      ]
    },
    {
      id: 'bsc',
      name: 'B.Sc',
      fullName: 'Bachelor of Science',
      level: 'UG',
      levelLabel: 'Undergraduate',
      durationYears: 3,
      durationText: '3 Years (6 Semesters)',
      annualFee: 26000,
      image: 'assets/images/course-bsc.jpg',
      alt: 'Undergraduate science students conducting experiments in a bright laboratory',
      eligibility: '10+2 pass with Science stream (Physics, Chemistry, Mathematics / Biology) from a recognised board.',
      summary: 'A rigorous science curriculum combining theoretical depth with weekly laboratory practicals in Mathematics, Physics, Chemistry, and Life Sciences.',
      subjects: [
        'Classical & Modern Physics',
        'Organic, Inorganic & Physical Chemistry',
        'Calculus, Linear Algebra & Differential Equations',
        'Laboratory Instrumentation & Scientific Computing',
        'Environmental Science & Research Ethics'
      ],
      careers: [
        'Laboratory & Quality Control Analyst',
        'Scientific Technical Support & EdTech',
        'Data & Quantitative Research Assistance',
        'Postgraduate Research (M.Sc / Integrated PhD)'
      ]
    },
    {
      id: 'mcom',
      name: 'M.Com',
      fullName: 'Master of Commerce',
      level: 'PG',
      levelLabel: 'Postgraduate',
      durationYears: 2,
      durationText: '2 Years (4 Semesters)',
      annualFee: 25000,
      image: 'assets/images/course-mcom.jpg',
      alt: 'Postgraduate commerce scholars presenting financial models in a seminar room',
      eligibility: 'Bachelor’s degree in Commerce (B.Com / B.Com Hons. / BBA) from a recognised university.',
      summary: 'A two-year postgraduate degree deepening expertise in advanced accounting standards, financial research, international trade, and strategic management.',
      subjects: [
        'Advanced Accounting Standards & IFRS',
        'Corporate Financial Policy & Portfolio Management',
        'Quantitative Techniques & Econometrics',
        'Strategic Cost Management',
        'Postgraduate Research Dissertation'
      ],
      careers: [
        'Senior Accounting & Corporate Finance Roles',
        'Academic Teaching & NET/SET Preparation',
        'Financial Planning & Regulatory Advisory',
        'Doctoral Research in Commerce'
      ]
    },
    {
      id: 'ma',
      name: 'MA',
      fullName: 'Master of Arts',
      level: 'PG',
      levelLabel: 'Postgraduate',
      durationYears: 2,
      durationText: '2 Years (4 Semesters)',
      annualFee: 22000,
      image: 'assets/images/course-ma.jpg',
      alt: 'Postgraduate humanities scholars studying academic journals in a reading room',
      eligibility: 'Bachelor’s degree (BA or equivalent) in relevant humanities or social science discipline.',
      summary: 'A seminar-driven postgraduate degree emphasizing scholarly inquiry, critical theory, policy analysis, and independent academic writing.',
      subjects: [
        'Contemporary Literary & Cultural Theory',
        'Public Policy & Governance Analysis',
        'Research Methodology & Historiography',
        'Development Economics & Social Change',
        'Guided Seminar Paper & Thesis'
      ],
      careers: [
        'Academic Lecturer & Research Fellowship Tracks',
        'Policy Think Tanks & Development Organizations',
        'Journalism, Publishing & Cultural Institutions',
        'Public Administration & Civil Services'
      ]
    },
    {
      id: 'msc',
      name: 'M.Sc',
      fullName: 'Master of Science',
      level: 'PG',
      levelLabel: 'Postgraduate',
      durationYears: 2,
      durationText: '2 Years (4 Semesters)',
      annualFee: 28000,
      image: 'assets/images/course-msc.jpg',
      alt: 'Postgraduate science researchers working with analytical instruments in a lab',
      eligibility: 'Bachelor’s degree in Science (B.Sc) with relevant core subject from a recognised university.',
      summary: 'An advanced postgraduate programme blending specialized coursework, laboratory investigation, statistical modelling, and a final-semester research project.',
      subjects: [
        'Advanced Analytical & Computational Methods',
        'Specialized Core Theory & Electives',
        'Experimental Design & Data Interpretation',
        'Scientific Writing & Peer Review',
        'Capstone Laboratory Research Project'
      ],
      careers: [
        'Research & Development Associate',
        'Analytical Laboratory Specialist',
        'Higher Education Teaching & Doctoral Study',
        'Scientific Data & Technical Consultancy'
      ]
    }
  ];

  /* ========================================================================
     2. Campus Gallery Data
     ======================================================================== */
  const GALLERY_ITEMS = [
    {
      image: 'assets/images/campus-classroom.jpg',
      title: 'Smart Lecture Classrooms',
      category: 'academics',
      categoryLabel: 'Academics & Labs',
      caption: 'Ergonomic, air-conditioned lecture rooms equipped with interactive smart displays and acoustic panelling.'
    },
    {
      image: 'assets/images/campus-lab.jpg',
      title: 'High-Speed Computing Lab',
      category: 'academics',
      categoryLabel: 'Academics & Labs',
      caption: 'Dedicated programming and data-analytics workstations supporting BCA, B.Sc, and commerce software training.'
    },
    {
      image: 'assets/images/course-bsc.jpg',
      title: 'Undergraduate Science Labs',
      category: 'academics',
      categoryLabel: 'Academics & Labs',
      caption: 'Well-ventilated physics, chemistry, and life sciences laboratories designed for supervised practical learning.'
    },
    {
      image: 'assets/images/campus-library.jpg',
      title: 'Two-Storey Digital Library',
      category: 'library',
      categoryLabel: 'Library & Seminars',
      caption: 'Quiet reading zones, academic print collections, and digital research terminals available throughout campus hours.'
    },
    {
      image: 'assets/images/campus-seminar.jpg',
      title: 'Seminars & Guest Workshops',
      category: 'library',
      categoryLabel: 'Library & Seminars',
      caption: 'Regular practitioner talks, career guidance clinics, and academic symposia hosted in the main seminar hall.'
    },
    {
      image: 'assets/images/campus-sports.jpg',
      title: 'Indoor & Outdoor Sports Facilities',
      category: 'sports',
      categoryLabel: 'Sports & Dining',
      caption: 'Dedicated table tennis, badminton, basketball courts, and athletic grounds encouraging fitness and teamwork.'
    },
    {
      image: 'assets/images/campus-cafeteria.jpg',
      title: 'Campus Dining & Cafeteria',
      category: 'sports',
      categoryLabel: 'Sports & Dining',
      caption: 'Clean, sunlit dining courtyard serving freshly prepared nutritious meals, beverages, and snacks.'
    },
    {
      image: 'assets/images/campus-cultural.jpg',
      title: 'Annual Cultural Festival',
      category: 'culture',
      categoryLabel: 'Culture & Clubs',
      caption: 'Student-led music, theatre, literary debates, and annual cultural showcases in the main auditorium.'
    },
    {
      image: 'assets/images/campus-clubs.jpg',
      title: 'Student Innovation & Debate Clubs',
      category: 'culture',
      categoryLabel: 'Culture & Clubs',
      caption: 'Collaborative student societies for coding, entrepreneurship, debating, photography, and community service.'
    }
  ];

  /* ========================================================================
     3. Utility Functions
     ======================================================================== */
  function formatINR(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'status');
    toast.innerHTML = `<span>${escapeHTML(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, 4200);
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /* ========================================================================
     4. Global UI (Navbar, Active Link, Copyright, Scroll-to-Top, FAQ)
     ======================================================================== */
  function initGlobalUI() {
    // Copyright year
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Active navigation link highlighting
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href === currentFile || (currentFile === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // Responsive hamburger menu
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
      });

      navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Sticky header elevation & scroll-to-top visibility
    const header = document.querySelector('.site-header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    function handleScroll() {
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 12);
      }
      if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 360);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');

        // Close sibling FAQs in same list for clean UX
        const list = item.closest('.faq-list');
        if (list) {
          list.querySelectorAll('.faq-item.open').forEach((openItem) => {
            if (openItem !== item) {
              openItem.classList.remove('open');
              openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
              openItem.querySelector('.faq-answer').style.maxHeight = null;
            }
          });
        }

        if (isOpen) {
          item.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ========================================================================
     5. Courses Page & Course Details Modal
     ======================================================================== */
  function initCoursesPage() {
    const grid = document.getElementById('coursesGrid');
    const searchInput = document.getElementById('courseSearch');
    const filterButtons = document.querySelectorAll('[data-course-filter]');
    const emptyState = document.getElementById('coursesEmpty');
    const resetBtn = document.getElementById('resetCourseFilters');
    const countLabel = document.getElementById('courseResultCount');

    // Modal elements
    const modal = document.getElementById('courseModal');
    const modalClose = document.getElementById('closeCourseModal');

    if (!grid) return;

    let activeFilter = 'ALL';
    let searchTerm = '';

    function renderCourses() {
      const q = searchTerm.trim().toLowerCase();
      const filtered = COURSES.filter((c) => {
        const matchesLevel = activeFilter === 'ALL' || c.level === activeFilter;
        const searchable = [
          c.name,
          c.fullName,
          c.levelLabel,
          c.summary,
          c.eligibility,
          ...c.subjects,
          ...c.careers
        ]
          .join(' ')
          .toLowerCase();
        const matchesQuery = !q || searchable.includes(q);
        return matchesLevel && matchesQuery;
      });

      if (countLabel) {
        countLabel.textContent = `Showing ${filtered.length} of ${COURSES.length} programmes`;
      }

      if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.add('visible');
        return;
      }

      if (emptyState) emptyState.classList.remove('visible');

      grid.innerHTML = filtered
        .map((c) => {
          const totalFee = c.annualFee * c.durationYears;
          const badgeClass = c.level === 'PG' ? 'course-level-badge pg' : 'course-level-badge';
          return `
            <article class="course-card" data-course-id="${c.id}">
              <div class="course-card-media">
                <img src="${c.image}" alt="${escapeHTML(c.alt)}" loading="lazy" />
                <span class="${badgeClass}">${escapeHTML(c.levelLabel)}</span>
              </div>
              <div class="course-card-body">
                <h3 class="course-card-title">${escapeHTML(c.name)}</h3>
                <p class="course-card-subtitle">${escapeHTML(c.fullName)}</p>
                <p class="course-card-desc">${escapeHTML(c.summary)}</p>
                <div class="course-meta-grid">
                  <div class="course-meta-item">
                    <span>Duration</span>
                    <strong>${c.durationYears} Years</strong>
                  </div>
                  <div class="course-meta-item">
                    <span>Annual Fees</span>
                    <strong>${formatINR(c.annualFee)}</strong>
                  </div>
                  <div class="course-meta-item" style="grid-column: 1 / -1; border-top: 1px solid #E2E8F0; padding-top: 8px;">
                    <span>Total Programme Fee (${c.durationYears} Yrs)</span>
                    <strong>${formatINR(totalFee)}</strong>
                  </div>
                </div>
                <div class="course-eligibility">
                  <i data-lucide="check-circle-2"></i>
                  <span><strong>Eligibility:</strong> ${escapeHTML(c.eligibility)}</span>
                </div>
                <div class="course-card-actions">
                  <button type="button" class="btn btn-outline btn-sm" data-open-course="${c.id}">
                    <i data-lucide="info"></i> View Details
                  </button>
                  <a href="admissions.html?course=${encodeURIComponent(c.id)}#application-form" class="btn btn-primary btn-sm">
                    Apply Now <i data-lucide="arrow-right"></i>
                  </a>
                </div>
              </div>
            </article>
          `;
        })
        .join('');

      refreshIcons();
    }

    function openCourseModal(courseId) {
      const course = COURSES.find((c) => c.id === courseId);
      if (!course || !modal) return;

      const totalFee = course.annualFee * course.durationYears;
      document.getElementById('modalCourseLevel').textContent = `${course.levelLabel} Programme`;
      document.getElementById('modalCourseTitle').textContent = `${course.name} — ${course.fullName}`;
      document.getElementById('modalCourseImg').src = course.image;
      document.getElementById('modalCourseImg').alt = course.alt;
      document.getElementById('modalCourseDesc').textContent = course.summary;
      document.getElementById('modalCourseDuration').textContent = course.durationText;
      document.getElementById('modalCourseAnnualFee').textContent = `${formatINR(course.annualFee)} / year`;
      document.getElementById('modalCourseTotalFee').textContent = formatINR(totalFee);
      document.getElementById('modalCourseEligibility').textContent = course.eligibility;

      document.getElementById('modalCourseSubjects').innerHTML = course.subjects
        .map((s) => `<li><i data-lucide="book-open"></i><span>${escapeHTML(s)}</span></li>`)
        .join('');

      document.getElementById('modalCourseCareers').innerHTML = course.careers
        .map((cr) => `<li><i data-lucide="briefcase"></i><span>${escapeHTML(cr)}</span></li>`)
        .join('');

      const applyLink = document.getElementById('modalApplyLink');
      if (applyLink) {
        applyLink.href = `admissions.html?course=${encodeURIComponent(course.id)}#application-form`;
      }

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      refreshIcons();
    }

    function closeCourseModal() {
      if (!modal) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-open-course]');
      if (btn) {
        openCourseModal(btn.getAttribute('data-open-course'));
      }
    });

    if (modalClose) modalClose.addEventListener('click', closeCourseModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCourseModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeCourseModal();
      }
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderCourses();
      });
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-course-filter') || 'ALL';
        renderCourses();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeFilter = 'ALL';
        searchTerm = '';
        if (searchInput) searchInput.value = '';
        filterButtons.forEach((b) => {
          b.classList.toggle('active', b.getAttribute('data-course-filter') === 'ALL');
        });
        renderCourses();
      });
    }

    renderCourses();
  }

  /* ========================================================================
     6. Admissions Page (Auto Fee Calculation, Validation, LocalStorage)
     ======================================================================== */
  function initAdmissionsPage() {
    const form = document.getElementById('admissionForm');
    if (!form) return;

    const courseSelect = document.getElementById('preferredCourse');
    const feeDuration = document.getElementById('feePreviewDuration');
    const feeAnnual = document.getElementById('feePreviewAnnual');
    const feeTotal = document.getElementById('feePreviewTotal');
    const confirmationPanel = document.getElementById('admissionConfirmation');
    const confirmationDetails = document.getElementById('confirmationDetails');
    const savedListEl = document.getElementById('savedApplicationsList');
    const clearAppsBtn = document.getElementById('clearDemoApplications');
    const STORAGE_KEY = 'vanya_admissions_applications';

    // Populate course dropdown if not already populated
    if (courseSelect && courseSelect.options.length <= 1) {
      COURSES.forEach((c) => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.name} — ${c.fullName} (${c.durationYears} Yrs | ${formatINR(c.annualFee)}/yr)`;
        courseSelect.appendChild(opt);
      });
    }

    function updateFeePreview() {
      const selected = COURSES.find((c) => c.id === courseSelect.value);
      if (!selected) {
        if (feeDuration) feeDuration.textContent = 'Select a course';
        if (feeAnnual) feeAnnual.textContent = '—';
        if (feeTotal) feeTotal.textContent = '—';
        return;
      }
      const total = selected.annualFee * selected.durationYears;
      if (feeDuration) feeDuration.textContent = `${selected.durationYears} Years (${selected.levelLabel})`;
      if (feeAnnual) feeAnnual.textContent = `${formatINR(selected.annualFee)} / year`;
      if (feeTotal) feeTotal.textContent = formatINR(total);
    }

    // Pre-select course from URL query (?course=bca)
    const params = new URLSearchParams(window.location.search);
    const courseParam = params.get('course');
    if (courseParam && courseSelect) {
      const exists = COURSES.some((c) => c.id === courseParam);
      if (exists) {
        courseSelect.value = courseParam;
      }
    }

    if (courseSelect) {
      courseSelect.addEventListener('change', updateFeePreview);
      updateFeePreview();
    }

    function setFieldError(id, msg) {
      const input = document.getElementById(id);
      const err = document.getElementById(`${id}Error`);
      if (input) {
        input.classList.toggle('error', Boolean(msg));
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      }
      if (err) {
        err.textContent = msg || '';
      }
    }

    function loadSavedApplications() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      } catch {
        return [];
      }
    }

    function renderSavedApplications() {
      if (!savedListEl) return;
      const apps = loadSavedApplications();
      if (clearAppsBtn) {
        clearAppsBtn.style.display = apps.length ? 'inline-flex' : 'none';
      }
      if (apps.length === 0) {
        savedListEl.innerHTML = '<p style="color: var(--color-text-light); font-size: 0.92rem;">No local demonstration applications saved yet.</p>';
        return;
      }
      savedListEl.innerHTML = apps
        .map(
          (app) => `
          <div class="saved-app-item">
            <div>
              <strong>${escapeHTML(app.fullName)}</strong>
              <span style="display:block; font-size:0.84rem; color:var(--color-text-muted);">
                Ref: <strong>${escapeHTML(app.refId)}</strong> • ${escapeHTML(app.courseName)} • Annual Fee: ${formatINR(app.annualFee)}
              </span>
            </div>
            <span style="font-size:0.8rem; color:var(--color-text-light);">${escapeHTML(app.submittedAt)}</span>
          </div>
        `
        )
        .join('');
    }

    if (clearAppsBtn) {
      clearAppsBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        renderSavedApplications();
        showToast('Cleared local demonstration applications.', 'info');
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const dob = document.getElementById('dob').value;
      const gender = document.getElementById('gender').value;
      const qualification = document.getElementById('qualification').value;
      const percentageVal = document.getElementById('percentage').value.trim();
      const preferredCourseId = courseSelect.value;
      const address = document.getElementById('address').value.trim();

      let valid = true;

      if (fullName.length < 3) {
        setFieldError('fullName', 'Please enter your full name (at least 3 characters).');
        valid = false;
      } else {
        setFieldError('fullName', '');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setFieldError('email', 'Please enter a valid email address.');
        valid = false;
      } else {
        setFieldError('email', '');
      }

      const cleanPhone = phone.replace(/[\s\-+]/g, '');
      if (!/^(91)?[6-9]\d{9}$/.test(cleanPhone)) {
        setFieldError('phone', 'Please enter a valid 10-digit Indian mobile number.');
        valid = false;
      } else {
        setFieldError('phone', '');
      }

      if (!dob) {
        setFieldError('dob', 'Please select your date of birth.');
        valid = false;
      } else {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const m = today.getMonth() - dobDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) age--;
        if (isNaN(age) || age < 15 || age > 65) {
          setFieldError('dob', 'Applicant age should be between 15 and 65 years.');
          valid = false;
        } else {
          setFieldError('dob', '');
        }
      }

      if (!gender) {
        setFieldError('gender', 'Please select your gender.');
        valid = false;
      } else {
        setFieldError('gender', '');
      }

      if (!qualification) {
        setFieldError('qualification', 'Please select your highest qualification.');
        valid = false;
      } else {
        setFieldError('qualification', '');
      }

      const pct = Number(percentageVal);
      if (percentageVal === '' || isNaN(pct) || pct < 35 || pct > 100) {
        setFieldError('percentage', 'Enter a valid percentage between 35 and 100.');
        valid = false;
      } else {
        setFieldError('percentage', '');
      }

      const selectedCourse = COURSES.find((c) => c.id === preferredCourseId);
      if (!selectedCourse) {
        setFieldError('preferredCourse', 'Please choose a preferred course.');
        valid = false;
      } else {
        setFieldError('preferredCourse', '');
      }

      if (address.length < 10) {
        setFieldError('address', 'Please enter your complete postal address.');
        valid = false;
      } else {
        setFieldError('address', '');
      }

      if (!valid) {
        showToast('Please review and correct the highlighted form fields.', 'error');
        return;
      }

      const refId = 'VI-2027-' + Math.floor(1000 + Math.random() * 9000);
      const totalFee = selectedCourse.annualFee * selectedCourse.durationYears;
      const record = {
        refId,
        fullName,
        email,
        phone,
        dob,
        gender,
        qualification,
        percentage: pct,
        courseId: selectedCourse.id,
        courseName: `${selectedCourse.name} (${selectedCourse.fullName})`,
        annualFee: selectedCourse.annualFee,
        totalFee,
        address,
        submittedAt: new Date().toLocaleString('en-IN')
      };

      const existing = loadSavedApplications();
      existing.unshift(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

      if (confirmationPanel && confirmationDetails) {
        confirmationDetails.innerHTML = `
          <p>Thank you, <strong>${escapeHTML(fullName)}</strong>. Your demonstration application has been saved locally in this browser.</p>
          <ul style="margin-top:12px; display:grid; gap:6px; font-size:0.93rem;">
            <li><strong>Reference ID:</strong> ${escapeHTML(refId)}</li>
            <li><strong>Selected Course:</strong> ${escapeHTML(record.courseName)}</li>
            <li><strong>Annual Tuition Fee:</strong> ${formatINR(record.annualFee)} &nbsp;|&nbsp; <strong>Total Fee (${selectedCourse.durationYears} Yrs):</strong> ${formatINR(totalFee)}</li>
          </ul>
          <p style="margin-top:12px; font-size:0.86rem; color:#166534;">
            Note: In a live production deployment, this form connects to a secure backend server for verification and admissions processing.
          </p>
        `;
        confirmationPanel.classList.add('visible');
        confirmationPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      form.reset();
      updateFeePreview();
      renderSavedApplications();
      showToast(`Application ${refId} saved locally!`, 'success');
    });

    renderSavedApplications();
  }

  /* ========================================================================
     7. Campus Life Gallery & Lightbox
     ======================================================================== */
  function initCampusGallery() {
    const galleryGrid = document.getElementById('campusGalleryGrid');
    const filterButtons = document.querySelectorAll('[data-gallery-filter]');
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    if (!galleryGrid) return;

    let currentCategory = 'all';
    let filteredItems = [...GALLERY_ITEMS];
    let currentIndex = 0;

    function renderGallery() {
      filteredItems =
        currentCategory === 'all'
          ? [...GALLERY_ITEMS]
          : GALLERY_ITEMS.filter((item) => item.category === currentCategory);

      galleryGrid.innerHTML = filteredItems
        .map(
          (item, index) => `
          <figure class="gallery-item" tabindex="0" role="button" aria-label="View ${escapeHTML(item.title)}" data-gallery-index="${index}">
            <img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy" />
            <figcaption class="gallery-overlay">
              <div>
                <span>${escapeHTML(item.categoryLabel)}</span>
                <strong>${escapeHTML(item.title)}</strong>
              </div>
              <i data-lucide="maximize-2" style="width:18px; height:18px; color:#C9A227;"></i>
            </figcaption>
          </figure>
        `
        )
        .join('');

      refreshIcons();
    }

    function openLightbox(index) {
      if (!lightbox || !filteredItems.length) return;
      currentIndex = (index + filteredItems.length) % filteredItems.length;
      const item = filteredItems[currentIndex];
      lightboxImg.src = item.image;
      lightboxImg.alt = item.title;
      lightboxTitle.textContent = item.title;
      lightboxCaption.textContent = item.caption;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    galleryGrid.addEventListener('click', (e) => {
      const card = e.target.closest('[data-gallery-index]');
      if (card) {
        openLightbox(Number(card.getAttribute('data-gallery-index')));
      }
    });

    galleryGrid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('[data-gallery-index]');
        if (card) {
          e.preventDefault();
          openLightbox(Number(card.getAttribute('data-gallery-index')));
        }
      }
    });

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-gallery-filter') || 'all';
        renderGallery();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => openLightbox(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => openLightbox(currentIndex + 1));

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
      if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
    });

    renderGallery();
  }

  /* ========================================================================
     8. Contact Enquiry Form Validation
     ======================================================================== */
  function initContactPage() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const subjectEl = document.getElementById('contactSubject');
    const confirmationEl = document.getElementById('contactConfirmation');

    const params = new URLSearchParams(window.location.search);
    const subjectParam = params.get('subject');
    if (subjectParam && subjectEl) {
      Array.from(subjectEl.options).forEach((opt) => {
        if (opt.value.toLowerCase() === subjectParam.toLowerCase()) {
          subjectEl.value = opt.value;
        }
      });
    }

    function setContactError(id, msg) {
      const input = document.getElementById(id);
      const err = document.getElementById(`${id}Error`);
      if (input) {
        input.classList.toggle('error', Boolean(msg));
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      }
      if (err) err.textContent = msg || '';
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const subject = subjectEl.value;
      const message = document.getElementById('contactMessage').value.trim();

      let valid = true;

      if (name.length < 2) {
        setContactError('contactName', 'Please enter your name.');
        valid = false;
      } else {
        setContactError('contactName', '');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setContactError('contactEmail', 'Please enter a valid email address.');
        valid = false;
      } else {
        setContactError('contactEmail', '');
      }

      if (phone && !/^(91)?[6-9]\d{9}$/.test(phone.replace(/[\s\-+]/g, ''))) {
        setContactError('contactPhone', 'Enter a valid 10-digit mobile number or leave blank.');
        valid = false;
      } else {
        setContactError('contactPhone', '');
      }

      if (!subject) {
        setContactError('contactSubject', 'Please choose an enquiry topic.');
        valid = false;
      } else {
        setContactError('contactSubject', '');
      }

      if (message.length < 10) {
        setContactError('contactMessage', 'Please write a brief message (at least 10 characters).');
        valid = false;
      } else {
        setContactError('contactMessage', '');
      }

      if (!valid) {
        showToast('Please fix the highlighted fields in your enquiry.', 'error');
        return;
      }

      try {
        const key = 'vanya_contact_enquiries';
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        list.unshift({
          name,
          email,
          phone,
          subject,
          message,
          submittedAt: new Date().toLocaleString('en-IN')
        });
        localStorage.setItem(key, JSON.stringify(list));
      } catch {
        // Ignore storage quota issues gracefully
      }

      if (confirmationEl) {
        confirmationEl.classList.add('visible');
      }

      form.reset();
      showToast('Thank you! Your enquiry has been recorded locally for demonstration.', 'success');
    });
  }

  /* ========================================================================
     9. Bootstrap on DOMContentLoaded
     ======================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initGlobalUI();
    initCoursesPage();
    initAdmissionsPage();
    initCampusGallery();
    initContactPage();
    refreshIcons();
  });
})();
