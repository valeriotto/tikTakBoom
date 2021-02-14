const randomIntNumber = (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

function getAllAnswers(task) {
   let answers = []; // создаем массив ответов
   answers.push(task.answer1.value); // добавление элемента в конец массива
   answers.push(task.answer2.value);
   answers.push(task.answer3.value);
   answers.push(task.answer4.value);
   answers.push(task.answer5.value);

   return answers;
}

function mixAnswers(answers) { // перемешаем ответы
   let result = [];

   while (answers.length > 0) { // пока условие истинно, выполняется тело цикла
      let k = randomIntNumber(answers.length - 1, 0); // создадим переменную, в которую запишем рандомное число от 0 до длинны массива
      result.push(answers[k]); // добавим её в массив result
      answers.splice(k, 1); // изменим содержимое массива
   }

   return answers = result; // вернем в массив ответов перемешанные результаты
}

function getAnswers(task) { // функция создания ответов

   // генерируем значение количества ответов от 2 до 5
   let answersCount = randomIntNumber(5, 2); // записываем значение в новую переменную
   let answers = getAllAnswers(task); // вызываем функцию создания массива
   let result = []; // создаём массив результатов выдачи

   result.push(task.answer2.value); // добавляем правильный ответ в массив

   answers.splice(1, 1); // удаляем правильный ответ из массива

   // добавляем неправильные ответы в массив
   for (let i = 0; i < answersCount - 1; i++) { // используем цикл для сгенеррированного количества ответов
      let k = randomIntNumber(answers.length - 1, 0); // по аналогии с перемешыванием массива
      result.push(answers[k]);  // добавим в массив result
      answers.splice(k, 1); // изменим содержимое массива
   }

   result = mixAnswers(result); // ещё раз перемешаем ответы, чтобы правильный ответ был на разных местах

   return result; // возврат результата
}