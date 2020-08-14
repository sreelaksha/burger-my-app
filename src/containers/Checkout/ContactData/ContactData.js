import React , { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

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
                            touched: false
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
                                    touched: false
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
                                    touched: false
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
                                    touched: false

                            },
                        deliveryMethod: {
                                elementType: 'select',
                                elementConfig: {
                                    options: [
                                        {value: 'fastest', displayValue: 'Fastest'},
                                        {value: 'cheapest', displayValue: 'Cheapest'}
                                        ]
                                },
                                value: 'fastest',
                                valid: true,
                                validation: {}
                            },
                     },
            loading: false,
            formIsValid: false
        }

    checkValidity(value, rules){
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
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
                                ingredients : this.props.ings,
                                price : this.props.price,
                                orderData: formData,

                       }
                        axios.post('/orders.json ' , order)
                            .then (response =>{
                                  this.setState({ loading : false })
                                  this.props.history.replace('/burger-my-app');
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
                updatedFormElement.touched = true;
                //console.log(updatedFormElement);
                updatedOrderForm[inputIdentifier] = updatedFormElement ;

                let formIsValid = true;
                for(let inputIdentifier in updatedOrderForm){
                    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
                }
                console.log(formIsValid);

                this.setState({orderForm: updatedOrderForm , formIsValid : formIsValid})
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
                            invalid= {!formElement.config.valid}
                            shouldValidate = {formElement.config.validation}
                            touched = {formElement.config.touched}
                            changed = {(event) => this.inputChangeHandler(event, formElement.id)}/>
                    ))}
                    <Button btnType = "Success" disabled ={!this.state.formIsValid} > ORDER </Button>
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

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price : state.totalPrice
     }
};

export default connect(mapStateToProps)(ContactData);