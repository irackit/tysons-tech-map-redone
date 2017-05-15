const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {User} = require('./../../models/user');
const {Company} = require('./../../models/company')

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
	_id: userOneId,
	email: 'andrew@example.com',
	password: 'userOnePass',
	tokens: [{
  		access: 'auth',
    	token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  	}]
}, {
	_id: userTwoId,
	email: 'bella@example.com',
	password: 'userTwoPass',
	tokens: [{
  		access: 'auth',
    	token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  	}],
  isAdmin: true
}];

const companies = [{
  _id: new ObjectID(),
  name: 'Booz Allen Hamilton',
  webSite: 'www.boozallen.com',
  address: {
    streetNo: '8283',
    streetName: 'Greensboro Dr',
    city: 'McLean',
    state: 'VA',
    zip: '22102',
  },
  logoImageFile: 'boozallenhamilton.png'
}, {
  _id: new ObjectID(),
  name: 'Oracle',
  webSite: 'www.oracle.com',
  address: {
    streetNo: '1595',
    streetName: 'Spring Hill Rd',
    suite: '300',
    city: 'Vienna',
    state: 'VA',
    zip: '22182',
  },
  logoImageFile: 'oracle.png'
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

const populateCompanies = (done) => {
  Company.remove({}).then(() => {
    return Company.insertMany(companies);
  }).then(() => done());
};

module.exports = {users, companies, populateUsers, populateCompanies};