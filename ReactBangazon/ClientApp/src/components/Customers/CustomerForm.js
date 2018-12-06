import React from 'react';

import Field from '../Customers/CustomerFormField';

class CustomerForm extends React.Component {
    state = { ...this.props.customer }

    handleFieldChange = entry => this.setState(entry)

    onSubmit = e => {
        e.preventDefault()
        this.props.onSubmit(this.state)
    }

    render() {
        const { FirstName, LastName } = this.state

        return (
            <form onSubmit={this.onSubmit}>
                <Field
                    label="First Name"
                    field="FirstName"
                    value={FirstName}
                    type="text"
                    onChange={this.handleFieldChange}
                />
                <Field
                    label="Last Name"
                    field="LastName"
                    value={LastName}
                    type="text"
                    onChange={this.handleFieldChange}
                />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

CustomerForm.defaultProps = {
    customer: {
        FirstName: '',
        LastName: '',
    },
}