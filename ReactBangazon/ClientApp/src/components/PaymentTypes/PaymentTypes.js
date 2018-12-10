import React from 'react';
import { Link } from 'react-router-dom';
import getPaymentTypesRequest from '../../APICalls/PaymentType';
import PaymentType from '../../APICalls/PaymentType';
import NewPaymentTypes from '../NewPaymentTypes/NewPaymentTypes';
import { Glyphicon, Modal, Button } from 'react-bootsrap';

//const defaultPaymentType = {
//    name: '',
//};

class PaymentTypes extends React.Component {
    state = {
        paymentTypes: [],
        name: '',
        isClicked: false,
        isEditing: false,

    }

    nameEdit = e => {
        this.setState({ name: e.target.value })
    }

    editSubmit = e => {
        const { onSubmit } = this.props
        console.error(this);
        const name = this.state;
        e.preventDefault();
        onSubmit(name);
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
       return  getPaymentTypesRequest.updatePaymentType(id, updatedPaymentType)
            .then(() => {
               return this.getAllPaymentTypes();
            })
            .catch((err) => {
                console.error('error with update request', err);
            });
    };

    showform = (e) => {
        this.setState({ isClicked : true });
    }

    closeform = (e) => {
        this.setState({ isClicked: false });
    }


    edit = (e) => {
        this.setState({ isEditing: !this.state.isEditing})
    }

    render() {
        const {name} = this.state
        const paymentLintItem = this.state.paymentTypes.map((paymnetType) => {
            return (
                <div className="panel panel-primary" key={paymnetType.id}>
                    <p>{paymnetType.id}</p>
                    <p>{paymnetType.name}</p>
                    <button type="button" className="btn btn-warning" onClick={this.edit}>Edit</button> {
                        this.setState.isEditing ? (
                            <div className="row">
                                <form onSubmit={this.editSubmit}>
                                    <div className="col-md-6 col-md-offset-3">
                                        <div className="row">
                                            <fieldSet className="form">
                                                <label htmlFor="Name">Name:</label>
                                                <input className="col-xs-12"
                                                    type="text"
                                                    id="name"
                                                    placeholder="PaymetType Name"
                                                    value={name}
                                                    onChange={this.nameChange}
                                                />
                                            </fieldSet>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-warning" onSubmit={this.updatePaymentTypes}>Submit</button>
                                </form>
                            </div>
                        ) : null};
                    <button type="button" className="btn btn-danger" onClick={() => this.deletePaymentTypes(paymnetType.id)}>Delete</button>
                </div>
                );
        });
        return (
            <div className='PaymentTypes'>
                <p><Link to='/' className='btn btn-lg btn-success'>Back to Home</Link></p>
                <button type="button" className="btn btn-primary" onClick={this.getAllPaymentTypes}>PaymentTypes</button>
                 <button type="button" className="btn btn-primary" onClick={this.showform}>Add New Payment</button>
                {this.state.isClicked ?
                    <NewPaymentTypes
                        onPost={this.postPaymentTypes} /> :
                    ''}
               
                {paymentLintItem}
                
            </div>
        );
    };
}

export default PaymentTypes;
