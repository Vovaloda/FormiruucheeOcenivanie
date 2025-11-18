// Данные методик
const methods = [
  {
    title: "1.2. Одноминутное эссе",
    description:
      "Эта методика влияет на развитие навыков осмысления изучаемого материала и саморефлексии.",
    example:
      "Что самое главное я узнал сегодня на уроке. Какой материал я так и не понял?",
    source: "https://dsadas",
  },
  // Можно добавлять новые методики
];

// Функция для отображения методик
const container = document.getElementById("methods-container");

methods.forEach((method) => {
  const methodEl = document.createElement("div");
  methodEl.classList.add("method");

  methodEl.innerHTML = `
    <h2>${method.title}</h2>
     <p class="description">${method.description}</p>
    <div class="example"><strong>Пример:</strong> ${method.example}</div>
    <div class="source"><strong>Источник:</strong> <a href="${method.source}" target="_blank">${method.source}</a></div>
  `;

  container.appendChild(methodEl);
});
