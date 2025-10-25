// ======= БУРГЕР-МЕНЮ =======
const menuToggle = document.querySelector('#menuToggle');
const menu = document.querySelector('#menu');
const overlay = document.querySelector('#overlay');
const menuItems = document.querySelectorAll('#menuItems li');

function openMenu() {
  menu.classList.add('is-open');
  overlay.classList.add('is-open');
  document.body.classList.add('no-scroll');
  menuToggle.textContent = 'Закрити меню';
}

function closeMenu() {
  menu.classList.remove('is-open');
  overlay.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  menuToggle.textContent = 'Відкрити меню';
  for (const item of menuItems) item.classList.remove('is-active');
}

function toggleMenu() {
  if (menu.classList.contains('is-open')) {
    closeMenu();
  } else {
    openMenu();
  }
}

menuToggle.addEventListener('click', toggleMenu);

overlay.addEventListener('click', () => {
  if (menu.classList.contains('is-open')) closeMenu();
  if (modalOverlay.classList.contains('is-open')) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMenu();
    closeModal();
  }
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === menuToggle) {
    e.preventDefault();
    toggleMenu();
  }
});

// ======= МОДАЛКА =======
const modalOverlay = document.querySelector('#modalOverlay');
const openModalBtn = document.querySelector('#openModalBtn');
const cancelModalBtn = document.querySelector('#cancelModalBtn');
const saveGradeBtn = document.querySelector('#saveGradeBtn');
const gradeInput = document.querySelector('#gradeInput');
const errorMsg = document.querySelector('#errorMsg');
const allGrades = document.querySelector('#allGrades');
const highGrades = document.querySelector('#highGrades');
const lowGrades = document.querySelector('#lowGrades');
const averageScore = document.querySelector('#averageScore');

const grades = [];

function openModal() {
  modalOverlay.classList.add('is-open');
  document.body.classList.add('no-scroll');
  setTimeout(() => gradeInput.focus(), 100);
}

function closeModal() {
  modalOverlay.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  errorMsg.textContent = '';
  gradeInput.value = '';
  openModalBtn.focus();
}

openModalBtn.addEventListener('click', openModal);
cancelModalBtn.addEventListener('click', closeModal);

saveGradeBtn.addEventListener('click', () => {
  const value = parseInt(gradeInput.value.trim());
  if (isNaN(value) || value < 1 || value > 12) {
    errorMsg.textContent = 'Введіть число від 1 до 12.';
    return;
  }

  grades.push(value);
  updateGrades();
  activateTab('all');
  closeModal();
});

function updateGrades() {
  allGrades.innerHTML = '';
  highGrades.innerHTML = '';
  lowGrades.innerHTML = '';

  let sum = 0;
  for (const g of grades) {
    const li = document.createElement('li');
    li.textContent = g;
    allGrades.appendChild(li);
    if (g >= 10) {
      const li2 = document.createElement('li');
      li2.textContent = g;
      highGrades.appendChild(li2);
    }
    if (g <= 6) {
      const li3 = document.createElement('li');
      li3.textContent = g;
      lowGrades.appendChild(li3);
    }
    sum += g;
  }

  const avg = grades.length ? (sum / grades.length).toFixed(2) : '—';
  averageScore.textContent = `Середній бал: ${avg}`;
}

// ======= ТАБИ =======
const tabButtons = document.querySelectorAll('.tab-buttons button');
const tabPanels = document.querySelectorAll('.tab-panel');
const statusText = document.querySelector('#statusText');

function activateTab(name) {
  for (const btn of tabButtons) {
    btn.classList.toggle('is-active', btn.dataset.tab === name);
  }
  for (const panel of tabPanels) {
    panel.classList.toggle('is-active', panel.dataset.panel === name);
  }
  const label = [...tabButtons].find(b => b.dataset.tab === name).textContent;
  statusText.textContent = `Показано: ${label}`;
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => activateTab(btn.dataset.tab));
});

document.addEventListener('keydown', e => {
  const focusedIndex = [...tabButtons].indexOf(document.activeElement);
  if (focusedIndex !== -1) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (focusedIndex + 1) % tabButtons.length;
      tabButtons[next].focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (focusedIndex - 1 + tabButtons.length) % tabButtons.length;
      tabButtons[prev].focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activateTab(document.activeElement.dataset.tab);
    }
  }
});
