document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");

  if (!toggleButton || !nav) return;

  toggleButton.addEventListener("click", () => {
    nav.classList.toggle("nav-visible");
  });

  // Optional: close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && e.target !== toggleButton) {
      nav.classList.remove("nav-visible");
    }
  });
});
