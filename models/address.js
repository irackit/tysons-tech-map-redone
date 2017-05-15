var mongoose = require('mongoose');

var statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

var AddressSchema = new mongoose.Schema({
	streetNo: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	streetName: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	suite: {
		type: String,
		required: false,
		minlength: 1,
		trim: true,
		default: null
	},
	city: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	state: {
		type: String,
		required: true,
		uppercase: true,
		enum: statesArray
	},
	zip: {
		type: String,
		required: true,
		minlength: 5
	}
});

var Address = mongoose.model('Address', AddressSchema);

module.exports = {Address};