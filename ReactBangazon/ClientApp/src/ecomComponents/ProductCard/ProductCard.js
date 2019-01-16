import React from 'react';
//import { Link } from 'react-router-dom';
import productsRequests from '../../APICalls/ProductsRequests';

const defaultProd = {
    productTypeId: '',
    price: '',
    title: '',
    description: '',
    quantity: '',
    customerId: '',
    ActiveOrder: '',
    FirstName: '',
    LastName: '',
}

class ProductCard extends React.Component {
    state = {
        products: [],
        newProd: defaultProd,
        isClicked: false,
        isClicked2: false,
    };

    componentDidMount = (e) => {
        this.getAllProducts();
    }

    // -------------------------API CALLS -------------------//

    getAllProducts = () => {
        productsRequests
            .getAllProductsRequest()
            .then((prod) => {
                this.setState({ products: prod })
            })
            .catch((err) => {
                console.error('error in getProductsRequest', err)
            })
    }

    render() {
        const newProd = this.state.newProd;

        const productData = this.state.products.map(prod => {
            return (
                <div key={prod.id} className="panel panel-default">
                    <div className="panel-heading">
                        <img src="data:image/png;base64,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" alt="epicThing" height="50" width="50" />
                    </div>
                    <div className="panel-body">
                        <div>
                            <h3> {prod.title} </h3>
                        </div>
                        <div>
                            By: {prod.FirstName + prod.LastName}
                        </div>
                        <ul>
                            <li> Price: {prod.price} </li>
                            <li> <p>FREE SHIPPING</p> </li>
                        </ul>
                        <div>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className='ProductCard'>
                {productData}
            </div>
        );
    };
}

export default ProductCard;
