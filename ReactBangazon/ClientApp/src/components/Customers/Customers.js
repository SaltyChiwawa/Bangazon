import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CustomerList from '../Customers/CustomerList';

class CustomersComponent extends React.Component {
    state = {
        customers: [],
        newCustomer: {
            firstName: '',
            lastName: '',
        },
        queryText: '',
    }

    getRequest = () => {
        axios('api/customers')
            .then(response => response.data)
            .then((customers) => {
                this.setState({ customers });
            })
            .catch((err) => {
                console.error('error with GetAllCustomers request', err);
            });
    };

    postRequest = (newCustomer) =>
    {
        axios.post('api/customers', { newCustomer })
            .then(res =>
            {
                console.log(res);
                console.log(res.data);
            })
    }

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

    setFirstName = (e) => {
        const { newCustomer } = this.state;  
        newCustomer.firstName = e.target.value;
        this.setState({ newCustomer });
    }

    setLastName = (e) =>
    {
        const { newCustomer } = this.state;
        newCustomer.lastName = e.target.value;
        this.setState({ newCustomer });
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
                            onClick={this.getRequest}
                        >See All Customers</button>
                    </div>
                    <div class='row'>
                        <form class='form-inline text-center col-md-12'>
                            <div class='form-group'>
                                <input
                                    class='col-md-offset-2 col-md-4'
                                    type='text'
                                    value={this.state.newCustomer.firstName}
                                    placeholder='First Name'
                                    onChange={this.setFirstName}
                                />
                            </div>
                        </form>
                    </div>
                    <div class='row'>
                        <form class='form-inline text-center col-md-12'>
                            <div class='form-group'>
                                <input
                                    class='col-md-4'
                                    type='text'
                                    value={this.state.newCustomer.lastName}
                                    placeholder='First Name'
                                    onChange={this.setLastName}
                                />
                                <span class="input-group-btn">
                                    <button
                                        class="btn btn-default"
                                        type="button"
                                        onClick={this.postRequest(this.state.newCustomer)}
                                    >Save</button>
                                </span>
                            </div>
                        </form>
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
                                type='submit
'
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