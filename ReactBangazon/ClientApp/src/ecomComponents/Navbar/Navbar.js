import React from 'react';
import logo from '../../Images/bangazon_logo.png';
import {Link} from 'react-router-dom';
// import './Navbar.css';
import { Navbar, Button, FormGroup, FormControl} from 'react-bootstrap';

class Nav extends React.Component {
    state = {
        value: '',
    };

     handleChange(e) {
        this.setState({ value: e.target.value });
    }
    render() {
        return (
            <div className='Navbar'>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a class="navbar-brand" href="#home"><img src={logo} responsive id="nav-logo" alt="Bangazon Logo" /></a>
                        </Navbar.Brand>
                    </Navbar.Header>
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
                                <Link to='/Login' id="nav-login-link">Login</Link>
                                <span 
                                    id="nav-cart-logo"
                                    class="glyphicon glyphicon-shopping-cart pull-right" 
                                    aria-hidden="true"
                                >Cart</span>
                            </div>
                        </form>
                </Navbar>
            </div>
        );
    };
}

export default Nav;
