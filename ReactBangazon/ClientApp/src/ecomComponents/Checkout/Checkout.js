import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';

import paymentTypeRequests from '../../APICalls/PaymentType';

class Checkout extends Component {
    state = {
        newPaymentType: '',
        paymentTypes: [],
        paymentOptionId: '',
        alert: false,
    }

    // lifecycle methods

    componentDidMount() {
        this.getPaymentTypes();
    }

    // API methods

    getPaymentTypes = () => {
        paymentTypeRequests
            .getAllPaymentTypes()
            .then((results) => {
                this.setState({ paymentTypes: results });
            })
            .catch(this.showAlert());
    }

    createPaymentType = (e) => {
        e.preventDefault();
        paymentTypeRequests
            .postNewPaymentType(this.state.newPaymentType)
            .catch(this.showAlert());
    }

    deletePaymentType = (e) => {
        paymentTypeRequests
            .deletePaymentType(this.state.paymentOptionId * 1)
            .then(() => {
                this.getPaymentTypes();
                this.showAlert();
            })
            .catch(this.showAlert());
    }

    // state updates

    getValidationState = () => {
        const length = this.state.newPaymentType.length;
        if (length > 3) return 'success';
        return null;
    }

    handleChange = (e) => {
        this.setState({ newPaymentType: e.target.value });
    }

    setPaymentOption = (e) => {
        this.setState({ paymentOptionId: e.target.value });
    }

    // alert methods

    dismissAlert = () => {
        this.setState({ alert: false });
    }

    showAlert = () => {
        this.setState({ alert: true });
    }

    render() {

        const orderData = 'OrderData goes here';

        const paymentTypes = this.state.paymentTypes.map((pType) => {
            return (
                <option key={pType.id} value={pType.id}>{pType.name}</option>
            );
        });

        const pageJSX = (
            <div className='Checkout'>
                <h2>Checkout Page</h2>

                <table class='table table-striped table-responsive'>
                    {orderData}
                </table>

                <form>
                    <FormGroup controlId="formControlsSelect" onClick={this.getPaymentTypes}>
                        <ControlLabel>Select</ControlLabel>
                        <FormControl componentClass="select" placeholder="select" value={this.state.paymentOptionId} onChange={this.setPaymentOption}>
                            {paymentTypes}
                        </FormControl>
                    </FormGroup>

                    <Button bsStyle='danger' onClick={this.deletePaymentType}>Delete this PaymentType</Button>
                </form>

                <form onSubmit={this.createPaymentType}>
                    <FormGroup
                        controlId="paymentTypesForm"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Or add a new Payment Type</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.newPaymentType}
                            placeholder="Visa / Mastercard"
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <Button type="submit">Create New PaymentType</Button>
                </form>
            </div>
        );

        if (this.state.alert === true) {
            return (
                <div>
                    <Alert bsStyle="danger">
                        <strong>Error!</strong>
                        <p>
                            <Button onClick={this.dismissAlert}>Hide Alert</Button>
                        </p>
                    </Alert>
                    {pageJSX}
                </div>
                );
        }
        return pageJSX;
    };
}

export default Checkout;
