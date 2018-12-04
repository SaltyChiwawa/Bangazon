import React from 'react';
import { Link } from 'react-router-dom';
import computersRequests from '../../APICalls/ComputersRequests';

class Computers extends React.Component {
    state = {
        computers: [],
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
                        <button type="button" class="btn btn-info"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                    </div>
                </div>
            </div>
        );
    };
};

export default Computers;
