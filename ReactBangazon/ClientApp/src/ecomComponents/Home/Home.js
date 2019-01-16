import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div className='Home'>
                <h1> home </h1>
                <Link to='/Nav'>Nav</Link>
            </div>
        );
    };
}

export default Home;
