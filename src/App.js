import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';


class App extends Component {
    /*state = {
        show: true
    };

    componentDidMount(){
        setTimeout( () => {
            this.setState({ show: false});
        }, 5000);
    } */
      /*Add in between Layout below-  {this.state.show ? <BurgerBuilder/> : null} */

    render(){
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path = "/burger-my-app/checkout" component = {Checkout} />
                        <Route path = "/burger-my-app/orders"  component = {Orders} />
                        <Route path = "/burger-my-app/builder"  component = {BurgerBuilder} />
                    </Switch>
                  </Layout>
            </div>
          );
    }

}

export default App;
