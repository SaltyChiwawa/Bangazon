import React from 'react';
import { Link } from 'react-router-dom';
import departmentRequests from '../../APICalls/Departments';

class Departments extends React.Component {
    state = {
        departments: [],
    }

    // Set state for departments
    getDepartments = (e) => {
        departmentRequests
            .getRequest()
            .then((dpts) => {
                this.setState({ departments: dpts });
            })
            .catch(console.error.bind(console));
    };

    deleteDepartment = (e) => {
        console.error(e.target);
        departmentRequests
            .deleteRequest()
            .then(() => {
                this.getDepartments();
            })
            .catch(console.error.bind(console));
    }

    render() {
        // Make DOM nodes for departments data
        const dptElements = this.state.departments.map(dpt => {
            return (
                <div key={dpt.id} className='well well-sm'>
                    <h4>{dpt.name}</h4>
                    <button className='btn btn-error' onClick={this.deleteDepartment}>Delete</button>
                </div>
            );
        });

        return (
            <div className='Departments'>
                <p><Link to='/' className='btn btn-lg btn-success btn-block'>Back to Home</Link></p>
                <p className='btn btn-lg btn-primary btn-block' onClick={this.getDepartments}>Get All Departments</p>
                <div className='col-sm-12 department-page'>
                    {dptElements}
                </div>
            </div>
        );
    };
}

export default Departments;
