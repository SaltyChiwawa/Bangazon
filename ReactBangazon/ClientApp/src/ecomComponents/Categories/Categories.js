import React from 'react';

import ProductTypesRequests from '../../APICalls/ProductTypesRequests';

class Categories extends React.Component {
    state = {
        categories: [],
    };

        // Set state for items
    componentDidMount() {
        ProductTypesRequests
            .getRequest()
            .then((result) => {
                this.setState({ categories: result });
            })
            .catch(console.error.bind(console));
    }

    render() {
        const categoriesList = this.state.categories.map(cat => {
            return (
                <li className='list-group-item'>{cat.category}</li>
                );
        });

        return (

            <div className="Categories">

                <h1>Categories</h1>

                <ul className='list-group'>
                    {categoriesList}
                </ul>

            </div>
        );
    }
}
export default Categories;
