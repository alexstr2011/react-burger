import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import { MODAL_INGREDIENT } from '../../services/actions/actions';
import BurgerListIngredient from '../burger-list-ingredient/burger-list-ingredient';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from '../modal/modal';
import styles from './burger-ingredients.module.css';

function BurgerIngredients() {
    const {data, ingredientTypes, modalIngredient, burgerConstructor} = useSelector(store => ({
        data: store.burgerIngredientsReducer.data,
        ingredientTypes: store.ingredientTypesReducer,
        modalIngredient: store.modalIngredientReducer.ingredient,
        burgerConstructor: store.burgerConstructorReducer
    }));

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

    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch({
            type: MODAL_INGREDIENT.UNSET
        });
    }

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
            <ul className={styles.ingredientsOfType}>
                {
                    data.filter(elementIngredient => elementIngredient.type === elementType.type)
                        .map(elementIngredient =>
                            <li key={elementIngredient._id}>
                                <BurgerListIngredient
                                    data={elementIngredient}
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
            {!!modalIngredient && <Modal closeModal={closeModal} title='Детали ингридиента' >
                <IngredientDetails data={modalIngredient} />
            </Modal>}
        </section>
    );
}

export default BurgerIngredients ;