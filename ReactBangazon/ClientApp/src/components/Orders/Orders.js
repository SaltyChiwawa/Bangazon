import React from 'react';
import { Link } from 'react-router-dom';
import OrdersRequest from '../../APICalls/Orders';
import react

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
    render() {
        const allOrders = this.state.orders.map(orda => {
            return (
            <div>
            <div>
                <div class="row">
                    <div class="col-md-8">.col-md-8</div>
                    <div class="col-md-4">.col-md-4</div>
                </div>
                <div class="row">
                    <div class="col-md-4">.col-md-4</div>
                    <div class="col-md-4">.col-md-4</div>
                    <div class="col-md-4">.col-md-4</div>
                </div>
            </div>
            </div>
                )
        })

        return ({ allOrders });
    }
}

export default Orders;