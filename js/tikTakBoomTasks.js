const tasks = `
[
    {
        "question": "Какая игра является видом спорта?",
            "answer1": { "result": true, "value": "Шахматы" },
            "answer2": { "result": false, "value": "В рулетку" },
            "answer3": { "result": false, "value": "В поддавки" },
            "answer4": { "result": false, "value": "Монополия" },
            "answer5": { "result": false, "value": "Лото" }
    },
    {
        "question": "Инструмент для игры в гольф.",
            "answer1": { "result": true, "value": "Клюшка" },
            "answer2": { "result": false, "value": "Бита" },
            "answer3": { "result": false, "value": "Палка" },
            "answer4": { "result": false, "value": "Удочка" },
            "answer5": { "result": false, "value": "Ракетка" }
    },
    {
        "question": "Родина хоккея с шайбой.",
            "answer1": { "result": true, "value": "Канада" },
            "answer2": { "result": false, "value": "Швеция" },
            "answer3": { "result": false, "value": "Финляндия" },
            "answer4": { "result": false, "value": "Россия" },
            "answer5": { "result": false, "value": "Австралия" }
    },
    {
        "question": "Марафонский забег - длина дистанции?",
        "answer1": { "result": false, "value": "500 м" },
        "answer2": { "result": true, "value": "42195 м" },
        "answer3": { "result": false, "value": "10000 м" },
        "answer4": { "result": false, "value": "50500 м" },
        "answer5": { "result": false, "value": "100 м" }
    },
    {
        "question": "Удар в боксе.",
        "answer1": { "result": false, "value": "Пыром" },
        "answer2": { "result": true, "value": "Апперкот" },
        "answer3": { "result": false, "value": "Антрекот" },
        "answer4": { "result": false, "value": "Пяткой" },
        "answer5": { "result": false, "value": "Лоу кик" }
    },
    {
        "question": "Пеле.",
        "answer1": { "result": false, "value": "Боксер" },
        "answer2": { "result": true, "value": "Футболист" },
        "answer3": { "result": false, "value": "Штангист" },
        "answer4": { "result": false, "value": "Пловец" },
        "answer5": { "result": false, "value": "Баскетболист" }
    },
    {
        "question": "Тайм в футболе.",
        "answer1": { "result": false, "value": "20 мин" },
        "answer2": { "result": true, "value": "45 мин" },
        "answer3": { "result": false, "value": "90 мин" },
        "answer4": { "result": false, "value": "30 мин" },
        "answer5": { "result": false, "value": "5 мин" }
    },
    {
        "question": "Штрафной удар в футболе.",
        "answer1": { "result": false, "value": "С разворота" },
        "answer2": { "result": true, "value": "Пенальти" },
        "answer3": { "result": false, "value": "Буллит" },
        "answer4": { "result": false, "value": "Трехочковый" },
        "answer5": { "result": false, "value": "В лоб" }
    },
    {
        "question": "В какой спортивной дисциплине используется шест?",
        "answer1": { "result": false, "value": "Прыжки в воду" },
        "answer2": { "result": true, "value": "Прыжки в высоту" },
        "answer3": { "result": false, "value": "Прыжки в длину" },
        "answer4": { "result": false, "value": "Прыжки на батуте" },
        "answer5": { "result": false, "value": "Бег с препятствиями" }
    },

    {
        "question": "Высшая оценка в фигургом катании.",
        "answer1": { "result": false, "value": "100%" },
        "answer2": { "result": true, "value": "6.0" }
        "answer5": { "result": false, "value": "5+" },
        "answer3": { "result": false, "value": "10" },
        "answer4": { "result": false, "value": "Великолепно" },
    },
    {
        "question": "Тройной тулуп.",
        "answer1": { "result": false, "value": "Костюм судьи в лыжных гонках" },
        "answer2": { "result": true, "value": "Элемент в фигурном катании" },
        "answer3": { "result": false, "value": "Костюм фигуриста" },
        "answer4": { "result": false, "value": "Элемент во фристайле" },
        "answer5": { "result": false, "value": "Костюм прыгуна с трамплина" }
    },
    {
        "question": "Оружие биатлониста.",
        "answer1": { "result": false, "value": "Катапульта" },
        "answer2": { "result": true, "value": "Ружьё" },
        "answer4": { "result": false, "value": "Арбалет" },
        "answer3": { "result": false, "value": "Пулемёт" },
        "answer5": { "result": false, "value": "Копьё" }
    },
    {
        "question": "Олимпийский девиз: \\"Быстрее, выше, ...\\".",
        "answer1": { "result": false, "value": "Круче" },
        "answer2": { "result": true, "value": "Сильнее" },
        "answer3": { "result": false, "value": "Слабее" },
        "answer4": { "result": false, "value": "Ещё выше" },
        "answer5": { "result": false, "value": "Ну хоть как-нибудь" }
    },
    {
        "question": "Что просят лыжники?",
        "answer1": { "result": false, "value": "Попить" },
        "answer2": { "result": true, "value": "Лыжню!" },
        "answer3": { "result": false, "value": "Поесть" },
        "answer4": { "result": false, "value": "Денег" },
        "answer5": { "result": false, "value": "Отдохнуть" }
    },
    {
        "question": "Боксерская площадка.",
        "answer1": { "result": true, "value": "Ринг" },
        "answer2": { "result": false, "value": "Татами" },
        "answer3": { "result": false, "value": "Стадион" },
        "answer4": { "result": false, "value": "Каток" },
        "answer5": { "result": false, "value": "Чисто поле" }
    },
    {
        "question": "Профессиональный стиль плавания.",
        "answer1": { "result": false, "value": "Топориком" },
        "answer2": { "result": true, "value": "По-собачьи" },
        "answer3": { "result": false, "value": "Баттерфляй" },
        "answer4": { "result": false, "value": "Со спасательным кругом" },
        "answer5": { "result": false, "value": "На надувном матрасе" }
    },
    {
        "question": "Куда надо забросить мяч в баскетболе?.",
        "answer1": { "result": false, "value": "В ведро" },
        "answer2": { "result": true, "value": "В корзину" },
        "answer3": { "result": false, "value": "В ворота" },
        "answer4": { "result": false, "value": "В лунку" },
        "answer5": { "result": false, "value": "На крышу" }
    },
    {
        "question": "Русский бейсбол.",
        "answer1": { "result": false, "value": "Пятнашки" },
        "answer2": { "result": true, "value": "Лапта" },
        "answer3": { "result": false, "value": "Городки" },
        "answer4": { "result": false, "value": "Народный мяч" },
        "answer5": { "result": false, "value": "Прятки" }
    },
    {
        "question": "Крылатая фраза: \\"Главное не победа, а ...\\".",
        "answer1": { "result": false, "value": "Присутствие" },
        "answer2": { "result": true, "value": "Участие" },
        "answer3": { "result": false, "value": "Поражение" },
        "answer4": { "result": false, "value": "Разгром" },
        "answer5": { "result": false, "value": "Побег" }
    },
    {
        "question": "На чем играют в кёрлинг?",
        "answer1": { "result": false, "value": "Вода" },
        "answer2": { "result": true, "value": "Лёд" },
        "answer3": { "result": false, "value": "Паркет" },
        "answer4": { "result": false, "value": "Трава" },
        "answer5": { "result": false, "value": "Асфальт" }
    },
    {
        "question": "Игровое время в хоккее.",
        "answer1": { "result": false, "value": "Тайм" },
        "answer2": { "result": true, "value": "Период" }
        "answer5": { "result": false, "value": "Сет" },
        "answer3": { "result": false, "value": "Четверть" },
        "answer4": { "result": false, "value": "Гейм" },
    },
    {
        "question": "Что показывает футбольный судья, удаляемому с поля за нарушение игроку?",
        "answer1": { "result": false, "value": "Чёрная метка" },
        "answer2": { "result": true, "value": "Красная карточка" },
        "answer3": { "result": false, "value": "Как надо играть" },
        "answer4": { "result": false, "value": "Язык" },
        "answer5": { "result": false, "value": "Удостоверение" }
    },
    {
        "question": "Закончи строчку из песни: \\"В хоккей играют ...\\".",
        "answer1": { "result": true, "value": "Настоящие мужчины" },
        "answer2": { "result": false, "value": "Реальные пацаны" },
        "answer3": { "result": false, "value": "Суровые мужики" },
        "answer4": { "result": false, "value": "Все кому не лень" },
        "answer5": { "result": false, "value": "Ребята с нашего двора" }
    },
    {
        "question": "Голеадор.",
        "answer1": { "result": false, "value": "Справедливый судья" },
        "answer2": { "result": true, "value": "Хороший нападающий" }
        "answer5": { "result": false, "value": "Активный болельщик" },
        "answer3": { "result": false, "value": "Хороший вратарь" },
        "answer4": { "result": false, "value": "Запасной игрок" },
    },
     {
        "question": "Спортивный снаряд для метания.",
        "answer1": { "result": false, "value": "Наковальня" },
        "answer2": { "result": false, "value": "Верстак" },
        "answer3": { "result": false, "value": "Плоскогубцы" },
        "answer4": { "result": false, "value": "Серп" },
        "answer5": { "result": true, "value": "Молот" }
    },
    {
        "question": "Одно из нарушений в баскетболе.",
        "answer1": { "result": false, "value": "Прогуливание" },
        "answer2": { "result": true, "value": "Пробежка" },
        "answer3": { "result": false, "value": "Приседание" },
        "answer4": { "result": false, "value": "Проброс" },
        "answer5": { "result": false, "value": "Прогулка" }
    },
    {
        "question": "Вид борьбы.",
        "answer1": { "result": false, "value": "Афроамериканская" },
        "answer2": { "result": true, "value": "Греко римская" }
        "answer5": { "result": false, "value": "Чехословацкая" },
        "answer3": { "result": false, "value": "Восточноевропейская" },
        "answer4": { "result": false, "value": "Юго-западная" },
    },
    {
        "question": "Одежда каратиста.",
        "answer1": { "result": true, "value": "Кимоно" },
        "answer2": { "result": false, "value": "Скафандр" },
        "answer3": { "result": false, "value": "Плавки" },
        "answer4": { "result": false, "value": "Шорты и майка" },
        "answer5": { "result": false, "value": "Трико" }
    },
    {
        "question": "Какой спортивный снаряд существует?",
        "answer1": { "result": true, "value": "Баран" },
        "answer2": { "result": false, "value": "Буйвол" },
        "answer3": { "result": false, "value": "Слон" },
        "answer4": { "result": false, "value": "Бегемот" },
        "answer5": { "result": false, "value": "Козел" }
    }

]
`;