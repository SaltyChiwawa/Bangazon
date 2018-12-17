import React from 'react';


class NewPaymentType extends React.Component {

    state = {
        name: '',
        show: false,
    }

    nameChange = e => {
        this.setState({ name: e.target.value });
    }

    showModal = (e) => {
        this.setState({ show: true });
    }

    closeModal = () => {
        this.setState({ show: false });
    }

    formSubmit= e => {
        const { onPost } = this.props;
        console.error(this);
        const  newPaymentType  = this.state;
        e.preventDefault();
        onPost(newPaymentType)
            .then((result) => {
                if (result !== undefined) {
                    this.setState({ name: '' });
                }
            });
    }

    render() {
        const { name } = this.state;
      //  const postPaymentType = ()  => this.props.onClick;
        return (
            <div className="AddNewPaymentType" >
                <button type="button" className="btn btn-primary" onClick={this.showModal}>Add New Payment</button>
                <h2>Add New Activity</h2>
                <form onSubmit={this.formSubmit}>
                    <div className="col-md-6 col-md-offset-3">
                        <div className="row">
                            <fieldSet className="form">
                                <label htmlFor="Name">Name:</label>
                                <input className="col-xs-12"
                                    type="text"
                                    id="name"
                                    placeholder="PaymentType Name"
                                    value={name}
                                    onChange={this.nameChange}
                                />
                            </fieldSet>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-warning" >Submit</button>
                </form>
            </div >
        );
    }
}

export default NewPaymentType;
