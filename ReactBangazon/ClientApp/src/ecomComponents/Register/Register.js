import React from 'react';
import { Link } from 'react-router-dom';

import authRequests from '../../firebaseRequests/auth';

class Register extends React.Component {
    state = {
        user: {
            email: '',
            password: '',
        },
        error: {
            message: '',
            classText: 'alert alert-danger hidden',
        },
    };

    // Register Event

    registerClickEvent = e => {
        const { user } = this.state;
        e.preventDefault();
        authRequests
            .registerUser(user)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(error => {
                const tempError = {
                    message: error.message,
                    classText: 'alert alert-danger show',
                };
                this.setState({ error: tempError });
            });
    };

    // Lifting State for Form

    emailChange = e => {
        const tempUser = { ...this.state.user };
        tempUser.email = e.target.value;
        this.setState({ user: tempUser });
    };

    passwordChange = e => {
        const tempUser = { ...this.state.user };
        tempUser.password = e.target.value;
        this.setState({ user: tempUser });
    };

    render() {
        const { user } = this.state;
        return (
            <div className="Register">
                <div id="login-form">

                    <h1 className="text-center">Register</h1>

                    {/* Error Message Alert */}
                    <div className={this.state.error.classText} role="alert">{this.state.error.message}</div>

                    {/* Form */}
                    <form className="form-horizontal col-sm-6 col-sm-offset-3">

                        {/* Email Input Group */}
                        <div className="form-group">
                            <label htmlFor="inputEmail" className="col-sm-4 control-label">
                                Email:
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder="Email"
                                    value={user.email}
                                    onChange={this.emailChange}
                                />
                            </div>
                        </div>

                        {/* Password Input Group */}
                        <div className="form-group">
                            <label htmlFor="inputPassword" className="col-sm-4 control-label">
                                Password:
                            </label>
                            <div className="col-sm-8">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder="Password"
                                    value={user.password}
                                    onChange={this.passwordChange}
                                />
                            </div>
                        </div>

                        {/* Login Button */}
                        <div className="form-group">
                            <div className="col-sm-12 text-center">
                                <Link to="/login">Need to Login?</Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-group">
                            <div className="col-sm-12">
                                <button
                                    type="submit"
                                    className="btn btn-default col-xs-12"
                                    onClick={this.registerClickEvent}
                                >
                                    Register
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        );
    }
}
export default Register;
