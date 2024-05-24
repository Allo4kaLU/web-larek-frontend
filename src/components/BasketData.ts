import { ICard, IBasketData } from '../types';
import { IEvents } from './base/events';

export class BasketData implements IBasketData {
	cards: ICard[];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	addCard(card: ICard): void {
		/* добавляет карточку товара в корзину*/
		if (!this.cards.some((item) => item.id === card.id)) {
			this.cards.push(card);
			console.log(card);
		}
		this.events.emit('cards:changed');
	}

	deleteCard(card: ICard): void {
		/*удаляет карточку товара из корзины*/
		this.cards = this.cards.filter((item) => item.id !== card.id);
		this.events.emit('cards:changed');
	}

	updateCard(card: ICard, payload: Function | null): void { //обновляет товар в корзине
		const findedCard = this.cards.find((item) => item.id === card.id);
		if (!findedCard) this.addCard(card);

		Object.assign(findedCard, card);

		if (payload) {
			payload();
		} else {
			this.events.emit('cards:changed');
		}
	}

	clearCards(cards: ICard[]): void { //очищает корзину
		cards = []; 
	}
}
