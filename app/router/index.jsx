import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Main from 'Main';
import Test from 'Test';
import AdminUserTable from 'AdminUserTable';
import AdminMenu from 'AdminMenu';
import EditProfile from 'EditProfile';
import ForgotPassword from 'ForgotPassword';
import SignIn from 'SignIn';
import SignUp from 'SignUp';


export default (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<Route path="adminusertable" component={AdminUserTable}/>
			<Route path="adminmenu" component={AdminMenu}/>
			<Route path="editprofile" component={EditProfile}/>
			<Route path="forgotpassword" component={ForgotPassword}/>
			<Route path="signin" component={SignIn}/>
			<Route path="signup" component={SignUp}/>
			<IndexRoute component={Test}/>
		</Route>
	</Router>
);