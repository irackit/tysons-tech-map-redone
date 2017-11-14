import React, { Component } from 'react';

// TODO: Change button font-size: 16px; font-weight: bold; font-family: Georgia (Maybe not font-family, not sure yet)
// Look at _button.scss and _button-group.scss in node_modules

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-container">
                <h1 className="form-header">Forgot Password</h1>
                <p className="form-info">Your password will be mailed to brianalbin3@gmail.com after you complete the following security question.</p>
                <form>
                    <fieldset>
                        <div className="legend-container">
                            <legend>What Is Your First Name?</legend>
                        </div>
                        <input type="text" name="firstName" placeholder="First Name" required autofocus className="common-txt-input"/>
                    </fieldset>
                    <button type="submit" className="button expanded">Email My Password</button>
                </form>
            </div>
        );
    }
}

export default ForgotPassword;