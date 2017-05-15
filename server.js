require('./config/config');

const _ = require('lodash');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');

var {User} = require('./models/user');
var {Company} = require('./models/company');
var {authenticate, authenticateAdmin} = require('./middleware/authenticate');

const port = process.env.PORT;
var app = express();

app.use(bodyParser.json());

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

// hbs.registerHelper('getCurrentYear', () => { return new Date().getFullYear(); });
// hbs.registerHelper('screamIt', (text) => { return text.toUpperCase(); });

// Pages
app.get('/', (req, res) => {
 	res.render('index.hbs', {
 		pageTitle: 'Home'
 	});
});

app.get('/admin', (req, res) => {
 	res.render('admin.hbs');
});

app.get('/editprofile', (req, res) => {
 	res.render('editprofile.hbs');
});

app.get('/forgotpassword', (req, res) => {
 	res.render('forgotpassword.hbs');
});

app.get('/managecompanies', (req, res) => {
 	res.render('managecompanies.hbs');
});

app.get('/manageusers', (req, res) => {
 	res.render('manageusers.hbs');
});

app.get('/signin', (req, res) => {
 	res.render('signin.hbs');
});

app.get('/signup', (req, res) => {
 	res.render('signup.hbs', {
 		pageTitle: 'About Page'
 	});
});

// REST Stuff

// Create new user
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password', 'isAdmin']);
	var user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
  		res.status(400).send(e);
  	});
});

// Returns user if authenticated
app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

// Login user
app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});
	}).catch((e) => {
		res.status(400).send();
	});
});

// Logout user
app.delete('/users/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send();
	}, () => {
		res.status(400).send();
	});
});

// Add a company
app.post('/companies', authenticateAdmin, (req, res) => {
	var body = _.pick(req.body, ['name', 'webSite', 'address', 'logoImageFile']);
	var company = new Company(body);

	company.save().then((company) => {
		res.send(company);
	}, (e) => {
		res.status(400).send(e);
	});
});

// Get all companies
app.get('/companies', (req, res) => {
	Company.find().then((companies) => {
		res.send({companies});
	}, (e) => {
		res.status(400).send(e);
	});
});

// Get a company by id
app.get('/companies/:id', (req, res) => {
	var id = req.params.id;

	if ( !ObjectID.isValid(id) ) {
		return res.status(404).send();
	}

	Company.findOne({
		_id: id
	}).then((company) => {
		if (!company) {
			return res.status(404).send();
		}

		res.send({company});
	}).catch((e) => {
		res.status(400).send();
	});
});


// Delete a company
app.delete('/companies/:id', authenticateAdmin, (req, res) => {
	var id = req.params.id;

	if ( !ObjectID.isValid(id) ) {
		return res.status(404).send();
	}

	Company.findOneAndRemove({
		_id: id
	}).then((company) => {
		if (!company) {
			return res.status(404).send();
		}

		res.send({company});
	}).catch((e) => {
		res.status(400).send();
	});
});

app.patch('/companies/:id', authenticateAdmin, (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['name', 'webSite', 'address', 'logoImageFile']);

	if ( !ObjectID.isValid(id) ) {
		return res.status(404).send();
	}

	Company.findOneAndUpdate( {_id: id}, {$set: body}, {new: true}).then((company) => {
		if (!company) {
			return res.status(404).send();
		}
		res.send({company});
	}).catch((e) => {
		res.status(400).send();
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

module.exports = {app};