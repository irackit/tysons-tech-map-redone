const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {User} = require('./../models/user');
const {Company} = require('./../models/company');
const {users, companies, populateUsers, populateCompanies} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateCompanies);

describe('GET /users', () => {
	it('should get all users', (done) => {
		request(app)
		.get('/users')
		.expect(200)
		.expect((res) => {
			expect(res.body.users.length).toBe(2);
		})
		.end(done);
	});	
});

describe('GET /users/me', () => {
	it('should return user if authenticated', (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toBe(users[0]._id.toHexString());
				expect(res.body.email).toBe(users[0].email);
				expect(res.body.isAdmin).toBe(false);
			})
			.end(done);
	});

	it('should return 401 if not authenticated', (done) => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			})
			.end(done);
	});
});

describe('POST /users', () => {
	it('should create a user', (done) => {
		var email = 'example@example.com';
		var password = '123mnb!';
		var isAdmin = true;

		request(app)
			.post('/users')
			.send({email, password, isAdmin})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
				expect(res.body._id).toExist();
				expect(res.body.email).toBe(email);
				//TODO: TEST ADDRESS
			})
			.end((err) => {
				if (err) {
					return done(err);
				}

				User.findOne({email}).then((user) => {
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				}).catch((e) => done(e));
			});
	});

	it('should return validation errors if request invalid', (done) => {
		request(app)
			.post('/users')
			.send({
				email: 'and',
				password: '123'
			})
			.expect(400)
			.end(done)
	});

	it('should not create user if email in use', (done) => {
		request(app)
			.post('/users')
			.send({ email: users[0].email,
					password: 'Password123!'
			})
			.expect(400)
			.end(done);
	});
});

describe('POST /users/login', () => {
	it('should login user and return auth token', (done) => {
		request(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: users[1].password
			})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				User.findById(users[1]._id).then((user) => {
					expect(user.tokens[1]).toInclude({
						access: 'auth',
						token: res.headers['x-auth']
					});
					done();
				}).catch((e) => done(e));
			});
	});

	it('should reject invalid login', () => {
		request(app)
			.post('/users/login')
			.send({
				email: users[1].email,
				password: 'tomato'
			})
			.expect(400)
			.expect((res) => {
				expect(res.headers['x-auth']).toNotExist();
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				User.findById(users[1]._id).then((user) => {
					expect(user.tokens.length).toBe(1);
					done();
				}).catch((e) => done(e));
			});
	});
});

describe('DELETE /users/me/token', () => {
	it('should remove auth token on logout', (done) => {
		request(app)
			.delete('/users/me/token')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				User.findById(users[0]._id).then((user) => {
					expect(user.tokens.length).toBe(0);
					done();
				}).catch((e) => done(e));
			});
	});
});

describe('POST /companies', () => {
	it('should create a company', (done) => {
		var name = 'BMC Software';
		var webSite = 'www.bmc.com';
		var address = {
			streetNo: '8401',
    		streetName: 'Greensboro Dr',
    		city: 'McLean',
    		state: 'VA',
    		zip: '22102',
		};
		var logoImageFile = 'bmc.png';

		request(app)
			.post('/companies')
			.set('x-auth', users[1].tokens[0].token)
			.send({name, webSite, address, logoImageFile})
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toExist();
				expect(res.body.name).toBe(name);
				expect(res.body.webSite).toBe(webSite);
				expect(res.body.address.streetNo).toBe(address.streetNo);
				expect(res.body.address.streetName).toBe(address.streetName);
				expect(res.body.address.city).toBe(address.city);
				expect(res.body.address.state).toBe(address.state);
				expect(res.body.address.zip).toBe(address.zip);
			})
			.end((err) => {
				if (err) {
					return done(err);
				}

				Company.findOne({name}).then((company) => {
					expect(company).toExist();
					done();
				}).catch((e) => done(e));
			});
	});

	it('should not create a company if user is not admin', (done) => {
		var name = 'BMC Software';
		var webSite = 'www.bmc.com';
		var address = {
			streetNo: '8401',
    		streetName: 'Greensboro Dr',
    		city: 'McLean',
    		state: 'VA',
    		zip: '22102',
		};
		var logoImageFile = 'bmc.png';

		request(app)
			.post('/companies')
			.set('x-auth', users[0].tokens[0].token)
			.send({name, webSite, address, logoImageFile})
			.expect(403)
			.end(done);
	});
});

