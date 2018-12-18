import React from 'react';
import { Link } from 'react-router-dom';
import TrainingProgramsRequests from '../../APICalls/TrainingProgramsRequests';

export default class TrainingPrograms extends React.Component {
    state = {
        programs: [], // array of items that get displayed on render
    };

    // Set state for items
    getTrainingPrograms = (e) => {
        TrainingProgramsRequests
            .getRequest()
            .then((result) => {
                this.setState({ programs: result });
            })
            .catch(console.error.bind(console));
    };

    render() {
        // Make DOM nodes for item data from state
        const dataElements = this.state.programs.map(item => {
            return (
                <div key={item.id} className='well well-sm'>
                    <h4>Program Id: {item.id}</h4>
                    <h5>Employee Id: {item.employeeId}</h5>
                    <h5>Start Date: {item.startDate}</h5>
                    <h5>End Date: {item.endDate}</h5>
                </div>
            );
        }).reverse();
        // ^^^ this is so the new items are at the top of the list

        return (
            <div className='TrainingPrograms container-fluid'>
                <div className='row'>

                    {/* back to home button */}
                    <p><Link to='/' className='btn btn-lg btn-success btn-block'>Back to Home</Link></p>

                    {/* get all items */}
                    <button className='btn btn-lg btn-primary btn-block' onClick={this.getTrainingPrograms}>Get All Training Programs</button>

                    {/* the data output*/}
                    <div className='col-sm-12'>
                        {dataElements}
                    </div>

                </div>
            </div>
        );
    };
}
