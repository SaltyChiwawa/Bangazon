import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import computersRequests from '../../APICalls/ComputersRequests';

class Computers extends React.Component {
    state = {
        computers: [],
        isClicked: false,
    };

    componentDidMount = (e) => {
        computersRequests
            .getAllComputersRequest()
            .then((comps) => {
                this.setState({ computers: comps })
            })
            .catch((err) => {
                console.error(err);
            });
    };

    addComputerModal = (e) => {
        this.setState({ isClicked: true });
    }

    closeModal = (e) => {
        this.setState({ isClicked: false });
    }


    render() {

        const compData = this.state.computers.map(comps => {
            return (
                <div key={comps.id} className="panel panel-default" >
                    <div className="panel-heading">
                        <h3 className="panel-title">{comps.id}</h3>
                    </div>
                    <div className="panel-body">
                        <p>Employee Id {comps.employeeId}</p>
                        <div className="col-md-offset-3">
                            <button type="submit" className="col-sm-2 btn btn-md btn-primary" id="editComputerButt"> Edit </button>
                            <button type="submit" className="col-md-offset-3 col-sm-2 btn btn-md btn-danger" id="deleteComputerButt"> Delete </button>
                        </div>
                    </div>
                </div >
            );
        });

        return (
            <div className='Computers'>
                <div>
                    <p><Link to='/' className='btn btn-lg btn-success'>Back to Home</Link></p>
                </div>
                <div>
                    {compData}
                    <div>
                        <button type="button" className="btn btn-info" onClick={this.addComputerModal}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                    </div>

                    <Modal show={this.state.isClicked} onHide={this.closeModal}>
                        <Modal.Header>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>One fine body...</Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.closeModal}>Close</Button>
                            <Button bsStyle="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal>


                </div>
            </div>
        );
    };
};

export default Computers;
