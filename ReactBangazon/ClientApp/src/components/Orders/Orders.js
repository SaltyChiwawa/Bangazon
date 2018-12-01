import React from 'react';
import { Link } from 'react-router-dom';
import OrdersRequest from '../../APICalls/Orders';

class Orders extends React.Component {
    state = {
        orders: [],
    }
    componentDidMount() {
        OrdersRequest
            .getRequest()
            .then(orders => {
                this.setState({ orders });
                console.log(orders);
                console.log("state:", this.state.orders);
            })
            .catch(err => {
                console.error(err, 'error getting order');
            });
    }

    //Add delete request

    deleteAnOrder = (e , id) =>
    {
        console.log("delete button clicked", e);
        OrdersRequest
            .deleteRequest(id)
            .then(() =>
            {
                //add refresher
                console.log("delete successful");
            })
            .catch((err) =>
            {
                console.error("error with delete order", err)
            })
    }
    render()
    {
        const allOrders = this.state.orders.map(orda => {
            return (
                <div className="panel panel-default">
                <div className="panel-body">
                <div className="row">
                        <div className="col-md-2">Order Id: {orda.id}</div>
                            <div className="col-md-4">Customer Id: {orda.customerId}</div>
                            <div className="col-md-4">Product Id:
                    {orda.products.map(prod =>
                                {
                                    return prod.productId;
                                    })}
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-default" onClick={(e) => this.deleteAnOrder(e, orda.id)}>Delete</button>
                            <button className="btn btn-default">Update</button>                            
                        </div>
                    </div>

                </div>
                )
        })
        
        /*
        const allOrders = this.state.orders.map(orda =>
        {
            return
            (
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-2">Order Id: {orda.id}</div>
                            <div className="col-md-4">Customer Id: {orda.customerId}</div>

                        </div>
                        <div>
                            <button class="btn btn-default" onClick={(e) => this.deleteAnOrder(e, orda.id)}>Delete</button>
                            <button class="btn btn-default">Update</button>
                        </div>
                    </div>
                    <div>{this.state.orders.products.map(prod => {
                        prod.productId
                    })}
                    </div>
                </div>
                )
        })
        */
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <button type="button" className="col-md-12 btn btn-default">Create New Order</button>
                </div>
                </div>
                {allOrders}
            </div>
        );
    }
}

export default Orders;