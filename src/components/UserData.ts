import { IUser, IUserData, TUserPayAddress, TUserContacts } from '../types';
import { IEvents } from './base/events';

export class UserData implements IUserData {
	protected _id: string;
	protected payment: string;
	protected address: string;
	protected email: string;
	protected tel: string;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	setUserInfo(userData: IUser): void {
		this._id = userData._id;
		this.payment = userData.payment;
		this.address = userData.address;
		this.email = userData.email;
		this.tel = userData.tel;
		this.events.emit('user:added');
	}

	getUserInfo(userData: IUser) {
		return {
			_id: this._id,
			payment: this.payment,
			address: this.address,
			email: this.email,
			tel: this.tel
		}
	}

	checkValidationAddress(data: Record<keyof TUserPayAddress, string>): boolean {
		if (data === undefined) {
			return false;
		} else {
			return true;
		}
	}

	checkValidationContacts(data: Record<keyof TUserContacts, string>): boolean {
		if (data === undefined) {
			return false;
		} else {
			return true;
		}
	}

	clearUser(data: IUser): void {
		data = {
			_id: null,
			payment: null,
			address: null,
			email: null,
			tel: null,
		};
	}

	get id() {
		return this._id;
	}
}
