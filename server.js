const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

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


app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});