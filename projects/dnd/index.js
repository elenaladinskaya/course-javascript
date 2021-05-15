/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {
  let currentDrag;
  if (e.target.classList.contains('draggable-div')) {
    currentDrag = e.target;

    currentDrag.onmousedown = function (event) {
      const shiftX = event.clientX - currentDrag.getBoundingClientRect().left;
      const shiftY = event.clientY - currentDrag.getBoundingClientRect().top;

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        currentDrag.style.left = pageX - shiftX + 'px';
        currentDrag.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      currentDrag.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        currentDrag.onmouseup = null;
      };
    };

    currentDrag.ondragstart = function () {
      return false;
    };
  }
});

export function createDiv() {
  const div = document.createElement('div');
  div.classList.add('draggable-div');
  div.style.backgroundColor =
    'rgb(' +
    getRandomColor(0, 255) +
    ', ' +
    getRandomColor(0, 255) +
    ', ' +
    getRandomColor(0, 255) +
    ')';
  div.style.width = getRandomSize(50, 150) + 'px';
  div.style.height = getRandomSize(50, 150) + 'px';
  div.style.top = getRandomPosition(100) + '%';
  div.style.left = getRandomPosition(100) + '%';

  return div;
}

function getRandomColor(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomSize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
