import React from 'react';
import { Link } from 'react-router-dom';
import ProductTypesRequests from '../../APICalls/ProductTypesRequests';

export default class OrderLines extends React.Component {
    state = {
        productTypes: [], // array of items that get displayed on render
    };

    // Set state for items
    getProductTypes = (e) => {
        ProductTypesRequests
            .getRequest()
            .then((result) => {
                this.setState({ productTypes: result });
            })
            .catch(console.error.bind(console));
    };

    render() {
        // Make DOM nodes for item data from state
        const dataElements = this.state.productTypes.map(item => {
            return (
                <div key={item.id} className='well well-sm'>
                    <h4>{item.category}</h4>
                    <h5>Id: {item.id}</h5>
                </div>
            );
        }).reverse();
        // ^^^ this is so the new items are at the top of the list

        return (
            <div className='ProductTypes container-fluid'>
                <div className='row'>

                    {/* back to home button */}
                    <p><Link to='/' className='btn btn-lg btn-success btn-block'>Back to Home</Link></p>

                    {/* get all items */}
                    <button className='btn btn-lg btn-primary btn-block' onClick={this.getProductTypes}>Get All ProductTypes</button>

                    {/* the data output*/}
                    <div className='col-sm-12'>
                        {dataElements}
                    </div>

                </div>
            </div>
        );
    };
}
