import React from 'react';
import { Link } from 'react-router-dom';

class CustomersComponent extends React.Component {
    render() {
        return (
            <div className='customerContainer'>
                <div className='BackButton'>
                    <p><Link to='/' className='btn btn-lg btn-success'>Back to Home</Link></p>
                </div>
                <div className='CustomerContainer'>
                    <h2>Customers</h2>
                    <button class='btn'>See All Customers</button>
                    <form class='form-inline'>
                        <div class='form-group'>
                            <label for='searchCustomers'>Search</label>
                            <input type='text' class='form-control' placeholder='Enter Search Criteria'></input>
                        </div>
                        <button type='submit' class='btn btn-default'>Submit</button>
                    </form>
                </div>
            </div>
        );
    };
}

export default BackButton;