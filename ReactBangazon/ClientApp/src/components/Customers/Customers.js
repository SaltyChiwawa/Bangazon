import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CustomersComponent extends React.Component {
    state = {
        customers: [],
        newCustomer: [],
        products: [],
        paymentTypes: [],
        orders: [],
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
            .then((data) => {
                if (data) {
                    this.setState({
                        customers: data,
                    });
                }
            })
            .catch((err) => {
                console.error('error with request', err);
            });
    }

    getCustomerProducts = () => {
        axios(`api/products`)
            .then(response => response.data)
            .then((products) => {
                this.setState({ products });
            })
            .catch((err) => {
                console.error(`error with request`, err);
            });
    }

    deleteCustomer = (id) => {
        axios.delete(`api/customers/` + id)
            .then(response => response.data)
            .then((success) => {
                if (success) {
                    this.setState(({ customers }) => ({
                        customers: customers.filter(c => c.id !== id),
                    }));
                }
            })
            .catch((err) => {
                console.error('error with request', err);
            });
    }

    postCustomer = (customer) => {
        axios.post(`api/customers`)
            .then(response => response.data)
            .then((success) => {
                this.setState(({ customers }) => ({
                    customers: customers.push(customer),
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

        const customerListings = this.state.customers.map(cust => {
            return (
                <div key={cust.id} className='panel panel-default'>
                    <div className='panel-heading'>
                        <h3 className='panel-title'>{cust.FirstName} {cust.LastName}</h3>
                    </div>
                    <div className='panel-body'>
                        <ul>
                            <li>{this.state.products}</li>
                        </ul>
                        <div className='col-md-offset-3'>
                            <button
                                type='submit'
                                className='col-sm-2 btn btn-med btn-primary'
                            >Edit</button>
                            <button
                                type='submit'
                                className='col-sm-2 btn btn-med btn-danger'
                                onClick={() => this.deleteCustomer(cust.Id)}
                            >Delete</button>
                        </div>
                    </div>
                </div>
            );
        });

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
                    {customerListings}
                </div>
            </div>
        );
    };
}

export default CustomersComponent;
