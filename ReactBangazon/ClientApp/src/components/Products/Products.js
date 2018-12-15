import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import productsRequests from '../../APICalls/ProductsRequests';

class Products extends React.Component {
    state = {
        products: [],
        isClicked: false,
    };

    componentDidMount = (e) => {
        this.getAllProducts();
    } 

    getAllProducts = () => {
        productsRequests
            .getAllProductsRequest()
            .then((prod) => {
                this.setState({ products: prod })
            })
            .catch((err) => {
                console.error('error in getProductsRequest', err);
            });
    };

    //----------------------------------Modal Handlers---------------------//

    addProductModal = (e) => {
        this.setState({ isClicked: true });
    }

    closeModal = (e) => {
        this.setState({ isClicked: false });
    }


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
                    {productData}
                </div>

                <Modal show={this.state.isClicked} onHide={this.closeModal}>
                    <Modal.Header>
                        <Modal.Title>Add a New Product</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form className="form-inline-block">
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Product Type Id </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addProdTypeId"
                                    placeholder="ex. 1"
                                    //value={}
                                    //onChange={}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Title </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addProdTitle"
                                    placeholder="ex. Dishwasher Necklace"
                                    //value={}
                                    //onChange={}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Description </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addProdDesc"
                                    placeholder="ex. Wash dishes on the go, WEARever you go"
                                //value={}
                                //onChange={}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Quantity </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addProdQuantity"
                                    placeholder="ex. 5"
                                //value={}
                                //onChange={}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Customer Id </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addCustomerId"
                                    placeholder="ex. 5"
                                //value={}
                                //onChange={}
                                />
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>

                        <Button bsStyle="primary" onClick={this.addProduct}>Save changes</Button>

                    </Modal.Footer>
                </Modal>

                <button type="button" className="btn btn-info" onClick={this.addProductModal}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
            </div>            
        );
    };
};

export default Products;