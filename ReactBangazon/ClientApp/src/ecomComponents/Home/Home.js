import React from 'react';

import Categories from '../Categories/Categories';

class Home extends React.Component {
    render() {
        return (
            <div className='Home'>
                <h1> home </h1>
                <Categories />
            </div>
        );
    };
}

export default Home;
