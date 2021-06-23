import React from 'react';
import styles from './ingredient-details.module.css';
import PropTypes from "prop-types";

function IngredientDetails({data}) {
    return (
        <section className={styles.ingredientDetails + ' mb-15'}>
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
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        calories: PropTypes.number,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number
    }).isRequired
}

export default IngredientDetails;