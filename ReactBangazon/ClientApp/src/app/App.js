import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Firebase from 'firebase';

import Cart from '../ecomComponents/Cart/Cart';
import Checkout from '../ecomComponents/Checkout/Checkout';
import Home from '../ecomComponents/Home/Home';
import Login from '../ecomComponents/Login/Login';
import Products from '../ecomComponents/Products/Products';
import Register from '../ecomComponents/Register/Register';
import Nav from '../ecomComponents/Navbar/Navbar';
import FirebaseConnection from '../firebaseRequests/connection';
FirebaseConnection();

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PrivateRoute = ({ component, authed, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                authed === true ? (
                    renderMergedProps(component, props, rest)
                ) : (
                         <Redirect
                            to={{ pathname: '/login', state: { from: props.location } }}
                         />
                    )
            }
        />
    );
};

class App extends Component {
    state = {
        authed: false,
        firebaseId: '',
    };

    componentDidMount() {
        this.removeListener = Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ authed: true, firebaseId: user.uid });
            } else {
                this.setState({ authed: false, firebaseId: '' });
            }
        });
    }

    componentWillUnmount() {
        this.removeListener();
    }

    runAway = () => {
        this.setState({ authed: false });
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className='container'>
                        <div className='row'>
                            <Nav
                                authed={this.state.authed}
                                runAway={this.runAway}
                            />
                            <Switch>
                                <Route
                                    path='/'
                                    exact
                                    component={Home}
                                    authed={this.state.authed}
                                    runAway={this.runAway}
                                />
                                <Route
                                    path='/register'
                                    authed={this.state.authed}
                                    component={Register}
                                    runAway={this.runAway}
                                />
                                <Route
                                    path='/login'
                                    authed={this.state.authed}
                                    component={Login}
                                    runAway={this.runAway}
                                />
                                <Route
                                    path='/Product/:id'
                                    authed={this.state.authed}
                                    component={Products}
                                    runAway={this.runAway}
                                />
                                <PrivateRoute
                                    path='/cart'
                                    authed={this.state.authed}
                                    component={Cart}
                                    runAway={this.runAway}
                                />
                                <PrivateRoute
                                    path='/checkout'
                                    authed={this.state.authed}
                                    component={Checkout}
                                    runAway={this.runAway}
                                    firebaseId={this.state.firebaseId}
                                />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
