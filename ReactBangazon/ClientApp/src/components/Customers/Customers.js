import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CustomersComponent extends React.Component {
    state = {
        customers: [],
        newCustomer: {
            firstName: '',
            lastName: '',
        },
        queryText: '',
        isClicked: false,
    }

    getCustomers = () => {
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
                if (customers) {
                    this.setState({customers});
                }
            })
            .catch((err) => {
                console.error('error with request', err);
            });
    }

    deleteCustomer = (id) => {
        axios.delete(`api/customers/` + id)
            .then(response => response.data)
            .then((success) => {
                if (success) {
                    this.setState(({ customers }) => ({
                        customers: customers.filter(c => c.id !== id),
                    }))
                    return this.getCustomers();
                }
                })
            .catch((err) => {
                console.error('error with request', err);
            });
    }

    postCustomer = (customer) => {
        axios.post(`api/customers`, customer)
            .then(response => response.data)
            .then(() => {
                return this.getCustomers();  
            })
            .catch((err) => {
                console.error('error with request', err);
            });
    }

    queryText = (e) => {
        this.setState({ queryText: e.target.value });
    }

    onSearch = (e) => {
        e.preventDefault();
        this.customerQuery(this.state.queryText);
    }

    openModal = (e) => {
        this.setState({ isClicked : true });
    }

    closeModal = (e) => {
        this.setState({ isClicked : false });
    }

    newCustomerFirstName = (e) => {
        const tempCust = { ...this.state.newCustomer };
        tempCust.firstName = e.target.value;
        this.setState({ newCustomer: tempCust });
    }

    newCustomerLastName = (e) => {
        const tempCust = { ...this.state.newCustomer };
        tempCust.lastName = e.target.value;
        this.setState({ newCustomer: tempCust });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const tempCust = { ...this.state.newCustomer };
        this.postCustomer(tempCust);
        this.closeModal(e);
    }

    render() {
        const customerListings = this.state.customers.map(cust => {
            return (
                <div key={cust.id} className='panel panel-default'>
                    <div className='panel-body'>
                        <h3>{cust.firstName} {cust.lastName}</h3>
                        <div className='col-md-offset-3'>
                            <button
                                type='submit'
                                className='pull-right col-sm-2 btn btn-med btn-primary'
                            >Edit</button>
                            <button
                                type='submit'
                                className='pull-right col-sm-2 btn btn-med btn-danger'
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
                            onClick={this.getCustomers}
                        >See All Customers</button>
                        <button
                            class='btn col-md-4'
                            onClick={this.openModal}
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
                                onClick={this.onSearch}
                            >Submit</button>
                        </form>
                    </div>
                    {customerListings}
                    <Modal show={this.state.isClicked} onHide={this.closeModal}>
                        <Modal.Header>
                            <Modal.Title>Add a new customer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form class="form-inline">
                                <div class="form-group">
                                    <label>First Name: </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="John"
                                        onChange={this.newCustomerFirstName}
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Last Name: </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Smith"
                                        onChange={this.newCustomerLastName}
                                    />
                                </div>
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    onClick={this.closeModal}
                                >Cancel</button>
                                <button
                                    type="submit"
                                    class="btn btn-default"
                                    onClick={this.onSubmit}
                                >Submit</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
                    );
                };
            }
export default CustomersComponent;
