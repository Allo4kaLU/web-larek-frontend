import { IEvents } from './base/events';
import { ICardList, ICard } from '../types/index';
import { Component } from './base/Components';
import { cloneTemplate } from "./base/api";
import { ensureElement } from '../utils/utils'

export class Card {
    protected element: HTMLElement;
    protected events: IEvents;
    protected _title: HTMLElement;
    protected _description: HTMLElement;
    protected _price: HTMLElement;
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;
    protected cardButton: HTMLButtonElement;


    constructor(template: HTMLTemplateElement, events: IEvents) {
        this.events = events;
        this.element = cloneTemplate(template);

        this._title = ensureElement('.card__title');
        this._description = ensureElement('.card__text');
        this._price = ensureElement('.card__price');
        this._category = ensureElement('.card__category');
        this._image = this.element.querySelector('.card__image');
        this.cardButton = this.element.querySelector('.card__button');

        this.cardButton.addEventListener('click', () =>
            this.events.emit('basket:changed', { card: this }));
    }


 setData(cardData: ICard): void {   //заполняет атрибуты элементов карточки данными.
    this._title.textContent = cardData.title;
    this._description.textContent = cardData.description;
    //this._price.textContent = cardData.price;
    this._category.textContent = cardData.category;
    this._image.style.backgroundImage = 'url(${cardData.link})';
}

//метод возвращает полностью заполненную карточку
render(): HTMLElement {  
   return this.element;
}

// сеттер и геттер id возвращает уникальный айди карточки
set id(value: string) {
    this.element.dataset.id = value;
}

get id() {
    return this.element.dataset.id || '';
}
}