import React from 'react';
import OrderLinesRequests from '../../APICalls/OrderLinesRequests';

export default class SingleOrderLineItem extends React.Component {
    state = {
        orderLine: [],
        OrderId : 'OrderId',
        ProductId: 'ProductId',
}

    componentDidMount() {
        const dbId = this.props.match.params.id;
        console.error(dbId);
      return OrderLinesRequests.getSingleRequest(dbId)
            .then(orderLine => {
                this.setState({ orderLine });
            })
            .catch(console.error.bind(console));
    };

    //componentDidMount() {
    //    this.getsingleRequest();
    //}

    render() {
        const { orderLine, OrderId, ProductId } = this.state;
        console.error(orderLine);
        return (
            <div>
                <p> <span className="tag">{OrderId}</span> - {orderLine.orderId} </p>
                {"  "}
               <p>  <span className="tag">{ProductId}</span> - {orderLine.productId}</p>
             </div>       
        );
    }

}
