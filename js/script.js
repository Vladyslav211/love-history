
document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // ПЛАВНА НАВІГАЦІЯ
    // =========================

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const selector = link.getAttribute("href");

            if (!selector || selector === "#") return;

            const target = document.querySelector(selector);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });


    // =========================
    // АНІМАЦІЯ ПОЯВИ
    // =========================

    const animatedElements = document.querySelectorAll(
        ".section-heading, .photo-card, .moment-card, " +
        ".appreciation-card, .conversation-content"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
            }
        );

        animatedElements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }


    // =========================
    // МОДАЛЬНЕ ВІКНО
    // =========================

    const dateButton = document.querySelector(
        "[data-date-invitation]"
    );

    function openDateModal() {
        // Не створюємо друге вікно, якщо воно вже відкрите.
        if (document.querySelector(".date-modal")) return;

        const modal = document.createElement("div");

        modal.className = "date-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "date-modal-title");

        modal.innerHTML = `
            <div class="date-modal__content">
                <button
                    class="date-modal__close"
                    type="button"
                    aria-label="Закрити вікно"
                >&times;</button>

                <p class="date-modal__heart">♡</p>

                <p class="eyebrow">Тоді домовились</p>

                <h2 id="date-modal-title">
                    Це буде наш особливий вечір
                </h2>

                <p>
                    Тільки ти, я і новий спогад,
                    який ми створимо разом.
                </p>

                <p class="date-modal__signature">
                    З любов'ю ♡
                </p>

                <button
                    class="button date-modal__ok"
                    type="button"
                >
                    Обіймаю ❤️
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.classList.add("modal-open");

        const closeButton = modal.querySelector(
            ".date-modal__close"
        );

        const okButton = modal.querySelector(
            ".date-modal__ok"
        );

        function closeModal() {
            modal.remove();
            document.body.classList.remove("modal-open");

            if (dateButton) {
                dateButton.focus();
            }

            document.removeEventListener("keydown", handleEscape);
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                closeModal();
            }
        }

        closeButton.addEventListener("click", closeModal);
        okButton.addEventListener("click", closeModal);

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", handleEscape);

        closeButton.focus();
    }

    if (dateButton) {
        dateButton.addEventListener("click", openDateModal);
    }


    // =========================
    // ПЕРЕВІРКА ФОРМИ
    // =========================

    const relationshipForm = document.querySelector(
        ".relationship-form"
    );

    if (relationshipForm) {
        relationshipForm.addEventListener("submit", (event) => {
            const requiredFields = relationshipForm.querySelectorAll(
                "[required]"
            );

            let firstInvalidField = null;

            requiredFields.forEach((field) => {
                const isEmpty = !field.value.trim();

                if (isEmpty) {
                    field.setAttribute("aria-invalid", "true");

                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                } else {
                    field.removeAttribute("aria-invalid");
                }
            });

            if (firstInvalidField) {
                event.preventDefault();

                firstInvalidField.focus();

                firstInvalidField.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }

            /*
             * Якщо форма заповнена, браузер відправить її
             * на адресу, зазначену в атрибуті action форми.
             *
             * Для реального відправлення потрібно налаштувати
             * Formspree та замінити YOUR_FORM_ID.
             */
        });
    }
});
