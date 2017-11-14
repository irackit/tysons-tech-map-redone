var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

import AdminUserTable from 'AdminUserTable';

describe('AdminUserTable', () => {
	it('should exist', () => {
		expect(AdminUserTable).toExist();
	});
});