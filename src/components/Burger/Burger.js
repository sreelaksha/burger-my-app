import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(item => {
            return [...Array(props.ingredients[item])].map((__, i) => {
                return <BurgerIngredient key={item+i} type={item} />
            } );
        } );

    return(
        <div className = {styles.Burger}>
            <BurgerIngredient type = "bread-top" />
            {transformedIngredients}
            <BurgerIngredient type = "bread-bottom" />
        </div>


    );
}

export default burger;