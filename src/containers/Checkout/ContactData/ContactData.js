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
                            value: '',
                            validation: {
                                required: true,
                            },
                            valid: false,
                        },
                        email : {
                                elementType: 'input',
                                elementConfig: {
                                    type: 'text',
                                    placeholder: 'Your Email'
                                },
                                value: '',
                                    validation: {
                                        required: true,
                                    },
                                    valid: false,
                            },
                        street:{
                               elementType: 'input',
                               elementConfig: {
                                   type: 'text',
                                   placeholder: 'Street'
                               },
                               value: '',
                                    validation: {
                                        required: true,
                                    },
                                    valid: false,
                           },
                        zipCode: {
                                 elementType: 'input',
                                 elementConfig: {
                                     type: 'text',
                                     placeholder: 'Zip Code'
                                 },
                                 value: '',
                                    validation: {
                                        required: true,
                                        minLength : 5,
                                        maxLength : 5,
                                    },
                                    valid: false,
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

    checkValidity(value, rules){
        let isValid = false;

        if(rules.required){
            isValid = value.trim() !== '';
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength;
        }
        return isValid;
    }

     orderConfirmedHandler = (event) => {
            event.preventDefault();
            this.setState({loading : true})
            let formData = {};
                for(let formElementIdentifier in this.state.orderForm){
                    formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
                }
                       const order = {
                                ingredients : this.props.ingredients,
                                price : this.props.price,
                                orderData: formData,

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
                updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation )
                console.log(updatedFormElement);
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
            <form onSubmit = {this.orderConfirmedHandler}>
                    {formElementArray.map(formElement => (
                       <Input
                            key = {formElement.id}
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            changed = {(event) => this.inputChangeHandler(event, formElement.id)}/>
                    ))}
                    <Button btnType = "Success" > ORDER </Button>
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