document.addEventListener("DOMContentLoaded", () => {
  const templates = [
    {
      title: "1.2. Одноминутное эссе",
      description: "Ученики пишут эссе по вопросам",
      questions: [
        "Что самое главное я узнал сегодня на уроке?",
        "Какой материал я так и не понял?",
      ],
      variants: "",
    },
    {
      title: "1.2. Одноминутное эссе",
      description: "Ученики пишут эссе по вопросам",
      questions: [
        "Что самое главное я узнал сегодня на уроке?",
        "Какой материал я так и не понял?",
      ],
      variants: "",
    },
    {
      title: "1.2. Одноминутное эссе",
      description: "Ученики пишут эссе по вопросам",
      questions: [
        "Что самое главное я узнал сегодня на уроке?",
        "Какой материал я так и не понял?",
      ],
      variants: "",
    },
    {
      title: "1.2. Одноминутное эссе",
      description: "Ученики пишут эссе по вопросам",
      questions: [
        "Что самое главное я узнал сегодня на уроке?",
        "Какой материал я так и не понял?",
      ],
      variants: "",
    },
  ];

  const container = document.createElement("div");
  container.className = "templates-container";

  templates.forEach((tpl, index) => {
    const wrap = document.createElement("div");
    wrap.className = "wrap";

    const card = document.createElement("div");
    card.className = "template-card";

    card.innerHTML = `
    <h2>${tpl.title}</h2>
    <p>${tpl.description}</p>
    <p><em>${tpl.variants}</em></p>
    <div class="buttons">
      <button class="edit-btn" data-index="${index}">Редактировать</button>
      <button class="example-btn" data-index="${index}">Пример</button>
    </div>
  `;

    wrap.appendChild(card);
    container.appendChild(wrap);
  });

  document.querySelector("main").appendChild(container);

  // ====== Модальное окно ======
  const modal = document.createElement("div");
  modal.className = "modal hidden";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <div class="modal-body"></div>
      <button class="print-btn">Распечатать</button>
    </div>
  `;
  document.body.appendChild(modal);

  const modalBody = modal.querySelector(".modal-body");
  const closeBtn = modal.querySelector(".close");
  const printBtn = modal.querySelector(".print-btn");

  // ====== Обработчик кнопки "Редактировать" ======
  document.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const tpl = templates[e.target.dataset.index];
      modalBody.innerHTML = `
        <h2>${tpl.title}</h2>
        <p>${tpl.description}</p>
        <p><em>${tpl.variants}</em></p>
        ${
          tpl.questions
            ? tpl.questions
                .map(
                  (q, i) => `
            <textarea rows="3" class="answer" placeholder="Ваш ответ..."></textarea>
          `
                )
                .join("")
            : `<textarea rows="4" class="answer" placeholder="Ваш ответ..."></textarea>`
        }
      `;
      modal.classList.remove("hidden");
    })
  );

  // ====== Обработчик кнопки "Пример" ======
  document.querySelectorAll(".example-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const tpl = templates[e.target.dataset.index];
      modalBody.innerHTML = `
      <h2>${tpl.title}</h2>
      <p>${tpl.description}</p>
      <p><em>${tpl.variants}</em></p>
      <div class="example-text">
        ${
          tpl.questions
            ? tpl.questions.map((q) => `<p>${q}</p>`).join("")
            : `<p><em>Пример заполнения для данной методики.</em></p>`
        }
      </div>
    `;
      modal.classList.remove("hidden");
    })
  );

  // ====== Закрытие модалки ======
  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // ====== Печать ======
  printBtn.addEventListener("click", () => {
    // Сначала подставляем текст из всех textarea
    const answers = modalBody.querySelectorAll(".answer");
    answers.forEach((textarea) => {
      const value = textarea.value.trim();
      const replacement = document.createElement("p");
      replacement.textContent = value ? value : "(без ответа)";
      textarea.replaceWith(replacement);
    });

    // Открываем новое окно только с содержимым модалки
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Печать шаблона</title>
          <style>
            body { padding: 20px; line-height: 1.6; }
            h2 { color: #00b686; }
            p, label { margin-bottom: 10px; }
            em { color: #555; }
          </style>
        </head>
        <body>${modalBody.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".wrap");

  cards.forEach((cardWrap) => {
    const card = cardWrap.querySelector(".template-card");
    const w = card.offsetWidth;
    const h = card.offsetHeight;

    cardWrap.addEventListener("mousemove", (e) => {
      requestAnimationFrame(() => {
        const offsetX = e.offsetX;
        const offsetY = e.offsetY;
        const rY = ((offsetX - w / 2) / w) * 15;
        const rX = -((offsetY - h / 2) / h) * 15;
        card.style.setProperty("--rX", rX);
        card.style.setProperty("--rY", rY);
      });
    });
    cardWrap.addEventListener("mouseenter", () => {
      card.classList.add("active");
    });

    cardWrap.addEventListener("mouseleave", () => {
      card.style.setProperty("--rX", 0);
      card.style.setProperty("--rY", 0);
      card.classList.remove("active");
    });
  });
});
