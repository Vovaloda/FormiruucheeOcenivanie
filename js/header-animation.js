// Реакция фона шапки на движение курсора
document.addEventListener("mousemove", (e) => {
  const header = document.querySelector("header");
  if (!header) return;

  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  // Устанавливаем координаты центра радиального градиента
  header.style.setProperty("--x", `${x}%`);
  header.style.setProperty("--y", `${y}%`);
});

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
});
