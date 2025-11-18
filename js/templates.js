// =========================
//   Генерация карточек
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const templates = [
    {
      title: "2.1. Мозговой штурм",
      description: "Генерация идей для решения проблемы",
      type: "brainstorm",
      mainQuestion: "",
      trainingQuestions: [""],
    },

    // 🔥 Новый приём — Составление тестов
    {
      title: "3.1. Составление тестов",
      description:
        "Ученики самостоятельно формулируют вопросы и варианты ответов.",
      type: "test",
      questions: [
        {
          question: "",
          answers: ["", "", "", ""],
        },
      ],
    },

    {
      title: "1.3. Инсерт",
      description:
        "Маркировка текста специальными значками: V - знаю, + - новая информация, - - думал иначе, ? - непонятно",
      type: "insert",
      text: "",
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
      <p><em>${tpl.variants || ""}</em></p>
      <div class="buttons">
        <button class="edit-btn" data-index="${index}">Редактировать</button>
        <button class="example-btn" data-index="${index}">Пример</button>
      </div>
    `;

    wrap.appendChild(card);
    container.appendChild(wrap);
  });

  document.querySelector("main").appendChild(container);

  // =========================
  //   Модальное окно
  // =========================
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

  // Функция для сброса данных шаблонов
  function resetTemplatesData() {
    templates.forEach((tpl) => {
      if (tpl.type === "test") {
        tpl.questions = [
          {
            question: "",
            answers: ["", "", "", ""],
          },
        ];
      }
      if (tpl.type === "brainstorm") {
        tpl.mainQuestion = "";
        tpl.trainingQuestions = [""];
      }
      if (tpl.type === "insert") {
        tpl.text = "";
      }
    });
  }

  // Функция для закрытия модального окна и очистки полей
  function closeModal() {
    modal.classList.add("hidden");

    // Очищаем поля в DOM
    modalBody
      .querySelectorAll('textarea, input[type="text"]')
      .forEach((field) => {
        field.value = "";
      });

    // Сбрасываем данные шаблонов
    resetTemplatesData();
  }
  // =========================
  //       EDIT — Редактирование
  // =========================
  document.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".edit-btn, .example-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Добавляем active к текущей кнопке
      e.target.classList.add("active");

      const tpl = templates[e.target.dataset.index];

      // ---------------------------------
      //  🎯 Режим Составления тестов
      // ---------------------------------
      if (tpl.type === "test") {
        modalBody.innerHTML = `
          <h2>${tpl.title}</h2>
          <p>${tpl.description}</p>

          <div id="test-questions"></div>

          <button id="add-question" class="print-btn" style="background:#00966c">
            Добавить вопрос
          </button>
        `;

        const container = modalBody.querySelector("#test-questions");

        function renderQuestions() {
          container.innerHTML = tpl.questions
            .map(
              (q, index) => `
            <div class="test-item" data-i="${index}"
                style="padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:1rem;">

              <label>Вопрос:</label>
              <textarea class="test-question" rows="2">${q.question}</textarea>

              <div class="answers">
                ${q.answers
                  .map(
                    (ans, aIndex) =>
                      `<input class="test-answer" data-a="${aIndex}" value="${ans}" placeholder="Вариант ${
                        aIndex + 1
                      }">`
                  )
                  .join("")}
              </div>

              <button class="remove-question" style="margin-top:10px;background:#d9534f;">
                Удалить вопрос
              </button>
            </div>
          `
            )
            .join("");
        }

        renderQuestions();

        modalBody
          .querySelector("#add-question")
          .addEventListener("click", () => {
            tpl.questions.push({
              question: "",
              answers: ["", "", "", ""],
            });
            renderQuestions();
          });

        // Удаление вопроса
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-question")) {
            const i = e.target.closest(".test-item").dataset.i;
            tpl.questions.splice(i, 1);
            renderQuestions();
          }
        });

        // Изменение полей
        modalBody.addEventListener("input", (e) => {
          const block = e.target.closest(".test-item");
          if (!block) return;

          const i = block.dataset.i;

          if (e.target.classList.contains("test-question")) {
            tpl.questions[i].question = e.target.value;
          }

          if (e.target.classList.contains("test-answer")) {
            const a = e.target.dataset.a;
            tpl.questions[i].answers[a] = e.target.value;
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим Инсерт
      // ---------------------------------
      if (tpl.type === "insert") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p>${tpl.description}</p>
    
    <label><strong>Текст для анализа:</strong></label>
    <textarea class="insert-text" rows="10" placeholder="Введите текст для маркировки...">${tpl.text}</textarea>
    
    <div style="margin-top: 15px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
      <strong>Обозначения:</strong><br>
      ✓ V - "я это знаю"<br>
      ✓ + - "новая информация"<br>
      ✓ - - "я думал иначе"<br>
      ✓ ? - "непонятно, требуется уточнение"
    </div>
  `;

        // Изменение текста
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("insert-text")) {
            tpl.text = e.target.value;
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим Мозгового штурма
      // ---------------------------------
      if (tpl.type === "brainstorm") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p>${tpl.description}</p>
    
    <label><strong>Вопрос для решения:</strong></label>
    <textarea class="main-question" rows="3" placeholder="Основной вопрос проблемы...">${tpl.mainQuestion}</textarea>
    
    <div id="training-questions">
      <label><strong>Вопросы для тренировки:</strong></label>
    </div>
    
    <button id="add-training-question" class="print-btn" style="background:#00966c; margin-top: 10px;">
      Добавить вопрос для тренировки
    </button>
  `;

        const container = modalBody.querySelector("#training-questions");

        function renderTrainingQuestions() {
          const questionsHTML = tpl.trainingQuestions
            .map(
              (question, index) => `
      <div class="training-item" data-i="${index}" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <textarea class="training-question" rows="2" placeholder="Вопрос для тренировки ${
          index + 1
        }..." style="flex: 1;">${question}</textarea>
        <button class="remove-training-question" style="background:#d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
          ✕
        </button>
      </div>
    `
            )
            .join("");

          container.innerHTML = `<label><strong>Вопросы для тренировки:</strong></label>${questionsHTML}`;
        }

        renderTrainingQuestions();

        // Добавление вопроса для тренировки
        modalBody
          .querySelector("#add-training-question")
          .addEventListener("click", () => {
            tpl.trainingQuestions.push("");
            renderTrainingQuestions();
          });

        // Удаление вопроса для тренировки
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-training-question")) {
            const i = e.target.closest(".training-item").dataset.i;
            tpl.trainingQuestions.splice(i, 1);
            renderTrainingQuestions();
          }
        });

        // Изменение полей
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("main-question")) {
            tpl.mainQuestion = e.target.value;
          }

          if (e.target.classList.contains("training-question")) {
            const i = e.target.closest(".training-item").dataset.i;
            tpl.trainingQuestions[i] = e.target.value;
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //   Обычные карточки с textarea
      // ---------------------------------
      modalBody.innerHTML = `
        <h2>${tpl.title}</h2>
        <p>${tpl.description}</p>
        <p><em>${tpl.variants}</em></p>
        ${
          tpl.questions
            ? tpl.questions
                .map(
                  () =>
                    `<textarea rows="3" class="answer" placeholder="Ваш ответ..."></textarea>`
                )
                .join("")
            : `<textarea rows="4" class="answer" placeholder="Ваш ответ..."></textarea>`
        }
      `;

      modal.classList.remove("hidden");
    })
  );

  // =========================
  //    Пример
  // =========================
  document.querySelectorAll(".example-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".edit-btn, .example-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Добавляем active к текущей кнопке
      e.target.classList.add("active");

      const tpl = templates[e.target.dataset.index];

      if (tpl.type === "test") {
        modalBody.innerHTML = `
          <h2>${tpl.title}</h2>
          <p>${tpl.description}</p>

          <div class="example-text">
            ${tpl.questions
              .map(
                (q, i) => `
              <p><strong>Вопрос ${i + 1}:</strong> ${
                  q.question || "(не заполнено)"
                }</p>
              <ul>
                ${q.answers.map((a) => `<li>${a || "(пусто)"}</li>`).join("")}
              </ul>
            `
              )
              .join("")}
          </div>
        `;
        modal.classList.remove("hidden");
        return;
      }

      if (tpl.type === "brainstorm") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p>${tpl.description}</p>
    
    <div class="example-text">
      <p><strong>Вопрос для решения:</strong> ${
        tpl.mainQuestion || "(не заполнено)"
      }</p>
      
      <p><strong>Вопросы для тренировки:</strong></p>
      <ul>
        ${tpl.trainingQuestions
          .map(
            (q, i) =>
              `<li>${q || `Вопрос для тренировки ${i + 1} (пусто)`}</li>`
          )
          .join("")}
      </ul>
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      if (tpl.type === "insert") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p>${tpl.description}</p>
    
    <div class="example-text">
      <p><strong>Текст для анализа:</strong></p>
      <p>${tpl.text || "(текст не введен)"}</p>
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // Стандартный пример
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

  // =========================
  //   Закрытие модалки
  // =========================
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // =========================
  //   Печать
  // =========================
  printBtn.addEventListener("click", () => {
    // Нужно получить текущий активный шаблон
    let currentTpl = null;

    // Найдем индекс текущего шаблона из data-атрибута кнопки редактирования
    const activeEditBtn = document.querySelector(".edit-btn.active");
    if (activeEditBtn) {
      currentTpl = templates[activeEditBtn.dataset.index];
    }

    // Если не нашли, попробуем найти через пример
    if (!currentTpl) {
      const activeExampleBtn = document.querySelector(".example-btn.active");
      if (activeExampleBtn) {
        currentTpl = templates[activeExampleBtn.dataset.index];
      }
    }

    // Создаем клон для печати (работаем только с клоном, не трогаем оригинал)
    const cloned = modalBody.cloneNode(true);

    // 1) заменяем textarea -> p
    Array.from(cloned.querySelectorAll("textarea")).forEach((ta) => {
      const p = document.createElement("p");
      p.textContent = ta.value.trim() || "(без ответа)";
      p.className = "print-text";
      ta.replaceWith(p);
    });

    // 2) заменяем input -> span (для вариантов)
    Array.from(cloned.querySelectorAll("input")).forEach((inp) => {
      const span = document.createElement("div");
      span.textContent = inp.value.trim() || "(пусто)";
      span.className = "print-text";
      inp.replaceWith(span);
    });

    // 3) удаляем все кнопки
    Array.from(cloned.querySelectorAll("button")).forEach((btn) =>
      btn.remove()
    );

    // 4) удаляем крестик закрытия
    Array.from(cloned.querySelectorAll(".close")).forEach((el) => el.remove());

    // УДАЛЯЕМ ЗАГОЛОВОК "ТЕКСТ ДЛЯ АНАЛИЗА:" И "PRINT-TEXT" ДЛЯ ИНСЕРТА
    if (currentTpl && currentTpl.type === "insert") {
      // Ищем все элементы, которые содержат текст "Текст для анализа:"
      const textLabels = cloned.querySelectorAll("label, p, strong");
      textLabels.forEach((element) => {
        if (element.textContent.includes("Текст для анализа:")) {
          element.remove();
        }
      });

      // Удаляем элементы с классом "print-text"
      const printTextElements = cloned.querySelectorAll(".print-text");
      printTextElements.forEach((element) => {
        element.remove();
      });

      // Также удаляем возможные родительские контейнеры
      const exampleText = cloned.querySelector(".example-text");
      if (exampleText) {
        const strongElements = exampleText.querySelectorAll("strong");
        strongElements.forEach((strong) => {
          if (strong.textContent.includes("Текст для анализа:")) {
            strong.remove();
          }
        });

        // Удаляем пустые параграфы, которые могли остаться
        const emptyParagraphs = exampleText.querySelectorAll("p");
        emptyParagraphs.forEach((p) => {
          if (
            p.textContent.includes("Текст для анализа:") ||
            p.textContent.trim() === ""
          ) {
            p.remove();
          }
        });
      }
    }

    // Специальная обработка для Инсерта - добавляем прямоугольники рядом с каждой строкой
    if (currentTpl && currentTpl.type === "insert") {
      const text = currentTpl.text || "";
      const lines = text.split("\n").filter((line) => line.trim() !== "");

      const insertContainer = document.createElement("div");
      insertContainer.className = "insert-print";

      // Если текст пустой, показываем сообщение
      if (lines.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "(текст не введен)";
        emptyMessage.className = "print-text";
        insertContainer.appendChild(emptyMessage);
      } else {
        // Для каждой строки создаем контейнер с чекбоксами
        lines.forEach((line, index) => {
          const lineContainer = document.createElement("div");
          lineContainer.style.display = "flex";
          lineContainer.style.alignItems = "flex-start";
          lineContainer.style.marginBottom = "15px";
          lineContainer.style.pageBreakInside = "avoid";
          lineContainer.style.borderBottom = "1px solid #eee";
          lineContainer.style.paddingBottom = "10px";

          const checkbox = document.createElement("div");
          checkbox.style.flexShrink = "0";
          checkbox.style.marginRight = "15px";
          checkbox.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 5px;">
            <div style="width: 18px; height: 18px; border: 2px solid #333; border-radius: 3px;"></div>
          </div>
        </div>
      `;

          const textLine = document.createElement("div");
          textLine.textContent = line;
          textLine.style.flex = "1";
          textLine.style.padding = "5px 0";
          textLine.style.lineHeight = "1.5";

          lineContainer.appendChild(checkbox);
          lineContainer.appendChild(textLine);
          insertContainer.appendChild(lineContainer);
        });
      }

      // Заменяем оригинальный текст на форматированный для печати
      // В режиме редактирования ищем textarea
      let originalText = cloned.querySelector(".insert-text");

      // Если не нашли textarea (режим примера), ищем div с текстом
      if (!originalText) {
        originalText = cloned.querySelector(".example-text");
      }

      // Если нашли какой-то элемент для замены
      if (originalText) {
        originalText.replaceWith(insertContainer);
      } else {
        // Если ничего не нашли, просто добавляем в конец
        cloned.appendChild(insertContainer);
      }
    }

    // Добавляем легенду для обозначений
    if (currentTpl && currentTpl.type === "insert") {
      const legend = document.createElement("div");
      legend.style.marginBottom = "20px";
      legend.style.padding = "10px";
      legend.style.backgroundColor = "#f9f9f9";
      legend.style.borderRadius = "5px";
      legend.style.fontSize = "14px";
      legend.innerHTML = `
    <strong>Обозначения:</strong><br>
    <div style="display: flex; gap: 15px; margin-top: 5px;">
      <div style="display: flex; align-items: center; gap: 5px;">
        <div style="width: 16px; height: 16px; border: 2px solid #333; border-radius: 3px;"></div>
        <span>V - "я это знаю"</span>
      </div>
      <div style="display: flex; align-items: center; gap: 5px;">
        <div style="width: 16px; height: 16px; border: 2px solid #333; border-radius: 3px;"></div>
        <span>+ - "новая информация"</span>
      </div>
      <div style="display: flex; align-items: center; gap: 5px;">
        <div style="width: 16px; height: 16px; border: 2px solid #333; border-radius: 3px;"></div>
        <span>- - "я думал иначе"</span>
      </div>
      <div style="display: flex; align-items: center; gap: 5px;">
        <div style="width: 16px; height: 16px; border: 2px solid #333; border-radius: 3px;"></div>
        <span>? - "непонятно"</span>
      </div>
    </div>
  `;

      // Вставляем легенду перед основным контентом
      cloned.insertBefore(legend, cloned.firstChild);
    }

    // 5) Формируем документ для печати
    const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Печать карточки</title>
  <style>
    :root { color-scheme: light; }
    body { 
      padding: 20px; 
      color: #111; 
      line-height: 1.5; 
    }
    h2 { color: #007a5f; margin-top: 0; }
    .print-text { white-space: pre-wrap; margin: 6px 0; }
    .example-text ul { margin: 6px 0 12px 20px; }
    .test-item { border: 1px solid #e0e0e0; padding: 10px; border-radius: 6px; margin-bottom: 12px; }
    .insert-print div { page-break-inside: avoid; }
    @media print { 
      body { -webkit-print-color-adjust: exact; padding: 15px; }
      .insert-print div { break-inside: avoid; }
      h2 { margin-top: 10px; }
    }
  </style>
</head>
<body>${cloned.innerHTML}</body>
</html>`;

    // 6) Открываем новую вкладку и пишем туда
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert(
        "Блокировщик всплывающих окон не позволяет открыть окно печати. Разрешите всплывающие окна для этого сайта."
      );
      return;
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    // 7) Закрываем модальное окно после начала печати
    closeModal();

    // 8) Ждём загрузки и печатаем
    const tryPrint = () => {
      try {
        printWindow.focus();
        printWindow.print();
      } catch (err) {
        console.log("Ошибка печати:", err);
      }
    };

    printWindow.onload = () => {
      setTimeout(tryPrint, 60);
    };
  });

  // =========================
  //    3D-анимация карточек
  // =========================
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".wrap");

    cards.forEach((cardWrap) => {
      const card = cardWrap.querySelector(".template-card");

      cardWrap.addEventListener("mousemove", (e) => {
        const bounds = card.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const rY = ((x - bounds.width / 2) / bounds.width) * 15;
        const rX = -((y - bounds.height / 2) / bounds.height) * 15;

        card.style.setProperty("--rX", rX);
        card.style.setProperty("--rY", rY);
      });

      cardWrap.addEventListener("mouseleave", () => {
        card.style.setProperty("--rX", 0);
        card.style.setProperty("--rY", 0);
      });
    });
  });
});
