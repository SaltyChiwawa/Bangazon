﻿﻿import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import Nav from '../Navbar/Navbar';
import { Row, Col, ButtonGroup} from 'react-bootstrap';
import getRequest from '../../APICalls/Orders';

class Cart extends Component {
    state = {
        orderedProduct: [],
        orderQuantity: 1,
    }

    quantityIncrement = () => {
        this.state.orderQuantity + 1
    }

    quantityDecrement = () => {
        this.state.orderQuantity - 1
    }

    quantityChange = (e) => {
        this.setState({ orderQuantity: e.target.value })
    }



    componentDidMount = () => {
        this.getOrderedProduct();
    }


    getOrderedProduct = () => {
        getRequest
            .getOrderedRequest()
            .then((result) => {
                this.setState({ orderedProduct: result })
            })
            .catch((err) => {
                console.error('error in getProductsRequest', err)
            });
    };


    render() {

        const header = (<Row className="vertical-align">
            <Col md={6} className="justify-left">Item(s)</Col>
            <Col md={2} className="justify-center">Price</Col>
            <Col md={2} className="justify-center">Quantity</Col>
            <Col md={2} className="justify-right">SubTotal</Col>
        </Row>);

        const body = this.state.orderedProduct.map(order => {
            return (
                <div>
                <Row key={order.id} className="vertical-align">
                    <Col md={6} className="justify-left">{order.productTitle}</Col>
                    <Col md={2} className="justify-center">{order.price}</Col>
                    </Row>
                </div>);
        });

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
                    <div className="col-xs-12">
                    </div>
                    <br />
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
                                {header}
                            </h3>
                        </div>
                        <div class="panel-body">
                            {body}
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
                            <button type="button" className="btn btn-sucess pull-right">Proceed to checkout</button>
                        </Col>
                    </Row>
                    {/* Navigation buttons */}
                </div>
            </div>
        );
    };
}

export default Cart;
