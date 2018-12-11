import React from 'react';
import { Link } from 'react-router-dom';
import getPaymentTypesRequest from '../../APICalls/PaymentType';
import PaymentType from '../../APICalls/PaymentType';
import NewPaymentTypes from '../NewPaymentTypes/NewPaymentTypes';
import { Modal, Button } from 'react-bootstrap';


class PaymentTypes extends React.Component {
    state = {
        paymentTypes: [],
        eidtId: '',
        editName: '',
        isClicked: false,
        show: false,

    }
    // using returning axios call continue using .then 
    getAllPaymentTypes = () => {
      return  getPaymentTypesRequest.getAllPaymentTypes()
            .then((paymentTypes) => {
                this.setState({ paymentTypes });
                return paymentTypes;
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

    updatePaymentTypes = () => {
        const newPaymentType = {
            id: this.state.editId * 1,
            name: this.state.editName,
        };
        return getPaymentTypesRequest.updatePaymentType(newPaymentType, this.state.editId * 1)
           .then(() => {
                this.closeModal();
                return this.getAllPaymentTypes();
            })
            .catch((err) => {
                console.error('error with update request', err);
            });
    };

    showform = (e) => {
        this.setState({ isClicked: true });
    }

    paymentTypeChange = (e) => {
        this.setState({ editName: e.target.value });
    }

    paymentTypeIdChange = (e) => {
        this.setState({ editId: e.target.value });
    }

    openModal = (e) => {
        const paymentTypeName = e.target.dataset.name;
        const paymentTypeId = e.target.dataset.id;
        this.setState({ show: true, editName: paymentTypeName, editId: paymentTypeId });
    }

    closeModal = () => {
        this.setState({ show: false, editName: '' , eidtId: ''});
    }

    render() {
        const paymentLineItem = this.state.paymentTypes.map((paymnetType) => {
            return (

                <div className="panel panel-primary" key={paymnetType.id}>
                    <p>{paymnetType.id}</p>
                    <p>{paymnetType.name}</p>
                    <button type="submit" className="btn btn-warning" data-id={paymnetType.id} data-name={paymnetType.name} onClick={this.openModal}>Edit</button> {" "}
                    <button type="button" className="btn btn-danger" onClick={() => this.deletePaymentTypes(paymnetType.id)}>Delete</button>
              </div>
             );
        });
       
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
                    <input placeholder="Id"
                     value={this.state.editId}
                     onChange={this.paymentTypeIdChange}/>
                    {' '}
                    <input placeholder="Payment TypeName"
                     value={this.state.editName}
                     onChange={this.paymentTypeChange}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.closeModal}>Close</Button>
                    <Button bsStyle="primary" onClick={() => this.updatePaymentTypes()}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    };
}

export default PaymentTypes;
