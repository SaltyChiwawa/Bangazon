import React from 'react';
import { Link } from 'react-router-dom';
import departmentRequests from '../../APICalls/Departments';

class Departments extends React.Component {
    state = {
        departments: [],
    }

    getDepartments = (e) => {
        departmentRequests
            .getRequest()
            .then((dpts) => {
                this.setState({ departments: dpts });
            })
            .catch(console.error.bind(console));
    };

    render() {
        // Make DOM nodes for departments data
        const dptElements = this.state.departments.map(dpt => {
            return (
                <div key={dpt.id} className='well well-sm'>
                    <h4>{dpt.name}</h4>
                </div>
            );
        });

        return (
            <div className='Departments'>
                <p><Link to='/' className='btn btn-lg btn-success btn-block'>Back to Home</Link></p>
                <p className='btn btn-lg btn-block' onClick={this.getDepartments}>Get All Departments</p>
                <div>
                    {dptElements}
                </div>
            </div>
        );
    };
}

export default Departments;
