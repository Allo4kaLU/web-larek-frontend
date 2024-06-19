import { IEvents } from './base/events';
import { ICardList, ICard } from '../types/index';
import { Component } from './base/Components';
import { cloneTemplate } from "./base/api";
import { ensureElement } from '../utils/utils'

export class Card extends Component<ICard> {
    protected _element: HTMLElement;
    protected events: IEvents;

    protected _title?: HTMLElement;
    protected _description?: HTMLElement;
    protected _price?: HTMLElement;
    protected _category?: HTMLElement;
    protected _image?: HTMLImageElement;
    protected cardID: string;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template);

        this.events = events;
        this._element = cloneTemplate(template);

        this._title = this._element.querySelector('.card__title');
        this._description = this._element.querySelector('.card__text');
        this._price = this._element.querySelector('.card__price');
        this._category = this._element.querySelector('.card__category');
        this._image = this._element.querySelector('.card__image');
    
    }


 setData(cardData: ICard): void {   //заполняет атрибуты элементов карточки данными.
    this._title.textContent = cardData.title;
    //this._description.textContent = cardData.description;
    //this._price.textContent = cardData.price;
    this._category.textContent = cardData.category;
    //this._image.style.backgroundImage = 'url(${cardData.link})';
}

set image(value: string) {
    this.setImage(this._image, value)
}

//метод возвращает полностью заполненную карточку
render(): HTMLElement {  
   return this._element;
}

/* сеттер и геттер id возвращает уникальный айди карточки
set id(value: string) {
    this.element.dataset.id = value;
}

get id() {
    return this.element.dataset.id || '';
}*/
}