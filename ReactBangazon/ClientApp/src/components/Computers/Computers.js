import React from 'react';
import { Link } from 'react-router-dom';
import computersRequests from '../../APICalls/ComputersRequests';

class Computers extends React.Component {
    state = {
        computers: [],
    };

    getComputersRequest = (e) => {
        computersRequests
            .getAllComputersRequest()
            .then((comps) => {
                this.setState({ computers: comps })
            })
            .catch((err) => {
                console.error(err);
            });
    };


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
                <div className="form-group">
                    <div className="col-md-offset-3 col-sm-10">
                        <button type="submit" className="getAllComputers btn btn-md btn-warning" onClick={this.getComputersRequest}>See All Computers</button>
                        <div>
                            {compData}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Computers;
