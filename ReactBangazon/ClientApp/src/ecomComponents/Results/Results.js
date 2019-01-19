import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Navbar/Navbar'

class Results extends React.Component {
    render() {
        return (
            <div className='Results'>
              <h1>Results Page</h1>
              <div className="col-xs-12">
                <Nav />
              </div>
            </div>
        );
    };
}

export default Results;
