import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div className='Home'>
                <Link to='/Nav'>nav bear rawr</Link>
                <h1> home</h1>
            </div>
        );
    };
}

export default Home;
