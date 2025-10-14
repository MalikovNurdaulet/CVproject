'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    // ✅ Добавляем индивидуальную дату
    const modalDate = document.querySelector(".testimonials-modal time");
    const date = this.getAttribute("data-date");
    if (modalDate && date) {
      modalDate.textContent = date;
    }

    testimonialsModalFunc();
  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
// for (let i = 0; i < navigationLinks.length; i++) {
//   navigationLinks[i].addEventListener("click", function () {

//     for (let i = 0; i < pages.length; i++) {
//       // if (this.innerHTML.toLowerCase() === pages[i].dataset.page) Старая версия
//       if (this.dataset.page === pages[i].dataset.page) //Новая версия
//       {
//         pages[i].classList.add("active");
//         navigationLinks[i].classList.add("active");
//         window.scrollTo(0, 0);
//       } else {
//         pages[i].classList.remove("active");
//         navigationLinks[i].classList.remove("active");
//       }
//     }

//   });
// }

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.dataset.page || link.textContent.trim().toLowerCase();

    // переключаем видимую страницу
    pages.forEach((page) => {
      page.classList.toggle("active", page.dataset.page === target);
    });

    // подсветка активной кнопки
    navigationLinks.forEach((l) => {
      l.classList.toggle("active", l === link);
    });

    window.scrollTo(0, 0);
  });
});


// =============================
// Опыт работы — расчёт стажа
// =============================
// =============================
// Опыт работы — расчёт стажа с грамматикой
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const experienceEl = document.getElementById("experience-duration");
  if (!experienceEl) return;

  const start = new Date(2020, 9); // Октябрь 2020
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  // функция склонения слов
  function plural(n, forms) {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return forms[2];
    if (n1 > 1 && n1 < 5) return forms[1];
    if (n1 === 1) return forms[0];
    return forms[2];
  }

  const yearWord = plural(years, ["год", "года", "лет"]);
  const monthWord = plural(months, ["месяц", "месяца", "месяцев"]);

  let text = "";
  if (years > 0 && months > 0) {
    text = `${years} ${yearWord} и ${months} ${monthWord} опыта`;
  } else if (years > 0 && months === 0) {
    text = `${years} ${yearWord} опыта`;
  } else if (years === 0 && months > 0) {
    text = `${months} ${monthWord} опыта`;
  } else {
    text = "меньше месяца опыта";
  }

  experienceEl.textContent = `${text}`;
});



// === Clients: slow infinite scroll + center color highlight ===
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.clients-scroll-wrapper');
  const list = document.querySelector('.clients-list');
  if (!wrapper || !list) return;

  // duplicate content for seamless loop
  list.innerHTML = list.innerHTML + list.innerHTML;

  // collect ALL images after duplication
  const imgs = Array.from(list.querySelectorAll('.clients-item img'));

  // speed (px per second). Increase to make it faster
  let pxPerSecond = 10;

  let isPaused = false;
  let last = performance.now();
  let lastColorUpdate = 0;

  function step(now) {
    const dt = now - last;
    last = now;

    if (!isPaused) {
      wrapper.scrollLeft += (pxPerSecond * dt) / 1000;

      // loop when we scrolled half of the content (because we doubled it)
      const half = list.scrollWidth / 2;
      if (wrapper.scrollLeft >= half) {
        wrapper.scrollLeft -= half;
      }
    }

    // update color state ~10x per second
    if (now - lastColorUpdate > 100) {
      updateCenterHighlight();
      lastColorUpdate = now;
    }

    requestAnimationFrame(step);
  }

  function updateCenterHighlight() {
    const center = wrapper.scrollLeft + wrapper.clientWidth / 2;
    const radius = 100; // px around center where we consider "active"

    imgs.forEach((img) => {
      const item = img.parentElement; // .clients-item
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(center - itemCenter);

      if (distance <= radius) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  }

  // Pause/resume on hover/focus (desktop)
  ['mouseenter', 'focusin'].forEach(evt =>
    wrapper.addEventListener(evt, () => { isPaused = true; })
  );
  ['mouseleave', 'focusout'].forEach(evt =>
    wrapper.addEventListener(evt, () => { isPaused = false; })
  );

  // Pause/resume on touch (mobile)
  wrapper.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
  wrapper.addEventListener('touchend',   () => { isPaused = false; }, { passive: true });

  // kick off
  requestAnimationFrame(step);
});



  // === Clients scroll animation color logic ===
