import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';

import paymentTypeRequests from '../../APICalls/PaymentType';

class Checkout extends Component {
    state = {
        newPaymentType: {
            name: '',
            customerId: '',
        },
        paymentTypes: [],
        paymentOptionId: '',
        alert: false,
        alertMessage: '',
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
            .catch((e) => this.showAlert(e));
    }

    createPaymentType = (e) => {
        e.preventDefault();
        this.state.newPaymentType.customerId = this.state.newPaymentType.customerId * 1;
        paymentTypeRequests
            .postNewPaymentType(this.state.newPaymentType)
            .catch((e) => this.showAlert(e));
    }

    deletePaymentType = (e) => {
        paymentTypeRequests
            .deletePaymentType(this.state.paymentOptionId * 1)
            .then(() => {
                this.getPaymentTypes();
            })
            .catch((e) => this.showAlert(e));
    }

    // state updates

    getValidationState = () => {
        const length = this.state.newPaymentType.length;
        if (length > 3) return 'success';
        return null;
    }

    handleChange = (e) => {
        const tempPT = {
            name: e.target.value,
        };
        this.setState({ newPaymentType: tempPT });
    }

    setPaymentOption = (e) => {
        this.setState({ paymentOptionId: e.target.value });
    }

    // alert methods

    dismissAlert = () => {
        this.setState({ alert: false });
    }

    showAlert = (e) => {
        this.setState({ alert: true, alertMessage: e.message });
    }

    // render

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

                {/* <table class='table table-striped table-responsive'>
                    {orderData}
                </table>*/}

                {orderData}

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
                            value={this.state.newPaymentType.name}
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
                        <strong>Error: {this.state.alertMessage}</strong>
                        <p>
                            <Button onClick={this.dismissAlert}>Hide Alert</Button>
                        </p>
                    </Alert>
                    {pageJSX}
                </div>
            );
        } else {
            return pageJSX;
        }
    };
}

export default Checkout;