describe('GET /companies', () => {

	it('should get all companies', (done) => {
		request(app)
		.get('/companies')
		.expect(200)
		.expect((res) => {
			expect(res.body.companies.length).toBe(2);
		})
		.end(done);
	});
	
});

describe('GET /companies/:id', () => {
	it('should return a company', (done) => {
		request(app)
			.get(`/companies/${companies[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.company.name).toBe(companies[0].name);
				expect(res.body.company.webSite).toBe(companies[0].webSite);
				expect(res.body.company.address.streetNo).toBe(companies[0].address.streetNo);
				expect(res.body.company.address.streetName).toBe(companies[0].address.streetName);
				expect(res.body.company.address.city).toBe(companies[0].address.city);
				expect(res.body.company.address.suite).toBe(companies[0].address.suite);
				expect(res.body.company.address.state).toBe(companies[0].address.state);
				expect(res.body.company.address.zip).toBe(companies[0].address.zip);
				expect(res.body.company.logoImageFile).toBe(companies[0].logoImageFile);
			})
			.end(done);
	});
});

describe('DELETE /companies', () => {
	it('should delete a company', (done) => {
		var hexId = companies[1]._id.toHexString();

		request(app)
			.delete(`/companies/${hexId}`)
			.set('x-auth', users[1].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body.company._id).toBe(hexId);
	      	})
	      	.end((err, res) => {
	        	if (err) {
	          		return done(err);
	       		}

	        	Company.findById(hexId).then((company) => {
	          		expect(company).toNotExist();
	          		done();
	        	}).catch((e) => done(e));
	      	});
	})

	it('should not delete a company if the user is not an admin', (done) => {
		var hexId = companies[0]._id.toHexString();

		request(app)
			.delete(`/companies/${hexId}`)
			.set('x-auth', users[0].tokens[0].token)
			.expect(403)
			.end(done);
	});

	it('should not delete a company if the user is not logged in', (done) => {
		var hexId = companies[0]._id.toHexString();

		request(app)
			.delete(`/companies/${hexId}`)
			.expect(401)
			.end(done);
	});
});

describe('PATCH /companies/:id', () => {
	it('should update the company', (done) => {
		var hexId = companies[0]._id.toHexString();
		var name = 'BAH';
		var webSite = 'www.bah.com';
		var address = {
    				streetNo: '123',
    				streetName: 'Fake Str',
    				city: 'Columbia',
    				suite: '5',
    				state: 'MD',
    				zip: '21043'
  				};
  		var logoImageFile = 'bah.png'

		request(app)
			.patch(`/companies/${hexId}`)
			.set('x-auth', users[1].tokens[0].token)
			.send({name, webSite, address, logoImageFile})
			.expect(200)
			.expect((res) => {
				expect(res.body.company.name).toBe(name);
				expect(res.body.company.webSite).toBe(webSite);
				expect(res.body.company.address.streetNo).toBe(address.streetNo);
				expect(res.body.company.address.streetName).toBe(address.streetName);
				expect(res.body.company.address.city).toBe(address.city);
				expect(res.body.company.address.suite).toBe(address.suite);
				expect(res.body.company.address.state).toBe(address.state);
				expect(res.body.company.address.zip).toBe(address.zip);
				expect(res.body.company.logoImageFile).toBe(logoImageFile);
			})
			.end(done);
	});
});