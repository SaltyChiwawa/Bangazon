﻿import React from 'react';
import { Link } from 'react-router-dom';
import employeeRequests from '../../APICalls/EmployeesRequests';

export default class Employees extends React.Component {
    state = {
        employees: [], // array of employees that get displayed on render
        firstName: '',
        lastName: '',
        departmentId: '',
        computerId: '',
    };

    // Set state for employees
    getEmployees = (e) => {
        employeeRequests
            .getRequest()
            .then((result) => {
                this.setState({ employees: result });
            })
            .catch(console.error.bind(console));
    };

    // handle submit form for Posting a new employee
    handleSubmit = (e) => {
        // create new employee object
        const newEmployee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            departmentId: this.state.departmentId * 1,
        };

        // check checkbox to make new computer, if it says to make a new one, make a new one, otherwise, update old one. ======================w WIP HERE!!!!!!!!! ============

        // create a new computer object
        const newComputer = {
            
        }

        // async send newEmployee
        employeeRequests.postRequest(newEmployee).then((res) => {
            this.getEmployees();
            this.setState({
                firstName: '',
                lastName: '',
                departmentId: '',
                computerId: '',
            });
        }).catch(console.error.bind(console));

        // prevent the page from refreshing
        e.preventDefault();
    }

    // live change firstName
    handleFirstNameChange = (e) => {
        this.setState({ firstName: e.target.value });
    }

    // live change lastName
    handleLastNameChange = (e) => {
        this.setState({ lastName: e.target.value });
    }

    // live change departmentId
    handleDepartmentIdChange = (e) => {
        this.setState({ departmentId: e.target.value });
    }

    // live change computerId
    handleComputerIdChange = (e) => {
        this.setState({ computerId: e.target.value });
    }

    render() {
        // Make DOM nodes for employee data from state
        const employeeElements = this.state.employees.map(item => {
            return (
                <div key={item.id} className='well well-sm'>
                    <h4>{item.employeeName}</h4>
                    <h5>DepartmentId: {item.departmentId}</h5>
                    <h5>EmployeeId: {item.employeeId}</h5>
                    <h5>ComputerId: {item.computerId}</h5>
                </div>
            );
        }).reverse();
        // ^^^ this is so the new employees are at the top of the list

        return (
            <div className='Employees container-fluid'>
                <div className='row'>

                    {/* back to home button */}
                    <p><Link to='/' className='btn btn-lg btn-success btn-block'>Back to Home</Link></p>

                    {/* get all departments */}
                    <button className='btn btn-lg btn-primary btn-block' onClick={this.getEmployees}>Get All Employees</button>

                    {/* new employee form from bootstrap */}
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>

                        {/* first name form group */}
                        <div className="form-group">
                            <label htmlFor="firstName" className="col-sm-2 control-label">First Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="firstName" placeholder="Drake" value={this.state.firstName/* this is so the name changes with the state */} onChange={this.handleFirstNameChange/* handler function when typing name */} />
                            </div>
                        </div>

                        {/* last name form group */}
                        <div className="form-group">
                            <label htmlFor="lastName" className="col-sm-2 control-label">Last Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="lastName" placeholder="Morrison" value={this.state.lastName/* this is so the name changes with the state */} onChange={this.handleLastNameChange/* handler function when typing name */} />
                            </div>
                        </div>

                        {/* department ID form group */}
                        <div className="form-group">
                            <label htmlFor="departmentId" className="col-sm-2 control-label">Department Id</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" id="departmentId" placeholder="Department Id" value={this.state.departmentId} onChange={this.handleDepartmentIdChange} />
                            </div>
                        </div>

                        {/* computer ID form group */}
                        <div className="form-group">
                            <label htmlFor="computerId" className="col-sm-2 control-label">Computer Id</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" id="computerId" placeholder="Computer Id" value={this.state.computerId} onChange={this.handleComputerIdChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-default">Create Employee</button>
                            </div>
                        </div>
                    </form>

                    {/* the employees output*/}
                    <div className='col-sm-12'>
                        {employeeElements}
                    </div>

                </div>
            </div>
        );
    };
}
