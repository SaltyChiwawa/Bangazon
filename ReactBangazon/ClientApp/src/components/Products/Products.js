import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import productsRequests from '../../APICalls/ProductsRequests';

const defaultProd = {
    productTypeId: '',
    price: '',
    title: '',
    description: '',
    quantity: '',
    customerId: ''
}   

class Products extends React.Component {
    state = {
        products: [],
        newProd: defaultProd,
        isClicked: false,
        isClicked2: false,
    };

    componentDidMount = (e) => {
        this.getAllProducts();
    } 

    //--------------------------------Api Calls -------------------//

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

    addProduct = (e) => {
        e.preventDefault();
        const { newProd } = this.state;
        productsRequests
            .addProduct(newProd)
            .then(() => {
                this.props.history.push('/products');
                this.setState({ isClicked: false });
                this.getAllProducts();
            })
            .catch((err) => {
                console.error('Error in adding a new product', err);
            })
    }

    deleteProduct = (e) => {
        const id = e.target.dataset.id;
        productsRequests
            .deleteProduct(id)
            .then(() => {
                this.getAllProducts();
            })
            .catch((err) => {
                console.error('something went wrong in the delete products', err);
            })
    }

    editProduct = (e) => {
        e.preventDefault();
        const { newProd, prodId } = this.state;
        productsRequests
            .updateProduct(newProd, prodId)
            .then(() => {
                this.props.history.push('/computers');
                this.setState({ isClicked2: false });
                this.getAllProducts();
            })
            .catch((err) => {
                console.error('error in the update products request', err);
            })
    }

    //----------------------------------Modal Handlers---------------------//

    addProductModal = (e) => {
        this.setState({ isClicked: true });
    }

    editProductModal = (e) => {
        this.setState({isClicked2: true , prodId: e.target.dataset.productid})
    }

    closeModal = (e) => {
        this.setState({ isClicked: false });
    }

    closeEditModal = (e) => {
        this.setState({ isClicked2: false });
    }

    //------------------------------- Input value handlers -------------------//
    addProductEvent = (info, e) => {
        const tempProd = { ...this.state.newProd };
        tempProd[info] = e.target.value;
        this.setState({ newProd: tempProd });
    }

    editProduct = (info, e) => {
        const tempProd = { ...this.state.newProd };
        tempProd[info] = e.target.value;
        this.setState({ newProd: tempProd });
    }

    prodTypeIdChange = (e) => {
        this.addProductEvent('productTypeId', e);
    }

    titleChange = (e) => {
        this.addProductEvent('title', e);
    }

    descriptionChange = (e) => {
        this.addProductEvent('description', e);
    }

    quantityChange = (e) => {
        this.addProductEvent('quantity', e);
    }

    customerIdChange = (e) => {
        this.addProductEvent('customerId', e);
    }

    priceChange = (e) => {
        this.addProductEvent('price', e);
    }




    render() {
        const newProd = this.state.newProd;

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
                            <button type="submit" className="col-sm-2 btn btn-md btn-primary" id="editProductButt" onClick={this.editProductModal} data-productid={prod.id}> Edit </button>
                            <button type="submit" className="col-md-offset-3 col-sm-2 btn btn-md btn-danger" id="deleteProductButt" onClick={this.deleteProduct} data-id={prod.id}> Delete </button>
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
                                    value={newProd.productTypeId}
                                    onChange={this.prodTypeIdChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Title </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addProdTitle"
                                    placeholder="ex. Dishwasher Necklace"
                                    value={newProd.title}
                                    onChange={this.titleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Description </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addProdDesc"
                                    placeholder="ex. Wash dishes on the go, WEARever you go"
                                value={newProd.description}
                                onChange={this.descriptionChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Quantity </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addProdQuantity"
                                    placeholder="ex. 5"
                                    value={newProd.qauntity}
                                    onChange={this.quantityChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Customer Id </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addCustomerId"
                                    placeholder="ex. 5"
                                value={newProd.customerId}
                                onChange={this.customerIdChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Price </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addPrice"
                                    placeholder="ex. fo' fiddy"
                                    value={newProd.price}
                                    onChange={this.priceChange}
                                />
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>

                        <Button bsStyle="primary" onClick={this.addProduct}>Save changes</Button>

                    </Modal.Footer>
                </Modal>


                <Modal show={this.state.isClicked2} onHide={this.closeEditModal}>
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
                                    value={newProd.productTypeId}
                                    onChange={this.prodTypeIdChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Title </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addProdTitle"
                                    placeholder="ex. Dishwasher Necklace"
                                    value={newProd.title}
                                    onChange={this.titleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Description </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addProdDesc"
                                    placeholder="ex. Wash dishes on the go, WEARever you go"
                                    value={newProd.description}
                                    onChange={this.descriptionChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Quantity </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addProdQuantity"
                                    placeholder="ex. 5"
                                    value={newProd.qauntity}
                                    onChange={this.quantityChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Customer Id </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addCustomerId"
                                    placeholder="ex. 5"
                                    value={newProd.customerId}
                                    onChange={this.customerIdChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputName2">Price </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addPrice"
                                    placeholder="ex. fo' fiddy"
                                    value={newProd.price}
                                    onChange={this.priceChange}
                                />
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeEditModal}>Close</Button>

                        <Button bsStyle="primary" onClick={this.editProduct}>Save changes</Button>

                    </Modal.Footer>
                </Modal>

                <button type="button" className="btn btn-info" onClick={this.addProductModal}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
            </div>            
        );
    };
};

export default Products;