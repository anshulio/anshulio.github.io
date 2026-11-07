/**
 * Main Portfolio Logic
 * Handles theme toggling, data rendering, smooth scrolling, active nav indicator,
 * and mobile navigation.
 */

(function () {
  "use strict";

  // Elements
  const themeToggleBtn = document.getElementById("theme-toggle");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const currentYearEl = document.getElementById("current-year");
  const projectsContainer = document.getElementById("projects-grid");
  const skillsContainer = document.getElementById("skills-grid");
  const blogContainer = document.getElementById("blog-grid");
  const aboutContainer = document.getElementById("about-text");
  const contactLinksContainer = document.getElementById("contact-links");

  // ==========================================
  // 1. Theme Management
  // ==========================================
  const THEME_STORAGE_KEY = "anshulraj_portfolio_theme";

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    // Default to dark theme as primary portfolio aesthetic
    return "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (themeToggleBtn) {
      const isDark = theme === "dark";
      themeToggleBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      themeToggleBtn.innerHTML = isDark
        ? `<!-- Moon Icon -->
           <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
           </svg>`
        : `<!-- Sun Icon -->
           <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
             <circle cx="12" cy="12" r="5"></circle>
             <line x1="12" y1="1" x2="12" y2="3"></line>
             <line x1="12" y1="21" x2="12" y2="23"></line>
             <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
             <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
             <line x1="1" y1="12" x2="3" y2="12"></line>
             <line x1="21" y1="12" x2="23" y2="12"></line>
             <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
             <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
           </svg>`;
    }
  }

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  // Listen to OS theme changes if user has not set an explicit override
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(e.matches ? "light" : "dark");
    }
  });

  // ==========================================
  // 2. Dynamic Year
  // ==========================================
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 3. Render Content from portfolioData
  // ==========================================
  const data = window.portfolioData || {};

  // Render About Text
  if (aboutContainer && data.profile && Array.isArray(data.profile.about)) {
    aboutContainer.innerHTML = data.profile.about
      .map((p) => `<p class="about-paragraph">${escapeHtml(p)}</p>`)
      .join("");
  }

  // Render Projects
  if (projectsContainer && Array.isArray(data.projects)) {
    projectsContainer.innerHTML = data.projects
      .map((proj) => {
        const tagsHtml = (proj.tags || [])
          .map((t) => `<span class="tech-tag">${escapeHtml(t)}</span>`)
          .join("");

        const demoBtn = proj.demo
          ? `<a href="${escapeHtml(proj.demo)}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(proj.title)} Live Demo">
               <span>Demo</span>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                 <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                 <polyline points="15 3 21 3 21 9"></polyline>
                 <line x1="10" y1="14" x2="21" y2="3"></line>
               </svg>
             </a>`
          : "";

        const githubBtn = proj.github
          ? `<a href="${escapeHtml(proj.github)}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(proj.title)} GitHub Repository">
               <span>GitHub</span>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                 <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
               </svg>
             </a>`
          : "";

        return `
          <article class="project-card reveal">
            <div class="project-card-header">
              <h3 class="project-title">${escapeHtml(proj.title)}</h3>
              <div class="project-actions">
                ${githubBtn}
                ${demoBtn}
              </div>
            </div>
            <p class="project-description">${escapeHtml(proj.description)}</p>
            <div class="project-tags">
              ${tagsHtml}
            </div>
          </article>
        `;
      })
      .join("");
  }

  // Render Skills
  if (skillsContainer && Array.isArray(data.skills)) {
    skillsContainer.innerHTML = data.skills
      .map((skillGroup) => {
        const itemsHtml = (skillGroup.items || [])
          .map((item) => `<span class="skill-badge">${escapeHtml(item)}</span>`)
          .join("");

        return `
          <div class="skill-group reveal">
            <h4 class="skill-category-title">${escapeHtml(skillGroup.category)}</h4>
            <div class="skill-items">
              ${itemsHtml}
            </div>
          </div>
        `;
      })
      .join("");
  }

  // Render Blog Articles
  if (blogContainer && Array.isArray(data.articles)) {
    blogContainer.innerHTML = data.articles
      .map((article) => {
        return `
          <article class="blog-card reveal">
            <div class="blog-meta">
              <time class="blog-date">${escapeHtml(article.date)}</time>
              <span class="blog-tag">${escapeHtml(article.tag)}</span>
            </div>
            <h3 class="blog-title">
              <a href="${escapeHtml(article.url)}" class="blog-link">
                ${escapeHtml(article.title)}
              </a>
            </h3>
            <p class="blog-description">${escapeHtml(article.description)}</p>
            <div class="blog-footer">
              <a href="${escapeHtml(article.url)}" class="blog-read-more" aria-label="Read note: ${escapeHtml(article.title)}">
                Read note <span class="arrow-icon">→</span>
              </a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  // Render Contact Links
  if (contactLinksContainer && data.profile && data.profile.social) {
    const social = data.profile.social;
    contactLinksContainer.innerHTML = `
      <a href="${escapeHtml(social.github)}" target="_blank" rel="noopener noreferrer" class="contact-btn" aria-label="GitHub Profile">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
        <span>GitHub</span>
      </a>

      <a href="mailto:${escapeHtml(social.email)}" class="contact-btn" aria-label="Send an email to ${escapeHtml(social.email)}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <span>Email</span>
      </a>

      <a href="${escapeHtml(social.linkedin)}" target="_blank" rel="noopener noreferrer" class="contact-btn" aria-label="LinkedIn Profile">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
        <span>LinkedIn</span>
      </a>

      <button type="button" id="copy-email-btn" class="contact-btn contact-btn-subtle" data-email="${escapeHtml(social.email)}" aria-label="Copy email address to clipboard">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span id="copy-email-text">Copy email</span>
      </button>
    `;

    const copyBtn = document.getElementById("copy-email-btn");
    const copyText = document.getElementById("copy-email-text");
    if (copyBtn && copyText) {
      copyBtn.addEventListener("click", () => {
        const email = copyBtn.getAttribute("data-email");
        if (navigator.clipboard && email) {
          navigator.clipboard.writeText(email).then(() => {
            copyText.textContent = "Copied!";
            setTimeout(() => {
              copyText.textContent = "Copy email";
            }, 2500);
          }).catch(() => {
            prompt("Copy email address:", email);
          });
        } else if (email) {
          prompt("Copy email address:", email);
        }
      });
    }
  }

  // ==========================================
  // 4. Navbar & Mobile Menu Interaction
  // ==========================================
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      mobileMenuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close on link click
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("open")) {
          navLinks.classList.remove("open");
          mobileMenuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        if (navLinks.classList.contains("open")) {
          navLinks.classList.remove("open");
          mobileMenuToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  // ==========================================
  // 5. Active Nav Spy with IntersectionObserver
  // ==========================================
  const sections = document.querySelectorAll("section[id]");
  const navAnchorElements = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchorElements.forEach((anchor) => {
            const href = anchor.getAttribute("href");
            if (href === `#${id}`) {
              anchor.classList.add("active");
            } else {
              anchor.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // ==========================================
  // 6. Reveal on Scroll Animation
  // ==========================================
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1
    });

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    // If reduced motion or unsupported, show immediately
    reveals.forEach((el) => el.classList.add("in-view"));
  }

  // ==========================================
  // Utility: HTML Escaping
  // ==========================================
  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
