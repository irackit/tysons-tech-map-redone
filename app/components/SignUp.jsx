import React, { Component } from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-container">
                <h1 className="form-header">Sign Up</h1>
                <form action="/users" method="post">
                    <fieldset>
                        <div className="legend-container">
                            <legend>Email & Password</legend>
                        </div>
                        <input type="email" name="email" placeholder="Email Address" required autofocus className="common-txt-input"/>
                        <input type="password" name="password" placeholder="Password" required className="common-txt-input"/>
                        <input type="password" name="passwordRepeat" placeholder="Retype Password" required className="common-txt-input"/>
                    </fieldset>
                    <fieldset>
                        <div className="legend-container">
                            <legend>Address (Optional)</legend>
                        </div>
                        <input type="text" name="streetNo" placeholder="Street Number" className="common-txt-input"/>
                        <input type="text" name="streetName" placeholder="Street Name" className="common-txt-input"/>
                        <input type="text" name="city" placeholder="City" className="common-txt-input"/>
                        <select name="state" className="common-select">
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Masachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA" selected>Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        <input type="text" name="zip" placeholder="Zip Code" className="common-txt-input"/>
                    </fieldset>
                    <button type="submit" className="button expanded">Done</button>
                </form>
            </div>
        );
    }
}

export default SignUp;