// =========================
//   Генерация карточек
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const templates = [
    {
      title: "Мозговой штурм",
      description:
        "Приём, при котором ученикам предлагают выдвигать как можно больше идей или вариантов решения проблемы, не оценивая их на этапе высказывания.",
      type: "brainstorm",
      mainQuestion: "",
      trainingQuestions: [""],
    },
    {
      title: "Составление тестов",
      description:
        "Составление тестов — это приём, при котором ученикам предлагают самим придумать вопросы по изученному материалу, оформляя их в виде небольшого теста.",
      type: "test",
      questions: [
        {
          question: "",
          answers: ["", "", "", ""],
        },
      ],
    },
    {
      title: "Перевод информации",
      description:
        "Перевод информации — это приём, при котором ученики объясняют сложные понятия простыми словами, «переводя» их на язык, понятный неспециалисту.",
      type: "translation",
      concepts: [""],
    },
    {
      title: "Инсерт",
      description:
        "Этот приём помогает ученикам активно работать с текстом, выделяя и осмысливая ключевую информацию.",
      type: "insert",
      text: "",
    },
    {
      title: "З-Х-У",
      description:
        "Этот приём помогает ученикам систематизировать знания и планировать обучение: они фиксируют, что уже знают, что хотят узнать, а после изучения темы — что нового узнали.",
      type: "zhu",
      topic: "",
      rows: [{ know: "", want: "", learned: "" }],
    },
    {
      title: "Матрица запоминания",
      description:
        "Этот приём предполагает использование диаграммы с двумя осями, куда ученики распределяют изучаемые понятия по выбранным критериям.",
      type: "matrix",
      xAxis: "",
      yAxis: "",
      rows: 3,
      cols: 3,
    },
    {
      title: "Опросник",
      description:
        "Этот приём позволяет ученикам оценивать предложенные утверждения по степени согласия, что помогает выявить их мнение, уровень понимания или отношение к теме.",
      type: "questionnaire",
      questions: [
        {
          question: "",
        },
      ],
    },
    {
      title: "Поиск ошибок",
      description:
        "Этот приём предполагает, что ученики находят и исправляют ошибки в заданиях или утверждениях.",
      type: "errorSearch",
      tasks: [""],
    },
    {
      title: "Если бы я был учителем",
      description:
        "Этот приём предлагает ученикам представить себя на месте учителя и объяснить тему своим одноклассникам.",
      type: "teacher",
      topics: [""],
    },
    {
      title: "Неоконченное предложение",
      description:
        "Этот приём предлагает ученикам завершить незаконченные предложения, чтобы выразить свои мысли, впечатления или выводы.",
      type: "unfinished",
      sentences: [""],
    },
    {
      title: "Карта оценки групповой презентации",
      description:
        "Этот приём позволяет ученикам оценивать результаты работы своей группы или работы других групп по заранее заданным критериям.",
      type: "groupPresentation",
      criteria: [""],
    },
    {
      title: "Самооценка совместной работы",
      description:
        "Этот приём предполагает, что каждый ученик оценивает своё участие в групповой работе, формулируя развёрнутые ответы.",
      type: "selfAssessment",
      questions: [""],
    },
    {
      title: "Карта самоотчёта",
      description:
        "Этот приём позволяет ученикам анализировать свой учебный опыт, отмечая уровень понимания или выполнения заданий с помощью закрашивания или выделения ячеек в таблице.",
      type: "selfReport",
      items: [""],
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
      <p style="text-align: justify">${tpl.description}</p>
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

  let modalBody = modal.querySelector(".modal-body");
  const closeBtn = modal.querySelector(".close");
  const printBtn = modal.querySelector(".print-btn");

  // Сброс значений шаблонов
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
      if (tpl.type === "zhu") {
        tpl.topic = "";
        tpl.rows = [{ know: "", want: "", learned: "" }];
      }
      if (tpl.type === "matrix") {
        tpl.xAxis = "";
        tpl.yAxis = "";
        tpl.rows = 3;
        tpl.cols = 3;
      }
      if (tpl.type === "questionnaire") {
        tpl.questions = [{ question: "" }];
      }
      if (tpl.type === "errorSearch") {
        tpl.tasks = [""];
      }
      if (tpl.type === "translation") {
        tpl.concepts = [""];
      }
      if (tpl.type === "teacher") {
        tpl.topics = [""];
      }
      if (tpl.type === "unfinished") {
        tpl.sentences = [""];
      }
      if (tpl.type === "groupPresentation") {
        tpl.criteria = [""];
      }
      if (tpl.type === "selfAssessment") {
        tpl.questions = [""];
      }
      if (tpl.type === "selfReport") {
        tpl.items = [""];
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

    // УДАЛЯЕМ ВСЕ ОБРАБОТЧИКИ СОБЫТИЙ
    modalBody.replaceWith(modalBody.cloneNode(true));
    modalBody = modal.querySelector(".modal-body");

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
          <p style="text-align: justify">${tpl.description}</p>

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
    <div class="test-item" style="padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:1rem;">
      <p style="text-align: justify"><strong>Вопрос: </strong></p>
      <div class="answers" style="display: flex; flex-direction: column; align-items: flex-start;">
        <p><strong>Варианты ответов: </strong></p>
        ${q.answers.map((ans, aIndex) => `<p>${aIndex + 1}.</p>`).join("")}
      </div>
      <button class="remove-question" data-index="${index}" style="margin-top:10px;background:#d9534f;">
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

        // Изменение полей
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-question")) {
            e.preventDefault(); // Добавляем это
            e.stopPropagation();

            const i = parseInt(e.target.dataset.index);

            if (i >= 0 && i < tpl.questions.length) {
              tpl.questions.splice(i, 1);
              renderQuestions();
            }
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим Карта самоотчёта
      // ---------------------------------
      if (tpl.type === "selfReport") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div id="self-report-items"></div>

    <button id="add-self-report-item" class="print-btn" style="background:#00966c">
      Добавить строку
    </button>
  `;

        const container = modalBody.querySelector("#self-report-items");

        function renderItems() {
          container.innerHTML = `
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left; width: 70%;">Учебные умения и действия</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: center; width: 30%;">Оценка</th>
          </tr>
        </thead>
        <tbody>
          ${tpl.items
            .map(
              (item, index) => `
            <tr class="self-report-item" data-i="${index}">
              <td style="border: 1px solid #ddd; padding: 10px;">
                <textarea class="self-report-text" rows="2" placeholder="Опишите учебное умение или действие..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; resize: vertical;">${item}</textarea>
                <div style="margin-top: 8px;">
                  <button class="remove-self-report-item" style="background:#d9534f; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                    Удалить эту строку
                  </button>
                </div>
              </td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: center; vertical-align: middle; background: #fafafa;">
                <!-- Пустой столбец для оценки -->
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
        }

        renderItems();

        modalBody
          .querySelector("#add-self-report-item")
          .addEventListener("click", () => {
            tpl.items.push("");
            renderItems();
          });

        // Удаление строки
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-self-report-item")) {
            const i = e.target.closest(".self-report-item").dataset.i;
            tpl.items.splice(i, 1);
            renderItems();
          }
        });

        // Изменение полей
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("self-report-text")) {
            const i = e.target.closest(".self-report-item").dataset.i;
            tpl.items[i] = e.target.value;
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим Карта самоотчёта
      // ---------------------------------
      if (tpl.type === "selfReport") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div id="self-report-items"></div>

    <button id="add-self-report-item" class="print-btn" style="background:#00966c">
      Добавить строку
    </button>
  `;

        const container = modalBody.querySelector("#self-report-items");

        function renderItems() {
          container.innerHTML = `
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left; width: 70%;">Учебные умения и действия</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: center; width: 30%;">Оценка</th>
          </tr>
        </thead>
        <tbody>
          ${tpl.items
            .map(
              (item, index) => `
            <tr class="self-report-item" data-i="${index}">
              <td style="border: 1px solid #ddd; padding: 10px;">
                <textarea class="self-report-text" rows="2" placeholder="Опишите учебное умение или действие..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; resize: vertical;">${item}</textarea>
              </td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: center; vertical-align: middle; background: #fafafa;">
                <!-- Пустой столбец для оценки -->
              </td>
            </tr>
            <tr>
              <td colspan="2" style="border: none; padding: 5px 10px;">
                <button class="remove-self-report-item" style="background:#d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                  Удалить эту строку
                </button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
        }

        renderItems();

        modalBody
          .querySelector("#add-self-report-item")
          .addEventListener("click", () => {
            tpl.items.push("");
            renderItems();
          });

        // Удаление строки
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-self-report-item")) {
            const i = e.target.closest(".self-report-item").dataset.i;
            tpl.items.splice(i, 1);
            renderItems();
          }
        });

        // Изменение полей
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("self-report-text")) {
            const i = e.target.closest(".self-report-item").dataset.i;
            tpl.items[i] = e.target.value;
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим Матрица запоминания
      // ---------------------------------
      if (tpl.type === "matrix") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>
    
    <div class="matrix-inputs" style="display: flex; gap: 20px; margin-bottom: 20px;">
      <div style="flex: 1;">
        <label><strong>Вертикальная ось:</strong></label>
        <input type="text" class="matrix-y-axis" value="${
          tpl.yAxis
        }" placeholder="Например: Склонения" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      </div>
      <div style="flex: 1;">
        <label><strong>Горизонтальная ось:</strong></label>
        <input type="text" class="matrix-x-axis" value="${
          tpl.xAxis
        }" placeholder="Например: Слова" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      </div>
    </div>

    <div class="matrix-controls" style="display: flex; gap: 15px; margin-bottom: 20px;">
      <div style="display: flex; gap: 10px; align-items: center;">
        <span><strong>Строки:</strong></span>
        <button class="add-row" style="background:#28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">+</button>
        <button class="remove-row" style="background:#dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;" ${
          tpl.rows <= 1 ? "disabled" : ""
        }>-</button>
      </div>
      <div style="display: flex; gap: 10px; align-items: center;">
        <span><strong>Столбцы:</strong></span>
        <button class="add-col" style="background:#28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">+</button>
        <button class="remove-col" style="background:#dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;" ${
          tpl.cols <= 1 ? "disabled" : ""
        }>-</button>
      </div>
    </div>
    
    <div class="matrix-preview">
      <div class="matrix-container" style="position: relative; border: 2px solid #333; background: white;">
        <div class="matrix-y-label" style="position: absolute; left: -100px; top: 50%; transform: translateY(-50%) rotate(-90deg); font-weight: bold; color: #007a5f; width: 160px; text-align: center;">
          ${tpl.yAxis || " "}
        </div>
        <div class="matrix-x-label" style="position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%); font-weight: bold; color: #007a5f; width: 200px; text-align: center;">
          ${tpl.xAxis || " "}
        </div>
        <div class="matrix-grid" style="display: grid; grid-template-columns: repeat(${
          tpl.cols
        }, 1fr); grid-template-rows: repeat(${
          tpl.rows
        }, 1fr); height: ${Math.max(200, tpl.rows * 80)}px;">
          ${Array(tpl.rows * tpl.cols)
            .fill(0)
            .map(
              (_, i) => `
            <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
              <span style="color: #666; font-size: 14px;"></span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

        // Обновление осей при вводе
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("matrix-y-axis")) {
            tpl.yAxis = e.target.value;
            const yLabel = modalBody.querySelector(".matrix-y-label");
            yLabel.textContent = tpl.yAxis || " ";
          }
          if (e.target.classList.contains("matrix-x-axis")) {
            tpl.xAxis = e.target.value;
            const xLabel = modalBody.querySelector(".matrix-x-label");
            xLabel.textContent = tpl.xAxis || " ";
          }
        });

        // Добавление строки
        modalBody.querySelector(".add-row").addEventListener("click", () => {
          tpl.rows++;
          updateMatrixPreview();
        });

        // Удаление строки
        modalBody.querySelector(".remove-row").addEventListener("click", () => {
          if (tpl.rows > 1) {
            tpl.rows--;
            updateMatrixPreview();
          }
        });

        // Добавление столбца
        modalBody.querySelector(".add-col").addEventListener("click", () => {
          tpl.cols++;
          updateMatrixPreview();
        });

        // Удаление столбца
        modalBody.querySelector(".remove-col").addEventListener("click", () => {
          if (tpl.cols > 1) {
            tpl.cols--;
            updateMatrixPreview();
          }
        });

        function updateMatrixPreview() {
          const grid = modalBody.querySelector(".matrix-grid");
          const controls = modalBody.querySelector(".matrix-controls");

          // Обновляем grid
          grid.style.gridTemplateColumns = `repeat(${tpl.cols}, 1fr)`;
          grid.style.gridTemplateRows = `repeat(${tpl.rows}, 1fr)`;
          grid.style.height = `${Math.max(200, tpl.rows * 80)}px`;

          // Обновляем количество ячеек
          const totalCells = tpl.rows * tpl.cols;
          grid.innerHTML = Array(totalCells)
            .fill(0)
            .map(
              (_, i) => `
        <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
          <span style="color: #666; font-size: 14px;"></span>
        </div>
      `
            )
            .join("");

          // Обновляем кнопки управления
          controls.innerHTML = `
      <div style="display: flex; gap: 10px; align-items: center;">
        <span><strong>Строки:</strong></span>
        <button class="add-row" style="background:#28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">+</button>
        <button class="remove-row" style="background:#dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;" ${
          tpl.rows <= 1 ? "disabled" : ""
        }>-</button>
      </div>
      <div style="display: flex; gap: 10px; align-items: center;">
        <span><strong>Столбцы:</strong></span>
        <button class="add-col" style="background:#28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">+</button>
        <button class="remove-col" style="background:#dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;" ${
          tpl.cols <= 1 ? "disabled" : ""
        }>-</button>
      </div>
    `;

          // Перепривязываем события
          modalBody.querySelector(".add-row").addEventListener("click", () => {
            tpl.rows++;
            updateMatrixPreview();
          });

          modalBody
            .querySelector(".remove-row")
            .addEventListener("click", () => {
              if (tpl.rows > 1) {
                tpl.rows--;
                updateMatrixPreview();
              }
            });

          modalBody.querySelector(".add-col").addEventListener("click", () => {
            tpl.cols++;
            updateMatrixPreview();
          });

          modalBody
            .querySelector(".remove-col")
            .addEventListener("click", () => {
              if (tpl.cols > 1) {
                tpl.cols--;
                updateMatrixPreview();
              }
            });
        }

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим Неоконченное предложение
      // ---------------------------------
      if (tpl.type === "unfinished") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div id="unfinished-sentences"></div>

    <button id="add-unfinished-sentence" class="print-btn" style="background:#00966c">
      Добавить предложение
    </button>
  `;

        const container = modalBody.querySelector("#unfinished-sentences");

        function renderSentences() {
          container.innerHTML = tpl.sentences
            .map(
              (sentence, index) => `
      <div class="unfinished-sentence-item" data-i="${index}" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1rem;">
        <label><strong>Неоконченное предложение:</strong></label>
        <textarea class="unfinished-sentence-text" rows="2" placeholder="Введите начало предложения..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 15px;">${sentence}</textarea>
        
        <div class="sentence-completion" style="margin: 20px 0;">
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #b9b9b9ff;">
            <p style="margin: 0; font-weight: 500; color: #333;">
              <span class="sentence-preview">${
                sentence || " "
              }</span><span style="color: #b9b9b9ff;">...</span>
            </p>
            <div style="height: 80px; border: 1px dashed #b9b9b9ff; border-radius: 4px; background: #f9f9f9; margin-top: 10px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #999; font-style: italic;"></span>
            </div>
          </div>
        </div>
        
        <button class="remove-unfinished-sentence" style="background:#d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
          Удалить предложение
        </button>
      </div>
    `
            )
            .join("");
        }

        renderSentences();

        // Обновление превью при вводе текста
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("unfinished-sentence-text")) {
            const i = e.target.closest(".unfinished-sentence-item").dataset.i;
            tpl.sentences[i] = e.target.value;

            // Обновляем превью
            const preview = e.target
              .closest(".unfinished-sentence-item")
              .querySelector(".sentence-preview");
            preview.textContent = e.target.value || " ";
          }
        });

        modalBody
          .querySelector("#add-unfinished-sentence")
          .addEventListener("click", () => {
            tpl.sentences.push("");
            renderSentences();
          });

        // Удаление предложения
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-unfinished-sentence")) {
            const i = e.target.closest(".unfinished-sentence-item").dataset.i;
            tpl.sentences.splice(i, 1);
            renderSentences();
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим Поиск ошибок
      // ---------------------------------
      if (tpl.type === "errorSearch") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div id="error-tasks"></div>

    <button id="add-error-task" class="print-btn" style="background:#00966c">
      Добавить задание
    </button>
  `;

        const container = modalBody.querySelector("#error-tasks");

        function renderTasks() {
          container.innerHTML = tpl.tasks
            .map(
              (task, index) => `
      <div class="error-task-item" data-i="${index}" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1rem;">
        <label><strong>Найдите здесь ошибки и исправьте их:</strong></label>
        <textarea class="error-task-text" rows="4" placeholder="Введите текст с ошибками..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 10px;">${task}</textarea>
        
        <button class="remove-error-task" style="background:#d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
          Удалить задание
        </button>
      </div>
    `
            )
            .join("");
        }

        renderTasks();

        modalBody
          .querySelector("#add-error-task")
          .addEventListener("click", () => {
            tpl.tasks.push("");
            renderTasks();
          });

        // Удаление задания
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-error-task")) {
            const i = e.target.closest(".error-task-item").dataset.i;
            tpl.tasks.splice(i, 1);
            renderTasks();
          }
        });

        // Изменение полей
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("error-task-text")) {
            const i = e.target.closest(".error-task-item").dataset.i;
            tpl.tasks[i] = e.target.value;
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим Карта оценки групповой презентации
      // ---------------------------------
      if (tpl.type === "groupPresentation") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>
    
    <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #4caf50;">
      <p style="margin: 0 0 10px 0; font-weight: bold; color: #2e7d32;">Критерии оценки:</p>
      <ul style="margin: 0; padding-left: 20px;">
        <li><strong>«+»</strong> – отличная работа (трудно улучшить)</li>
        <li><strong>«=»</strong> – хорошая работа (хорошо, но вы видите способ улучшить)</li>
        <li><strong>«—»</strong> – слабая работа (многое нужно улучшить)</li>
      </ul>
    </div>

    <div id="presentation-criteria"></div>

    <button id="add-presentation-criterion" class="print-btn" style="background:#00966c">
      Добавить критерий
    </button>
  `;

        const container = modalBody.querySelector("#presentation-criteria");

        function renderCriteria() {
          container.innerHTML = tpl.criteria
            .map(
              (criterion, index) => `
      <div class="presentation-criterion-item" data-i="${index}" style="padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 1rem; background: #fafafa;">
        <label><strong>Критерий оценки:</strong></label>
        <textarea class="presentation-criterion-text" rows="2" placeholder="Введите критерий для оценки..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 15px;">${criterion}</textarea>
        
        <button class="remove-presentation-criterion" style="background:#d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
          Удалить критерий
        </button>
      </div>
    `
            )
            .join("");
        }

        renderCriteria();

        // Добавление критерия
        modalBody
          .querySelector("#add-presentation-criterion")
          .addEventListener("click", () => {
            tpl.criteria.push("");
            renderCriteria();
          });

        // Удаление критерия
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-presentation-criterion")) {
            const i = e.target.closest(".presentation-criterion-item").dataset
              .i;
            tpl.criteria.splice(i, 1);
            renderCriteria();
          }
        });

        // Изменение полей
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("presentation-criterion-text")) {
            const i = e.target.closest(".presentation-criterion-item").dataset
              .i;
            tpl.criteria[i] = e.target.value;
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим Перевод информации
      // ---------------------------------
      if (tpl.type === "translation") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div id="translation-concepts"></div>

    <button id="add-translation-concept" class="print-btn" style="background:#00966c">
      Добавить понятие
    </button>
  `;

        const container = modalBody.querySelector("#translation-concepts");

        function renderConcepts() {
          container.innerHTML = tpl.concepts
            .map(
              (concept, index) => `
      <div class="translation-concept-item" data-i="${index}" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1rem;">
        <p style="text-align: justify"><strong>Фраза для перевода:</strong></p>
        <textarea class="translation-concept-text" rows="3" placeholder="Введите понятие, которое нужно перевести..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 15px;">${concept}</textarea>
        
        <div class="translation-space" style="margin: 20px 0;">
          <hr style="border: none; border-top: 2px dashed #ccc; margin: 20px 0;">
          <p style="text-align: center; color: #666; font-style: italic; margin: 10px 0;">Место для Вашего перевода</p>
          <div style="height: 100px; border: 1px dashed #ccc; border-radius: 4px; background: #fafafa; display: flex; align-items: center; justify-content: center;">
            <span style="color: #999;"></span>
          </div>
        </div>
        
        <button class="remove-translation-concept" style="background:#d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
          Удалить понятие
        </button>
      </div>
    `
            )
            .join("");
        }

        renderConcepts();

        modalBody
          .querySelector("#add-translation-concept")
          .addEventListener("click", () => {
            tpl.concepts.push("");
            renderConcepts();
          });

        // Удаление понятия
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-translation-concept")) {
            const i = e.target.closest(".translation-concept-item").dataset.i;
            tpl.concepts.splice(i, 1);
            renderConcepts();
          }
        });

        // Изменение полей
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("translation-concept-text")) {
            const i = e.target.closest(".translation-concept-item").dataset.i;
            tpl.concepts[i] = e.target.value;
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим Опросник
      // ---------------------------------
      if (tpl.type === "questionnaire") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div id="questionnaire-questions"></div>

    <button id="add-questionnaire-question" class="print-btn" style="background:#00966c">
      Добавить вопрос
    </button>
  `;

        const container = modalBody.querySelector("#questionnaire-questions");

        function renderQuestions() {
          container.innerHTML = tpl.questions
            .map(
              (q, index) => `
      <div class="questionnaire-item" data-i="${index}" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1rem;">
        <label><strong>Утверждение:</strong></label>
        <textarea class="questionnaire-question" rows="2" placeholder="Введите утверждение..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 15px;">${
          q.question
        }</textarea>
        
        <div class="scale-container" style="margin-bottom: 10px;">
          <div class="scale-labels" style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 12px; color: #666; padding: 0 10px;">
            <span style="flex: 1; text-align: center;">Не согласен</span>
            <span style="flex: 1; text-align: center;">Скорее не согласен</span>
            <span style="flex: 1; text-align: center;">Нейтрально</span>
            <span style="flex: 1; text-align: center;">Скорее согласен</span>
            <span style="flex: 1; text-align: center;">Согласен</span>
          </div>
          
          <div class="scale-circles" style="display: flex; justify-content: space-between; padding: 0 15px;">
            ${Array(5)
              .fill(0)
              .map(
                () => `
              <div style="flex: 1; text-align: center;">
                <div style="width: 25px; height: 25px; border: 2px solid #999; border-radius: 50%; background: #f0f0f0; margin: 0 auto;"></div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <button class="remove-questionnaire-question" style="background:#d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
          Удалить вопрос
        </button>
      </div>
    `
            )
            .join("");
        }

        renderQuestions();

        modalBody
          .querySelector("#add-questionnaire-question")
          .addEventListener("click", () => {
            tpl.questions.push({
              question: "",
            });
            renderQuestions();
          });

        // Удаление вопроса
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-questionnaire-question")) {
            const i = e.target.closest(".questionnaire-item").dataset.i;
            tpl.questions.splice(i, 1);
            renderQuestions();
          }
        });

        // Изменение полей
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("questionnaire-question")) {
            const i = e.target.closest(".questionnaire-item").dataset.i;
            tpl.questions[i].question = e.target.value;
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим З-Х-У
      // ---------------------------------
      if (tpl.type === "zhu") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>
    
    <p style="text-align: justify"><strong>Тема урока:</strong></p>
    <textarea class="zhu-topic" rows="2" placeholder="Введите тему урока...">${tpl.topic}</textarea>
    
    <div id="zhu-table" style="margin-top: 20px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 10px; text-align: center; width: 33%;">Знаю</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: center; width: 33%;">Хочу узнать</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: center; width: 33%;">Узнал</th>
          </tr>
        </thead>
        <tbody id="zhu-rows"></tbody>
      </table>
    </div>
    
    <button id="add-zhu-row" class="print-btn" style="background:#00966c; margin-right: 10px;">
      Добавить строку
    </button>
  `;

        const container = modalBody.querySelector("#zhu-rows");

        function renderZhuRows() {
          container.innerHTML = tpl.rows
            .map(
              (row, index) => `
      <tr class="zhu-row" data-i="${index}">
        <td style="border: 1px solid #ddd; padding: 8px;">
          </br>
          </br>
          </br>
        </td>
        <td style="border: 1px solid #ddd; padding: 8px;">
          </br>
          </br>
          </br>
        </td>
        <td style="border: 1px solid #ddd; padding: 8px;">
          </br>
          </br>
          </br>
        </td>
        <td style="border: none; padding: 8px; text-align: center;">
          <button class="remove-zhu-row" style="background:#d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
            ✕
          </button>
        </td>
      </tr>
    `
            )
            .join("");
        }

        renderZhuRows();

        // Добавление строки
        modalBody
          .querySelector("#add-zhu-row")
          .addEventListener("click", () => {
            tpl.rows.push({ know: "", want: "", learned: "" });
            renderZhuRows();
          });

        // Удаление строки
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-zhu-row")) {
            const i = e.target.closest(".zhu-row").dataset.i;
            tpl.rows.splice(i, 1);
            renderZhuRows();
          }
        });

        // Изменение полей
        modalBody.addEventListener("input", (e) => {
          const row = e.target.closest(".zhu-row");
          if (!row) return;

          const i = row.dataset.i;

          if (e.target.classList.contains("zhu-topic")) {
            tpl.topic = e.target.value;
          }
          if (e.target.classList.contains("zhu-know")) {
            tpl.rows[i].know = e.target.value;
          }
          if (e.target.classList.contains("zhu-want")) {
            tpl.rows[i].want = e.target.value;
          }
          if (e.target.classList.contains("zhu-learned")) {
            tpl.rows[i].learned = e.target.value;
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
    <p style="text-align: justify">${tpl.description}</p>

    <div style="margin-top: 15px; margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 5px; text-align: justify;">
      <strong>Обозначения:</strong><br>
      "V" - "я это знаю"<br>
      "+" - "новая информация"<br>
      "-" - "я думал иначе"<br>
      "?" - "непонятно, требуется уточнение"
    </div>
    
    <p style="text-align: justify"><strong>Текст для анализа:</strong></p>
    <textarea class="insert-text" rows="10" placeholder="Введите текст для маркировки...">${tpl.text}</textarea>
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
      //  🎯 Режим Самооценка совместной работы
      // ---------------------------------
      if (tpl.type === "selfAssessment") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div id="self-assessment-questions"></div>

    <button id="add-self-assessment-question" class="print-btn" style="background:#00966c">
      Добавить вопрос
    </button>
  `;

        const container = modalBody.querySelector("#self-assessment-questions");

        function renderQuestions() {
          container.innerHTML = tpl.questions
            .map(
              (question, index) => `
      <div class="self-assessment-item" data-i="${index}" style="padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 1rem; background: #fafafa;">
        <label><strong>Вопрос для самооценки:</strong></label>
        <textarea class="self-assessment-question" rows="3" placeholder="Введите вопрос для самооценки..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 15px;">${question}</textarea>
        
        <div class="answer-preview" style="margin: 15px 0; padding: 12px; background: #f5f5f5; border-radius: 6px;">
          <p style="margin: 0 0 10px 0; color: #424242; font-size: 15px;">
            ${question || " "}
          </p>
          <div style="height: 120px; border: 1px dashed #757575; border-radius: 4px; background: #fafafa; display: flex; align-items: center; justify-content: center;">
            <span style="color: #757575; font-style: italic;"></span>
          </div>
        </div>
        
        <button class="remove-self-assessment-question" style="background:#d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
          Удалить вопрос
        </button>
      </div>
    `
            )
            .join("");
        }

        renderQuestions();

        // Обновление превью при вводе текста
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("self-assessment-question")) {
            const i = e.target.closest(".self-assessment-item").dataset.i;
            tpl.questions[i] = e.target.value;

            // Обновляем превью
            const preview = e.target
              .closest(".self-assessment-item")
              .querySelector(".answer-preview p");
            preview.innerHTML = `${e.target.value || " "}`;
          }
        });

        modalBody
          .querySelector("#add-self-assessment-question")
          .addEventListener("click", () => {
            tpl.questions.push("");
            renderQuestions();
          });

        // Удаление вопроса
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-self-assessment-question")) {
            const i = e.target.closest(".self-assessment-item").dataset.i;
            tpl.questions.splice(i, 1);
            renderQuestions();
          }
        });

        modal.classList.remove("hidden");
        return;
      }

      // ---------------------------------
      //  🎯 Режим Если бы я был учителем
      // ---------------------------------
      if (tpl.type === "teacher") {
        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div id="teacher-topics"></div>

    <button id="add-teacher-topic" class="print-btn" style="background:#00966c">
      Добавить тему
    </button>
  `;

        const container = modalBody.querySelector("#teacher-topics");

        function renderTopics() {
          container.innerHTML = tpl.topics
            .map(
              (topic, index) => `
      <div class="teacher-topic-item" data-i="${index}" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 1rem;">
        <label><strong>Расскажите об этом как учитель:</strong></label>
        <textarea class="teacher-topic-text" rows="4" placeholder="Введите тему для объяснения..." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 10px;">${topic}</textarea>
        
        <button class="remove-teacher-topic" style="background:#d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
          Удалить тему
        </button>
      </div>
    `
            )
            .join("");
        }

        renderTopics();

        modalBody
          .querySelector("#add-teacher-topic")
          .addEventListener("click", () => {
            tpl.topics.push("");
            renderTopics();
          });

        // Удаление темы
        modalBody.addEventListener("click", (e) => {
          if (e.target.classList.contains("remove-teacher-topic")) {
            const i = e.target.closest(".teacher-topic-item").dataset.i;
            tpl.topics.splice(i, 1);
            renderTopics();
          }
        });

        // Изменение полей
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("teacher-topic-text")) {
            const i = e.target.closest(".teacher-topic-item").dataset.i;
            tpl.topics[i] = e.target.value;
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
    <p style="text-align: justify">${tpl.description}</p>
    
    <label><strong>Вопрос для решения:</strong></label>
    <textarea class="main-question" rows="3" placeholder="Основной вопрос проблемы...">${tpl.mainQuestion}</textarea>

    <div id="training-questions-container" style="margin-top: 20px;">
      <label><strong>Вопросы для тренировки:</strong></label>
      <div id="training-questions"></div>
    </div>
    
    <button id="add-training-question" class="print-btn" style="background:#00966c; margin-top: 10px;">
      Добавить вопрос для тренировки
    </button>
  `;

        const container = modalBody.querySelector("#training-questions");

        function renderTrainingQuestions() {
          container.innerHTML = tpl.trainingQuestions
            .map(
              (question, index) => `
      <div class="training-item" data-index="${index}" style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
      <span style="padding-top: 5px">${index + 1}.</span>
        <textarea class="training-question" rows="2" placeholder="Вопрос для тренировки ${
          index + 1
        }..." style="flex: 1;">${question}</textarea>
        <button class="remove-training-question" data-index="${index}" style="background:#d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
          ✕
        </button>
      </div>
    `
            )
            .join("");
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
            const i = parseInt(e.target.dataset.index);
            if (i >= 0 && i < tpl.trainingQuestions.length) {
              tpl.trainingQuestions.splice(i, 1);
              renderTrainingQuestions();
            }
          }
        });

        // Изменение полей
        modalBody.addEventListener("input", (e) => {
          if (e.target.classList.contains("main-question")) {
            tpl.mainQuestion = e.target.value;
          }

          if (e.target.classList.contains("training-question")) {
            const item = e.target.closest(".training-item");
            if (item) {
              const i = parseInt(item.dataset.index);
              tpl.trainingQuestions[i] = e.target.value;
            }
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
        <p style="text-align: justify">${tpl.description}</p>
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

      // Составление тестов
      if (tpl.type === "test") {
        tpl.questions = [
          {
            question: "Кто был главным героем в прочитанной сказке?",
            answers: ["Лиса", "Колобок", "Волк", "Заяц"],
          },
          {
            question:
              "Какое время года мы сейчас изучаем на уроках окружающего мира?",
            answers: ["Весна", "Лето", "Осень", "Зима"],
          },
        ];

        modalBody.innerHTML = `
          <h2>${tpl.title}</h2>
          <p style="text-align: justify">${tpl.description}</p>

          <div class="example-text">
            ${tpl.questions
              .map(
                (q, i) => `
                <div  style="box-sizing: border-box; display: flex; flex-direction: column; align-items: flex-start; width: 100%; padding:12px;border:1px solid #ddd;border-radius:8px;margin-bottom:1rem;">
              <p style="text-align: justify"><strong>Вопрос:</strong> ${
                q.question || " "
              }</p>
              <p><strong>Варианты ответов:</strong></p>
                ${q.answers
                  .map((a, i) => `<p>${i + 1}.${a || " "}</p>`)
                  .join("")}
                </div> 
            `
              )
              .join("")}
          </div>
        `;
        modal.classList.remove("hidden");
        return;
      }

      // Самоотчёт
      if (tpl.type === "selfReport") {
        tpl.items = [
          "Я понял новую тему",
          "Я справился с заданием",
          "Мне понравилась работа в группе",
        ];

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div class="example-text">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left; width: 70%;">Учебные умения и действия</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: center; width: 30%;">Оценка</th>
          </tr>
        </thead>
        <tbody>
          ${tpl.items
            .map(
              (item, i) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 12px; vertical-align: top;">
                ${item || " "}
              </td>
              <td style="border: 1px solid #ddd; padding: 12px; text-align: center; vertical-align: middle; background: #fafafa;">
                <!-- Пустой столбец -->
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      //Самооценка
      if (tpl.type === "selfAssessment") {
        tpl.questions = [
          "Что я сделал для успеха нашей группы ?",
          "Какие трудности у меня возникли и как я их преодолел ?",
          "Что нового я узнал благодаря совместной работе ?",
        ];

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div class="example-text">
      ${tpl.questions
        .map(
          (question, i) => `
        <div style="margin-bottom: 25px;">
          <p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.4;">
            ${question || " "}
          </p>
          <div style="height: 150px; border: 1px dashed #757575; border-radius: 4px; background: #fafafa; display: flex; align-items: center; justify-content: center;">
            <span style="color: #757575; font-style: italic;"></span>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // Групповая презентация
      if (tpl.type === "groupPresentation") {
        tpl.criteria = [
          "Интересно и понятно изложен материал",
          "Все участники группы принимали активное участие",
          "Презентация красиво оформлена",
          "Были использованы примеры и иллюстрации",
        ];

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>
    
    <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #4caf50;">
      <p style="margin: 0 0 10px 0; font-weight: bold; color: #2e7d32;">Критерии оценки:</p>
      <ul style="margin: 0; padding-left: 20px;">
        <li><strong>«+»</strong> – отличная работа (трудно улучшить)</li>
        <li><strong>«=»</strong> – хорошая работа (хорошо, но вы видите способ улучшить)</li>
        <li><strong>«—»</strong> – слабая работа (многое нужно улучшить)</li>
      </ul>
    </div>

    <div class="example-text">
      ${tpl.criteria
        .map(
          (criterion, i) => `
        <div style="margin-bottom: 25px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <p style="margin: 0 0 15px 0; font-size: 15px;">${
            criterion || " "
          }</p>
          <div style="display: flex; gap: 30px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 25px; height: 25px; border: 2px solid #333; border-radius: 4px; background: white;"></div>
              <span style="font-weight: bold;">+</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 25px; height: 25px; border: 2px solid #333; border-radius: 4px; background: white;"></div>
              <span style="font-weight: bold;">=</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 25px; height: 25px; border: 2px solid #333; border-radius: 4px; background: white;"></div>
              <span style="font-weight: bold;">—</span>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // Неоконченные предложения
      if (tpl.type === "unfinished") {
        tpl.sentences = [
          "Сегодня на уроке я узнал",
          "Мне было интересно",
          "Я хочу попробовать",
        ];

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div class="example-text">
      ${tpl.sentences
        .map(
          (sentence, i) => `
        <div style="margin-bottom: 25px;">
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #b9b9b9ff;">
            <p style="margin: 0; font-weight: 500; color: #333; font-size: 16px;">
              ${sentence || " "}...
            </p>
            <div style="height: 100px; border: 1px dashed #b9b9b9ff; border-radius: 4px; background: #f9f9f9; margin-top: 10px; display: flex; align-items: center; justify-content: center;">
              <span style="color: #666; font-style: italic;"></span>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // Перевод
      if (tpl.type === "translation") {
        tpl.concepts = [
          "Фотосинтез — это процесс образования органических веществ в растениях под воздействием солнечного света.",
          "Атмосферное давление влияет на погодные условия и состояние воздуха вокруг нас.",
          "Минералы — это неорганические вещества, которые входят в состав горных пород и играют важную роль в природе.",
        ];

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div class="example-text">
      ${tpl.concepts
        .map(
          (concept, i) => `
        <div style="margin-bottom: 30px;">
          <p style="text-align: justify"><strong>Фраза для перевода:</strong></p>
          <p style="text-align: justify">${concept || " "}</p>
          
          <div style="margin: 20px 0;">
            <hr style="border: none; border-top: 2px dashed #ccc; margin: 20px 0;">
            <p style="text-align: center; color: #666; font-style: italic; margin: 10px 0;">Место для Вашего перевода</p>
            <div style="height: 120px; border: 1px dashed #ccc; border-radius: 4px; background: #fafafa; display: flex; align-items: center; justify-content: center;">
              <span style="color: #999;"></span>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // С позиции учителя
      if (tpl.type === "teacher") {
        tpl.topics = [
          "Названия всех четырёх времён года.",
          "Основные признаки каждого времени года (погода, растения, одежда).",
          "Чем отличаются времена года друг от друга.",
          "Какие виды деятельности подходят для каждого времени года (например, катание на санках зимой, купание летом).",
        ];

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div class="example-text">
      ${tpl.topics
        .map(
          (topic, i) => `
        <div style="margin-bottom: 25px;">
          <p style="text-align: justify">${topic || " "}</p>
          <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border-left: 4px solid #007a5f; margin-top: 10px;">
            <p style="font-weight: bold; color: #007a5f; margin-bottom: 10px;">Расскажите об этом как учитель:</p>
            <div style="height: 120px; border: 1px dashed #007a5f; border-radius: 4px; background: #fafafa; display: flex; align-items: center; justify-content: center;">
              <span style="color: #666; font-style: italic;"></span>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // Поиск ошибок
      if (tpl.type === "errorSearch") {
        tpl.tasks = ["Кошка — это насекомое, которое умеет летать."];

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div class="example-text">
      ${tpl.tasks
        .map(
          (task, i) => `
        <div style="margin-bottom: 25px;">
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #007a5f;">
            <p><strong>Найдите и исправьте здесь ошибки:</strong></p>
            <p style="white-space: pre-wrap; margin: 10px 0;">${task || " "}</p>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // Опросник
      if (tpl.type === "questionnaire") {
        tpl.questions = [
          {
            question:
              "Мне нравится, когда на уроке учитель рассказывает новые интересные истории.",
          },
        ];

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div class="example-text">
      ${tpl.questions
        .map(
          (q, i) => `
        <div style="margin-bottom: 25px;">
          <p><strong>Утверждение:</strong></p>
          <p style="text-align: justify">${q.question || " "}</p>
          
          <div class="scale-container" style="margin-bottom: 10px;">
          <div class="scale-labels" style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 12px; color: #666; padding: 0 10px;">
            <span style="flex: 1; text-align: center;">Не согласен</span>
            <span style="flex: 1; text-align: center;">Скорее не согласен</span>
            <span style="flex: 1; text-align: center;">Нейтрально</span>
            <span style="flex: 1; text-align: center;">Скорее согласен</span>
            <span style="flex: 1; text-align: center;">Согласен</span>
          </div>
          
          <div class="scale-circles" style="display: flex; justify-content: space-between; padding: 0 15px;">
            ${Array(5)
              .fill(0)
              .map(
                () => `
              <div style="flex: 1; text-align: center;">
                <div style="width: 25px; height: 25px; border: 2px solid #999; border-radius: 50%; background: #f0f0f0; margin: 0 auto;"></div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // Матрица запоминания
      if (tpl.type === "matrix") {
        tpl.xAxis = "Слова";
        tpl.yAxis = "Падежи";
        tpl.rows = 3;
        tpl.cols = 3;

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>
    
    <div class="example-text">
      <div class="matrix-preview">
        <div class="matrix-container" style="position: relative; border: 2px solid #333; background: white; margin: 20px 0;">
          <div class="matrix-y-label" style="position: absolute; left: -100px; top: 50%; transform: translateY(-50%) rotate(-90deg); font-weight: bold; color: #007a5f; width: 160px; text-align: center;">
            ${tpl.yAxis || " "}
          </div>
          <div class="matrix-x-label" style="position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%); font-weight: bold; color: #007a5f; width: 200px; text-align: center;">
            ${tpl.xAxis || " "}
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr 1fr; height: 300px;">
            <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
                <span style="color: #666; font-size: 14px;">озера</span>
              </div>
              <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
                <span style="color: #666; font-size: 14px;">дня</span>
              </div>
              <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
                <span style="color: #666; font-size: 14px;">мыши</span>
              </div>
              <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
                <span style="color: #666; font-size: 14px;">озеру</span>
              </div>
              <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
                <span style="color: #666; font-size: 14px;">дню</span>
              </div>
              <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
                <span style="color: #666; font-size: 14px;">мыши</span>
              </div>
              <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
                <span style="color: #666; font-size: 14px;">озером</span>
              </div>
              <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
                <span style="color: #666; font-size: 14px;">днём</span>
              </div>
              <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
                <span style="color: #666; font-size: 14px;">мышью</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // З-Х-У
      if (tpl.type === "zhu") {
        tpl.topic = "Домашние животные";
        tpl.rows = [
          {
            know: "Кошки и собаки живут рядом с человеком",
            want: "Как люди ухаживают за разными животными",
            learned: "Домашним животным нужны еда, вода и внимание",
          },
          {
            know: "У коровы есть телёнок",
            want: "",
            learned: "Куры дают яйца, а овцы — шерсть",
          },
          {
            know: "Лошадь может перевозить людей",
            want: "",
            learned: "",
          },
        ];

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>
    
    <div class="example-text">
      <p style="text-align: justify"><strong>Тема урока:</strong> ${
        tpl.topic || " "
      }</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Знаю</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Хочу узнать</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Узнал</th>
          </tr>
        </thead>
        <tbody>
          ${tpl.rows
            .map(
              (row) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                row.know || ""
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                row.want || ""
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                row.learned || ""
              }</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // Мозговой штурм
      if (tpl.type === "brainstorm") {
        tpl.mainQuestion =
          "Какие способы могут помочь сделать чтение сказок более интересным для всего класса?";
        tpl.trainingQuestions = [
          "Как можно сделать утреннюю зарядку веселее для ребят?",
          "Что можно придумать, чтобы перемены проходили спокойнее и дружнее?",
          "Какие идеи помогут сделать наш класс более уютным?",
        ];

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>
    
    <div class="example-text">
      <p style="text-align: justify;"><strong>Вопрос для решения:</strong></p>
      <p style="text-align: justify;"> ${tpl.mainQuestion || " "}</p>

      <div style="display: flex; flex-direction: column; gap: 8px; justify-content: flex-start; align-items: flex-start;">
        <p><strong>Вопросы для тренировки:</strong></p>
          ${tpl.trainingQuestions
            .map(
              (q, i) =>
                `<p>${i + 1}. ${
                  q || `Вопрос для тренировки ${i + 1} (пусто)`
                }</p>`
            )
            .join("")}
          </div>
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // Инсерт
      if (tpl.type === "insert") {
        tpl.text = `Солнце — это звезда, которая освещает и согревает нашу планету.
Растения используют солнечный свет для роста и производства пищи.
Вода в реках и озёрах помогает животным и людям жить.
Некоторые животные спят зимой, чтобы экономить энергию.
Воздух вокруг нас состоит из разных газов, которые мы вдыхаем каждый день.`;

        modalBody.innerHTML = `
    <h2>${tpl.title}</h2>
    <p style="text-align: justify">${tpl.description}</p>

    <div style="margin-top: 15px; margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 5px; text-align: justify">
      <strong>Обозначения:</strong><br>
      "V" - "я это знаю"<br>
      "+" - "новая информация"<br>
      "-" - "я думал иначе"<br>
      "?" - "непонятно, требуется уточнение"
    </div>
    
    <div class="example-text">
      <p style="text-align: justify"><strong>Текст для анализа:</strong></p>
      <p style="text-align: justify">${tpl.text || " "}</p>
    </div>
  `;
        modal.classList.remove("hidden");
        return;
      }

      // Стандартный пример
      modalBody.innerHTML = `
        <h2>${tpl.title}</h2>
        <p style="text-align: justify">${tpl.description}</p>
        <p><em>${tpl.variants}</em></p>
        <div class="example-text">
          ${
            tpl.questions
              ? tpl.questions.map((q) => `<p>${q}</p>`).join("")
              : `<p><em>Пример заполнения для данном приёме.</em></p>`
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

    // Индекс текущего шаблона из data-атрибута кнопки редактирования
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

    // Заменяем textarea -> p
    Array.from(cloned.querySelectorAll("textarea")).forEach((ta) => {
      const p = document.createElement("p");
      p.textContent = ta.value.trim() || " ";
      p.className = "print-text";
      ta.replaceWith(p);
    });

    // Заменяем input -> span (для вариантов)
    Array.from(cloned.querySelectorAll("input")).forEach((inp) => {
      const span = document.createElement("div");
      span.textContent = inp.value.trim() || " ";
      span.className = "print-text";
      inp.replaceWith(span);
    });

    // Удаляем все кнопки
    Array.from(cloned.querySelectorAll("button")).forEach((btn) =>
      btn.remove()
    );

    // Удаляем крестик закрытия
    Array.from(cloned.querySelectorAll(".close")).forEach((el) => el.remove());

    // УДАЛЯЕМ ЗАГОЛОВОК "ТЕКСТ ДЛЯ АНАЛИЗА:" И "PRINT-TEXT" ДЛЯ ИНСЕРТА И ЕЩЁ НЕКОТОРЫЕ ДЛЯ ДРУГИХ ШАБЛОНОВ
    if (
      currentTpl &&
      (currentTpl.type === "insert" ||
        currentTpl.type === "unfinished" ||
        currentTpl.type === "matrix" ||
        currentTpl.type === "selfAssessment")
    ) {
      // Ищем все элементы, которые содержат текст "Текст для анализа:"
      const textLabels = cloned.querySelectorAll("label, p, strong");
      textLabels.forEach((element) => {
        if (
          element.textContent.includes("Текст для анализа:") ||
          element.textContent.includes("Вертикальная ось:") ||
          element.textContent.includes("Горизонтальная ось:") ||
          element.textContent.includes("Столбцы:") ||
          element.textContent.includes("Строки:")
        ) {
          element.remove();
        }
      });

      // Удаляем элементы с классом "print-text"
      const printTextElements = cloned.querySelectorAll(".print-text");
      printTextElements.forEach((element) => {
        element.remove();
      });

      // Удаляем возможные родительские контейнеры
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

    // Специальная обработка для "Карта оценки групповой презентации"
    if (currentTpl && currentTpl.type === "groupPresentation") {
      // Создаем новый контент для печати
      let printContent = `
    <h2>${currentTpl.title}</h2>
    <p style="text-align: justify">${currentTpl.description}</p>
    
    <div style="background: #f5f5f5; padding: 15px; border-radius: 6px; margin-bottom: 25px; border: 1px solid #ddd;">
      <p style="margin: 0 0 10px 0; font-weight: bold;">Критерии оценки:</p>
      <ul style="margin: 0; padding-left: 20px;">
        <li><strong>«+»</strong> – отличная работа (трудно улучшить)</li>
        <li><strong>«=»</strong> – хорошая работа (хорошо, но вы видите способ улучшить)</li>
        <li><strong>«—»</strong> – слабая работа (многое нужно улучшить)</li>
      </ul>
    </div>
  `;

      // Добавляем каждый критерий с прямоугольниками
      currentTpl.criteria.forEach((criterion) => {
        const criterionText = criterion.trim() || " ";
        printContent += `
      <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
        <p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.4;">${criterionText}</p>
        <div style="display: flex; gap: 40px; margin-top: 15px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 30px; height: 30px; border: 2px solid #333; border-radius: 4px; background: white;"></div>
            <span style="font-weight: bold; font-size: 16px;">+</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 30px; height: 30px; border: 2px solid #333; border-radius: 4px; background: white;"></div>
            <span style="font-weight: bold; font-size: 16px;">=</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 30px; height: 30px; border: 2px solid #333; border-radius: 4px; background: white;"></div>
            <span style="font-weight: bold; font-size: 16px;">—</span>
          </div>
        </div>
      </div>
    `;
      });

      // Заменяем содержимое клона
      cloned.innerHTML = printContent;
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
        emptyMessage.textContent = " ";
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
          checkbox.style.paddingTop = "5px";
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

      // Специальная обработка для З-Х-У
      if (currentTpl && currentTpl.type === "zhu") {
        // Удаляем столбец "Действия" и кнопки удаления
        Array.from(cloned.querySelectorAll(".remove-zhu-row")).forEach(
          (btn) => {
            btn.closest("td").remove();
          }
        );

        // Заменяем input на обычный текст
        Array.from(
          cloned.querySelectorAll(".zhu-know, .zhu-want, .zhu-learned")
        ).forEach((input) => {
          const cell = input.closest("td");
          const value = input.value.trim();
          cell.innerHTML = value || "";
          cell.style.padding = "8px";
          cell.style.border = "1px solid #ddd";
        });

        // Удаляем кнопку "Добавить строку"
        const addButton = cloned.querySelector("#add-zhu-row");
        if (addButton) {
          addButton.remove();
        }
      }

      // Специальная обработка для Матрицы запоминания
      if (currentTpl && currentTpl.type === "matrix") {
        // Убираем input поля и оставляем только значения осей
        const matrixInputs = cloned.querySelector(".matrix-inputs");
        const matrixControls = cloned.querySelector(".matrix-controls");
        if (matrixInputs) matrixInputs.remove();
        if (matrixControls) matrixControls.remove();

        // Обновляем grid для печати
        const grid = cloned.querySelector(".matrix-grid");
        if (grid) {
          grid.style.gridTemplateColumns = `repeat(${currentTpl.cols}, 1fr)`;
          grid.style.gridTemplateRows = `repeat(${currentTpl.rows}, 1fr)`;
          grid.style.height = `${Math.max(200, currentTpl.rows * 80)}px`;

          const totalCells = currentTpl.rows * currentTpl.cols;
          grid.innerHTML = Array(totalCells)
            .fill(0)
            .map(
              () => `
        <div style="border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; background: #f9f9f9;">
          <span style="color: #666; font-size: 14px;"></span>
        </div>
      `
            )
            .join("");
        }

        // Обновляем подписи осей
        const yLabel = cloned.querySelector(".matrix-y-label");
        const xLabel = cloned.querySelector(".matrix-x-label");
        if (yLabel) yLabel.textContent = currentTpl.yAxis || " ";
        if (xLabel) xLabel.textContent = currentTpl.xAxis || " ";
      }

      // Специальная обработка для Опросника
      if (currentTpl && currentTpl.type === "questionnaire") {
        // Заменяем textarea на обычный текст
        Array.from(cloned.querySelectorAll(".questionnaire-question")).forEach(
          (textarea) => {
            const questionText = textarea.value.trim() || " ";
            const questionElement = document.createElement("p");
            questionElement.innerHTML = `<strong>${questionText}</strong>`;
            questionElement.style.marginBottom = "15px";
            textarea.replaceWith(questionElement);
          }
        );

        // Удаляем кнопки удаления
        Array.from(
          cloned.querySelectorAll(".remove-questionnaire-question")
        ).forEach((btn) => {
          btn.remove();
        });

        // Удаляем кнопку добавления вопроса
        const addButton = cloned.querySelector("#add-questionnaire-question");
        if (addButton) {
          addButton.remove();
        }
      }

      // Специальная обработка для Поиска ошибок
      if (currentTpl && currentTpl.type === "errorSearch") {
        // Заменяем textarea на форматированный текст
        Array.from(cloned.querySelectorAll(".error-task-text")).forEach(
          (textarea) => {
            const taskText = textarea.value.trim() || " ";

            // Создаем контейнер для задания
            const taskElement = document.createElement("div");
            taskElement.style.marginBottom = "20px";
            taskElement.innerHTML = `
      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #007a5f;">
        <p style="font-weight: bold; margin-bottom: 10px;">Найдите здесь ошибки и исправьте их:</p>
        <p style="white-space: pre-wrap; margin: 0;">${taskText}</p>
      </div>
    `;

            // Заменяем textarea
            textarea.replaceWith(taskElement);
          }
        );

        // Удаляем кнопки удаления
        Array.from(cloned.querySelectorAll(".remove-error-task")).forEach(
          (btn) => {
            btn.remove();
          }
        );

        // Удаляем кнопку добавления задания
        const addButton = cloned.querySelector("#add-error-task");
        if (addButton) {
          addButton.remove();
        }

        // Удаляем лишние лейблы
        Array.from(cloned.querySelectorAll("label")).forEach((label) => {
          if (
            label.textContent.includes("Найдите здесь ошибки и исправьте их:")
          ) {
            label.remove();
          }
        });
      }

      // Специальная обработка для Перевода информации
      if (currentTpl && currentTpl.type === "translation") {
        // Заменяем textarea на обычный текст
        Array.from(
          cloned.querySelectorAll(".translation-concept-text")
        ).forEach((textarea) => {
          const conceptText = textarea.value.trim() || " ";
          const conceptElement = document.createElement("p");
          conceptElement.innerHTML = `<strong>Фраза для перевода:</strong> ${conceptText}`;
          conceptElement.style.marginBottom = "15px";
          textarea.replaceWith(conceptElement);
        });

        // Удаляем кнопки удаления
        Array.from(
          cloned.querySelectorAll(".remove-translation-concept")
        ).forEach((btn) => {
          btn.remove();
        });

        // Удаляем кнопку добавления понятия
        const addButton = cloned.querySelector("#add-translation-concept");
        if (addButton) {
          addButton.remove();
        }

        // Удаляем лишние лейблы
        Array.from(cloned.querySelectorAll("label")).forEach((label) => {
          if (label.textContent.includes("Фраза для перевода:")) {
            label.remove();
          }
        });

        // Улучшаем отображение пространства для перевода
        Array.from(cloned.querySelectorAll(".translation-space")).forEach(
          (space) => {
            const dashedArea = space.querySelector("div");
            if (dashedArea) {
              dashedArea.style.minHeight = "150px";
              dashedArea.style.height = "auto";
            }
          }
        );
      }

      // Специальная обработка для "Если бы я был учителем"
      if (currentTpl && currentTpl.type === "teacher") {
        // Заменяем textarea на форматированный текст
        Array.from(cloned.querySelectorAll(".teacher-topic-text")).forEach(
          (textarea) => {
            const topicText = textarea.value.trim() || " ";

            // Создаем контейнер для темы
            const topicElement = document.createElement("div");
            topicElement.style.marginBottom = "20px";
            topicElement.innerHTML = `
      <p><strong>Тема:</strong> ${topicText}</p>
      <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; border-left: 4px solid #007a5f; margin-top: 10px;">
        <p style="font-weight: bold; color: #007a5f; margin-bottom: 10px;">Расскажите об этом как учитель:</p>
        <div style="min-height: 150px; border: 1px dashed #007a5f; border-radius: 4px; background: #fafafa; padding: 10px;">
          <span style="color: #666; font-style: italic;">Напишите здесь ваше объяснение темы с позиции учителя</span>
        </div>
      </div>
    `;

            // Заменяем textarea
            textarea.replaceWith(topicElement);
          }
        );

        // Удаляем кнопки удаления
        Array.from(cloned.querySelectorAll(".remove-teacher-topic")).forEach(
          (btn) => {
            btn.remove();
          }
        );

        // Удаляем кнопку добавления темы
        const addButton = cloned.querySelector("#add-teacher-topic");
        if (addButton) {
          addButton.remove();
        }

        // Удаляем лишние лейблы
        Array.from(cloned.querySelectorAll("label")).forEach((label) => {
          if (label.textContent.includes("Расскажите об этом как учитель:")) {
            label.remove();
          }
        });
      }

      // Специальная обработка для "Неоконченное предложение"
      if (currentTpl && currentTpl.type === "unfinished") {
        // Заменяем textarea на форматированные предложения
        Array.from(
          cloned.querySelectorAll(".unfinished-sentence-text")
        ).forEach((textarea) => {
          const sentenceText = textarea.value.trim() || " ";

          // Создаем контейнер для предложения
          const sentenceElement = document.createElement("div");
          sentenceElement.style.marginBottom = "20px";
          sentenceElement.innerHTML = `
      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #b9b9b9ff;">
        <p style="margin: 0; font-weight: 500; color: #333; font-size: 16px; line-height: 1.5;">
          ${sentenceText}...
        </p>
        <div style="min-height: 100px; border: 1px dashed #b9b9b9ff; border-radius: 4px; background: #f9f9f9; margin-top: 10px; padding: 10px;">
          <span style="color: #666; font-style: italic;">Продолжите предложение...</span>
        </div>
      </div>
    `;

          // Заменяем textarea
          textarea.replaceWith(sentenceElement);
        });

        // Удаляем кнопки удаления
        Array.from(
          cloned.querySelectorAll(".remove-unfinished-sentence")
        ).forEach((btn) => {
          btn.remove();
        });

        // Удаляем кнопку добавления предложения
        const addButton = cloned.querySelector("#add-unfinished-sentence");
        if (addButton) {
          addButton.remove();
        }

        // Удаляем лишние лейблы
        Array.from(cloned.querySelectorAll("label")).forEach((label) => {
          if (label.textContent.includes("Неоконченное предложение:")) {
            label.remove();
          }
        });

        // Удаляем превью контейнеры
        Array.from(cloned.querySelectorAll(".sentence-completion")).forEach(
          (container) => {
            container.remove();
          }
        );
      }

      // Специальная обработка для "Самооценка совместной работы"
      if (currentTpl && currentTpl.type === "selfAssessment") {
        // Создаем контейнер для всех вопросов
        const questionsContainer = document.createElement("div");

        currentTpl.questions.forEach((question, index) => {
          const questionText = question.trim() || " ";

          const questionElement = document.createElement("div");
          questionElement.style.marginBottom = "30px";
          questionElement.style.paddingBottom = "20px";
          questionElement.style.borderBottom = "1px solid #e0e0e0";
          questionElement.innerHTML = `
      <p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.4; color: #424242;">
        ${questionText}
      </p>
      <div style="min-height: 150px; border: 1px dashed #757575; border-radius: 4px; background: #fafafa; padding: 15px;">
        <span style="color: #757575; font-style: italic;">Напишите здесь ваш развёрнутый ответ...</span>
      </div>
    `;

          questionsContainer.appendChild(questionElement);
        });

        // Заменяем весь контент модалки на отформатированные вопросы
        cloned.innerHTML = `
    <h2>${currentTpl.title}</h2>
    <p>${currentTpl.description}</p>
    ${questionsContainer.innerHTML}
  `;
      }

      // Специальная обработка для "Карта самоотчёта"
      if (currentTpl && currentTpl.type === "selfReport") {
        // Создаем новую таблицу для печати
        let tableContent = `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f5f5f5;">
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left; width: 70%;">Учебные умения и действия</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: center; width: 30%;">Оценка</th>
        </tr>
      </thead>
      <tbody>
  `;

        // Добавляем строки таблицы
        currentTpl.items.forEach((item) => {
          const itemText = item.trim() || " ";
          tableContent += `
      <tr>
        <td style="border: 1px solid #ddd; padding: 12px; vertical-align: top;">
          ${itemText}
        </td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: center; vertical-align: middle; background: #fafafa;">
          <!-- Пустой столбец для заполнения -->
        </td>
      </tr>
    `;
        });

        tableContent += `
      </tbody>
    </table>
  `;

        // Заменяем весь контент модалки
        cloned.innerHTML = `
    <h2>${currentTpl.title}</h2>
    <p>${currentTpl.description}</p>
    ${tableContent}
  `;
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

    // Открываем новую вкладку и пишем туда
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

    // Закрываем модальное окно после начала печати
    closeModal();

    // Загрузка и печать
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
