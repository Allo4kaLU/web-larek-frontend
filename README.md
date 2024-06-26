# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных используемые в приложении

Карточка товара

```
export interface ICard {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
}
```

Пользователь

```
export interface IUser {
    _id: string;
    payment: boolean;
    address: string;
    email: string;
    tel: string;
}
```

Интерфейс для каталога товаров

```
export interface ICardList {
    cards: TCardList[];
}
```

Интерфейс для корзины

```
export interface IBasketData {
    cards: ICard[];
    addCard(card: ICard): void;
    deleteCard(cardId: string, payload: Function | null): void;
    updateCard(card: ICard, payload: Function | null): void;
    clearCards(cards: ICard[]): void;
}
```

Данные товара, используемые в каталоге

```
export type TCardList = Pick<ICard, 'title' | 'price' | 'category' | 'image'>;
```

Данные товара, используемые в корзине

```
export type TCardInfo = Pick<ICard, 'title' | 'price'>;
```

Данные пользователя в модальном окне по оплате

```
export type TUserPayAddress = Pick<IUser, 'payment' | 'address'>;
```

Данные пользователя в модальном окне с контактными данными

```
export type TUserContacts = Pick<IUser, 'email' | 'tel'>;
```


## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP: 
- слой представления, отвечает за отображение данных на странице, 
- слой данных, отвечает за хранение и изменение данных
- презентер, отвечает за связь представления и данных.

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы:
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие

### Слой данных

#### Класс BasketData
Класс отвечает за хранение и логику работы с данными карточек товара в корзине.\
Конструктор класса принимает инстант брокера событий\
В полях класса хранятся следующие данные:
- cards: ICard[] - массив объектов карточек товара корзины
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных

Так же класс предстваляет набор методов для взаимодействия с этими данными.
- addCard(card: TCardInfo): void - добавляет карточку товара в корзину
- deleteCard(cardId: string, payload: Function | null): void - удаляет карточку товара из корзины
- updateCard(card: TCardInfo, payload: Function | null): void - обновляет данные карточек товара в корзине
- clearCards(cards: TCardInfo[]): void - очищает корзину
- а так-же сеттеры и геттеры для сохранения и получения данных из полей класса

#### Класс UserData
Класс отвечает за хранение и логику работы с данными пользователя.\
Конструктор класса принимает инстант брокера событий\
В полях класса хранятся следующие данные:
- _id: string - id пользователя
- payment: string - способ оплаты товара
- address: string - адрес доставки товара
- email: string - электронный адрес пользователя
- tel: string - номер телефона пользователя
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных

Так же класс представляет набор методов для взаимодействия с этими данными:
- setUserInfo(userData: IUser): void - 
- checkValidationAddress(data: Record<keyof TUserPayAddress, string>): boolean - проверяет данные в форме с адресом на валидность
- checkValidationContacts(data: Record<keyof TUserContacts, string>): boolean - проверяет данные в форме с электронным адресом и номером телефона на валидность
- clearUser(data: IUser): void - очистка данных

### Классы представления 
Все классы представления отвечают за отображение внутри контейнера передаваемых в них данных.

#### Базовый Класс Component
Класс является дженериком и родителем всех компонентов слоя представления. В дженерик принимает тип объекта, в котором данные будут передаваться в метод render для отображения данных в компоненте. В конструкто принимает элемент разметки, являющийся основным родительским контейнером копонента. Сожержит метод render, отвечающий за сохранение полученных в параметре данных в полях компонентов через их стеттеры, возвращает обновленный контейнер компонента.

#### Класс Modal
Реализует модальное окно. Так же предоставляет методы `open` и `close` для управления отображения модального окна. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку-крестик для закрытия модального окна.
- constructor(selector: string, events: IEvents), конструктор принимает селектор, по которому в разметке страницы будет идентифицировано модальное окно и экземпляр класса `EventEmitter` для возможности инициации событий.

Поля класса
- modal: HTMLTemplateElement
- events: IEvents - брокер событий

#### Класс ModalPreview
Расширяет класс Modal. Предназначен для реализации модального окна с описанием товара. При открытии модального окна получает все данные товара: название, описание, цена, категория, изображение товара.
Поля класса:
- image: HTMLElement - изображение товара
- category: HTMLElement - категория товара
- title: HTMLElement - название товара
- text: HTMLElement - описание товара
- price: HTMLElement - стоимость товара
- handleSubmit: Function - функция добавления товара в корзину

