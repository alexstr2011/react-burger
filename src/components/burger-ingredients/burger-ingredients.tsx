import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerListIngredient from '../burger-list-ingredient/burger-list-ingredient';
import styles from './burger-ingredients.module.css';
import { IngredientsContext } from '../../context/context';

// @ts-ignore
function BurgerIngredients() {
    const { burgerIngredientsData: data, ingredientTypes } = React.useContext(IngredientsContext);
    // @ts-ignore
    const [currentType, setCurrentType] = React.useState(ingredientTypes[0].type);

    // @ts-ignore
    const ingredientsList = ingredientTypes.map(elementType =>
        // @ts-ignore
        <li key={elementType.type}>
            <p className="text text_type_main-medium">
                {/*@ts-ignore*/}
                {elementType.name}
            </p>
            <ul className={styles.ingredientsOfType}>
                {
                    // @ts-ignore
                    data.filter(elementIngredient => elementIngredient.type === elementType.type)
                        .map(elementIngredient =>
                            // @ts-ignore
                            <li key={elementIngredient._id}>
                                <BurgerListIngredient
                                    data={elementIngredient}/>
                            </li>
                        )
                }
            </ul>
        </li>
    );

    return (
        <section>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
            <nav className={styles.menu + ' mt-5 mb-10'}>
                {
                    ingredientTypes.map(element =>
                        // @ts-ignore
                        <Tab value={element.type} active={currentType === element.type} key={element.type}
                             onClick={setCurrentType}>
                            {
                                // @ts-ignore
                                element.name
                            }
                        </Tab>
                    )
                }
            </nav>
            <ul className={styles.ingredientsList + ' scrollbar'}>
                { ingredientsList }
            </ul>

        </section>
    );
}

export default BurgerIngredients ;