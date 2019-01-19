import React, { Component } from 'react';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import Nav from '../Navbar/Navbar';

class Checkout extends Component {
    state = {
        orderId: '',
        customerId: '',
        paymentTypeId: '',
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 1) return 'error';
    }

    render() {

        const orderData = '';

        return (
            <div className='Checkout'>
                <div className="col-xs-12">
                    <Nav />
                </div>

                <h2>Checkout Page</h2>

                <table class='table table-striped table-responsive'>
                    {orderData}
                </table>

                <form>
                    <FormGroup
                        controlId="paymentTypesForm"
                        validationState={this.getValidationState()}
                    >

                    </FormGroup>
                </form>
            </div>
        );
    };
}

export default Checkout;
