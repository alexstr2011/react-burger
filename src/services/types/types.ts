export type TOrder = {
    _id: string;
    ingredients: ReadonlyArray<string>;
    status: string;
    name: string;
    createdAt: string;
    number: number;
};