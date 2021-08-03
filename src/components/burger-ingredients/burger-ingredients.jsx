import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerListIngredient from '../burger-list-ingredient/burger-list-ingredient';
import styles from './burger-ingredients.module.css';

function BurgerIngredients() {
    const {data, ingredientTypes, burgerConstructor} = useSelector(store => ({
        data: store.burgerIngredientsReducer.data,
        ingredientTypes: store.ingredientTypesReducer,
        burgerConstructor: store.burgerConstructorReducer
    }));

    const location = useLocation();

    const ingredientsAmount = React.useMemo(() => {
        const result = {};
        if (burgerConstructor.bun) {
            result[burgerConstructor.bun._id] = 2;
        }
        burgerConstructor.inners.forEach(ingredient => {
            if (result[ingredient._id]) {
                result[ingredient._id]++;
            } else {
                result[ingredient._id] = 1;
            }
        });
        return result;
    }, [burgerConstructor]);

    const menuRef = React.useRef(null);
    const headersRef = React.useRef([]);
    headersRef.current = ingredientTypes.map((_, index) => headersRef.current[index] ?? React.createRef());

    const [currentType, setCurrentType] = React.useState(ingredientTypes[0].type);

    const clickHandler = (type) => {
        setCurrentType(type);
        const index = ingredientTypes.findIndex(ingredientType => ingredientType.type === type);
        if (index !== -1) {
            const element = headersRef.current[index].current;
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }

    const scrollHandler = () => {
        const menuTop = menuRef.current.getBoundingClientRect().top;

        const selectedType = ingredientTypes.map((ingredientType, index) => ({
            type: ingredientType.type,
            distance: Math.abs(menuTop - headersRef.current[index].current.getBoundingClientRect().top)
        })).sort((a, b) => a.distance - b.distance)[0].type;

        if (currentType !== selectedType) {
            setCurrentType(selectedType);
        }
    };

    const ingredientsList = ingredientTypes.map((elementType, index) =>
        <li key={elementType.type}>
            <p  ref={headersRef.current[index]} className="text text_type_main-medium">
                {elementType.name}
            </p>
            <ul className={styles.ingredientsOfType} name={elementType.name}>
                {
                    data.filter(elementIngredient => elementIngredient.type === elementType.type)
                        .map(elementIngredient =>
                            <li key={elementIngredient._id}>
                                <Link className={styles.link}
                                    to={{
                                        pathname: `/ingredients/${elementIngredient._id}`,
                                        state: { background: location }
                                    }}>
                                    <BurgerListIngredient
                                        data={elementIngredient}
                                        ingredientAmount={ingredientsAmount[elementIngredient._id]}
                                    />
                                </Link>
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
            <nav ref={menuRef} className={styles.menu + ' mt-5 mb-10'}>
                {
                    ingredientTypes.map(element =>
                        <Tab value={element.type} active={currentType === element.type} key={element.type}
                             onClick={clickHandler}>
                            {
                                element.name
                            }
                        </Tab>
                    )
                }
            </nav>
            <ul onScroll={scrollHandler} className={styles.ingredientsList + ' scrollbar'}>
                { ingredientsList }
            </ul>
        </section>
    );
}

export default BurgerIngredients ;