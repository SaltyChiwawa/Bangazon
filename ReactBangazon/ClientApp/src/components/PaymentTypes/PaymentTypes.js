import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getPaymentTypesRequest from '../../DbRequests/PaymentType';
//mport PaymentTypesLineItem from './PaymentTypesLineItem';

class PaymentTypes extends Component {
    state = { paymentTypes: [] }

    getAllPaymnetTypes = () => {
        getPaymentTypesRequest.getAllPaymentTypes()
            .then((paymentTypes) => {
                this.setState({ paymentTypes });
            })
            .catch((err) => {
                console.error('Error getting PaymentTypes: ', err);
            });
    }

    paymentLintItem = () => {
        const paymnetTypes = this.props.paymnetTypes;
        return paymnetTypes.map((paymnetType) => {
            return (
                <tr key={paymnetType.id}>
                    <td>{paymnetType.name}</td>
                </tr>
            );
        });
    };


    //updateState = () => {
    //    this.getAllPaymentTypes();
    //};

    render() {
        return (
            <div className='PaymentTypes'>
                <p><Link to='/' className='btn btn-lg btn-success'>Back to Home</Link></p>
                <button type="button" class="btn btn-primary" onClick={this.getAllPaymnetTypes}>PaymentTypes</button>
            </div>
        );
    };
}

export default PaymentTypes;
