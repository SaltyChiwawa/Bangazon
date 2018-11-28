import React from 'react';
import { Link } from 'react-router-dom';

import customerRequests from '../../../Controllers/CustomersController';
import CustomerList from '../CustomerList/CustomerList';

class CustomersComponent extends React.Component {
    state = {
        customers:[],
        newCustomer:[],
    }

    componentDidMount() {
        customerRequests
            .GetAllCustomers()
            .then((customers) => {
                this.setState({ customers });
            })
            .catch((err) => {
                console.error('error with GetAllCustomers request', err);
            });
    };

    render() {
        return (
            <div className='customerContainer'>
                <div className='BackButton'>
                    <p><Link to='/' className='btn btn-lg btn-success'>Back to Home</Link></p>
                </div>
                <div className='CustomerContainer'>
                    <div class='row'>
                        <h2 class='col-md-12 text-center'>Customers</h2>
                    </div>
                    <div class='row'>
                        <button class='btn col-md-offset-2 col-md-4'>See All Customers</button>
                        <button class='btn col-md-4'>Add New Customeer</button>
                    </div>
                    <div class='row'>
                        <form class='form-inline text-center col-md-12'>
                            <div class='form-group'>
                                <input type='text' class='form-control' placeholder='Enter Search Criteria'></input>
                            </div>
                            <button type='submit' class='btn btn-default'>Submit</button>
                        </form>
                    </div>
                    <CustomerList
                        customers={this.state.customers}
                    />
                </div>
            </div>
        );
    };
}

export default CustomersComponent;