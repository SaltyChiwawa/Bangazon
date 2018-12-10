import React from 'react';



class NewPaymentType extends React.Component {

    state = {
    name: ''
}

    //formFieldStringState = (name, e) => {
    //    const tempPaymentType = { ...this.state.newPaymentType }
    //    tempPaymentType[name] = e.target.value;
    //    this.setState({ newPaymentType: tempPaymentType })
    //}

    

    nameChange = e => {
        this.setState({name: e.target.value})
    }

    formSubmit= e => {
        const { onPost } = this.props
        console.error(this);
        const  newPaymentType  = this.state;
        e.preventDefault();
        onPost(newPaymentType)
            .then((result) => {
                if (result !== undefined) {
                    this.setState({name: ''})
                }
        })
    }



    render() {

        const { name } = this.state;

        return (
            < div className="AddNewPaymentType" >
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


        )
    }
}

export default NewPaymentType;