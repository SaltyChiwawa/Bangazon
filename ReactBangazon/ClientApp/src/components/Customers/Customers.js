import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CustomerForm from '../Customers/CustomerForm';


class CustomersComponent extends React.Component {
    state = {
        customers: [],
        newCustomer: [],
        queryText: '',
    }

    customerRequests = () => {
        axios('api/customers')
            .then(response => response.data)
            .then((customers) => {
                this.setState({ customers });
            })
            .catch((err) => {
                console.error('error with GetAllCustomers request', err);
            });
    };

    customerQuery = (query) => {
        axios(`api/customers?q=${query}`)
            .then(response => response.data)
            .then((customers) => {
                this.setState({ customers });
            })
            .catch((err) => {
                console.error('error with GetAllCustomers request', err);
            });
    }

    postCustomer = (customer) => {
        axios.post(`api/customers`)
            .then(response => console.log(response.data) || response.data)
            .then((success) => {
                this.setState(({ customers }) => ({
                    customers: customers.push(customer)
                }));
            })
            .catch((err) => {
                console.error('error with request', err);
            });
    }

    queryText = (e) => {
        this.setState({ queryText: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.customerQuery(this.state.queryText);
    }

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
                        <button
                            class='btn col-md-offset-2 col-md-4'
                            onClick={this.customerRequests}
                        >See All Customers</button>
                        <button
                            class='btn col-md-4'
                        >Add New Customer</button>
                    </div>
                    <CustomerForm
                        onSubmit={this.postCustomer(customer)} />
                    <div class='row'>
                        <form class='form-inline text-center col-md-12'>
                            <div class='form-group'>
                                <input
                                    type='text'
                                    value={this.state.queryText}
                                    id='searchText'
                                    class='form-control'
                                    placeholder='Enter Search Criteria'
                                    onChange={this.queryText} />
                            </div>
                            <button
                                type='submit'
                                class='btn btn-default'
                                onClick={this.onSubmit}
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

export default CustomersComponent;