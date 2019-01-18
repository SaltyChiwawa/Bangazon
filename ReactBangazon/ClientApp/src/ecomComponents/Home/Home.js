import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Navbar/Navbar';

class Home extends React.Component {
    render() {
        return (
            <div className='Home'>
                <h1> home </h1>
                <div className="col-xs-12">
                    <Nav />
                </div>
            </div>
        );
    };
}

export default Home;
