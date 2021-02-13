tikTakBoom = {
    init(
        tasks,
        timerField,
        gameStatusField,
        textFieldQuestion,
        textFieldAnswer1,
        textFieldAnswer2,
        inputTime, //ввеенное пользователем значение времени
        inputCountOfPlayers,//количество игроков
    ) {
        this.boomTimer = 30;
        this.inputTime=inputTime;
        this.countOfPlayers = 2;
        this.inputCountOfPlayers=inputCountOfPlayers;
        this.tasks = JSON.parse(tasks);
        this.timerField = timerField;
        this.gameStatusField = gameStatusField;
        this.textFieldQuestion = textFieldQuestion;
        this.textFieldAnswer1 = textFieldAnswer1;
        this.textFieldAnswer2 = textFieldAnswer2;
        this.needRightAnswers = 3;
        this.timeToPlay=3;//переменная для отсчета начала игры

    },

    
    startTimer() {
        //скрываем ненужные поля
        startBlock.style.display='none';

        this.gameStatusField.innerText='Обратный отсчет!';

        this.timerField.innerText=`00:0${this.timeToPlay}`;
        if (this.timeToPlay-- > 0) {
            setTimeout(
                () => {
                    this.startTimer()
                },
                1000,
            )
        } else {
            this.timeToPlay=3;
            this.run();
        }     
    },

    run() {
        this.gameStatusField.innerText='Игра идет';

        // присваиваем значение введенное пользователем к таймеру и количеству игроков
        this.boomTimer=parseInt(inputTime.value) || 30;
        this.countOfPlayers=parseInt(inputCountOfPlayers.value) || 2;

        //обнуляем поля ввода
        inputTime.value='';
        inputCountOfPlayers.value='';

        this.state = 1;

        this.rightAnswers = 0;

        this.turnOn();

        this.timer();
            
        //выводим нужные поля
        inGameBlock.style.display='inline';

        this.gameStatusField.style.display='inline';
    },

    turnOn() {
        this.gameStatusField.innerText += ` Вопрос игроку №${this.state}`;

        const taskNumber = randomIntNumber(this.tasks.length - 1);
        this.printQuestion(this.tasks[taskNumber]);

        this.tasks.splice(taskNumber, 1);

        this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
    },

    turnOff(value) {
        if (this.currentTask[value].result) {
            this.gameStatusField.innerText = 'Верно!';
            this.rightAnswers += 1;
            this.boomTimer+=5;
        } else {
            this.gameStatusField.innerText = 'Неверно!';
            this.boomTimer-=5;
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
    },

    printQuestion(task) {
        this.textFieldQuestion.innerText = task.question;
        this.textFieldAnswer1.innerText = task.answer1.value;
        this.textFieldAnswer2.innerText = task.answer2.value;

        this.textFieldAnswer1.addEventListener('click', answer1 = () => this.turnOff('answer1'));
        this.textFieldAnswer2.addEventListener('click', answer2 = () => this.turnOff('answer2'));

        this.currentTask = task;
    },

    finish(result = 'lose') {
        //выводим нужные поля
        startBlock.style.display='inline';


        //скрываем ненужные поля
        inGameBlock.style.display='none';
        
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
    },

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
                this.finish('lose');
            }
        }
    },
}
