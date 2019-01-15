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
        editCustomer: {
            id: '',
            firstName: '',
            lastName: '',
        },
        queryText: '',
        isNewClicked: false,
        isEditClicked: false,
    }

    getCustomers = () => {
        axios('api/customers')
            .then(response => response.data)
            .then((customers) => {
                this.setState({ customers });
            })
            .catch((err) => {
                console.error('error with GetCustomers request', err);
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
                    }));
                    return this.getCustomers();
                }
                })
            .catch((err) => {
                console.error('error with request', err);
            });
    }

    postCustomer = (customer) => {
        axios.post(`api/customers`, customer)
            .then(() => {
                return this.getCustomers();
            })
            .catch((err) => {
                console.error('error with request', err);
            });
    }

    updateCustomer = (editCust) => {
        // const editCustomer = { ...this.state.editCustomer };
        axios.put(`api/customers/${editCust.id}`, editCust)
             .then(() => {
                 return this.getCustomers();
             })
             .catch((err) => {
                 console.error('error with request', err);
             });
     }

    // -------------Search bar and button functionality-------------//
    queryText = (e) => {
        this.setState({ queryText: e.target.value });
    }

    onSearch = (e) => {
        e.preventDefault();
        this.customerQuery(this.state.queryText);
    }

    // -------------New Customer Modal functionality---------------//
    openNewModal = (e) => {
        this.setState({isNewClicked: true});
    }

    closeNewModal = (e) => {
        this.setState({isNewClicked: false});
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

    onNewSubmit = (e) => {
        e.preventDefault();
        const tempCust = { ...this.state.newCustomer };
        this.postCustomer(tempCust);
        this.closeNewModal(e);
    }

    // ----------------Edit Customer Functionality---------------//
    openEditModal = (e) => {
        this.setState({ isEditClicked: true });
        const tempCust = { ...this.state.editCustomer };
        tempCust.id = e.target.dataset.id;
        tempCust.firstName = '';
        tempCust.lastName = '';
        this.setState({ editCustomer: tempCust });
    }

    closeEditModal = () => {
        this.setState({ isEditClicked: false });
    }

    editCustomerFirstName = (e) => {
        const tempCust = { ...this.state.editCustomer };
        tempCust.firstName = e.target.value;
        this.setState({ editCustomer: tempCust });
    }

    editCustomerLastName = (e) => {
        const tempCust = { ...this.state.editCustomer };
        tempCust.lastName = e.target.value;
        this.setState({ editCustomer: tempCust });
    }

    onEditSubmit = (e) => {
        e.preventDefault();
        const tempCust = { ...this.state.editCustomer };
        this.updateCustomer(tempCust);
        this.closeEditModal(e);
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
                                data-id={cust.id}
                                onClick={this.openEditModal}
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
        }).reverse();
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
                            onClick={this.openNewModal}
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
                    <Modal show={this.state.isNewClicked} onHide={this.closeNewModal}>
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
                                    onClick={this.closeNewModal}
                                >Cancel</button>
                                <button
                                    type="submit"
                                    class="btn btn-default"
                                    onClick={this.onNewSubmit}
                                >Submit</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                    <Modal show={this.state.isEditClicked} onHide={this.closeEditModal}>
                        <Modal.Header>
                            <Modal.Title>Edit a customer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form class="form-inline">
                                <div class="form-group">
                                    <label>First Name: </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="John"
                                        onChange={this.editCustomerFirstName}
                                    />
                                </div>
                                <div class="form-group">
                                    <label>Last Name: </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Smith"
                                        onChange={this.editCustomerLastName}
                                    />
                                </div>
                                <button
                                    type="button"
                                    class="btn btn-danger"
                                    onClick={this.closeEditModal}
                                >Cancel</button>
                                <button
                                    type="submit"
                                    class="btn btn-default"
                                    onClick={this.onEditSubmit}
                                >Submit</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        );
    };
};

export default CustomersComponent;
