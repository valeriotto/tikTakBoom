tikTakBoom = {
    init(
        tasks,
        timerField,
        gameStatusField,
        textFieldQuestion,
        textFieldAnswer1,
        textFieldAnswer2,
        textFieldAnswer3,
        textFieldAnswer4,
        textFieldAnswer5,
        inputTime, //ввеенное пользователем значение времени
        inputCountOfPlayers,//количество игроков
    ) {
        this.players = []; //массив объектов игроков
        // заполняем первый элемент массива 0,для простоты обращения к нему через state,потому что state начинается с 1
        this.players[0] = 0;
        this.isPenalty = false;//флаг режима игры пенальти
        this.boomTimer = 30;
        this.inputTime = inputTime;
        this.countOfPlayers = 2;
        this.inputCountOfPlayers = inputCountOfPlayers;
        this.tasks = JSON.parse(tasks);
        this.timerField = timerField;
        this.gameStatusField = gameStatusField;
        this.textFieldQuestion = textFieldQuestion;
        this.textFieldAnswer1 = textFieldAnswer1;
        this.textFieldAnswer2 = textFieldAnswer2;
        this.textFieldAnswer3 = textFieldAnswer3;
        this.textFieldAnswer4 = textFieldAnswer4;
        this.textFieldAnswer5 = textFieldAnswer5;
        this.needRightAnswers = 3//количество нужных ответов для победы
        this.timeToPlay = 3;//переменная для отсчета начала игры

    },

    /************************/
    /*чтение и проверка JSON*/
    /************************/
    readJSON() {
        try { // попытка чтения файла и проверка ошибок
            this.tasks = JSON.parse(tasks);
            if (this.tasks.length < 29) { // проверка вопросов
                throw new Error('Вопросов меньше 30!');
            }


            //проверка всего JSON на условия
            for (quest of this.tasks) {

                // вопрос присутствует и ответы не присутствуют
                if (!quest.chekParametr(`question`) || !quest.chekParametr(`answer1`) || !quest.chekParametr(`answer2`) ||
                    !quest.chekParametr(`answer3`) || !quest.chekParametr(`answer4`) || !quest.chekParametr(`answer5`)) {
                    throw new Error(`Проверьте наличие всех вопросов и ответов, они не должны быть пустыми!`);
                }

                // проверка ответов на правильность и заполненность
                let questAnswer1 = quest.answer1;
                let questAnswer2 = quest.answer2;
                let questAnswer3 = quest.answer3;
                let questAnswer4 = quest.answer4;
                let questAnswer5 = quest.answer5;

                if (!questAnswer1.chekParametr(`result`) || !questAnswer1.chekParametr(`value`) ||
                    !questAnswer2.chekParametr(`result`) || !questAnswer2.chekParametr(`value`) ||
                    !questAnswer3.chekParametr(`result`) || !questAnswer3.chekParametr(`value`) ||
                    !questAnswer4.chekParametr(`result`) || !questAnswer4.chekParametr(`value`) ||
                    !questAnswer5.chekParametr(`result`) || !questAnswer5.chekParametr(`value`)) {
                    throw new Error(`Проверьте ответы, они не должны быть пустыми и должен быть правильный ответ!`);
                }

                // проверка двух правильных ответов
                let newArrayForAnswerRitgh = [ // массив из ответов
                    questAnswer1.result,
                    questAnswer2.result,
                    questAnswer3.result,
                    questAnswer4.result,
                    questAnswer5.result];

                let trueAnswer = false;
                const err = () => { throw new Error(`В поросах присутствуют 2 верных ответа!`) };

                for (let j = 0; j < newArrayForAnswerRitgh.length; j++) { // проверяем каждый ответ в массиве
                    if (newArrayForAnswerRitgh[j]) {
                        trueAnswer ? err() : trueAnswer = true;
                    }
                }
            }

            return true; // TODO если все условия выполнились, возвращаем истину и добавляем в метод run на проверку через if
        } catch {
            return true;
        }
    },

    startTimer() {
        //скрываем ненужные поля
        startBlock.style.display = 'none';

        this.gameStatusField.innerText = 'Обратный отсчет!';

        this.timerField.innerText = `00:0${this.timeToPlay}`;
        if (this.timeToPlay-- > 0) {
            setTimeout(
                () => {
                    this.startTimer()
                },
                1000,
            )
        } else {
            this.timeToPlay = 3;
            this.run();
        }
    },

    run() {
        if (this.readJSON()) {
            this.gameStatusField.innerText = 'Игра идет';

            // присваиваем значение введенное пользователем к таймеру и количеству игроков
            this.boomTimer = parseInt(inputTime.value) || 30;
            this.countOfPlayers = parseInt(inputCountOfPlayers.value) || 2;

            if (this.countOfPlayers > 4)
                this.countOfPlayers = 2;

            //заполняем массив игроками с полями(номер,удален ли игрок из игры,количество ошибок)
            for (let i = 1; i < this.countOfPlayers + 1; i++)
                this.players[i] = new Object({ id: i, deleted: false, wrong: 0 });

            //обнуляем поля ввода
            inputTime.value = '';
            inputCountOfPlayers.value = '';

            this.state = 1;

            this.rightAnswers = 0;

            console.log(this.players);
            console.log(this.rightAnswers);

            this.turnOn();

            this.timer();

            //выводим нужные поля
            inGameBlock.style.display = 'inline';

            this.gameStatusField.style.display = 'inline';
        }

    },

    turnOn() {
        this.gameStatusField.innerText += ` Вопрос игроку №${this.state}`;

        const taskNumber = randomIntNumber(this.tasks.length - 1);
        this.printQuestion(this.tasks[taskNumber]);

        this.tasks.splice(taskNumber, 1);

        // this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
    },

    /*turnOff(value) {
        if (this.currentTask[value].result) {
            this.gameStatusField.innerText = 'Верно!';
            this.rightAnswers += 1;
            this.boomTimer += 5;
        } else {
            this.gameStatusField.innerText = 'Неверно!';
            this.boomTimer -= 5;
        }
        if (this.rightAnswers < this.needRightAnswers) {
            if (this.tasks.length === 0) {
                this.finish('lose');
            } else {
                this.turnOn();
            }
        } else {
            this.finish('won');
        }

        this.textFieldAnswer1.removeEventListener('click', answer1);
        this.textFieldAnswer2.removeEventListener('click', answer2);
        // this.textFieldAnswer3.removeEventListener('click', answer3);
        // this.textFieldAnswer4.removeEventListener('click', answer4);
        // this.textFieldAnswer5.removeEventListener('click', answer5);
    },*/


    printQuestion(task) {
        /* this.textFieldQuestion.innerText = task.question;
         this.textFieldAnswer1.innerText = task.answer1.value;
         this.textFieldAnswer2.innerText = task.answer2.value;
         this.textFieldAnswer3.innerText = task.answer3.value;
         this.textFieldAnswer4.innerText = task.answer4.value;
         this.textFieldAnswer5.innerText = task.answer5.value;

         const answers = getAnswers(task); // вызываем функцию  создания ответов
         const answersCount = answers.length; // после создания функции будет известно количество ответов

         this.textFieldAnswer1.addEventListener('click', answer1 = () => this.turnOff('answer1'));
         this.textFieldAnswer2.addEventListener('click', answer2 = () => this.turnOff('answer2'));
         this.textFieldAnswer3.addEventListener('click', answer3 = () => this.turnOff('answer3'));
         this.textFieldAnswer4.addEventListener('click', answer4 = () => this.turnOff('answer4'));
         this.textFieldAnswer5.addEventListener('click', answer5 = () => this.turnOff('answer5'));

         switch (answersCount) { // оператор switch сравнивает полученное выражение с очередным answersCount
             case 2: // если ответа 2, то скрываем другие поля
                 this.textFieldAnswer3.style.display = "none";
                 this.textFieldAnswer4.style.display = "none";
                 this.textFieldAnswer5.style.display = "none";
                 break;
             case 3:
                 this.textFieldAnswer3.innerText = answers[2];
                 this.textFieldAnswer4.style.display = "none";
                 this.textFieldAnswer5.style.display = "none";
                 break
             case 4:
                 this.textFieldAnswer3.innerText = answers[2];
                 this.textFieldAnswer4.innerText = answers[3];
                 this.textFieldAnswer5.style.display = "none";
                 break;
             case 5:
                 this.textFieldAnswer3.innerText = answers[2];
                 this.textFieldAnswer4.innerText = answers[3];
                 this.textFieldAnswer5.innerText = answers[4];
                 break;
             default:
                 break;
         }*/
        this.textFieldQuestion.innerText = task.question;
        this.textFieldAnswer1.innerText = task.answer1.value;
        this.textFieldAnswer2.innerText = task.answer2.value;

        //обрабатываем ответы пользователя в зависимости от режима игры

        this.textFieldAnswer1.addEventListener('click', answer1 = () => {
            if (!this.isPenalty)
                this.turnOff('answer1');
            else
                this.turnOffPenalty('answer1');
        });

        this.textFieldAnswer2.addEventListener('click', answer2 = () => {
            if (!this.isPenalty)
                this.turnOff('answer2');
            else
                this.turnOffPenalty('answer2');
        }
        );
        this.currentTask = task;
    },

    //функция удаляющая игроков, ответивших трижды неправильно, из игры и возвращающая число удаленных игроков
    checkPlayers() {
        let i = 0;
        this.players.forEach((element, index) => {
            if (element.wrong == 3)
                element.deleted = true;

            if (element.deleted)
                i++;
        });
        return i;
    },

    turnOff(value) {
        let countOfDeletedPlayers = 0;//в данной переменной будет храниться количество удаленных игроков
        if (this.currentTask[value].result) {
            this.gameStatusField.innerText = 'Верно!';
            this.boomTimer += 5;
            console.log("Увеличилось время");
            this.rightAnswers++;
        } else {
            this.gameStatusField.innerText = 'Неверно!';
            this.players[this.state].wrong += 1;//увеличиваем количство ошибок в члучае неправильного ответа
            this.boomTimer -= 5;
        }

        console.log("Количество верных ответов " + this.rightAnswers);
        this.textFieldAnswer1.removeEventListener('click', answer1);
        this.textFieldAnswer2.removeEventListener('click', answer2);

        countOfDeletedPlayers = this.checkPlayers();
        //переходим к следующему номеру игрока
        this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
        //если игрок под этим номером удален, то идем дальше, пока не встретим неудаленного пользователя
        while (this.players[this.state].deleted) {
            console.log("пропускаем пользователя " + this.state);
            this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;

            if (countOfDeletedPlayers == this.countOfPlayers) {
                console.log('все пользователи проиграли');
                this.finish('lose');
                break;
            }
        }

        if (this.rightAnswers < this.needRightAnswers) {
            //TODO тут можно что-то другое придумать
            // если кончились все вопросы, то заканчиваем игру поражением
            if (this.tasks.length === 0) {
                this.finish('lose');
            } else {
                this.turnOn(this.state);
            }
        } else {
            this.startPenalty();//если игроки дали нужное количство ответов, то ищем победителя
        }


    },

    turnOffPenalty(value) {
        //эта функция работает практически идентично turnOff()
        let countOfDeletedPlayers = 0;
        this.boomTimer = 5;
        if (this.currentTask[value].result) {
            this.gameStatusField.innerText = 'Верно!';
        } else {
            this.gameStatusField.innerText = 'Неверно!';
            this.players[this.state].deleted = true;
        }
        countOfDeletedPlayers = this.checkPlayers();

        this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;

        while (this.players[this.state].deleted) {
            console.log("пропускаем пользователя " + this.state);
            this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
        }

        if (this.countOfPlayers - countOfDeletedPlayers == 1) {
            //если остался один игрок, то он победил
            this.finish(this.players[this.state].id);
        }

        if (this.isPenalty) {
            if (this.tasks.length === 0) {
                //TODO если кончились вопросы - выигрывает тот, кто ответил на последний вопрос
                this.finish(this.players[state].id);
            } else {
                this.turnOn();
            }
        }
        this.textFieldAnswer1.removeEventListener('click', answer1);
        this.textFieldAnswer2.removeEventListener('click', answer2);
    },

    startPenalty() {
        this.state = 0;//обнуляем порядок, тем самым останавливаем таймер
        this.players.sort((prev, next) => prev.wrong - next.wrong);//сортируем массив игроков по количеству ошибок
        let penaltyPlayers = [];//массив игроков в пенальти
        penaltyPlayers[0] = 0;//так же делаем его с нулевым значением в начале для удобства

        //добавляем в массив первый элемент отсортированного массива, так как у него меньше всего ошибок
        penaltyPlayers.push(this.players[1]);

        //ищем значения равные минимальному, и если их находим то добавляем в массив penaltyPlayers, иначе объявлем победителем игрока под первым индеком
        for (let i = 2; i < this.players.length; i++) {
            if (penaltyPlayers[1].wrong == this.players[i].wrong && this.players[i].id <= this.countOfPlayers)
                penaltyPlayers.push(this.players[i]);
        }
        if (penaltyPlayers.length == 2) {
            console.log("Пользователь" + penaltyPlayers[1].id + "победил");
            this.finish(penaltyPlayers[1].id);
        }
        else {
            //если эелемнтов в массиве больше двух(первый элемент нулевой), то начинаем пенальти
            //TODO можно как-то красиво это оформить
            console.log("сейчас будет пенальти");
            this.isPenalty = true;//флаг пенальти
            this.players = penaltyPlayers;//присваиваем наш массив с игроками в пенальти основному массивудля дальнейшей работы в функциях
            this.players.forEach(element => {
                element.wrong = 0;//обнуляем все ошибки
            });
            this.players.sort((prev, next) => prev.id - next.id);//сортируем массив по id для удобства обращения
            this.boomTimer = 5;// изменяем время игры на 5 секунд
            this.countOfPlayers = penaltyPlayers.length - 1;
            this.state = 1;
            this.turnOn();
        }
    },

    /*finish(result = 'lose') {
        //выводим нужные поля
        startBlock.style.display = 'inline';


        //скрываем ненужные поля
        inGameBlock.style.display = 'none';

        this.state = 0;
        if (result === 'lose') {
            this.gameStatusField.innerText = `Вы проиграли!`;
        }
        if (result === 'won') {
            this.gameStatusField.innerText = `Вы выиграли!`;
        }

        this.textFieldQuestion.innerText = ``;
        this.textFieldAnswer1.innerText = ``;
        this.textFieldAnswer2.innerText = ``;

        console.log(this);
    },*/

    finish(result) {
        //выводим нужные поля
        startBlock.style.display = 'inline';


        //скрываем ненужные поля
        inGameBlock.style.display = 'none';

        this.isPenalty = 0;
        this.state = 0;
        this.rightAnswers = 0;
        //если передано 'lose' значит игра окончена поражением, иначе выводим индекс победителя
        if (result === 'lose') {
            this.gameStatusField.innerText = `Вы проиграли!`;
        }
        else if (result == 'end') {
            this.gameStatusField.innerText = `Вы закончили игру!`;
        } else {
            this.gameStatusField.innerText = `Игрок №${result} выиграл!`;
        }

        this.textFieldQuestion.innerText = ``;
        this.textFieldAnswer1.innerText = ``;
        this.textFieldAnswer2.innerText = ``;

        console.log(this);
        console.log(this.players);

    },

    /* timer() {
         if (this.state) {
             this.boomTimer -= 1;
             let sec = this.boomTimer % 60;
             let min = (this.boomTimer - sec) / 60;
             sec = (sec >= 10) ? sec : '0' + sec;
             min = (min >= 10) ? min : '0' + min;
             this.timerField.innerText = `${min}:${sec}`;

             if (this.boomTimer > 0) {
                 setTimeout(
                     () => {
                         this.timer()
                     },
                     1000,
                 )
             } else {
                 this.finish('lose');
             }
         }
     },*/

    timer() {
        if (this.state) {
            this.boomTimer -= 1;
            let sec = this.boomTimer % 60;
            let min = (this.boomTimer - sec) / 60;
            sec = (sec >= 10) ? sec : '0' + sec;
            min = (min >= 10) ? min : '0' + min;
            this.timerField.innerText = `${min}:${sec}`;

            if (this.boomTimer > 0) {
                setTimeout(
                    () => {
                        this.timer()
                    },
                    1000,
                )
            } else {
                // если время ответа кончилось,то игрок вылетает, или игра заканчивается в зависимости от режима
                if (this.isPenalty) {
                    this.players[this.state].deleted = true;

                    countOfDeletedPlayers = this.checkPlayers();

                    this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;

                    while (this.players[this.state].deleted) {
                        this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
                    }

                    if (this.countOfPlayers - countOfDeletedPlayers == 1) {
                        this.finish(this.players[this.state].id);
                    }

                    if (this.isPenalty) {
                        if (this.tasks.length === 0)
                            //TODO если кончились вопросы - выигрывает тот, кто ответил на последний вопрос
                            this.finish(this.players[state].id);
                        else
                            this.turnOn();
                    }
                }
                else
                    this.finish('lose');
            }
        }
    },
}
