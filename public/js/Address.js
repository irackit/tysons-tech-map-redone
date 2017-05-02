// TODO: Validation

/**
 * An address
 * @param {string} streetNo Street number of this user's address
 * @param {string} streetName Street name of this user's address
 * @param {string} city City of this user's address
 * @param {string} state State of this user's address
 * @param {string} zip Zip code of this user's address (5 character string)
 */
function Address(streetNo, streetName, suite, city, state, zip) {
    this.streetNo = ko.observable(streetNo);
    this.streetName = ko.observable(streetName);
    this.suite = ko.observable(suite);
    this.city = ko.observable(city);
    this.state = ko.observable(state);
    this.zip = ko.observable(zip);
};

/**
 * Copys all attributes of an other address to this address
 * @param {Address} otherAddress The address to copy the attributes of
 */
Address.prototype.copy = function(otherAddress) {
    this.streetNo( ko.utils.unwrapObservable(otherAddress.streetNo) );
    this.streetName( ko.utils.unwrapObservable(otherAddress.streetName) );
    this.suite( ko.utils.unwrapObservable(otherAddress.suite) );
    this.city( ko.utils.unwrapObservable(otherAddress.city) );
    this.state( ko.utils.unwrapObservable(otherAddress.state) );
    this.zip( ko.utils.unwrapObservable(otherAddress.zip) );
};

/**
 * Checks if this address values are equal to another address values
 * @param {Address} The address to compare this addresses values to
 * @return true if the two addresses have equal properties, false otherwise
 */
Address.prototype.equals = function(otherAddress) {
    if ( ko.utils.unwrapObservable(this.streetNo) === ko.utils.unwrapObservable(otherAddress.streetNo) &&
         ko.utils.unwrapObservable(this.streetName) === ko.utils.unwrapObservable(otherAddress.streetName) &&
         ko.utils.unwrapObservable(this.suite) === ko.utils.unwrapObservable(otherAddress.suite) &&
         ko.utils.unwrapObservable(this.city) === ko.utils.unwrapObservable(otherAddress.city) &&
         ko.utils.unwrapObservable(this.state) === ko.utils.unwrapObservable(otherAddress.state) &&
         ko.utils.unwrapObservable(this.zip) === ko.utils.unwrapObservable(otherAddress.zip) ) {

        return true;
    }

    return false;
};

// TODO: Rename this as maybe getFormattedAddressAsString()
// TODO: Include Suite
/**
 * Returns the address as a formatted string
 * @return {String} A formatted address of the format
 *     7921 Rustling Bark Court, Ellicott City, MD OR Ellicott City, Md
 */
Address.prototype.getFormattedAddress = function() {
    if ( this.streetNo() === '' || this.streetName() === '' ) {
        return this.city() + ', ' + this.state();
    }

    return this.streetNo() + ' ' + this.streetName() + ', ' + this.city() + ', ' + this.state();
};

Address.prototype.getStreetNo = function() {
    return ko.utils.unwrapObservable(this.streetNo);
};

Address.prototype.setStreetNo = function(streetNo) {
    this.streetNo(streetNo);
};

Address.prototype.getStreetName = function() {
    return ko.utils.unwrapObservable(this.streetName);
};

Address.prototype.setStreetName = function(streetName) {
    this.streetName(streetName);
};

Address.prototype.getSuite = function() {
    return ko.utils.unwrapObservable(this.suite);
};

Address.prototype.setSuite = function(suite) {
    this.suite(suite);
};

Address.prototype.getCity = function() {
    return ko.utils.unwrapObservable(this.city);
};

Address.prototype.setCity = function(city) {
    this.city(city);
};

Address.prototype.getState = function() {
    return ko.utils.unwrapObservable(this.state);
};

Address.prototype.setState = function(state) {
    this.state(state);
};

Address.prototype.getZip = function() {
    return ko.utils.unwrapObservable(this.zip);
};

Address.prototype.setZip = function(zip) {
    this.zip(zip);
};
