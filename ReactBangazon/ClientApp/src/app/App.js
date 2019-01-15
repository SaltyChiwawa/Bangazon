import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Firebase from 'firebase';

import Cart from '../ecomComponents/Cart';
import Checkout from '../ecomComponents/Checkout';
import Home from '../ecomComponents/Home';
import Login from '../ecomComponents/Login';
import Products from '../ecomComponents/Products';
import Register from '../ecomComponents/Register';
import Nav from '../ecomComponents/Navbar';

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

const PublicRoute = ({ component, authed, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                authed === false ? (
                    renderMergedProps(component, props, rest)
                ) : (
                        <Redirect
                            to={{ pathname: '/menu', state: { from: props.location } }}
                        />
                    )
            }
        />
    );
};

class App extends Component {
    state = {
        authed: false,
    };

    componentDidMount() {
        this.removeListener = Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ authed: true });
            } else {
                this.setState({ authed: false });
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
                            <Switch>
                                <Route
                                    path='/'
                                    exact
                                    component={Home}
                                    runAway={this.runAway}
                                />
                                <PublicRoute
                                    path='/checkout'
                                    authed={this.state.authed}
                                    component={Nav}
                                    runAway={this.runAway}
                                />
                                <PublicRoute
                                    path='/register'
                                    authed={this.state.authed}
                                    component={Register}
                                    runAway={this.runAway}
                                />
                                <PublicRoute
                                    path='/login'
                                    authed={this.state.authed}
                                    component={Login}
                                    runAway={this.runAway}
                                />
                                <PublicRoute
                                    path='/:id'
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
