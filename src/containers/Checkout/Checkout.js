import React ,{Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state = {
        ingredients: {
            bacon: 1,
            cheese: 1,
            meat: 1,
            salad: 1,
        }
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
                    </div>
                );
        }
}

export default Checkout;