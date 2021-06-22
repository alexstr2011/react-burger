import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import { MODAL_INGREDIENT } from '../../services/actions/actions';
import BurgerListIngredient from '../burger-list-ingredient/burger-list-ingredient';
import styles from './burger-ingredients.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients() {
    // @ts-ignore
    const {data, ingredientTypes, modalIngredient, burgerConstructor} = useSelector(store => ({
        // @ts-ignore
        data: store.burgerIngredients.data,
        // @ts-ignore
        ingredientTypes: store.ingredientTypes,
        // @ts-ignore
        modalIngredient: store.modalIngredient.ingredient,
        // @ts-ignore
        burgerConstructor: store.burgerConstructor
    }));

    const ingredientsAmount = React.useMemo(() => {
        const result = {};
        if (burgerConstructor.bun) {
            // @ts-ignore
            result[burgerConstructor.bun._id] = 2;
        }
        // @ts-ignore
        burgerConstructor.inners.forEach(ingredient => {
            // @ts-ignore
            if (result[ingredient._id]) {
                // @ts-ignore
                result[ingredient._id]++;
            } else {
                // @ts-ignore
                result[ingredient._id] = 1;
            }
        });
        return result;
    }, [burgerConstructor]);

    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch({
            type: MODAL_INGREDIENT.UNSET
        });
    }

    const menuRef = React.useRef(null);
    const headersRef = React.useRef([]);
    // @ts-ignore
    headersRef.current = ingredientTypes.map((_, index) => headersRef.current[index] ?? React.createRef());

    // @ts-ignore
    const [currentType, setCurrentType] = React.useState(ingredientTypes[0].type);

    // @ts-ignore
    const clickHandler = (type) => {
        setCurrentType(type);
        // @ts-ignore
        const index = ingredientTypes.findIndex(ingredientType => ingredientType.type === type);
        if (index !== -1) {
            // @ts-ignore
            const element = headersRef.current[index].current;
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }

    const scrollHandler = () => {
        // @ts-ignore
        const menuTop = menuRef.current.getBoundingClientRect().top;

        // @ts-ignore
        const selectedType = ingredientTypes.map((ingredientType, index) => ({
            type: ingredientType.type,
            // @ts-ignore
            distance: Math.abs(menuTop - headersRef.current[index].current.getBoundingClientRect().top)
        // @ts-ignore
        })).sort((a, b) => a.distance - b.distance)[0].type;

        if (currentType !== selectedType) {
            setCurrentType(selectedType);
        }
    };

    // @ts-ignore
    const ingredientsList = ingredientTypes.map((elementType, index) =>
        // @ts-ignore
        <li key={elementType.type}>
            <p  ref={headersRef.current[index]} className="text text_type_main-medium">
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
                                    data={elementIngredient}
                                    // @ts-ignore
                                    ingredientAmount={ingredientsAmount[elementIngredient._id]}
                                />
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
                    // @ts-ignore
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
            {!!modalIngredient && <ModalOverlay closeModal={closeModal} title='Детали ингридиента' >
                <IngredientDetails data={modalIngredient} />
            </ModalOverlay>}
        </section>
    );
}

export default BurgerIngredients ;