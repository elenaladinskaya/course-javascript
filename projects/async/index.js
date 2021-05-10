/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';

const homeworkContainer = document.querySelector('#app');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  return new Promise((resolve) => {
    async function getCities() {
      let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

      let response = await fetch(url);

      let cities = await response.json();

      cities.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });

      return cities;
    }

    resolve(getCities());
  });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let towns;
filterBlock.style.display = 'none';
loadingFailedBlock.style.display = 'none';

try {

  towns = loadTowns();

  if (!towns) {
    throw new Error;
  }

  loadingBlock.style.display = 'none';
  filterBlock.style.display = 'block';

  filterInput.addEventListener('input', function () {
    let matchesArray = [];
    filterResult.innerHTML = '';

    const word = filterInput.value;

    if (!word) {
      filterResult.style.display = 'none';
    } else {
      filterResult.style.display = 'block';
    }

    towns.then(function (towns) {
      const townsArray = [...towns];

      townsArray.forEach(el => {
        if (isMatching(el.name, word)) {
          matchesArray.push(el.name);
        }
      });
      matchesArray.forEach((item) => {
        const createTown = document.createElement('p');
        filterResult.appendChild(createTown);
        createTown.textContent = item;
      });
    });
  });

} catch (e) {
  loadingBlock.style.display = 'none';
  loadingFailedBlock.style.display = 'block';

  retryButton.addEventListener('click', () => {
    towns = loadTowns();
  });
}



export { loadTowns, isMatching };
