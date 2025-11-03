// ===== Плавные переходы между страницами + активная ссылка =====

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".fade-wrapper");
  if (wrapper) {
    requestAnimationFrame(() => wrapper.classList.add("visible"));
  }

  // Подсветка активной ссылки
  const currentPath = window.location.pathname.split("/").pop();
  document.querySelectorAll("header nav a").forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (
      linkPath === currentPath ||
      (linkPath === "index.html" && currentPath === "")
    ) {
      link.classList.add("active");
    }
  });

  // Анимация переходов
  const links = document.querySelectorAll("a[href]");
  for (let link of links) {
    const url = new URL(link.href);
    if (url.origin === location.origin) {
      link.addEventListener("click", (e) => {
        const target = e.currentTarget.getAttribute("href");
        if (!target.startsWith("#")) {
          e.preventDefault();
          wrapper.classList.add("fade-out");
          setTimeout(() => {
            window.location.href = target;
          }, 400);
        }
      });
    }
  }
});
