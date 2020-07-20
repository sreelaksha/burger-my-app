import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
    /*constructor(props) {
        super(props);
        this.state = { ... }
    }*/
    state = {
        ordering : false,
        loading : false,
        error : false,
    }

    componentDidMount () {
        //console.log(this.props);

        axios.get('https://react-my-burger-3321f.firebaseio.com/ingredients.json')
            .then(response => {
                    this.setState({ ingredients : response.data});
            })
            .catch (error => {
                this.setState({ error: true })
            });
    }

    updatePurchaseState(ingredients){
       let sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
       .reduce((sum, el) => {
            return sum + el
       },0)
       return sum > 0;
    }

    /*addIngredientHandler = (type) => {
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
*/
    orderingHandler = () => {
        this.setState({ordering : true})
    }

    orderCancelHandler = () => {
            this.setState({ordering : false})
     }

     orderContinuedHandler = () => {
           // alert('You continued...');

                const queryParams = [];
                for(let i in this.state.ingredients){
                    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
                }
                    queryParams.push('price='  + this.state.totalPrice);
                const queryString = queryParams.join('&');
                this.props.history.push({
                    pathname : '/checkout',
                    search : '?' + queryString
                 });

     }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
                disabledInfo[key] =  disabledInfo[key] <= 0
        }
        //{salad: true, bacon : false,...}
        let orderSummary = null;

        let burger = this.state.error ? <p> Ingredients cant be loaded </p> : <Spinner />

        if(this.props.ings){
        burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls
                                        addedIngredients = {this.props.onIngredientsAdded}
                                        deletedIngredients = {this.props.onIngredientRemoved}
                                        disable = {disabledInfo}
                                        price = {this.props.price}
                                        purchasable = {this.updatePurchaseState(this.props.ings)}
                                        ordered = {this.orderingHandler}/>
                </Aux>
         );
         orderSummary = <OrderSummary
                            ingredients = {this.props.ings}
                            orderCancelled = {this.orderCancelHandler}
                            orderContinued = {this.orderContinuedHandler}
                            price = {this.props.price} />;
        }
        if(this.state.loading){
              orderSummary = <Spinner />;
        }

        return(
            <Aux>
                <Modal show = {this.state.ordering}
                        modalClosed ={this.orderCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price : state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onIngredientsAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved : (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));