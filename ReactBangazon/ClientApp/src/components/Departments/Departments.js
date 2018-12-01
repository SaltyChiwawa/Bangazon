import React from 'react';
import { Link } from 'react-router-dom';
import departmentRequests from '../../APICalls/DepartmentsRequests';

class Departments extends React.Component {
    state = {
        departments: [],
        name: '',
        supervisorId: 0,
        newDepartment: {
            name: "",
            supervisorId: 0,
        },
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

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleSupervisorIdChange = (event) => {
        this.setState({ supervisorId: event.target.value });
    }

    handleSubmit = (event) => {
        this.setState({
            newDepartment: {
                name: this.state.name,
                supervisorId: this.state.supervisorId,
            },
        });

        console.error('newDepartment: ', this.state.newDepartment);

        departmentRequests.postRequest(this.state.newDepartment);

        this.setState(state => {
            return {
                name: '',
                supervisorId: 0,
                departments: [...this.state.departments, this.state.newDepartment],
            };
        });
        event.preventDefault();
    }

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
                {/* back to home button */}
                <p><Link to='/' className='btn btn-lg btn-success btn-block'>Back to Home</Link></p>

                {/* get all departments */}
                <p className='btn btn-lg btn-primary btn-block' onClick={this.getDepartments}>Get All Departments</p>

                {/* new department form */}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Name:</span>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                        />
                    </label>
                    <label>
                        <span>SupervisorId</span>
                        <input
                            type="number"
                            value={this.state.supervisorId}
                            onChange={this.handleSupervisorIdChange}
                        />
                    </label>
                    <input type="submit" value="Post Department" />
                </form>

                {/* the departments */}
                <div className='col-sm-12 department-page'>
                    {dptElements}
                </div>

            </div>
        );
    };
}

export default Departments;
