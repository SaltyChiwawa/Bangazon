import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div className='Home'>

                <p><Link to='/customers' className='btn btn-lg'>Customers</Link></p>
                <p><Link to='/computers' className='btn btn-lg'>Computers</Link></p>
                <p><Link to='/departments' className='btn btn-lg'>Departments</Link></p>
                <p><Link to='/employees' className='btn btn-lg'>Employees</Link></p>
                <p><Link to='/orderlines' className='btn btn-lg'>OrderLines</Link></p>
                <p><Link to='/orders' className='btn btn-lg'>Orders</Link></p>
                <p><Link to='/paymenttypes' className='btn btn-lg'>PaymentTypes</Link></p>
                <p><Link to='/products' className='btn btn-lg'>Products</Link></p>
                <p><Link to='/producttypes' className='btn btn-lg'>ProductTypes</Link></p>
                <p><Link to='/trainingprograms' className='btn btn-lg'>TrainingPrograms</Link></p>

            </div>
        );
    };
}

export default Home;
