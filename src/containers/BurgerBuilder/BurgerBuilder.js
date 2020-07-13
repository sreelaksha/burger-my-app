import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients : null,
        totalPrice: 4,
        purchasable : false,
        ordering : false,
        loading : false,
        error : false,
    }

    componentDidMount () {
        console.log(this.props);

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
           /*this.setState({loading : true})
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
                            deliveryMethod : 'fastest',
                     }
           }
            axios.post('/orders.json ' , order)
                .then (response =>{
                      this.setState({ loading : false, purchasing : false })
                })
                .catch (error => {
                      this.setState({ loading : false, purchasing : false  })
                })     */
                const queryParams = [];
                for(let i in this.state.ingredients){
                    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
                }
                const queryString = queryParams.join('&');
                this.props.history.push({
                    pathname : '/checkout',
                    search : '?' + queryString
                 });

     }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
                disabledInfo[key] =  disabledInfo[key] <= 0
        }
        //{salad: true, bacon : false,...}
        let orderSummary = null;

        let burger = this.state.error ? <p> Ingredients cant be loaded </p> : <Spinner />

        if(this.state.ingredients){
        burger = (
                <Aux>
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
         orderSummary = <OrderSummary
                            ingredients = {this.state.ingredients}
                            orderCancelled = {this.orderCancelHandler}
                            orderContinued = {this.orderContinuedHandler}
                            price = {this.state.totalPrice} />;
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

export default withErrorHandler(BurgerBuilder, axios);