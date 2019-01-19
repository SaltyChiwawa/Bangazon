import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';

import paymentTypeRequests from '../../APICalls/PaymentType';

class Checkout extends Component {
    state = {
        value: '',
        showAlert: true,
        alertMessage: '',
    }

    handleShowAlert = () => {
        this.setState({ showAlert: true });
    }

    handleDismissAlert = () => {
        this.setState({ showAlert: false });
    }

    getValidationState = () => {
        const length = this.state.value.length;
        if (length > 3) return 'success';
        return null;
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    createPaymentType = (e) => {
        e.preventDefault();
        paymentTypeRequests
            .postNewPaymentType(this.state.value)
            .then((result) => {
                this.setState({ showAlert: true , alertMessage: 'Thanks for cooperating!' });
            })
            .catch((error) => {
                this.setState({ showAlert: true , alertMessage: 'Oh snap! You got an error!' });
            });
    }

    render() {

        const alert = () => {
            if (this.state.showAlert) {
                return (
                    <Alert bsStyle="danger" onDismiss={this.handleDismissAlert}>
                        {this.state.alertMessage}
                    </Alert>
                );
            }
        };

        const orderData = 'OrderData goes here';

        return (
            <div className='Checkout'>
                <h2>Checkout Page</h2>

                <table class='table table-striped table-responsive'>
                    {orderData}
                </table>

                {alert}

                <form onSubmit={this.createPaymentType}>
                    <FormGroup
                        controlId="paymentTypesForm"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Please enter your Payment Type</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Visa / Mastercard"
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <Button type="submit">Submit</Button>
                </form>
            </div>
        );
    };
}

export default Checkout;
