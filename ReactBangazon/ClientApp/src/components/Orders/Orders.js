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
            })
            .catch(err => {
                console.error(err, 'error getting order');
            });
    }
    //getRequest

    render() {
        //const allOrders = 
        return(<h1>Orders</h1>)
    }
}

export default Orders;