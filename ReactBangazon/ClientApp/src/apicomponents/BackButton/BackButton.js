import React from 'react';
import { Link } from 'react-router-dom';

class BackButton extends React.Component {
    render() {
        return (
            <div className='BackButton'>
                <p><Link to='/' className='btn btn-lg btn-success'>Back to Home</Link></p>
            </div>
        );
    };
}

export default BackButton;
