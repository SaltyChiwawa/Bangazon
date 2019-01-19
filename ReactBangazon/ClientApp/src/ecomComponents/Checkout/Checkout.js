import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import paymentTypeRequests from '../../APICalls/PaymentType';

class Checkout extends Component {
    state = {
        value: '',
    }

    getValidationState = () => {
        const length = this.state.value.length;
        if (length > 3) return 'success';
        return null;
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    createPaymentType = () => {
        paymentTypeRequests
            .postNewPaymentType()
            .then(() => {

            })
            .catch(console.error.bind(console));
    }

    render() {

        const orderData = 'OrderData goes here';

        return (
            <div className='Checkout'>
                <h2>Checkout Page</h2>

                <table class='table table-striped table-responsive'>
                    {orderData}
                </table>

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
