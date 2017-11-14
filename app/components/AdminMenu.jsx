var React = require('react');
var {Link} = require('react-router');

var AdminMenu = () => {
	return (
		<div>
        	<ul className="admin-menu">
            	<li className="admin-menu-header">Admin Menu</li>
            	<li className="admin-menu-item"><Link to="/adminusertable" activeClassName="active-link">Manage Users</Link></li>
            	<li className="admin-menu-item"><Link to="/admincompanytable" activeClassName="active-link">Manage Companies</Link></li>
            	<li className="admin-menu-item"><Link to="/adminnews" activeClassName="active-link">Manage News</Link></li>
        	</ul>
		</div>
	);
}

export default AdminMenu;