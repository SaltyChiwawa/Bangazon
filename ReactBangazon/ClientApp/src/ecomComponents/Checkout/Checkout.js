﻿import React, { Component } from 'react';

import Nav from '../Navbar/Navbar';
import { Row, Col } from 'react-bootstrap';

class Checkout extends Component {

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
            <div className='Checkout'>
                <div>
                    <div className="col-xs-12">
                        <Nav />
                    </div>
                    <br />
                    <h3>Review before you Checkout</h3>
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
                </div>
            </div>
        );
    };
}

export default Checkout;
