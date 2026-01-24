// All DOM-dependent code
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu when clicking a link (mobile)
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    root.classList.add("light-theme");
    themeToggle.textContent = "🌙";
  } else {
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    const isLight = root.classList.toggle("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    themeToggle.textContent = isLight ? "🌙" : "☀️";
  });

  // Dynamic year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Contact form
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');
  const FORM_ENDPOINT = 'https://formspree.io/f/mjknjrvl'; 

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';
    const data = new FormData(form);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        status.textContent = 'Message sent. Thank you!';
        form.reset();
      } else {
        const err = await res.json().catch(() => ({}));
        status.textContent = err.error || 'Failed to send. Try again later.';
      }
    } catch {
      status.textContent = 'Network error. Try again later.';
    }

    setTimeout(() => (status.textContent = ''), 5000);
  });

  // Visitor Counter using CountAPI
  const updateVisitorCount = async () => {
    try {
      // Using CountAPI.xyz - a free visitor counter API
      const response = await fetch('https://api.countapi.xyz/hit/shantanu-portfolio/visits');
      const data = await response.json();
      document.getElementById('visitCount').textContent = data.value || '---';
    } catch (error) {
      console.error('Error fetching visitor count:', error);
      document.getElementById('visitCount').textContent = '---';
    }
  };

  // Initialize visitor count
  updateVisitorCount();
});
