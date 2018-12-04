import React from 'react';
import { Link } from 'react-router-dom';
import departmentRequests from '../../APICalls/DepartmentsRequests';

export default class Departments extends React.Component {
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

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleSupervisorIdChange = (event) => {
        this.setState({ supervisorId: event.target.value });
    }

    handleSubmit = (event) => {

        const newDepartment = {
            name: this.state.name,
            supervisorId: this.state.supervisorId,
        };

        console.error('newDepartment: ', newDepartment);

        departmentRequests.postRequest(newDepartment);

        this.setState(state => {
            return {
                name: '',
                supervisorId: 0,
                departments: [...state.departments, newDepartment],
            };
        });
        event.preventDefault();
    }

    handleDelete = (event) => {
        const result = departmentRequests.deleteRequest(event.target.dataset.id);

        result.then(() => {
            const index = this.state.departments.findIndex(dpt => dpt.id === event.target.dataset.id);

            const newDepartments = this.state.departments.splice(index, 1);

            this.setState({ departments: newDepartments });

        }).catch(console.error.bind());
        event.persist();
    }

    render() {
        // Make DOM nodes for departments data
        const dptElements = this.state.departments.map(dpt => {
            return (
                <div key={dpt.id} className='well well-sm'>
                    <h4>{dpt.name}</h4>
                    <h5>SupervisorId: {dpt.supervisorId}</h5>
                    <button className="btn btn-danger" type="submit" data-id={dpt.id} onClick={this.handleDelete}>Delete</button>
                </div>
            );
        }).reverse();

        return (
            <div className='Departments container-fluid'>
                <div>
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

                {/* the departments output*/}
                    <div className='col-sm-12 department-page'>
                        {dptElements}
                    </div>
                </div>
            </div>
        );
    };
}
