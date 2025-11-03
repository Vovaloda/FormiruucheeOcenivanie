document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const isActive = item.classList.contains("active");

    // Закрыть все
    document.querySelectorAll(".accordion-item").forEach((i) => {
      i.classList.remove("active");
    });

    // Если был закрыт, откроем его
    if (!isActive) {
      item.classList.add("active");
    }
  });
});
