document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".instruction-step");
  const shapes = document.querySelectorAll(".shape");
  const parallaxBg = document.querySelector(".parallax-bg");

  // Функция для анимации появления шагов
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01 }
  );

  steps.forEach((step, index) => {
    step.style.transitionDelay = `${0.01}s`;
    observer.observe(step);
  });

  // Параллакс эффект при скролле
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateParallax() {
    const scrolled = window.scrollY;
    const scrollProgress =
      scrolled / (document.documentElement.scrollHeight - window.innerHeight);

    // Изменение фона в зависимости от прогресса скролла
    if (scrollProgress > 0.1) {
      parallaxBg.classList.add("scrolled");
    } else {
      parallaxBg.classList.remove("scrolled");
    }

    // Динамическое изменение фона
    const hueRotate = scrollProgress * 180;
    const saturation = 50 + scrollProgress * 50;
    parallaxBg.style.filter = `hue-rotate(${hueRotate}deg) saturate(${saturation}%)`;

    // Параллакс движение для каждой фигуры с разной скоростью
    shapes.forEach((shape, index) => {
      const speed = 0.3 + index * 0.15;
      const xMove = Math.sin(scrolled * 0.001 * (index + 1)) * 50;
      const yMove = scrolled * speed;
      const rotation = scrolled * 0.1 * (index % 2 === 0 ? 1 : -1);
      const scale = 1 + Math.sin(scrolled * 0.002) * 0.2;

      shape.style.transform = `
        translate(${xMove}px, ${yMove}px) 
        rotate(${rotation}deg) 
        scale(${scale})
      `;

      // Изменение прозрачности и размытия
      const opacity = 0.15 + Math.sin(scrolled * 0.0005 + index) * 0.1;
      const blur = 1 + Math.cos(scrolled * 0.0003 + index) * 2;

      shape.style.opacity = opacity;
      shape.style.filter = `blur(${blur}px) hue-rotate(${
        scrollProgress * 90
      }deg)`;
    });

    // Эффект "дыхания" для фона
    const pulse = Math.abs(Math.sin(scrolled * 0.002)) * 0.1 + 1;
    parallaxBg.style.transform = `scale(${pulse})`;

    lastScrollY = scrolled;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // Инициализация начального состояния
  updateParallax();

  // Таб переключение
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.dataset.tab;
      tabPanels.forEach((panel) =>
        panel.classList.toggle("active", panel.id === target)
      );

      // Анимация появления шагов при переключении табов
      const steps = document.querySelectorAll(
        ".tab-panel.active .instruction-step"
      );
      steps.forEach((step) => step.classList.remove("visible"));

      const tabObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      steps.forEach((step, index) => {
        step.style.transitionDelay = `${0.001}s`;
        tabObserver.observe(step);
      });
    });
  });

  // Обработчик resize для адаптивности
  window.addEventListener("resize", () => {
    updateParallax();
  });
});
