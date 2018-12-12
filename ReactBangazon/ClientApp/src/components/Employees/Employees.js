import React from 'react';
import { Link } from 'react-router-dom';
import employeeRequests from '../../APICalls/EmployeesRequests';

export default class Employees extends React.Component {
    state = {
        employees: [], // array of employees that get displayed on render
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
            <div className='Departments container-fluid'>
                <div className='row'>

                    {/* back to home button */}
                    <p><Link to='/' className='btn btn-lg btn-success btn-block'>Back to Home</Link></p>

                    {/* get all departments */}
                    <button className='btn btn-lg btn-primary btn-block' onClick={this.getEmployees}>Get All Employees</button>

                    {/* the departments output*/}
                    <div className='col-sm-12 department-page'>
                        {employeeElements}
                    </div>

                </div>
            </div>
        );
    };
}
