document.addEventListener("DOMContentLoaded", () => {

    // =====================
    // ТЕМНАЯ ТЕМА
    // =====================

    const themeButton = document.getElementById("themeToggle");

    if (themeButton) {

        if (localStorage.getItem("theme") === "dark") {

            document.body.classList.add("dark-mode");
            themeButton.textContent = "☀️ Светлая тема";
        }

        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "theme",
                isDark ? "dark" : "light"
            );

            themeButton.textContent = isDark
                ? "☀️ Светлая тема"
                : "🌙 Темная тема";
        });
    }

    // =====================
    // СЧЕТЧИК ПОСЕЩЕНИЙ
    // =====================

    const counter =
        document.getElementById("counter");

    if (counter) {

        let visits =
            parseInt(
                localStorage.getItem("visits")
            ) || 0;

        visits++;

        localStorage.setItem(
            "visits",
            visits
        );

        counter.textContent = visits;
    }

    // =====================
    // ПОИСК ПРОФИЛЯ
    // =====================

    const form =
        document.getElementById("searchForm");

    if (form) {

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            const username =
                document
                    .getElementById("searchInput")
                    .value
                    .trim();

            if (username.length < 3) {

                alert(
                    "Введите минимум 3 символа"
                );

                return;
            }

            window.open(
                `https://github.com/${username}`,
                "_blank"
            );
        });
    }

    // =====================
    // ИЗБРАННЫЕ ПРОФИЛИ
    // =====================

    const saveButton =
        document.getElementById("saveProfile");

    const favoritesList =
        document.getElementById("favoritesList");

    let favorites =
        JSON.parse(
            localStorage.getItem("favorites")
        ) || [];

    function renderFavorites() {

        if (!favoritesList) return;

        favoritesList.innerHTML = "";

        favorites.forEach((user, index) => {

            const li =
                document.createElement("li");

            li.innerHTML = `
                <a
                    href="https://github.com/${user}"
                    target="_blank"
                >
                    ${user}
                </a>

                <button
                    class="delete-btn"
                    data-index="${index}"
                >
                    ❌
                </button>
            `;

            favoritesList.appendChild(li);
        });

        document
            .querySelectorAll(".delete-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            button.dataset.index;

                        favorites.splice(
                            index,
                            1
                        );

                        localStorage.setItem(
                            "favorites",
                            JSON.stringify(
                                favorites
                            )
                        );

                        renderFavorites();
                    }
                );
            });
    }

    renderFavorites();

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            () => {

                const username =
                    document
                        .getElementById(
                            "searchInput"
                        )
                        .value
                        .trim();

                if (!username) return;

                if (
                    !favorites.includes(
                        username
                    )
                ) {

                    favorites.push(
                        username
                    );

                    localStorage.setItem(
                        "favorites",
                        JSON.stringify(
                            favorites
                        )
                    );

                    renderFavorites();
                }
            }
        );
    }
});
