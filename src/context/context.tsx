import React from 'react';

export const IngredientsContext = React.createContext({
    burgerIngredientsData: [],
    ingredientTypes: [],
    burgerConstructorData: {
        bun: undefined,
        inners: []
    }
});