var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

import EditProfile from 'EditProfile';

describe('EditProfile', () => {
	it('should exist', () => {
		expect(EditProfile).toExist();
	});
});