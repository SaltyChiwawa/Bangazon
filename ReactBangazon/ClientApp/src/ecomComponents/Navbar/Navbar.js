﻿import React from 'react';
import logo from '../../Images/bangazon_logo.png';
import { Link } from 'react-router-dom';
import './Navbar.css';

import authRequests from '../../firebaseRequests/auth';

class Nav extends React.Component {
    state = {
        queryText: '',
    };

    queryText = (e) => {
        this.setState({ queryText: e.target.value });
    }

    render() {
        const {authed, runAway} = this.props;
        const logoutClickEvent = () => {
          authRequests.logoutUser();
          runAway();
        };

        return (
            <div className='Navbar row'>
                <nav className="navbar">
                    <div className="navbar-header">
                        <Link to='/' className="navbar-brand"><img src={logo} responsive id="nav-logo" alt="Bangazon Logo" /></Link>
                    </div>
                    <form class="form-horizontal" id="nav-search">
                        <div class="form-group">
                            <div class="col-sm-5 col-sm-offset-1">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Search"
                                    value={this.state.queryText}
                                    onChange={this.queryText}
                                ></input>
                            </div>
                            <button type="button" class="btn btn-warning" id="nav-search-btn">
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            </button>
                                {
                                    authed ? (
                                        <span class="nav-login-link">Hello | <a onClick={logoutClickEvent}>Logout</a></span>
                                    ) : (
                                        <Link to='/Login' class="nav-login-link">Login</Link>
                                    )
                                }
                                <Link to='/cart'><span
                                    id="nav-cart-logo"
                                    class="glyphicon glyphicon-shopping-cart pull-right"
                                    aria-hidden="true"
                                >Cart</span></Link>
                        </div>
                    </form>
                </nav>
            </div>
        );
    };
}

export default Nav;
