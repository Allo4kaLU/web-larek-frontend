export interface ICard {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

export interface IUser {
    _id: string;
    payment: string;
    address: string;
    email: string;
    tel: string;
}

export interface ICardsData {
    cards: ICard[];
    preview: string | null;
    addCard(card: ICard): void;
    deleteCard(cardId: string, payload: Function | null): void;
    updateCard(card: ICard, payload: Function | null): void;
    clearCards(cards: ICard[]): void;
    getList(cards: ICard[]): ICard[];
}

export interface IUserData {
    choosePay(data: Record<keyof TUserPayAddress, string>): boolean;
    getContacts(data: Record<keyof TUserContacts, string>): boolean;
    checkValidation(data: Record<keyof TUserContacts, string>): boolean;
    clearUser(data: IUser): void;
}    

export type TCardInfo = Pick<ICard, 'title' | 'price'>;

export type TUserPayAddress = Pick<IUser, 'payment' | 'address'>;

export type TUserContacts = Pick<IUser, 'email' | 'tel'>;