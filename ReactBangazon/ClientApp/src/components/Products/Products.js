import React from 'react';
import { Link } from 'react-router-dom';
import productsRequests from '../../APICalls/ProductsRequests';

class Products extends React.Component {
    state = {
        products: [],
    };

    getProductsRequest = (e) => {
        productsRequests
            .getAllProductsRequest()
            .then((prod) => {
                this.setState({ products: prod })
            })
            .catch((err) => {
                console.error('error in getProductsRequest', err);
            });
    };


    render() {

        const productData = this.state.products.map(prod => {
            return (
                <div key={prod.id} className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">{prod.title}</h3>
                    </div>
                    <div className="panel-body">
                        <ul>
                            <li> Description: {prod.description}</li>
                            <li> Price: {prod.price} </li>
                            <li> Quantity: {prod.quantity} </li>
                        </ul>
                        <div className="col-md-offset-3">
                            <button type="submit" className="col-sm-2 btn btn-md btn-primary" id="editProductButt"> Edit </button>
                            <button type="submit" className="col-md-offset-3 col-sm-2 btn btn-md btn-danger" id="deleteProductButt"> Delete </button>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className='Products'>
                <div>
                    <p><Link to='/' className='btn btn-lg btn-success'>Back to Home</Link></p>
                </div>
                <div className="form-group">
                    <div className="col-md-offset-3 col-sm-10">
                        <button type="submit" className="getAllProducts btn btn-md btn-warning" onClick={this.getProductsRequest}>See All Products</button>
                        <div>
                            {productData}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Products;