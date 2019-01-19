﻿import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Navbar/Navbar';
import Categories from '../Categories/Categories';

class Home extends React.Component {
    render() {
        return (
            <div className='Home'>
                <div className="col-xs-12">
                    <Nav />
                </div>
                <div className="col-xs-4">
                    <Categories />
                </div>
            </div>
        );
    };
}

export default Home;
