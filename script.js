
// ==============================
// VATSAL GOYAL — PORTFOLIO JS
// ==============================

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Dark / light theme toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

function updateThemeIcon() {
  const isLight = body.classList.contains("light-theme");
  themeIcon.textContent = isLight ? "☾" : "☼";
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  const currentTheme = body.classList.contains("light-theme")
    ? "light"
    : "dark";

  localStorage.setItem("portfolio-theme", currentTheme);
  updateThemeIcon();
});

// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  body.classList.add("light-theme");
}

updateThemeIcon();

// Reveal elements on scroll
const revealTargets = document.querySelectorAll(
  ".about-section, .skills-section, .projects-section, .contact-section, .project-card, .skill-category"
);

revealTargets.forEach(element => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealTargets.forEach(element => revealObserver.observe(element));

// Copy email button
const copyEmailButton = document.getElementById("copyEmail");
const copyText = document.getElementById("copyText");

// IMPORTANT: Replace this with your real email address
const emailAddress = "YOUR_EMAIL_HERE";

copyEmailButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailAddress);
    copyText.textContent = "Email copied!";

    setTimeout(() => {
      copyText.textContent = "Copy email address";
    }, 2000);
  } catch (error) {
    copyText.textContent = "Unable to copy — select email manually";
  }
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Active nav link based on visible section
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  {
    rootMargin: "-30% 0px -60% 0px"
  }
);

sections.forEach(section => sectionObserver.observe(section));
