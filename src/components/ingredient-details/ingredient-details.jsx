import React from 'react';
import {useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import PropTypes from "prop-types";

function IngredientDetails({addTitle = false}) {
    const ingredients = useSelector(store => store.burgerIngredientsReducer.data);
    const { id } = useParams();
    const data = ingredients.find(({_id}) => _id === id);

    return (
        <section className={styles.ingredientDetails + ' mb-15'}>
            {addTitle && (
                <h2 className={styles.header}>
                    <p className="text text_type_main-large">
                        Детали ингредиента
                    </p>
                </h2>
            )}
            <img src={data.image_large} className={styles.image} alt={data.name}/>
            <p className="text text_type_main-medium mt-4 mb-8">
                {data.name}
            </p>
            <div className={styles.row}>
                <div className={styles.column}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории, ккал
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {data.calories}
                    </p>
                </div>
                <div className={styles.column}>
                    <p className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {data.proteins}
                    </p>
                </div>
                <div className={styles.column}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {data.fat}
                    </p>
                </div>
                <div className={styles.column}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {data.carbohydrates}
                    </p>
                </div>
            </div>
        </section>
    );
}

IngredientDetails.propTypes = {
    addTitle: PropTypes.bool
}

export default IngredientDetails;