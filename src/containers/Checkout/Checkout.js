import React ,{Component} from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients: null,
        price: 0
        }

    componentWillMount() {
        //console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let itemAdded of query.entries()){
            //['salad' , '1']
            if(itemAdded[0] === 'price' ){
                price = itemAdded[1];
            }else{
                 ingredients[itemAdded[0]] = +itemAdded[1];
            }
        }
        this.setState({ingredients: ingredients , totalPrice : price});
    }

    checkoutCancelHandler = () => {
            this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
            this.props.history.replace('/checkout/contact-data/');
    }

        render(){
                return(
                    <div>
                        <CheckoutSummary ingredients ={this.state.ingredients}
                        checkoutContinue = {this.checkoutContinueHandler}
                        checkoutCancelled = {this.checkoutCancelHandler}/>
                        <Route path = {this.props.match.path + '/contact-data'}
                               render = {() => (<ContactData ingredients ={this.state.ingredients}
                               price = {this.state.totalPrice} />) }/>
                    </div>
                );
        }
}

export default Checkout;