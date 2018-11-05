import React, { Component } from 'react';
import SimpleForm from './SimpleForm';
import { Header } from 'semantic-ui-react';


class Home extends Component {

  constructor(props) {
    super(props);

    this.exchangeWidget = this.exchangeWidget.bind(this);
  }

  exchangeWidget() {
    const exchange = this.props.exchange;
    if (exchange && exchange.base) {
      return (
        <div>
          <br/>
          <Header as='h3' textAlign='center'>
            Base currency {exchange.base}
          </Header>
          <div>
              {
                Object.keys(exchange.rates).map((key, index) => ( 
                  <p key={index}>{key}: {exchange.rates[key]}</p> 
                ))
              }
          </div>  
        </div>
      );
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <SimpleForm/>
        {this.exchangeWidget()}
      </div>
    );
  }
}

export default Home;

