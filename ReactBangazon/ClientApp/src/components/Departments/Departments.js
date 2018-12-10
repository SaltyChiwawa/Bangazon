import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import departmentRequests from '../../APICalls/DepartmentsRequests';

export default class Departments extends React.Component {
    state = {
        name: '', // on form to create new department
        supervisorId: '', // on form to create new department
        departments: [], // array of departments that get displayed on render
        showModal: false, // shows the Editting Modal when true
        editName: '', // on Modal form
        editSupervisorId: '', // on Modal form
        editDepartmentId: '', // used when sending Update request
    };

    // Set state for departments
    getDepartments = (e) => {
        departmentRequests
            .getRequest()
            .then((dpts) => {
                this.setState({ departments: dpts });
            })
            .catch(console.error.bind(console));
    };

    // Name form changes
    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    // supervisorId form changes
    handleSupervisorIdChange = (event) => {
        this.setState({ supervisorId: event.target.value });
    }

    // form submitting
    handleSubmit = (event) => {

        // create newDepartment from state
        const newDepartment = {
            name: this.state.name,
            supervisorId: this.state.supervisorId * 1,
        };

        // send async post request and update page
        departmentRequests.postRequest(newDepartment).then(() => {
            this.getDepartments();
            this.setState({
                name: '',
                supervisorId: '',
            });
        });

        // prevent the form from refreshing the page
        event.preventDefault();
    }

    // delete Department
     handleDelete = (event) => {

        // get result of async delete function
        const result = departmentRequests.deleteRequest(event.target.dataset.id * 1);

        result.then(() => {
            this.getDepartments();
        }).catch(console.error.bind());
    };

    // update department
    updateDepartment = () => {

        // make new Department
        const newDepartment = {
            id: this.state.editDepartmentId * 1,
            name: this.state.editName,
            supervisorId: this.state.editSupervisorId * 1,
        };

        const result = departmentRequests.putRequest(newDepartment, this.state.editDepartmentId * 1);

        // once data is back close modal and show the departments
        result.then(() => {
            this.closeModal();
            this.getDepartments();
        }).catch(console.error.bind(console));
    }

    // Modal handlers
    openModal = (event) => {
        const departmentName = event.target.dataset.departmentname;
        const departmentSupervisorId = event.target.dataset.supervisorid;
        const departmentId = event.target.dataset.id;

        // update state that Modal reads from and show modal
        this.setState({
            showModal: true,
            editName: departmentName,
            editSupervisorId: departmentSupervisorId * 1,
            editDepartmentId: departmentId * 1,
        });
    }

    // close modal and clear edit state
    closeModal = () => {
        this.setState({
            showModal: false,
            editName: '',
            editSupervisorId: '',
            editDepartmentId: '',
        });
    }

    // live update state when user is typing
    modalNameChange = (event) => {
        this.setState({ editName: event.target.value });
    }

    // live update state when user is typing
    modalSupervisorIdChange = (event) => {
        this.setState({ editSupervisorId: event.target.value });
    }

    render() {
        // Make DOM nodes for departments data from state
        const dptElements = this.state.departments.map(dpt => {
            return (
                <div key={dpt.id} className='well well-sm'>
                    <h4>{dpt.name}</h4>
                    <h5>SupervisorId: {dpt.supervisorId}</h5>

                    {/* delete button */}
                        <button className="btn btn-danger" type="submit" data-id={dpt.id} onClick={this.handleDelete}>Delete</button>

                    {/* edit button */}
                    <button className="btn btn-warning" type="submit" data-id={dpt.id} data-supervisorid={dpt.supervisorId} data-departmentname={dpt.name} onClick={this.openModal}>Edit</button>

                </div>
            );
        }).reverse();
        // ^^^ this is so the new departments are at the top of the list

        return (
            <div className='Departments container-fluid'>
                <div className='row'>

                {/* back to home button */}
                    <p><Link to='/' className='btn btn-lg btn-success btn-block'>Back to Home</Link></p>

                {/* get all departments */}
                    <button className='btn btn-lg btn-primary btn-block' onClick={this.getDepartments}>Get All Departments</button>

                {/* new department form from bootstrap */}
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="dptName" className="col-sm-2 control-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="dptName" placeholder="Name of Department" value={this.state.name/* this is so the name changes with the state */} onChange={this.handleNameChange/* handler function when typing name */} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="supervisorId" className="col-sm-2 control-label">Supervisor Id</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" id="supervisorId" placeholder="Supervisor Id" value={this.state.supervisorId} onChange={this.handleSupervisorIdChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-default">Create Department</button>
                            </div>
                        </div>
                    </form>

                {/* the departments output*/}
                    <div className='col-sm-12 department-page'>
                        {dptElements}
                    </div>
                </div>

                {/* Modal for editing */}
                <Modal show={this.state.showModal} onHide={this.closeModal}>

                    <Modal.Header>
                        <Modal.Title>Edit Department</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form className="form-inline">
                            <div className="form-group">
                                <label htmlFor="editDepartmentName">Department Name</label>
                                <input type="text" className="form-control" id='editDepartmentName' value={this.state.editName} onChange={this.modalNameChange}></input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="editSupervisorId">Supervisor Id</label>
                                <input type="number" className="form-control" id='editSupervisorId' value={this.state.editSupervisorId} onChange={this.modalSupervisorIdChange}></input>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>
                        <Button bsStyle="primary" onClick={this.updateDepartment}>Save changes</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        );
    };
}
