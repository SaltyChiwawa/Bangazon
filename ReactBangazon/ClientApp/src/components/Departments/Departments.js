import React from 'react';
import { Link } from 'react-router-dom';

class Departments extends React.Component {

    render() {
        return (
            <div className='Departments'>
                <p><Link to='/' className='btn btn-lg btn-success btn-block'>Back to Home</Link></p>
                <p className='btn btn-lg btn-block' onClick={this.GetDepartments}>Get All Departments</p>
            </div>
        );
    };
}

export default Departments;
