import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

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
                    <BurgerBuilder/>
                    <Checkout />
                 </Layout>
            </div>
          );
    }

}

export default App;
