import { ICard, IOrder, IOrderResult, IUser } from "../types";
import { Api, ApiListResponse } from "./base/api";

export interface IGoodsAPI {
    getProductList: () => Promise<ICard[]>;
    getProductItem: (id: string) => Promise<ICard>;
    orderGoods: (order: IOrder) => Promise<IOrderResult> 
}

export class GoodsAPI extends Api implements IGoodsAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductList(): Promise<ICard[]> {
        return this.get('/product').then((data: ApiListResponse<ICard>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
    };

    getProductItem(id: string): Promise<ICard> {
        return this.get(`/product/${id}`).then(
            (item: ICard) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    };

    orderGoods(order: IOrder): Promise<IOrderResult> {
        return this.post('/order', order).then(
            (data: IOrderResult) => data
        );
    }
}