export type product = {
    id: number
    title: string
    price: number
}

export type shop = {
    carts: product[]
}

export type shopPage = {
    id: number;
    products: product[]
}

export type dataContainer = {
    carts: shopPage[]
}