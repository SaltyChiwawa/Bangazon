import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CustomerList from '../CustomerList/CustomerList';


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
                    <CustomerList
                        customers={this.state.customers}
                    />
                </div>
            </div>
        );
    };
}

export default CustomersComponent;