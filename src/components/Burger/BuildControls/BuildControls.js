import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

    const controls = [
        {label : 'Bacon', type: 'bacon'},
        {label : 'Cheese', type: 'cheese'},
        {label : 'Meat', type: 'meat'},
        {label : 'Salad', type: 'salad'},
    ];

    const buildControls = (props) => (
        <div className = {styles.BuildControls}>
            <p> Current Price : <strong> {props.price.toFixed(2)} </strong> </p>
            {controls.map(ctrl => (
                    <BuildControl
                    key = {ctrl.label}
                    label ={ctrl.label}
                    add = {() => props.addedIngredients(ctrl.type)}
                    deleted = {() => props.deletedIngredients(ctrl.type)}
                    disabled = {props.disable[ctrl.type]}
                    />
                ))
            }
        <button
            className = {styles.OrderButton}
            onClick = {props.ordered}
            disabled = {!props.purchasable}> ORDER NOW </button>
        </div>
    );

export default buildControls;