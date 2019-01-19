import React from 'react';
import { Link } from 'react-router-dom';
import ProductsRequests from '../../APICalls/ProductsRequests';

class Products extends React.Component {
    state = {
        product: [],
        cart: [],
    }
    
    componentDidMount() {
        ProductsRequests
            .getSingleProductsRequest(4)
            .then(product => {
                this.setState({ product });
                console.log(this.state.product);
            })
            .catch(err => {
                console.error(err, 'error getting product');
            });
    }

    render() {
        return (
            <div className='Products'>
                <div class="row">
                    <div class="col-md-6 col-sm-4">
                        <div class="thumbnail">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51Pf7IaiwcL._SY450_.jpg" alt="..."/>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-4">
                        <h3>T Rex Dino Tyrannosaurus Dinosaur</h3>
                        <div><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span></div>
                        <p>Rex is an excitable large, green, plastic Tyrannosaurus rex. Rex suffers from anxiety, an inferiority complex and the concern that he is not scary enough. Although Rex is a toy dinosaur, he dislikes confrontation and is sensitive in nature. He is among the largest of Andy's toys, and is often depicted as the heaviest.</p>
                    </div>
                    <div class="col-md-3 col-sm-4 cart">
                        <h3>$17.99</h3>
                        <p>Free Shipping</p>
                        <p>In Stock</p>
                        <h4>Sold by Disney</h4>
                        <a href="#" class="btn btn-default" role="button"><span className="glyphicon glyphicon-shopping-cart"></span> Add to Cart</a>
                    </div>
                </div>
            </div>
        );
    };
}

export default Products;
