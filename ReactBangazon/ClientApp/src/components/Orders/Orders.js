import React from 'react';
import { Link } from 'react-router-dom';
import OrdersRequest from '../../APICalls/Orders';
import { Modal, Button } from 'react-bootstrap';

class Orders extends React.Component {
    state = {
        orders: [],
        editId: '',
        editCustomerId: '',
        editProductId: '',
        showEdit: false
    }

    getallRequest = () => {
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

    componentDidMount() {
        this.getallRequest();
    }


    deleteAnOrder = (id) =>
    {
        OrdersRequest
            .deleteRequest(id)
            .then(() =>
            {
                this.getallRequest();
            })
            .catch((err) =>
            {
                console.error("error with delete order", err)
            })
    }
    // show Modal
    showEditModal = (e) => {
        const orderId = e.target.dataset.id;
        const customerId = e.target.dataset.customerId;
        const productId = e.target.dataset.productId;
        this.setState({ showEdit: true, editId: orderId, editCustomerId: customerId, editProductId: productId });
    }

    // close Modal
    closeEditModal = () => {
        this.setState({ showEdit: false, editId: '', editCustomerId: '', editProductId: '' });
    }

    // IdChange
    idChange = (e) => {
        this.setState({editId: e.target.value})
    }

    //CustomerIdChange
    customerIdChange = (e) => {
        this.setState({editCustomerId: e.target.value})
    }

    //PaymentIdChange
    paymentIdChange = (e) => {
        this.setState({ editProductId: e.target.value})
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
                            <button className="btn btn-default" onClick={() => this.deleteAnOrder(orda.id)}>Delete</button>
                            <button className="btn btn-default" data-id={orda.id} data-customerId={orda.customerId} data-productId={orda.productId}onClick={this.showEditModal}>Update</button>
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
                <span>
                    {allOrders}
                </span>

                <Modal show={this.state.showEdit} onHide={this.closeEditModal}>
                    <Modal.Header>
                        <Modal.Title>Update Order</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input placeholder="Id"
                            value={this.state.editId}
                            onChange={this.idChange} />
                        {' '}
                        <input placeholder="orderId"
                            value={this.state.editCustomerId}
                            onChange={this.customerIdChange} />
                        {' '}
                        <input placeholder="PaymentId"
                            value={this.state.editPaymentTypeId}
                            onChange={this.paymentIdChange} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeEditModal}>Close</Button>
                        <Button bsStyle="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Orders;