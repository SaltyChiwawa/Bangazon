import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getPaymentTypesRequest from '../../APICalls/PaymentType';

class PaymentTypes extends Component {
    state = { paymentTypes: [] }

    getAllPaymentTypes = () => {
        getPaymentTypesRequest.getAllPaymentTypes()
            .then((paymentTypes) => {
                this.setState({ paymentTypes });
            })
            .catch((err) => {
                console.error('Error getting PaymentTypes: ', err);
            });
    }

    deletePaymentTypes = (id) => {
        
        getPaymentTypesRequest.deletePaymentType(id)
            .then(() => {
                this.getAllPaymentTypes();
            })
            .catch((err) => {
                console.error('error with delete request', err);
            });
    };

    render() {
        const paymentLintItem = this.state.paymentTypes.map((paymnetType) => {
            return (
                <div className="panel panel-primary" key={paymnetType.id}>
                    <p>{paymnetType.id}</p>
                    <p>{paymnetType.name}</p>
                    <button type="button" className="btn btn-warning">Edit</button>
                    <button type="button" className="btn btn-danger" onClick={() => this.deletePaymentTypes(paymnetType.id)}>Delete</button>
                </div>
                );
        });
        return (
            <div className='PaymentTypes'>
                <p><Link to='/' className='btn btn-lg btn-success'>Back to Home</Link></p>
                <button type="button" className="btn btn-primary" onClick={this.getAllPaymentTypes}>PaymentTypes</button>
                {paymentLintItem}
            </div>
        );
    };
}

export default PaymentTypes;
