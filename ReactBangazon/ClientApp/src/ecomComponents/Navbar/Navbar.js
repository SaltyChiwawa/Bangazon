import React from 'react';
import logo from '../../Images/bangazon_logo.png';
import './Navbar.css';
import { Navbar, Button, FormGroup, FormControl} from 'react-bootstrap';

class Nav extends React.Component {
    state = {
        value: '',
    };

     handleChange(e) {
        this.setState({ value: e.target.value });
    }
    render() {
        return (
            <div className='Navbar'>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a class="navbar-brand" href="#home"><img src={logo} responsive id="nav-logo" alt="Bangazon Logo" /></a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Navbar.Form id="nav-form">
                        <FormGroup>
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="Search"
                                onChange={this.handleChange}
                            />
                        </FormGroup>{' '}
                        <Button
                            type="submit"
                        >Submit</Button>
                    </Navbar.Form>
                </Navbar>
            </div>
        );
    };
}

export default Nav;
