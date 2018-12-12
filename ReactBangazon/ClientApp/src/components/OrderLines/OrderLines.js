import React from 'react';
import { Link } from 'react-router-dom';
import OrderLinesRequests from '../../APICalls/OrderLinesRequests';

export default class OrderLines extends React.Component {
    state = {
        orderLines: [], // array of items that get displayed on render
    };

    // Set state for items
    getOrderLines = (e) => {
        OrderLinesRequests
            .getRequest()
            .then((result) => {
                this.setState({ orderLines: result });
            })
            .catch(console.error.bind(console));
    };

    render() {
        // Make DOM nodes for item data from state
        const dataElements = this.state.orderLines.map(item => {
            return (
                <div key={item.id} className='well well-sm'>
                    <h4>Order Id: {item.id}</h4>
                    <h5>OrderId: {item.orderId}</h5>
                    <h5>ProductId: {item.productId}</h5>
                </div>
            );
        }).reverse();
        // ^^^ this is so the new items are at the top of the list

        return (
            <div className='OrderLines container-fluid'>
                <div className='row'>

                    {/* back to home button */}
                    <p><Link to='/' className='btn btn-lg btn-success btn-block'>Back to Home</Link></p>

                    {/* get all items */}
                    <button className='btn btn-lg btn-primary btn-block' onClick={this.getOrderLines}>Get All OrderLines</button>

                    {/* the data output*/}
                    <div className='col-sm-12'>
                        {dataElements}
                    </div>

                </div>
            </div>
        );
    };
}
