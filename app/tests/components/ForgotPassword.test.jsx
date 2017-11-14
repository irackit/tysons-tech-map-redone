var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

import ForgotPassword from 'ForgotPassword';

describe('ForgotPassword', () => {
	it('should exist', () => {
		expect(ForgotPassword).toExist();
	});
});