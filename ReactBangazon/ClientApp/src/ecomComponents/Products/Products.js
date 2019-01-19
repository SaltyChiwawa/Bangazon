import React from 'react';
// import { Link } from 'react-router-dom';

class Products extends React.Component {
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
                    <div class="col-md-3 col-sm-4">
                        <p></p>
                        <a href="#" class="btn btn-default" role="button"><span className="glyphicon glyphicon-shopping-cart"></span> Add to Cart</a>
                    </div>
                </div>
            </div>
        );
    };
}

export default Products;
