import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

    const INGREDIENT_PRICES = {
        bacon : 0.4,
        cheese : 0.5,
        meat : 1.3,
        salad : 0.8
    };

class BurgerBuilder extends Component {
    /*constructor(props) {
        super(props);
        this.state = { ... }
    }*/
    state = {
        ingredients : {
            bacon : 0,
            cheese : 0,
            meat : 0,
            salad :0 ,
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
                ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition  ;
        this.setState({  totalPrice: newPrice , ingredients: updatedIngredients })
     }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<= 0){
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const priceADeduction = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceADeduction;
        this.setState({ ingredients: updatedIngredients , totalPrice: newPrice })
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
                disabledInfo[key] =  disabledInfo[key] <= 0
        }
        //{salad: true, bacon : false,...}
        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    addedIngredients = {this.addIngredientHandler}
                    deletedIngredients = {this.removeIngredientHandler}
                    disable = {disabledInfo}
                    price = {this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;