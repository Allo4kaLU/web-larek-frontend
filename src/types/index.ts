export interface ICard {
    _id: string;
    name: string;
    about: string;
    cost: number;
    caregory: string;
    image: URL;
}

export interface IUser {
    _id: string;
    payment: boolean;
    address: string;
    email: string;
    tel: string;
}

export interface ICardsData {
    catds: ICard[];
    preview: string | null;
}

export type TCardInfo = Pick<ICard, 'name' | 'cost'>;

export type TUserPayAddress = Pick<IUser, 'payment' | 'address'>;

export type TUserContacts = Pick<IUser, 'email' | 'tel'>;