
var React = require('react'); //TODO: Use const?
var ReactDOM = require('react-dom');
var AdminUserTable = require('AdminUserTable');

/*
import React from 'react';
import ReactDOM from 'react-dom';
import ConfigurationTable from './configurationtable';
*/
ReactDOM.render(
	<AdminUserTable/>,
	document.getElementById('adminusertable')
);