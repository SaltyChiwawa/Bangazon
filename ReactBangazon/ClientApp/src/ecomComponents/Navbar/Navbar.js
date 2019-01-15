import React from 'react';
import { Navbar } from 'react-bootstrap';


class Navbar extends React.Component {
    render() {
        return (
            <div className='Navbar'>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home"><img src="../../Images/bangazon_logo.png" alt="Bangazon Logo"></img></a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>;
            </div>
        );
    };
}

export default Navbar;
