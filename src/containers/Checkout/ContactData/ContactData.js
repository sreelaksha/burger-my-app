import React , { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

//import Checkout from '../Checkout';

    class ContactData extends Component{
        state = {
            orderForm: {
                        name: {
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'Your Name'
                            },
                            value: ''
                        },
                        email : {
                                elementType: 'input',
                                elementConfig: {
                                    type: 'text',
                                    placeholder: 'Your Email'
                                },
                                value: ''
                            },
                        street:{
                               elementType: 'input',
                               elementConfig: {
                                   type: 'text',
                                   placeholder: 'Street'
                               },
                               value: ''
                           },
                        zipCode: {
                                 elementType: 'input',
                                 elementConfig: {
                                     type: 'text',
                                     placeholder: 'Zip Code'
                                 },
                                 value: ''
                             },
                        deliveryMethod: {
                                elementType: 'select',
                                elementConfig: {
                                    options: [
                                        {value: 'fastest', displayValue: 'Fastest'},
                                        {value: 'cheapest', displayValue: 'Cheapest'}
                                        ]
                                },
                                value: ''
                            },
                     },
            loading: false
        }

     orderConfirmedHandler = (event) => {
            event.preventDefault();
            this.setState({loading : true})
                       const order = {
                                ingredients : this.props.ingredients,
                                price : this.props.price,

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

     inputChangeHandler = (event ,inputIdentifier) => {
        //console.log(inputIdentifier);
        const updatedOrderForm = {
                ...this.state.orderForm
                };
                const updatedFormElement= {
                    ...updatedOrderForm[inputIdentifier]
                };
                //console.log(updatedFormItems);
                updatedFormElement.value = event.target.value;
                updatedOrderForm[inputIdentifier] = updatedFormElement ;
                this.setState({orderForm: updatedOrderForm})
     }

    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config : this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                    {formElementArray.map(formElement => (
                       <Input
                            key = {formElement.id}
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            changed = {(event) => this.inputChangeHandler(event, formElement.id)}/>
                    ))}
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