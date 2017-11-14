var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = () => {
    return (
        <div className="top-bar">
          <div className="top-bar-left">
              <ul className="menu">
                  <li className="menu-text header-label">
                      Tyson's Tech Map
                  </li>
              </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li>
                <div className="profile">
                  <span>B</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
    );
};

// Check out header.hbs

/*
                  <li>
                      <IndexLink to="/" activeClassName="active-link">Test</IndexLink>
                  </li>
                  <li>
                      <Link to="/adminusertable" activeClassName="active-link">AdminUserTable</Link>
                  </li>
*/

module.exports = Nav;