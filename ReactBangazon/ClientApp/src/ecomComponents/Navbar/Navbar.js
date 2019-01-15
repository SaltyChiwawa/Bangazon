import React from 'react';
import { Navbar, Button, FormGroup, FormControl } from 'react-bootstrap';

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
                            <a href="#home"><img src="../../Images/bangazon_logo.png" alt="Bangazon Logo"></img></a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Navbar.Form pullLeft>
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
                </Navbar>;
            </div>
        );
    };
}

export default Nav;
