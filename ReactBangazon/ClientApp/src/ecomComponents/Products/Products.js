import React from 'react';
import { Link } from 'react-router-dom';
import ProductsRequests from '../../APICalls/ProductsRequests';
import OrdersRequest from'../../APICalls/Orders'
import OrderLinesRequests from '../../APICalls/OrderLinesRequests';

class Products extends React.Component {
    state = {
        product: [],
        cart: [],
        customerId: 2,
        activeOrders: {},
        orderId: '',
        orderLines: [],
    }

    defaultOrderline = {
        "OrderId": this.state.activeOrders.id,
        "ProductId": this.props.match.params.id,
    }
    
    componentDidMount() {
        ProductsRequests
            .getSingleProductsRequest(this.props.match.params.id)
            .then(product => {
                this.setState({ product: product[0] });
                console.log("product", this.state.product);
                this.getAllTheOrders();
                console.log("params", this.props.match.params.id);
            })
            .catch(err => {
                console.error(err, 'error getting product');
            });
    }

    getAllTheOrders = () => {
        OrdersRequest
            .getRequest()
            .then( orderLines => {
                this.setState({ orderLines });
                console.log(orderLines);
                this.OrderIsActive();
                console.log(this.OrderIsActive());
            })
            .catch(err => {
                console.error(err, "error in getting orderlines");
            })
    }

    OrderIsActive = () => {
        const order = this.state.orderLines.find(x => {
            return x.customerId === this.state.customerId;
        });
        if (order) {
            return true;
        } else {
            return false;
        }
    };



/*    
    activeOrder = () => {
        OrdersRequest
            .getSingleCustomerRequest(this.state.customerId)
            .then(activeOrders => {
                this.setState({ activeOrders: activeOrders[0] });
                
                console.log("active orders", this.state.activeOrders);
            })
            .catch(err => {
                console.error(err, 'error getting order');
            });
    }
    
    addToCartEvent = (e) => {
        console.log("add to cart clicked", e);
        console.log("orderline", this.defaultOrderline)
        e.preventDefault();        
        if (this.state.activeOrders.customerId === this.state.customerId) {
            //post product to orderlines
            OrdersRequest
                .addOrderLine(this.defaultOrderline)
                .then(orderlineAdded => {
                    //addedtoCart Notification
                })
                .catch(err => {
                    console.error(err, 'error posting orderline');
                });
            
        } else {
            //post new order
            //post product to orderlines
            OrdersRequest
                .addOrderRequest(this.state.customerId)
                .then(orderAdded => {
                    this.activeOrder();
                    OrdersRequest
                        .addOrderLine(this.defaultOrderline)
                        .then(orderlineAdded => {
                            //addedtoCart Notification 
                        })
                        .catch(err => {
                            console.error(err, 'error posting orderline');
                        });
                })
                .catch(err => {
                    console.error(err, 'error posting orderline');
                })
            ////addedtoCart Notification
        }
    }

    successAddedNotification = () => {

        <div class="alert alert-warning alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <strong>Warning!</strong> Better check yourself, you're not looking too good.
        </div>
    }
*/
    render() {
        const order = this.state.orderLines.find(x => {
            return x.customerId === this.state.customerId;
        });
        console.log("find statement", order);
        return (
            <div className='Products'>
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
                        <button onClick={this.addToCartEvent} class="btn btn-default" role="button"><span className="glyphicon glyphicon-shopping-cart"></span> Add to Cart</button>

                    </div>
                </div>
            </div>
        );
    };
}

export default Products;
