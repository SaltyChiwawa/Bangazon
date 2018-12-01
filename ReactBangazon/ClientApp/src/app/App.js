import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Customers from '../components/Customers/Customers';
import Computers from '../components/Computers/Computers';
import Departments from '../components/Departments/Departments';
import Home from '../components/Home/Home';
import Employees from '../components/Employees/Employees';
import OrderLines from '../components/OrderLines/OrderLines';
import Orders from '../components/Orders/Orders';
import PaymentTypes from '../components/PaymentTypes/PaymentTypes';
import Products from '../components/Products/Products';
import ProductTypes from '../components/ProductTypes/ProductTypes';
import TrainingPrograms from '../components/TrainingPrograms/TrainingPrograms';

export default class App extends Component {
  displayName = App.name

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div className='container'>
            <div className='row'>
              <Switch>
                <Route
                  path='/'
                  exact
                  component={Home}
                />
                <Route
                  path='/customers'
                  component={Customers}
                />
                <Route
                  path='/computers'
                  component={Computers}
                />
                <Route
                  path='/departments'
                  component={Departments}
                />
                <Route
                  path='/employees'
                  component={Employees}
                />
                <Route
                  path='/orderlines'
                  component={OrderLines}
                />
                <Route
                  path='/orders'
                  component={Orders}
                />
                <Route
                  path='/paymenttypes'
                  component={PaymentTypes}
                />
                <Route
                  path='/products'
                  component={Products}
                />
                <Route
                  path='/producttypes'
                  component={ProductTypes}
                />
                <Route
                  path='/trainingprograms'
                  component={TrainingPrograms}
                />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }

}
