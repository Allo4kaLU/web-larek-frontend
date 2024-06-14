import { ICard, IBasketData } from '../types';
import { IEvents } from './base/events';

export class BasketData implements IBasketData {
	_cards: ICard[];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set cards(cards:ICard[]) {
		this._cards = cards;
		this.events.emit('basket:changed');
	}

	get cards () {
		return this._cards;
	}

	addCard(card: ICard): void {
		/* добавляет карточку товара в корзину*/
		if (!this._cards.some((item) => item.id === card.id)) {
			this._cards.push(card);
			console.log(card);
		}
		this.events.emit('basket:changed');
	}

	deleteCard(card: ICard): void {
		/*удаляет карточку товара из корзины*/
		this._cards = this._cards.filter((item) => item.id !== card.id);
		this.events.emit('basket:changed');
	}

	updateCard(card: ICard, payload: Function | null): void { //обновляет товар в корзине
		const findedCard = this._cards.find((item) => item.id === card.id);
		if (!findedCard) this.addCard(card);

		Object.assign(findedCard, card);

		if (payload) {
			payload();
		} else {
			this.events.emit('basket:changed');
		}
	}

	clearCards(cards: ICard[]): void { //очищает корзину
		cards = [];
		this.events.emit('basket:changed');
	}
}
