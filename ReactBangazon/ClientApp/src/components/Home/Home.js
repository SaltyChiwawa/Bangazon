import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div className='Home'>
                <h1 className='col-sm-8 col-sm-offset-4'>Bangazon Resources</h1>
                <div className='col-sm-12'>
                  <p><Link to='/customers' className='btn btn-lg btn-block'>Customers</Link></p>
                  <p><Link to='/computers' className='btn btn-lg btn-block'>Computers</Link></p>
                  <p><Link to='/departments' className='btn btn-lg btn-block'>Departments</Link></p>
                  <p><Link to='/employees' className='btn btn-lg btn-block'>Employees</Link></p>
                  <p><Link to='/orderlines' className='btn btn-lg btn-block'>OrderLines</Link></p>
                  <p><Link to='/orders' className='btn btn-lg btn-block'>Orders</Link></p>
                  <p><Link to='/paymenttypes' className='btn btn-lg btn-block'>PaymentTypes</Link></p>
                  <p><Link to='/products' className='btn btn-lg btn-block'>Products</Link></p>
                  <p><Link to='/producttypes' className='btn btn-lg btn-block'>ProductTypes</Link></p>
                  <p><Link to='/trainingprograms' className='btn btn-lg btn-block'>TrainingPrograms</Link></p>
                </div>
            </div>
        );
    };
}

export default Home;
