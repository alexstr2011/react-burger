import React from 'react';
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerListIngredient from '../burger-list-ingredient/burger-list-ingredient';
import styles from './burger-ingredients.module.css';

// @ts-ignore
function BurgerIngredients({data, ingredientTypes}) {
    const [currentType, setCurrentType] = React.useState(ingredientTypes[0].type);

    // @ts-ignore
    const ingredientsList = ingredientTypes.map(elementType =>
        <li key={elementType.type}>
            <p className="text text_type_main-medium">
                {elementType.name}
            </p>
            <ul className={styles.ingredientsOfType}>
                {
                    // @ts-ignore
                    data.filter(elementIngredient => elementIngredient.type === elementType.type)
                        // @ts-ignore
                        .map(elementIngredient =>
                            <li key={elementIngredient._id}>
                                <BurgerListIngredient
                                    ingredient={elementIngredient}/>
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
                    // @ts-ignore
                    ingredientTypes.map(element =>
                        <Tab value={element.type}
                             active={currentType === element.type}
                             onClick={setCurrentType}
                             key={element.type}>
                            {element.name}
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

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired
    })).isRequired,
    ingredientTypes: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
        name: PropTypes.string.isRequired
    })).isRequired
}

export default BurgerIngredients ;