import React from 'react';
import logo from '../../Images/bangazon_logo.png';
import {Link} from 'react-router-dom';
import './Navbar.css';

import authRequests from '../../firebaseRequests/auth';

class Nav extends React.Component {
    state = {
        value: ''
    };

     handleChange(e) {
        this.setState({ value: e.target.value });
    };

    render() {
        const {authed, runAway} = this.props;
        const logoutClickEvent = () => {
          authRequests.logoutUser();
          runAway();
        }

        return (
            <div className='Navbar'>
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
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                ></input>
                            </div>
                            <button type="button" class="btn btn-warning" id="nav-search-btn">
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            </button>
                                {
                                    authed? (
                                        <p>Hello | <a onClick={logoutClickEvent}>Logout</a></p>
                                    ) : (
                                        <Link to='/Login' class="nav-login-link">Login</Link>
                                    )
                                }
                            <p>Hello | <a onClick={logoutClickEvent}>Logout</a></p>
                            {/* <Link to='/Login' class="nav-login-link">Login</Link> */}
                            <span 
                                id="nav-cart-logo"
                                class="glyphicon glyphicon-shopping-cart pull-right" 
                                aria-hidden="true"
                            >Cart</span>
                        </div>
                    </form>
                </nav>
            </div>
        );
    };
}

export default Nav;
