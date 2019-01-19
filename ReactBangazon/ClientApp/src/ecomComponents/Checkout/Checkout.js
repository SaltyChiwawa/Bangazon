import React from 'react';

import OrdersRequest from '../../APICalls/Orders';

class Checkout extends React.Component {
    state = {
        orderId: '3',
        order: {},
    };

    componentDidMount() {
        OrdersRequest.getSingleRequest(this.state.orderId * 1)
            .then((results) => {
                this.setState({ orders: results });
            })
            .catch(console.error.bind(console));
    }

    render() {
        return (
            <div className='Checkout'>
                <h1>Checkout Page</h1>
            </div>
        );
    };
}

export default Checkout;
