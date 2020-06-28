import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(items => {
                //console.log(item);
            return [...Array(props.ingredients[items])].map((__, i) => {
               //console.log(props.ingredients[items]);
               //console.log(__);// blank element
               // console.log(i);//index of element
                return <BurgerIngredient key={items+i} type={items} />
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