import React from 'react';
import { Link } from 'react-router-dom';
import getPaymentTypesRequest from '../../APICalls/PaymentType';
import PaymentType from '../../APICalls/PaymentType';
import NewPaymentTypes from '../NewPaymentTypes/NewPaymentTypes';
import { Modal, Button } from 'react-bootstrap';



class PaymentTypes extends React.Component {
    state = {
        paymentTypes: [],
        editName: '',
        isClicked: false,
        show: false,

    }


    // using returning axios call continue using .then 
    getAllPaymentTypes = () => {
      return  getPaymentTypesRequest.getAllPaymentTypes()
            .then((paymentTypes) => {
                this.setState({ paymentTypes });
                return paymentTypes
            })
            .catch((err) => {
                console.error('Error getting PaymentTypes: ', err);
            });
    }

    deletePaymentTypes = (id) => {
        getPaymentTypesRequest.deletePaymentType(id)
            .then(() => {
                this.getAllPaymentTypes();
            })
            .catch((err) => {
                console.error('error with delete request', err);
            });
    };

    postPaymentTypes = (newPaymentType) => {
       return getPaymentTypesRequest.postNewPaymentType(newPaymentType)
            .then(() => {
               return this.getAllPaymentTypes();
            })
            .catch((err) => {
                console.error('error with posting new payment type', err);
            });
    }

    updatePaymentTypes = (id, updatedPaymentType) => {
       return  getPaymentTypesRequest.updatePaymentType(id, updatedPaymentType)
            .then(() => {
               return this.getAllPaymentTypes();
            })
            .catch((err) => {
                console.error('error with update request', err);
            });
    };

    showform = (e) => {
        this.setState({ isClicked : true });
    }

    paymentTypeChange = (e) => {
        const tempPaymentType = { ...this.state.paymentTypes }
        tempPaymentType.name = e.target.value;
        this.setState({paymentTypes: tempPaymentType})
    }

    openModal = (e) => {
        
        this.setState({ show: true, editName: paymentTypeName})
    }

    closeModal = () => {
        this.setState({ show: false, editName: ''})
    }
  

    render() {
       
        const paymentLineItem = this.state.paymentTypes.map((paymnetType) => {
            return (

                <div className="panel panel-primary" key={paymnetType.id}>
                    <p>{paymnetType.id}</p>
                    <p>{paymnetType.name}</p>
                    <button type="submit" className="btn btn-warning" onClick={this.openModal}>Edit</button> {" "}
                    <button type="button" className="btn btn-danger" onClick={() => this.deletePaymentTypes(paymnetType.id)}>Delete</button>
                 
              </div>
             );
        });

        const {details} = this.props
        return (
           
        <div className='PaymentTypes'>
            <div>
                <p><Link to='/' className='btn btn-lg btn-success'>Back to Home</Link></p>
                <button type="button" className="btn btn-primary" onClick={this.getAllPaymentTypes}>PaymentTypes</button>
                <button type="button" className="btn btn-primary" onClick={this.showform}>Add New Payment</button>
                {this.state.isClicked ?
                    <NewPaymentTypes
                        onPost={this.postPaymentTypes} /> :
                    ''}
                {paymentLineItem}
           </div>
            <Modal show={this.state.show} onHide={this.closeModal}>
                <Modal.Header>
                    <Modal.Title>Update PaymentType</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input placeholder="Payment Type Name" />
                    {" "}
                    <input placeholder="Customer Id"
                            value={details}
                        onChange={this.paymentTypeChange}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.closeModal}>Close</Button>
                    <Button bsStyle="primary" onClick={this.updatePaymentTypes}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>       
    );
    };
}

export default PaymentTypes;
