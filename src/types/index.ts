
import { ApiPostMethods } from '../components/base/api'
export interface ICard {
    id: string;
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

export interface ICardList {
    cards: TCardList[];
}

export interface IBasketData {
    cards: ICard[];
    addCard(card: ICard): void;
    deleteCard(card: ICard): void;
    updateCard(card: ICard, payload: Function | null): void;
    clearCards(cards: ICard[]): void;
}

export interface IUserData {
    setUserInfo(userData: IUser): void;
    checkValidationAddress(data: Record<keyof TUserPayAddress, string>): boolean;
    checkValidationContacts(data: Record<keyof TUserContacts, string>): boolean;
    clearUser(data: IUser): void;
}    

export interface IOrder extends IUser {
    items: string[]
}

export interface IOrderResult {
    id: string;
}

export type TCardList = Pick<ICard, 'title' | 'price' | 'category' | 'image'>;

export type TCardInfo = Pick<ICard, 'title' | 'price'>;

export type TUserPayAddress = Pick<IUser, 'payment' | 'address'>;

export type TUserContacts = Pick<IUser, 'email' | 'tel'>;

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}