// === Clients: slow infinite scroll + center color highlight (iPhone-safe) ===
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".clients-scroll-wrapper");
  const list = document.querySelector(".clients-list");
  if (!wrapper || !list) return;

  // Duplicate list for seamless loop
  list.innerHTML += list.innerHTML;

  const imgs = Array.from(list.querySelectorAll(".clients-item img"));

  // 💨 Scroll speed (desktop vs mobile)
  let speed = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? 0.5  // a bit faster on iPhone
    : 0.7; // slower on desktop

  let pos = 0;
  let isPaused = false;
  let hoverTimer = null;

  function animate() {
    if (!isPaused) {
      pos -= speed;
      list.style.transform = `translateX(${pos}px)`;

      const halfWidth = list.scrollWidth / 2;
      if (Math.abs(pos) >= halfWidth) pos = 0;

      highlightCenter();
    }
    requestAnimationFrame(animate);
  }

  // 🎨 Highlight image in the center area
  function highlightCenter() {
    const wrapperRect = wrapper.getBoundingClientRect();
    const centerX = wrapperRect.left + wrapperRect.width / 2;
    const range = wrapperRect.width * 0.1; // 10% of width around center

    imgs.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const imgCenter = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - imgCenter);

      if (distance < range) img.classList.add("active");
      else img.classList.remove("active");
    });
  }

  // 🖱️ Pause immediately when mouse moves inside
  wrapper.addEventListener("mousemove", () => {
    isPaused = true;
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => (isPaused = false), 1500); // resume after 1.5s idle
  });

  // Pause when entering with mouse, resume when leaving
  wrapper.addEventListener("mouseenter", () => (isPaused = true));
  wrapper.addEventListener("mouseleave", () => (isPaused = false));

  // 📱 Pause/resume on iPhone/iPad touch
  wrapper.addEventListener("touchstart", () => (isPaused = true), { passive: true });
  wrapper.addEventListener("touchend", () => (isPaused = false), { passive: true });

  // Start animation
  requestAnimationFrame(animate);
});



// === PDF Viewer (delegated) ===
document.addEventListener("DOMContentLoaded", () => {
  const pdfOverlay = document.getElementById("pdfViewerOverlay");
  const pdfFrame   = document.getElementById("pdfFrame");
  if (!pdfOverlay || !pdfFrame) return;

  // Ловим клики по .open-pdf-btn где бы она ни была (в карточке или уже внутри модалки)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".open-pdf-btn");
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation(); // не закрываем модалку/оверлеи

    const pdfUrl = btn.getAttribute("data-pdf");
    if (!pdfUrl) return;

    // iOS: иногда <iframe> с PDF ведет себя капризно — откроем в новой вкладке
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isiOS) {
      window.open(pdfUrl, "_blank");
      return;
    }

    // Параметры просмотра: без панелей, по ширине
    pdfFrame.src = `${pdfUrl}#toolbar=1&navpanes=0&view=FitH`;
    pdfOverlay.classList.add("active");
  });

  // Закрытие кликом по фону
  pdfOverlay.addEventListener("click", (e) => {
    if (e.target === pdfOverlay) closePDF();
  });

  // Закрытие по ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePDF();
  });

  function closePDF() {
    pdfOverlay.classList.remove("active");
    pdfFrame.src = "";
  }
});


// === Горизонтальная прокрутка для блока testimonials ===
document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".testimonials-list.has-scrollbar");
  if (!scrollContainer) return;

  scrollContainer.addEventListener("wheel", (e) => {
    // Если пользователь крутит колесо — прокручиваем по оси X
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    }
  }, { passive: false });
});


// === Testimonials: вертикальная прокрутка мышью -> горизонтальная ===
document.addEventListener("DOMContentLoaded", () => {
  const testimonialsList = document.querySelector(".testimonials-list");
  if (!testimonialsList) return;

  testimonialsList.addEventListener("wheel", (e) => {
    // если пользователь крутит вертикально — скроллим по оси X
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault(); // блокируем стандартный вертикальный скролл
      testimonialsList.scrollLeft += e.deltaY; // двигаем по горизонтали
    }
  }, { passive: false }); // важно! чтобы работал preventDefault()
});
