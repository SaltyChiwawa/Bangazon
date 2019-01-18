import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';


// import { Link } from 'react-router-dom';

class Checkout extends Component {
    render() {
        return (
            <div className='Cart'>
                    <div>
                    <h3>Your shopping cart</h3>
                    <Row>
                        <Col md={3}>
                            <button type="button" className="btn btn-success"> Add new product </button>
                        </Col>
                        <Col md={3} className="pull-right">
                            <button type="button" className="btn btn-sucess pull-right">Proceed to checkout</button>
                        </Col>
                    </Row>
                    {/* Navigation buttons */}
                    <br />
                    {/* CART PANEL */}
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">
                                <Row className="vertical-align">
                                    <Col md={6} className="justify-left">Item(s)</Col>
                                    <Col md={2} className="justify-center">Price</Col>
                                    <Col md={2} className="justify-center">Quantity</Col>
                                    <Col md={2} className="justify-right">SubTotal</Col>
                                </Row>
                            </h3>
                        </div>
                        <div class="panel-body">
                            Panel content
                        </div>
                        <div class="panel-footer">Panel footer</div>
                    </div>
                    {/* CART PANEL */}
                    {/* Navigation buttons */}
                    <Row>
                        <Col md={3}>
                            <button type="button" className="btn btn-success"> Add new product </button>
                        </Col>
                        <Col md={3} className="pull-right">
                            <button type="button" className="btn btn-sucess pull-right">Proceed to checkout</button>
                        </Col>
                    </Row>
                    {/* Navigation buttons */}
                </div>
             </div>
        );
    };
}

export default Checkout;
