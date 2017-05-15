var mongoose = require('mongoose');

var Company = mongoose.model('Company', {
	name: {
		type: String,
		unique: true,
		required: true,
		minlength: 1,
		trim: true
	},
	webSite: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	address: {
		type: mongoose.Schema.Types.Object,
		ref: 'AddressSchema',
		required: true,
		default: null
	},
	logoImageFile : {
		type: String,
		required: false,
		minlength: 1,
	}
});

module.exports = {Company};