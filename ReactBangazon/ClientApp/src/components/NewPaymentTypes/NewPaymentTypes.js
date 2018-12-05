import React from 'react';

const defaultPaymentType = {
    name: '',
}

class NewPaymentType extends React.Component {
    state = {
        newPaymentType: defaultPaymentType
    }


    formFieldStringState = (name, e) => {
        const tempPaymentType = { ...this.state.newPayementType }
        tempPaymentType[name] = e.target.value;
        this.setState({ newPayementType: tempPaymentType })
    }

    nameChange = e => {
        this.formFieldStringState('name', e);
    }

    formSumbit = e => {
        const { newPayementType } = this.state;
        this.setState({ newPayementType });
        e.preventDefault();
    }

    render() {

        const { newPaymentType } = this.state;

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
                                    placeholder="Activity Name"
                                    value={newPaymentType.name}
                                    onChange={this.nameChange}
                                />
                            </fieldSet>
                        </div>
                    </div>
                    <button type="button" className="btn btn-warning" >Submit</button> 
                </form>

            </div >


        )
    }
}

export default NewPaymentType;