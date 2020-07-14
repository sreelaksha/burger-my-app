import React , { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

//import Checkout from '../Checkout';

    class ContactData extends Component{
        state = {
            name: '',
            email: '',
            address: {
                street: '',
                postalCode: ''
            },
            loading: false
        }

     orderConfirmedHandler = (event) =>{
            event.preventDefault();
            this.setState({loading : true})
                       const order = {
                                ingredients : this.props.ingredients,
                                price : this.props.price,
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
                                  this.setState({ loading : false })
                                  this.props.history.replace('/');
                            })
                            .catch (error => {
                                  this.setState({ loading : false })
                            })
     }

    render(){

        let form = (
            <form>
                    <Input inputType ="input" type = 'text' name= 'name' placeholder = 'Your name'/>
                    <Input inputType = "input" type = 'email' name= 'email' placeholder = 'Your email'/>
                    <Input inputType = "input" type = 'text' name= 'street' placeholder = 'Street'/>
                    <Input inputType= "input" type = 'text' name= 'postalCode' placeholder = 'Postal Code'/>
                    <Button btnType = "Success" clicked = {this.orderConfirmedHandler} > ORDER </Button>
            </form>
        );
        if(this.state.loading){
           form = <Spinner />
        }

        return(
                <div className = {styles.ContactData}>
                    <h3> Enter your contact data </h3>
                    {form}
                </div>

        );
    }

}
export default ContactData;