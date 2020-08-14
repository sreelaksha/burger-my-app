import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className = {styles.NavigationItems}>
        <NavigationItem link =  "/burger-my-app/" exact> BurgerBuilder</NavigationItem>
        <NavigationItem link = "/burger-my-app/orders"  exact> Orders </NavigationItem>
    </ul>
);

export default navigationItems;