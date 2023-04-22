# SnakeJS
### ТРЕБОВАНИЯ К ИНТЕРФЕЙСУ
* На экране должно быть игровое поле размером 10 на 10 клеточек.
* Над игровым полем должно быть окно, в котором показывается текущее количество очков игрока. На момент начала игры количество очков равно 0.
* Под окном с количеством очков указан лучший результат (рекорд) данного пользователя. Если пользователь играет в игру в первый раз, лучший результат отображать не нужно.
* После завершения игры появляется кнопка, которая позволяет перезапустить игру.
* Дизайн игровых элементов оставляем на ваше усмотрение: это может быть как минималистичная змейка в стиле ретро-игр, так и что-то более необычное. Ниже для вдохновения оставим несколько примеров реализации интерфейса игры.

### ПРАВИЛА ИГРЫ
* В начале игры змейка располагается в середине поля. Её изначальная длина — две клетки.
* Игра начинается при клике на любое место поля. В случайном месте поля появляется яблоко, и змейка начинает двигаться. Стрелками на клавиатуре можно двигать змейку в нужном направлении.
* После того как голова змейки попадает на клетку с яблоком, яблоко считается съеденным: игрок получает одно очко, яблоко исчезает с данной клетки и появляется в другом месте, а размер змейки увеличивается на одну клетку.
* Если голова змейки упирается в её собственное тело, игра заканчивается. Если игрок побил свой рекорд по очкам, значение рекорда перезаписывается. Также появляется кнопка, которая позволяет начать игру заново.
