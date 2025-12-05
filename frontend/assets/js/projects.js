document.addEventListener("DOMContentLoaded", () => {
const projectListEl = document.querySelector(".project-list");
if (!projectListEl) return;

  // Путь от index.html к JSON
const PROJECTS_JSON_URL = "./assets/data/projects.json";

fetch(PROJECTS_JSON_URL)
    .then(response => {
    if (!response.ok) {
        throw new Error("Не удалось загрузить projects.json");
    }
    return response.json();
    })
    .then(projects => {
      // Очищаем список (на всякий случай)
    projectListEl.innerHTML = "";

    projects.forEach(project => {
        const li = document.createElement("li");
        li.className = "project-item active";
        li.setAttribute("data-filter-item", "");
        li.setAttribute("data-category", project.category); // например "applications"

        li.innerHTML = `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer">
            <figure class="project-img">
                <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            </figure>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-category">${project.category_label || project.category}</p>
            ${
            project.stack
                ? `<p class="project-stack">${project.stack}</p>`
                : ""
            }
        </a>
        `;

        projectListEl.appendChild(li);
    });
      // Если у тебя уже есть скрипт фильтрации, он подхватит эти элементы,
      // потому что у них есть .project-item, data-filter-item и data-category.
    })
    .catch(err => {
        console.error("Ошибка загрузки проектов:", err);
    });
});
