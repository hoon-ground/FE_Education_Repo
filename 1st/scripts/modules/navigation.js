export function initNavigation() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href")?.substring(1) === entry.target.id) {
            link.classList.add("active");
          }
        });
      });
    },
    { rootMargin: "-50% 0px -50% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}
