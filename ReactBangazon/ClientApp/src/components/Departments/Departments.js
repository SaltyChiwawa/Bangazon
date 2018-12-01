import React from 'react';
import { Link } from 'react-router-dom';
import departmentRequests from '../../APICalls/DepartmentsRequests';

class Departments extends React.Component {
    state = {
        departments: [],
        name: '',
        supervisorId: 0,
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

    render() {
        // Make DOM nodes for departments data
        const dptElements = this.state.departments.map(dpt => {
            return (
                <div key={dpt.id} className='well well-sm'>
                    <h4>{dpt.name}</h4>
                    <h5>SupervisorId: {dpt.supervisorId}</h5>
                </div>
            );
        });

        return (
            <div className='Departments'>
                <p><Link to='/' className='btn btn-lg btn-success btn-block'>Back to Home</Link></p>

                <p className='btn btn-lg btn-primary btn-block' onClick={this.getDepartments}>Get All Departments</p>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Name:</span>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        <span>SupervisorId</span>
                        <input
                            type="number"
                            value={this.state.supervisorId}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Post Department" />
                </form>

                <div className='col-sm-12 department-page'>
                    {dptElements}
                </div>

            </div>
        );
    };
}

export default Departments;
