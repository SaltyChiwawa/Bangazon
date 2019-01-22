import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../Navbar/Navbar';

class Results extends React.Component {
    render() {
        const productData = this.props.products.map(prod => {
            return (
                < div key={prod.id} className="Pcards" >
                    <Link to={`/Product/${prod.id}`}>
                        <div className="col-sm-4 btn" >
                            <div className="thumbnail"  >
                                <img src="data:image/webp;base64,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" alt="..." />
                                <div className="caption">
                                    <h3>{prod.title}</h3>
                                    <p>By: {prod.firstName} {prod.lastName}</p>
                                    <p>{prod.price}</p>
                                    <span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span><span className="glyphicon glyphicon-star-empty"></span>
                                </div>
                            </div>

                        </div>
                    </Link>
                </div>
            );
        });

        return (
            <div className='Results'>
              <h1>Results Page</h1>
              <div className="col-xs-12">
                 <Nav />
                </div>
                {productData}
            </div>
        );
    };
}

export default Results;
