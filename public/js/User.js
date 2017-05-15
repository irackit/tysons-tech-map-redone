// TODO: Validation

/**
 * A user of this site
 * @param {string} userId The id of this user in the database
 * @param {string} email The email address of this user
 * @param {string} password The password of this user
 * @param {string} streetNo Street number of this user's address
 * @param {string} streetName Street name of this user's address
 * @param {string} city City of this user's address
 * @param {string} state State of this user's address
 * @param {string} zip Zip code of this user's address (5 character string)
 * @param {boolean} isUserAdmin If the user is admin of users (can add/delete/modify users)
 * @param {boolean} isNewsAdmin If the user is admin of News
 */
function User(userId, email, password, streetNo, streetName, city, state, zip, isUserAdmin, isNewsAdmin) {
    this.userId = ko.observable(userId);
    this.email = ko.observable(email);
    this.password = ko.observable(password);
    this.address = new Address(streetNo, streetName, null, city, state, zip);   // We don't care about user's apartment number, so leave null
    this.isUserAdmin = ko.observable(isUserAdmin);
    this.isNewsAdmin = ko.observable(isNewsAdmin);
};

/**
 * Copys all attributes of an other user to this user
 * @param {User} otherUser The user to copy the attributes of
 */
User.prototype.copy = function(otherUser) {
    this.userId( ko.utils.unwrapObservable(otherUser.userId) );
    this.email( ko.utils.unwrapObservable(otherUser.email) );
    this.password( ko.utils.unwrapObservable(otherUser.password) );
    this.address.copy(otherUser.address);
    this.isUserAdmin( ko.utils.unwrapObservable(otherUser.isUserAdmin) );
    this.isNewsAdmin( ko.utils.unwrapObservable(otherUser.isNewsAdmin) );
};

/**
 * Checks if this user's values are equal to another user's values
 * @param {User} Determines if this user's properties are equal the user passed in
 * @return true if the two users have equal properties, false otherwise
 */
User.prototype.equals = function(otherUser) {
    if ( ko.utils.unwrapObservable(this.userId) === ko.utils.unwrapObservable(otherUser.userId) &&
         ko.utils.unwrapObservable(this.email) === ko.utils.unwrapObservable(otherUser.email) &&
         ko.utils.unwrapObservable(this.password) === ko.utils.unwrapObservable(otherUser.password) &&
         this.address.equals(otherUser.address) &&
         ko.utils.unwrapObservable(this.isUserAdmin) === ko.utils.unwrapObservable(otherUser.isUserAdmin) &&
         ko.utils.unwrapObservable(this.isNewsAdmin) === ko.utils.unwrapObservable(otherUser.isNewsAdmin) ) {
        return true;
    }

    return false;
};

User.prototype.getUserId = function() {
    return ko.utils.unwrapObservable(this.userId);
};

User.prototype.setUserId = function(userId) {
    this.userId(userId);
};

User.prototype.getEmail = function() {
    return ko.utils.unwrapObservable(this.email);
};

User.prototype.setEmail = function(email) {
    this.email(email);
};

User.prototype.getPassword = function() {
    return ko.utils.unwrapObservable(this.password);
};

User.prototype.setPassword = function(password) {
    this.password(password);
};

User.prototype.getStreetNo = function () {
    return this.address.getStreetNo();
};

User.prototype.setStreetNo = function(streetNo) {
    this.address.setStreetNo(streetNo);
};

User.prototype.getStreetName = function() {
    return this.address.getStreetName();
};

User.prototype.setStreetName = function(streetName) {
    this.address.setStreetName(streetName);
};

User.prototype.getCity = function() {
    return this.address.getCity();
};

User.prototype.setCity = function(city) {
    this.address.setCity(city);
};

User.prototype.getState = function() {
    return this.address.getState();
};

User.prototype.setState = function(state) {
    this.address.setState(state);
};

User.prototype.getZip = function() {
    return this.address.getZip();
};

User.prototype.setZip = function(zip) {
    this.address.setZip(zip);
};

User.prototype.isUserAdmin = function() {
    return ko.utils.unwrapObservable(this.isUserAdmin);
};

User.prototype.setUserAdminStatus = function(isUserAdmin) {
    this.isUserAdmin(isUserAdmin);
};

User.prototype.isNewsAdmin = function() {
    return ko.utils.unwrapObservable(this.isNewsAdmin);
};

User.prototype.setNewsAdminStatus = function(isNewsAdmin) {
    this.isNewsAdmin(isNewsAdmin);
};