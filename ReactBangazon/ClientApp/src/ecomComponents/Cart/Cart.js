import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Navbar/Navbar'

class Cart extends React.Component {
    render() {
        return (
            <div className='Cart'>
                <h1>Cart Page</h1>
                <div className="col-xs-12">
                    <Nav />
                </div>
            </div>
        );
    };
}

export default Cart;
