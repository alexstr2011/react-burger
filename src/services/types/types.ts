export type TOrder = {
    _id: string;
    ingredients: ReadonlyArray<string>;
    status: string;
    name: string;
    createdAt: string;
    number: number;
};

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
};

export type TConstructorIngredient = TIngredient & { key: string };

export type TUserInfo = {
    name: string;
    email: string;
};