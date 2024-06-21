import { IEvents } from './base/events';
import { ICardList, ICard } from '../types/index';
import { Component } from './base/Components';
import { cloneTemplate } from "./base/api";
import { ensureElement } from '../utils/utils'
import { CDN_URL } from '../utils/constants';

export class Card extends Component<ICard> {
    protected events: IEvents;

    protected _title: HTMLElement;
    protected _description: HTMLElement;
    protected _price: HTMLElement;
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;
    protected _button: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this._title = this.container.querySelector('.card__title');
        this._description = this.container.querySelector('.card__text');
        this._price = this.container.querySelector('.card__price');
        this._category = this.container.querySelector('.card__category');
        this._image = this.container.querySelector('.card__image');  
        this._button = this.container.querySelector('.card');
        
       // this._button.addEventListener('click', () => this.events.emit('card-preview:open'));
    }


 render(cardData: Partial<ICard>) {
    if (!cardData) return this.container;
    const {title, ...otherCardData} = cardData;
    this._title.textContent = cardData.title;
    return super.render(otherCardData);
 }

set id(value: string) {
    this.container.dataset.id = value;
}

get id() {
    return this.container.dataset.id || '';
}

/*set title(value: string) {
    this.setText(this._title, value);
}*/

get title(): string {
    return this._title.textContent || '';
}

set image(value: string) {
    this.setImage(this._image, CDN_URL + value, this.title)
}

set price(value: number | null) {
    this.setText(
        this._price,
        value ? + ' синапсов' : 'Бесценно'
    );

    if (this._button && value === null) {
        this._button.disabled = true;
    }
}

/*set category(value:CategoryType) {
    if (this._category) {
        this.setText(this._category, value);
        this._category.classList.add(categorySelectors[value]);
    }
}*/

set description(value: string) {
    if (this._description) {
        this.setText(this._description, value);
    }
}

}