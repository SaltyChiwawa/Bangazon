import React from 'react';
import { Link } from 'react-router-dom';
import getPaymentTypesRequest from '../../APICalls/PaymentType';
import PaymentType from '../../APICalls/PaymentType';
import NewPaymentTypes from '../NewPaymentTypes/NewPaymentTypes';

//const defaultPaymentType = {
//    name: '',
//};

class PaymentTypes extends React.Component {
    state = {
        paymentTypes: [],
       // newPayementType: defaultPaymentType
        isClicked: false,

    }
    // using returning axios call continue using .then 
    getAllPaymentTypes = () => {
      return  getPaymentTypesRequest.getAllPaymentTypes()
            .then((paymentTypes) => {
                this.setState({ paymentTypes });
                return paymentTypes
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
    postPaymentTypes = (newPaymentType) => {
       return getPaymentTypesRequest.postNewPaymentType(newPaymentType)
            .then(() => {
               return this.getAllPaymentTypes();
            })
            .catch((err) => {
                console.error('error with posting new payment type', err);
            });
    }


    updatePaymentTypes = (id, updatedPaymentType) => {
        getPaymentTypesRequest.updatePaymentType(id, updatedPaymentType)
            .then(() => {
                this.getAllPaymentTypes();
            })
            .catch((err) => {
                console.error('error with update request', err);
            });
    };

    showform = (e) => {
        this.setState({ isClicked : !this.state.isClicked });
    }

    render() {
        const paymentLintItem = this.state.paymentTypes.map((paymnetType) => {
            return (
                <div className="panel panel-primary" key={paymnetType.id}>
                    <p>{paymnetType.id}</p>
                    <p>{paymnetType.name}</p>
                    <button type="button" className="btn btn-warning" onClick={this.updatePaymentTypes}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={() => this.deletePaymentTypes(paymnetType.id)}>Delete</button>
                </div>
                );
        });
        return (
            <div className='PaymentTypes'>
                <p><Link to='/' className='btn btn-lg btn-success'>Back to Home</Link></p>
                <button type="button" className="btn btn-primary" onClick={this.getAllPaymentTypes}>PaymentTypes</button>
                {this.state.isClicked ?
                    <NewPaymentTypes
                        onPost={this.postPaymentTypes} /> :
                    ''}
                <button type="button" className="btn btn-primary" onClick={this.showform}>Add New Payment</button>
                {paymentLintItem}
            </div>
        );
    };
}

export default PaymentTypes;
