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
            {controls.map(ctrl => (
                    <BuildControl
                    key = {ctrl.label}
                    label ={ctrl.label}
                    add = {() => props.addedIngredients(ctrl.type)}
                    deleted = {() => props.deletedIngredients(ctrl.type)}/>
                ))
            }

        </div>
    );

export default buildControls;