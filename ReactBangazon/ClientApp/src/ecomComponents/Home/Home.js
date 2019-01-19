import React from 'react';

import Nav from '../Navbar/Navbar';
import Categories from '../Categories/Categories';
import ProductCards from '../ProductCard/ProductCard';

class Home extends React.Component {

    render() {
        return (
            <div className='Home'>
                <div className="col-xs-12">
                    <Nav />
                </div>
                <div className="row">
                    <div className="col-xs-2">
                        <Categories />
                    </div>
                    <div className="col-xs-8 col-xs-offset-1">
                        <h1>Latest Products</h1>
                        <ProductCards />
                    </div>
                </div>
            </div>
        );
    };
}

export default Home;