#### Класс ModalBasket
Расширяет класс Modal. Преддназначен для реализации модального окна корзины. При открытии модального окна получает выбранные пользователем данные товара: название товара и цену товара. Реализует метод, в котором складывает стоимость выбранных товаров. При сабмите инициирует событие передачи данных.
Поля класса:
- title: HTMLElement - название товара
- price: HTMLElement - стоимость товара
- handleSubmit: Function - функция оформления заказа

Методы:
- getSum(...price: number): number - сумма стоимости товаров

#### Класс ModalOrder
Расширяет класс Modal. Предназначен для реализации модального окна выбора способа оплаты плюс форма, содержащая поле ввода адреса доставки. При сабмите инициирует событие передачи данных. Предоставляет методы для отображения ошибок и управления активностью кнопки.
Поля класса:
- submitButton: HTMLButtonElement - кнопка подтверждения 
- formInput: string - значение поля ввода

Методы:
- setValid(isValid: boolean): void - изменяет активность кнопоки подтверждения
- isChack(submitButton: HTMLButtonElement): void - делает активной кнопку выбранного способа оплаты


#### Класс ModalContacts
Расширяет класс Modal. Предназначен для реализации модального окна, содержащего поля ввода электронного адреса и телефона. При сабмите инициирует событие передачи данных. Предоставляет методы для отображения ошибок и управления активностью кнопки и изменения на ней текста.
Поля класса:
- submitButton: HTMLButtonElement - кнопка подтверждения 
- inputName: string - значение атрибута name инпута
- inputs: NodeListof<HTMLInputElement> - коллекция всех полей ввода
- erroes: Record<string, HTMLElement> - объект, хранящий все элементы для вывода ошибок под полями формы с привязкой к атрибуту name инпутов

Методы:
- setValid(isValid: boolean): void - изменяет активность кнопоки подтверждения и изменяет текст на ней
- close(): void - расширяет родительский метод, выполняя дополнительную очистку атрибутов модального окна


#### Класс ModalSuccess
Расширяет класс Modal. Предназначен для реализации модального окна успешной покупки. 
Поля класса:
- submitButton: HTMLButtonElement - кнопка подтверждения 

#### Класс Card
Отвечает за отображение карточки товара, задавая в карточке товара данные названия товара, цену товара, категории товара и изображения товара. Класс используется для отображения карточек товара на странице сайта. В конструктор класса передается DOM элемент темплейта, что позволяет формировать карточки разных вариантов верстки.
Поля класса содержат элементы разметки элементов карточки. Конструктор, кроме темплейта принимает экземпляр `EventEmitter` для инициации событий.\
Методы:
- setData(cardData: ICard): void - заполняет атрибуты элементов карточки данными.
- render(): HTMLElement - метод возвращает полностью заполненную карточку 
- геттер id возвращает уникальный айди карточки

#### Класс CardContainer
Отвечает за отображение блока с карточками на главной странице. В конструктор принимает контейнер, в котором размещаются карточки. В метод render принимает массив элементов разметки карточек, который отображает в контейнере, за который отвечает.

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерирующих с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`.\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `initialData: loaded` - загруженные карточки товара
- `card-preview:open` - открытие модального окна просмотра описания товара
- `basket:open` - открытие модального окна корзины
- `order:open` - открытие модального окна выбора способа оплаты и заполнения адреса
- `order-buttons:select` - выбор способа оплаты
- `address:input` - внесение данных в форму с данными адреса пользователя
- `contacts:open` - открытие модального окна с формой заполнения электронной почты и номера телефона
- `order-field:input` - внесение данных в форму с данными электронной почты и номера телефона пользователя
- `success:open` - открытие модального окна подтверждения заказа
- `address:validation` - событие сообщающее о необходимости валидации формы с данными адреса пользователя
- `contacts:validation` - событие сообщающее о необходимости валидации формы заполнения электронной почты и номера телефона
- `basket:changed` - изменение количества товара в корзине
- `basket:previewClear` - очистка карзины после успешного оформления заказа
- `user:added` - добавление данных пользователя