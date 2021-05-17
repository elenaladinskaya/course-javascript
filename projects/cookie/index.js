/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// listTable.textContent = document.cookie;
const cookies = document.cookie.split('; ').reduce((prev, current) => {
  const [name, value] = current.split('=');
  prev[name] = value;
  return prev;
}, {});;
const cookiesArray = document.cookie.split('; ');

function createItem(cookies) {
  for (const key in cookies) {
    const tr = document.createElement('tr');
    listTable.appendChild(tr);

    const tdKey = document.createElement('td');
    const tdValue = document.createElement('td');
    const delButton = document.createElement('button');
    tdKey.innerText = key;
    tdValue.innerText = cookies[key];
    delButton.innerText = 'Удалить';
    tr.appendChild(tdKey);
    tr.appendChild(tdValue);
    tr.appendChild(delButton);
  }
}

createItem(cookies);

function addCookie() {
  if (addNameInput.value && addValueInput.value) {
    let date = new Date(Date.now() + 88640000e3);
    document.cookie = `${addNameInput.value}=${addValueInput.value}; expires="` + date;
    addNameInput.value = '';
    addValueInput.value = '';
  } else {
    alert('Заполните все поля!');
  }
}

function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}

function updateFilter(filterValue) {
  if (!filterValue) {
    for (const child of listTable.children) {
      child.style.display = '';
    }
  } else {
    for (const child of listTable.children) {
      child.style.display = 'none';
    }

    for (const child of listTable.children) {
      if (filterValue && isMatching(child.textContent, filterValue)) {
        child.style.display = '';
      }
    }
  }
}

filterNameInput.addEventListener('input', function () {
  updateFilter(this.value);
});

addButton.addEventListener('click', () => {
  addCookie();
});

listTable.addEventListener('click', (e) => {
  if (e.target.tagName === "BUTTON") {
    listTable.removeChild(e.target.parentElement);

    const cookieName = e.target.parentElement.firstChild.innerText;
    const cookieValue = e.target.parentElement.firstChild.nextElementSibling.innerText;
    const cookieForSearch = `${cookieName}=${cookieValue}`;

    cookiesArray.forEach(elem => {
      if (elem === cookieForSearch) {
        document.cookie = `${elem}; expires: -1`;
      }
    });
  }
});
