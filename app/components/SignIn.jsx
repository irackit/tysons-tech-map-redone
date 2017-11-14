// https://github.com/andrewjmead/react-course-weather-app/blob/master/app/components/WeatherForm.jsx
// http://blog.slatepeak.com/build-a-react-redux-app-with-json-web-token-jwt-authentication

import React, { Component } from 'react';
var {Link, IndexLink} = require('react-router');

// TODO: Change button font-size: 16px; font-weight: bold; font-family: Georgia (Maybe not font-family, not sure yet)
// Look at _button.scss and _button-group.scss in node_modules

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    // TODO: Where is FORGOT style, LINK FOR forgotpassword and SIGNUP
    // DO SIGNUP NEXT

    render() {
        return (
            <div className="form-container">
                <h1 className="form-header">Sign In</h1>
                <form>
                    <fieldset>
                        <div className="legend-container">
                            <legend>Email & Password</legend>
                        </div>
                        <input type="email" name="email" placeholder="Email Address" required autofocus className="common-txt-input"/>
                        <input type="password" name="password" placeholder="Password" required className="common-txt-input"/>
                    </fieldset>
                    <button type="submit" className="button expanded" onSubmit={this.handleSubmit}>Next</button>
                    <div className="forgot">
                        <Link to="/forgotpassword" activeClassName="active-link">Forgot Password?</Link>
                    </div>
                    <div className="forgot">
                        <Link to="/signup" activeClassName="active-link">Don't have an account? Create One!</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;