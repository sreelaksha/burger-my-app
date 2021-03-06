import React from 'react';
import styles from './BuildControl.module.css';

const buildControl = (props) => (
    <div className = {styles.BurgerControl}>
        <div className = {styles.Label} > {props.label} </div>
        <button className = {styles.Less} onClick = {props.deleted} disabled = {props.disabled}> Less </button>
        <button className = {styles.More} onClick = {props.add}> More </button>
    </div>
);

export default buildControl;