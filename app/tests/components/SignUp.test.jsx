var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

import SignUp from 'SignUp';

describe('SignUp', () => {
	it('should exist', () => {
		expect(SignUp).toExist();
	});
});