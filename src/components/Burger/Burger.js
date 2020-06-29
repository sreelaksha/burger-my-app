import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(item => {
                //console.log(item);
            return [...Array(props.ingredients[item])].map((__, i) => {
               //console.log(props.ingredients[items]);
              // console.log(item+i);// blank element
              //  console.log(props.ingredients[item]);//index of element
                return <BurgerIngredient key={item+i} type={item} />
            } );
        } )

        .reduce((prevArr , currentEle) => {
            return prevArr.concat(currentEle)
        } ,[]);
    //console.log(transformedIngredients);
    if(transformedIngredients.length === 0){
            transformedIngredients = <p> Please start adding ingredients! </p>
    }

    return(
        <div className = {styles.Burger}>
            <BurgerIngredient type = "bread-top" />
            {transformedIngredients}
            <BurgerIngredient type = "bread-bottom" />
        </div>


    );
}

export default burger;