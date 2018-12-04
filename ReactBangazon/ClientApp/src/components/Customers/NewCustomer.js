import React from 'react';
import axios from 'axios';

class NewCustomer extends React.Component
{
    state = {
        newCustomer: {
            firstName: '',
            lastName: '',
        }
    }

    setFirstName = (e) =>
    {
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

    render()
    {
        return (
            <div>
                <h2>Add a New Customer</h2>
                <div class='row'>
                    <form class='form-inline text-center col-md-12'>
                        <div class='form-group'>
                            <input
                                //class='col-md-offset-2 col-md-4'
                                type='text'
                                value={this.state.newCustomer.firstName}
                                placeholder='First Name'
                                onChange={this.setFirstName}
                            />
                            <input
                                //class='col-md-4'
                                type='text'
                                value={this.state.newCustomer.lastName}
                                placeholder='First Name'
                                onChange={this.setLastName}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewCustomer;
