import React from 'react';

import ProductTypesRequests from '../../APICalls/ProductTypesRequests';

class Categories extends React.Component {
    state = {
        categories: [],
        selectedId: '',
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

     // Set state to ID of selected Category
    selectCategory = (event) => {
        this.setState({ selectedId: event.target.dataset.key });
    }

    render() {
        const categoriesList = this.state.categories.map(cat => {

            if (cat.id * 1 === this.state.selectedId * 1) {
                return (
                    <li className='list-group-item disabled' key={cat.id} data-key={cat.id} onClick={this.selectCategory}>{cat.category}</li>
                    );
            }

            return (
                <li className='list-group-item' key={cat.id} data-key={cat.id} onClick={this.selectCategory}>{cat.category}</li>
                );
        });

        return (

            <div className="Categories col-sm-8">

                <h1>Categories</h1>

                <ul className='list-group'>
                    {categoriesList}
                </ul>

            </div>
        );
    }
}
export default Categories;
