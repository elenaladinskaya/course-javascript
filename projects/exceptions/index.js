/* ДЗ 3 - работа с исключениями и отладчиком */

/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую функцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Запрещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */
function isAllTrue(array, fn) {
  if (!Array.isArray(array) || array.length == 0) {
    throw new Error('empty array');
  } else if (typeof fn != 'function') {
    throw new Error('fn is not a function');
  }

  for (let i = 0; i < array.length; i++) {
    let isTrue = fn(array[i]);
    if (!isTrue) {
      return false;
    }
  }
  return true;
}

/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую функцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Запрещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */
function isSomeTrue(array, fn) {
  if (!Array.isArray(array) || array.length == 0) {
    throw new Error('empty array');
  } else if (typeof fn != 'function') {
    throw new Error('fn is not a function');
  }

  for (let i = 0; i < array.length; i++) {
    let isTrue = fn(array[i]);
    if (isTrue) {
      return true;
    }
  }
  return false;
}

/*
 Задание 3:

 3.1: Функция принимает заранее неизвестное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...args) {
  if (typeof fn != 'function') {
    throw new Error('fn is not a function');
  }

  let arr = [];

  for (let arg of args) {
    try {
      fn(arg);
    } catch (error) {
      arr.push(arg);
    }
  }
  return arr;
}

/*
 Задание 4:

 4.1: Функция имеет параметр number (по умолчанию - 0)
 
 4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее
 
 Количество передаваемых в методы аргументов заранее неизвестно
 
 4.3: Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
  if (!isFinite(number)) {
    throw new Error('number is not a number');
  }

  let obj = {
    sum(...args) {
      let sum = 0;
      for (let arg of args) {
        sum += arg;
      }
      return number + sum;
    },
    dif(...args) {
      let dif = 0;
      for (let arg of args) {
        dif += arg;
      }
      return number - dif;
    },
    div(...args) {
      let result = 0;
      let middleRes = 0;
      let finRes = 0;

      for (let arg of args) {
        if (arg == 0) {
          throw new Error('division by 0');
        } else if (result == 0) {
          result = number / arg;
        } else if (middleRes == 0) {
          middleRes = result / arg;
        } else if (finRes == 0) {
          finRes = middleRes / arg;
        } else {
          finRes /= arg;
        }
      }

      if (finRes == 0 && middleRes == 0) {
        return result;
      } else if (finRes == 0) {
        return middleRes;
      } else {
        return finRes;
      }
    },
    mul(...args) {
      let result = 0;
      let middleRes = 0;
      let finRes = 0;

      for (let arg of args) {
        if (result == 0) {
          result = number * arg;
        } else if (middleRes == 0) {
          middleRes = result * arg;
        } else if (finRes == 0) {
          finRes = middleRes * arg;
        } else {
          finRes *= arg;
        }
      }

      if (finRes == 0 && middleRes == 0) {
        return result;
      } else if (finRes == 0) {
        return middleRes;
      } else {
        return finRes;
      }
    },
  };

  return obj;
}

/* При решении задач, постарайтесь использовать отладчик */

export { isAllTrue, isSomeTrue, returnBadArguments, calculator };
