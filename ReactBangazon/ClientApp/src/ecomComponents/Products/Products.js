﻿import React from 'react';
import { Link } from 'react-router-dom';
import ProductsRequests from '../../APICalls/ProductsRequests';
import OrdersRequest from'../../APICalls/Orders'
import OrderLinesRequests from '../../APICalls/OrderLinesRequests';
import { Alert, Button } from 'react-bootstrap';

class Products extends React.Component {
    state = {
        product: [],
        cart: [],
        customerId: 2,
        singleOrder: [],
        orderId:'',
        orders: [],
        complete: false,
    }


    
    componentDidMount() {
        ProductsRequests
            .getSingleProductsRequest(this.props.match.params.id)
            .then(product => {
                this.setState({ product: product[0] });

                this.getAllTheOrders();

            })
            .catch(err => {
                console.error(err, 'error getting product');
            });
    }

    handleDismiss = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    getAllTheOrders = () => {
        OrdersRequest
            .getRequest()
            .then( orders => {
                this.setState({ orders });

                this.OrderIsActive();
                this.createNewOrder();

            })
            .catch(err => {
                console.error(err, "error in getting orderlines");
            })
    }

    OrderIsActive = () => {
        const order = this.state.orders.find(x => {
            return x.customerId === this.state.customerId ;
        });        
        if (order) {
            this.OrderNumber();
            return true;
        } else {
            return false;
        }
    };

    createNewOrder = () => {
        if (this.OrderIsActive() === false) {
            OrdersRequest
                .addOrderRequest(this.state.customerId)
                .then(() => {
                    this.getAllTheOrders();
                })
                .catch((err) => {
                    console.error(err, "error in posting order and order");
                })
        }
    };

    OrderNumber = () => {
        OrdersRequest
            .getSingleCustomerRequest(this.state.customerId)
            .then(singleOrder => {
                this.setState({ singleOrder: singleOrder[0]});
            })
            .catch(err => {
                console.error(err, "error in getting customerOrder");
            })
    }

    addToCartEvent = (e) => {

    const defaultOrderline = {

        "OrderId": this.state.singleOrder.id * 1,
        "ProductId": this.props.match.params.id * 1,

        }  

        console.log(defaultOrderline);
        e.preventDefault();        
        if (this.OrderIsActive()) {
            OrdersRequest
                .addOrderLine(defaultOrderline)
                .then(() => {
                    //add notification
                    this.setState({complete: true})
                })
                .catch((err) => {
                    console.error(err, "error in posting orderline");
                })
            
        } 
    }
    render() { 
        const addedToCart = this.state.complete;
        return (
            <div className='Products'>
                <div class="row">
                    
                </div>   
                <div class="row">
                    <div class="col-md-6 col-sm-4">
                        <div class="thumbnail">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51Pf7IaiwcL._SY450_.jpg" alt="..."/>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-4">
                        <h3>{this.state.product.title}</h3>
                        <div><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span></div>
                        <p>{this.state.product.description}</p>
                    </div>
                    <div class="col-md-3 col-sm-4 cart">
                        <h3>${this.state.product.price}</h3>
                        <p>Free Shipping</p>
                        <p>In Stock</p>
                        <h4>Sold by Disney</h4>
                        <button onClick={this.addToCartEvent} class="btn btn-default" role="button"><span className="glyphicon glyphicon-shopping-cart"></span> {addedToCart ? 'Item Added to Cart' : 'Add to cart' }</button>
                    </div>
                </div> 
            </div>
        );
    };
}

export default Products;
