import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router'; //Do I need this?

import router from 'router';

// Load foundation
$(document).foundation();

// App scss
require('style!css!sass!applicationStyles');

ReactDOM.render(
	<div>
		{router}
	</div>,
	document.getElementById('app')
);