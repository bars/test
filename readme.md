# Тестовое задание
  Реализовано на canvas.

  ### Установить: 
  - npm i
  - npm run dev

  ### Что можно делать: 
  - Добавить "игрока" (появляется в рандомном месте, но сама функция подразумевает и передачу координат), игрок при этом движется либо вверх-вниз, либо вправо-влево.
  - Удалить последнего игрока
  - Очистить всё поле
  - Убрать игрока по ID
  - По клику на игрока он:
    - выбирается
    - подсвечивается синим 
    - пульсирует
    - инфо по координатам и скорости обновляется автоматически
  - Игрока можно: 
    - ускорить
    - замедлить
    - остановить
    - удалить

  ### Не сделал:
  Добавление объектов, но там принцип тот же что с игроками.
  Вместо выпадающего меню сделал инфо справа от canvas'а: 
  - не стал привязывать движущееся меню к игроку, ну и там тоже просто нужно было отрисовать прямоугольник с меню, принцип отслеживания клика в целом и так понятен.
  - можно было бы отрисовать меню как html с помощью https://github.com/cburgmer/rasterizeHTML.js/wiki/API , но о моем коде это мало что бы сказало.
  
  ### Сколько потратил:
  К сожалению у меня не так много времени на выполнение тестовых заданий, поэтому потратил на него один день. Прошу понять и простить некоторые недоработки, а также то что сделано что-то, о чем не просили.