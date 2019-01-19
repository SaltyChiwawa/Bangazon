﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';

class Cart extends Component {

    render() {

        const header = (<Row className="vertical-align">
            <Col md={6} className="justify-left">Item(s)</Col>
            <Col md={2} className="justify-center">Price</Col>
            <Col md={2} className="justify-center">Quantity</Col>
            <Col md={2} className="justify-right">SubTotal</Col>
        </Row>);

        const footer = (<Row>
            <Col md={7}></Col>
            <Col md={5} className="">
                <Row className="vertical-align">
                    <Col md={8} className="justify-right">Total</Col>
                    <Col md={4} className="green justify-right">
                        <span>
                            $10.00
                                </span>
                    </Col>
                </Row>
            </Col>
        </Row>);

        return (
            <div className='Cart'>
                <div>
                    <br />
                    <h3>Your shopping cart</h3>
                    <Row>
                        <Col md={3}>
                            <button type="button" className="btn btn-success"> Add new product </button>
                        </Col>
                        <Col md={3} className="pull-right">
                            <Link to='/checkout'><button type="button" className="btn btn-sucess pull-right">Proceed to checkout</button></Link>
                        </Col>
                    </Row>
                    {/* Navigation buttons */}
                    <br />
                    {/* CART PANEL */}
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">
                                {header}
                            </h3>
                        </div>
                        <div class="panel-body">
                            Panel content
                        </div>
                        <div class="panel-footer">{footer}</div>
                    </div>
                    {/* CART PANEL */}
                    {/* Navigation buttons */}
                    <Row>
                        <Col md={3}>
                            <button type="button" className="btn btn-success"> Add new product </button>
                        </Col>
                        <Col md={3} className="pull-right">
                            <Link to='/checkout'><button type="button" className="btn btn-sucess pull-right">Proceed to checkout</button></Link>
                        </Col>
                    </Row>
                    {/* Navigation buttons */}
                </div>
            </div>
        );
    };
}

export default Cart;
