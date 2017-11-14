var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

import SignIn from 'SignIn';

describe('SignIn', () => {
	it('should exist', () => {
		expect(SignIn).toExist();
	});
});