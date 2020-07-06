import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

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
        totalPrice: 4,
        purchasable : false,
        ordering : false
    }

    updatePurchaseState(ingredients){
       let sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
       .reduce((sum, el) => {
            return sum + el
       },0)
       this.setState({purchasable : sum > 0})
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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    }

    orderingHandler = () => {
        this.setState({ordering : true})
    }

    orderCancelHandler = () => {
            this.setState({ordering : false})
     }

     orderContinuedHandler = () => {
           // alert('You continued...');
           const order = {
                    ingredients : this.state.ingredients,
                    price : this.state.totalPrice,
                    customer : {
                            name: 'laksha',
                            email : 'test@test.com',
                            address: {
                                 street: 'No.57',
                                 zipCode: 94874
                            },
                            deliveryMethod : 'fastest'
                     }
           }
            axios.post('/orders.json ' , order)
                .then (response =>{
                    console.log(response);
                })
                .catch (error => {
                       console.log(error);
                })
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
                <Modal show = {this.state.ordering}
                        modalClosed ={this.orderCancelHandler}>
                    <OrderSummary
                            ingredients = {this.state.ingredients}
                            orderCancelled = {this.orderCancelHandler}
                            orderContinued = {this.orderContinuedHandler}
                            price = {this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    addedIngredients = {this.addIngredientHandler}
                    deletedIngredients = {this.removeIngredientHandler}
                    disable = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchasable = {this.state.purchasable}
                    ordered = {this.orderingHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;