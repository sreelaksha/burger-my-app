import React , { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

    class Orders extends Component{
        state = {
            orders : [],
            loading : true
        }

        componentDidMount(){
            axios.get('/orders.json')
                .then(response => {
                    const fetchedOrders= [];
                    for(let key in response.data){
                                console.log('Key:'+ key);
                                console.log('Response-data :'+ response.data)
                       fetchedOrders.push({
                           ...response.data[key],
                           id: key
                       });
                       console.log('response-data-key' +response.data[key]);
                    }
                       console.log('fetchedOrders:'+ fetchedOrders);
                       console.log(response.data);

                       this.setState({loading: false, orders: fetchedOrders});
                })
                .catch(error => {
                    this.setState({loading: false});
                })
        }

        render(){


            return(
                <div>
                    <Order />
                    <Order />
                </div>
            );
        }
    }

export default withErrorHandler(Orders, axios);