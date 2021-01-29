import { Product } from "./product.interface";

export interface ItemSetting {
    id: number,
    observation: string,
    quantity: number,
    product: Product

}

export interface Setting {
    id: string,
    reason: string;
    createdAt: string,
    items: ItemSetting[]
}

export interface ItemPartial {
    id: string
    observation: string,
    quantity: number,
    name?: string,
    stock?: number,
    pvp?: number
}

export interface SettingPartial {
    reason: string,
    items: ItemPartial[]
}

export interface Detail {
    date: string;
    code: string;
    type: string;
    quantity: number,
    stock?: number
}