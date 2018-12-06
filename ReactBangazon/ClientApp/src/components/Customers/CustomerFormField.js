import React from 'react';

class Field extends React.Component {
    handleChange = ({ target: { value } }) =>
        this.props.onChange({ [this.props.field]: value })

    render() {
        const { label, type } = this.props
        const value = this.props.value || ''

        return (
            <div>
                <span>{label}</span>
                <input type={type} onChange={this.handleChange} value={value} />
            </div>)
    }
}