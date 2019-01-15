import React from 'react';


class CustomerList extends React.Component {
    render() {
        return (
            <div>
                <h2>CustomerList</h2>
                {JSON.stringify(this.props.customers)}
            </div>
        );
    }
}

export default CustomerList;
